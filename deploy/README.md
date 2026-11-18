# Deploy — S3 + CloudFront + Route 53

**This is built and live at https://gwartfax.com.** What follows is how it was
put together, kept because the next environment will need it and because two of
the steps fail in ways that are hard to read.

| | |
| --- | --- |
| AWS account | `689971417469`, profile `gwart` |
| Bucket | `gwart-web-site` (us-east-1, private) |
| Distribution | `E35NT7ES68P0IL` → `d2o5vs8sv4l1tb.cloudfront.net` |
| Certificate | `8123e591-…` in **us-east-1** |
| Hosted zone | `Z045954237YMPGFALN4J4` (`gwartfax.com`) |
| Deploy role | `gwart-web-deploy` |

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) builds every push and
deploys `main` on its own.

The site is static and has no router — one page, anchors for the sections — so
none of the single-page-app rewrite machinery is needed. Nothing here talks to
the API.

```bash
# Set these once per shell. The domain is already registered and parked on
# Route 53 with no records on it.
export DOMAIN=gwartfax.com
export BUCKET=gwart-web-site
export REGION=us-west-2          # the bucket's region; see the ACM note below
```

> **`aws sts get-caller-identity` first.** Every command below assumes a live
> session, and a deploy half-built because a token expired is worse than one
> that never started.

## 1. The bucket

**Private, and not a website endpoint.** The S3 static-website feature and
CloudFront's Origin Access Control are alternatives, not layers: the website
endpoint is public HTTP with no way to restrict it to CloudFront. The whole
reason to use OAC is that the bucket stays private and only the distribution can
read it.

```bash
aws s3api create-bucket --bucket "$BUCKET" --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION"

aws s3api put-public-access-block --bucket "$BUCKET" \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

The bucket policy comes later — it has to name the distribution, which does not
exist yet.

## 2. The certificate — in us-east-1, whatever region everything else is in

This is the step that catches people. **CloudFront only reads ACM certificates
from us-east-1.** A certificate issued in the bucket's region is valid, is
visible in the console, and simply will not appear in the distribution's
dropdown, with no error explaining why.

```bash
aws acm request-certificate --region us-east-1 \
  --domain-name "$DOMAIN" \
  --subject-alternative-names "www.$DOMAIN" \
  --validation-method DNS \
  --query CertificateArn --output text
```

Then add the validation CNAMEs it asks for to the hosted zone, and wait for
`Status: ISSUED`:

```bash
export CERT_ARN=<the arn printed above>

aws acm describe-certificate --region us-east-1 --certificate-arn "$CERT_ARN" \
  --query 'Certificate.DomainValidationOptions[].ResourceRecord'

# ...create those records in Route 53, then poll:
aws acm describe-certificate --region us-east-1 --certificate-arn "$CERT_ARN" \
  --query 'Certificate.Status' --output text
```

Validation usually lands within a few minutes. The distribution cannot be
created until it does.

## 3. Response headers

Mirror what Caddy already sends for the API (`api/deploy/Caddyfile`), so the two
properties do not disagree about their own security posture:

```bash
aws cloudfront create-response-headers-policy \
  --response-headers-policy-config '{
    "Name": "gwart-web-headers",
    "SecurityHeadersConfig": {
      "StrictTransportSecurity": {
        "Override": true, "AccessControlMaxAgeSec": 31536000,
        "IncludeSubdomains": true, "Preload": false
      },
      "ContentTypeOptions": { "Override": true },
      "FrameOptions": { "Override": true, "FrameOption": "DENY" },
      "ReferrerPolicy": { "Override": true, "ReferrerPolicy": "no-referrer" }
    }
  }' --query 'ResponseHeadersPolicy.Id' --output text
```

Note the site loads fonts and stylesheets from Google Fonts, so a
`Content-Security-Policy` has to allow `fonts.googleapis.com` and
`fonts.gstatic.com`. It is left off here rather than added wrong — a CSP that
blocks the two fonts the whole design rests on is a very visible failure.

## 4. The distribution

```bash
# OAC, not the deprecated Origin Access Identity.
aws cloudfront create-origin-access-control \
  --origin-access-control-config \
  "Name=$BUCKET,OriginAccessControlOriginType=s3,SigningBehavior=always,SigningProtocol=sigv4" \
  --query 'OriginAccessControl.Id' --output text
```

Create the distribution with:

- **Origin** — the bucket's REST endpoint, `$BUCKET.s3.$REGION.amazonaws.com`,
  *not* the `s3-website-` hostname.
- **Origin access control** — the id above.
- **Default root object** — `index.html`. With a REST origin the bucket's own
  index-document behaviour does not apply, so without this `https://$DOMAIN/`
  returns an XML access-denied rather than the page.
- **Aliases** — `$DOMAIN` and `www.$DOMAIN`.
- **Viewer protocol policy** — `redirect-to-https`.
- **Certificate** — `$CERT_ARN`, with SNI.
- **Response headers policy** — the id from step 3.
- **Compress** — on.

Then let the bucket trust it, and nothing else:

```bash
export DIST_ID=<distribution id>
export ACCOUNT=$(aws sts get-caller-identity --query Account --output text)

aws s3api put-bucket-policy --bucket "$BUCKET" --policy "{
  \"Version\": \"2012-10-17\",
  \"Statement\": [{
    \"Effect\": \"Allow\",
    \"Principal\": { \"Service\": \"cloudfront.amazonaws.com\" },
    \"Action\": \"s3:GetObject\",
    \"Resource\": \"arn:aws:s3:::$BUCKET/*\",
    \"Condition\": { \"StringEquals\": {
      \"AWS:SourceArn\": \"arn:aws:cloudfront::$ACCOUNT:distribution/$DIST_ID\"
    }}
  }]
}"
```

