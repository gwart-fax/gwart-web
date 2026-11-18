# gwart-web

The holding page for [Gwart](https://github.com/gwart-fax), a little thermal
printer that prints faxes from your friends.

One page: "Coming Soon", plus the legal information the people holding a
prototype need — privacy, and how to get their account deleted.

React + Vite + TypeScript. No router, no UI library, no state. The whole site is
`src/App.tsx` and `src/index.css`.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/
npm run preview    # serve the build
```

## Styling

Ported from the app's `src/theme.ts`: beige-box retro drawn as pixel art, with
the printer setting the palette — putty plastic, a dark lower band, a green key.
Two pixel fonts and no others: Silkscreen to shout, VT323 to talk.

CSS variable names in `src/index.css` match the token names in that file
deliberately. **When a colour changes in the app, change it here under the same
name** rather than re-deriving it. Light and dark follow the browser the same way
the app follows the phone.

Nothing has a border radius. The look depends on corners staying square, on hard
2px outlines, and on offset shadows rather than blurred ones.

## Deploying

S3 + CloudFront + Route 53, fronting `gwartfax.com`. One-time infrastructure
setup is in [deploy/README.md](deploy/README.md); after that
[`.github/workflows/ci.yml`](.github/workflows/ci.yml) lints, typechecks and
builds every push, and deploys `main` by itself. Credentials are OIDC, so there
is no access key in this repository.

## The privacy text is a copy

The canonical privacy policy lives at `legal/privacy-policy.md` in the main
gwartfax project, which also records the decisions behind it and why. The copy in
`src/App.tsx` is the published version.

**Change both together.** If they ever disagree, the published one is the one
people relied on. Internal notes from that document — the bracketed markers for
unresolved decisions — are deliberately not reproduced here.

## Before this goes live

- [ ] Confirm `info@gossfinch.com` accepts mail. The domain has a working MX
      record, but that doesn't prove the `info@` address exists, and a privacy
      contact that silently bounces is worse than none.
- [ ] Set up a filter for data and deletion requests. It's a shared inbox, and
      those are the only mail here with a 30-day commitment attached.