The `SourceArn` condition is what stops *any* CloudFront distribution, in any
account, from reading the bucket.

## 5. DNS

**Alias records, not CNAMEs.** DNS forbids a CNAME at a zone apex; Route 53's
alias is its own extension and is the only way to point `gwartfax.com` itself at
a distribution. Create **both** A and AAAA — CloudFront is dual-stack, and an
IPv6-only client gets nothing without the AAAA.

The hosted zone id for an alias to CloudFront is always the literal
`Z2FDTNDATAQYW2`, in every region. It is not your zone's id.

```bash
export ZONE_ID=$(aws route53 list-hosted-zones-by-name \
  --dns-name "$DOMAIN" --query 'HostedZones[0].Id' --output text | cut -d/ -f3)
export DIST_DOMAIN=$(aws cloudfront get-distribution --id "$DIST_ID" \
  --query 'Distribution.DomainName' --output text)

for TYPE in A AAAA; do
  aws route53 change-resource-record-sets --hosted-zone-id "$ZONE_ID" \
    --change-batch "{
      \"Changes\": [{
        \"Action\": \"UPSERT\",
        \"ResourceRecordSet\": {
          \"Name\": \"$DOMAIN\", \"Type\": \"$TYPE\",
          \"AliasTarget\": {
            \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
            \"DNSName\": \"$DIST_DOMAIN\",
            \"EvaluateTargetHealth\": false
          }
        }
      }]
    }"
done
```

Repeat for `www.$DOMAIN`, or point it at the apex with a CloudFront Function if
you want a real redirect rather than the same site on two names.

> **Mail is unaffected.** The privacy policy's contact address is on
> `gossfinch.com`, a different zone on Google Workspace. Nothing here touches
> it. If a contact address on *this* domain is ever wanted, it needs MX records
> — alias records at the apex do not conflict with those, but adding a second
> apex A record would.

## 6. The deploy role

The workflow authenticates with OIDC, so there is no access key to leak or
rotate. Add GitHub as an identity provider once per account:

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

Then a role whose trust policy pins the `sub` claim. That condition is the part
that matters: without it, any repository on GitHub can assume the role.

**Two things make the `sub` value not what you would guess**, and both of them
fail with the same unhelpful `Not authorized to perform
sts:AssumeRoleWithWebIdentity`:

1. **The deploy job declares `environment: production`.** A job with an
   environment gets `...:environment:production` as its subject, *not*
   `...:ref:refs/heads/main`. Naming the branch in the trust policy matches
   nothing.
2. **This org has immutable subject claims**, so the org and repository carry
   their numeric database ids: `gwart-fax@316361583/gwart-web@1462193305`. No
   name-based pattern matches, `repo:gwart-fax/gwart-web:*` included. This is a
   good thing — it pins the trust to ids that survive a rename and are not
   re-granted if someone recreates a repository under the same name — but it is
   invisible until you look.

So the working policy is:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::689971417469:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": "repo:gwart-fax@316361583/gwart-web@1462193305:environment:production"
      }
    }
  }]
}
```

**Don't guess at this value — read it.** STS never tells you what it received,
but CloudTrail does, and the failed attempt is logged with the subject in it:

```bash
aws cloudtrail lookup-events --region us-east-1 \
  --lookup-attributes AttributeKey=EventName,AttributeValue=AssumeRoleWithWebIdentity \
  --max-results 1 --query 'Events[].CloudTrailEvent' --output text
```

`userIdentity.userName` in that event is the exact string to paste.

Its permissions policy needs exactly four actions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::gwart-web-site"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::gwart-web-site/*"
    },
    {
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::<account>:distribution/<distribution id>"
    }
  ]
}
```

`s3:ListBucket` is on the bucket and the other two are on its contents — a
common half-hour lost to `sync --delete` failing with AccessDenied is this
distinction.

## 7. Wire up the repository

Repository **variables** (Settings → Secrets and variables → Actions →
Variables):

| Name | Value |
| --- | --- |
| `AWS_REGION` | the bucket's region, e.g. `us-west-2` |
| `AWS_S3_BUCKET` | `gwart-web-site` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | the distribution id |

Repository **secret**:

| Name | Value |
| --- | --- |
| `AWS_ROLE_ARN` | the role from step 6 |

The workflow also references a `production` environment. Create it if you want a
required reviewer on deploys; otherwise GitHub creates it on first use and it
does nothing.

## How a deploy behaves

`main` → build, then two uploads and an invalidation:

- `assets/` is fingerprinted by Vite, so it uploads with
  `max-age=31536000,immutable` and goes up **first** — the new HTML must never
  point at a chunk that is not in the bucket yet.
- `index.html` and `favicon.svg` keep their names across deploys, so they upload
  with `max-age=0,must-revalidate`. Caching those is exactly how a deploy goes
  out and nobody sees it.
- `--delete` removes superseded assets immediately. The tradeoff is a visitor
  mid-page-load who asks for a chunk that just disappeared; at this size the
  window is seconds and the alternative is a bucket that grows forever.

## Afterwards

- `curl -sI https://gwartfax.com | head -20` — expect `200`, HSTS, and
  `x-cache: Hit from cloudfront` on a second request.
- Check the page in both colour schemes; the theme follows the browser.
- The API is still on a bare `sslip.io` address. Moving it to
  `api.gwartfax.com` is a separate job in this zone, and would let the privacy
  policy stop pointing at an IP-shaped hostname.
