/**
 * The published privacy policy.
 *
 * The canonical version lives in `legal/privacy-policy.md` in the main gwartfax
 * project, which also records the decisions behind it. **Change both together.**
 * If they ever disagree, the published one is what people relied on.
 */

import { Layout, Mail, Section, UPDATED } from '../Layout';

export function Privacy() {
  return (
    <Layout current="/privacy">
      <section className="panel">
        <h1 className="hero">Privacy</h1>
        <hr className="rule" />
        <p className="meta">Effective {UPDATED}.</p>
        <p>
          Gwart is built by a small independent team. Responsibility for everything described here
          sits with <strong>Sebastian Finch</strong>. Privacy questions, requests for your data and
          deletion requests all go to <Mail />.
        </p>
      </section>

      <Section label="The short version">
        <ul>
          <li>
            Everything you send, text and photos alike, is stored <strong>unencrypted</strong> on
            the server.
          </li>
          <li>
            We <strong>can</strong> technically read it, and don&rsquo;t, except when you ask us
            for help with a problem or the law requires it.
          </li>
          <li>
            It is <strong>not</strong> end-to-end encrypted. Don&rsquo;t use Gwart for anything
            you&rsquo;d mind being read off a server.
          </li>
          <li>
            Whatever you send prints on <strong>paper, in someone&rsquo;s home</strong>, where
            other people in that room can read it.
          </li>
          <li>
            Your faxes are kept <strong>until you ask for them to be deleted</strong>. Nothing
            expires on its own.
          </li>
        </ul>
      </Section>

      <Section id="collect" label="What we collect">
        <ul>
          <li>
            <strong>Your account:</strong> username, display name, an optional and unverified
            email address, and your password stored only as a hash.
          </li>
          <li>
            <strong>What you send and receive:</strong> the text of each fax as you composed it,
            photos you attach, page height, and status and timestamps.
          </li>
          <li>
            <strong>Your printer:</strong> its device identity, nickname, timezone, quiet hours,
            and when it was last seen online.
          </li>
          <li>
            <strong>Your phone:</strong> a push notification token, the platform, and a device
            name.
          </li>
          <li>
            <strong>Your settings:</strong> timezone, whether you&rsquo;re accepting faxes, your
            receiving limits, and notification preferences.
          </li>
          <li>
            <strong>Operational records:</strong> rate-limiting counters, and web server access
            logs that include IP addresses. Those roll over automatically, so they last days to
            weeks and are then gone.
          </li>
        </ul>
      </Section>

      <Section id="why" label="Why we collect it">
        <p>Each of those exists for a reason, and the list is short:</p>
        <ul>
          <li>
            <strong>To deliver a fax</strong> to the right printer, render it to something that
            printer understands, and tell you whether it arrived.
          </li>
          <li>
            <strong>To enforce the controls you set:</strong> quiet hours, receiving limits, and
            who is allowed to print to you at all.
          </li>
          <li>
            <strong>To notify you</strong> when a fax arrives or fails, if you have that switched
            on.
          </li>
          <li>
            <strong>To keep the service standing up:</strong> rate limits, abuse prevention, and
            diagnosing faults when something breaks.
          </li>
          <li>
            <strong>To answer you</strong> when you get in touch.
          </li>
        </ul>
        <p className="meta">
          We don&rsquo;t profile you, build an advertising audience, or sell anything to anyone.
        </p>
      </Section>

      <Section id="not-collected" label="What we don't collect">
        <p>Worth stating plainly, because most apps can&rsquo;t:</p>
        <ul>
          <li>
            <strong>No analytics, telemetry, or crash reporting.</strong> No Firebase, no Sentry,
            no advertising SDK. The app carries no such dependency.
          </li>
          <li>
            <strong>No cookies, and no third parties on this website.</strong> These pages set no
            cookies and load nothing from anyone else. Even the two pixel fonts are served from
            our own storage rather than a font CDN, so nobody but us sees that you read this.
          </li>
          <li>
            <strong>No location data.</strong> Timezone is a field you set, not GPS.
          </li>
          <li>
            <strong>No contact list upload.</strong> You add friends by typing their username.
          </li>
          <li>
            <strong>Your wifi password never reaches the server.</strong> During setup your phone
            sends it to the printer directly over Bluetooth, and the printer keeps it in its own
            flash memory.
          </li>
        </ul>
      </Section>

      <Section id="encryption" label="Not end-to-end encrypted">
        <p>
          Content is encrypted in transit and at rest in storage. But the server has to decrypt and
          render every fax to turn it into printer instructions, so plaintext exists on the server,
          and anyone with administrative access to it could read your faxes.
        </p>
        <p>
          <strong>The promise:</strong> we don&rsquo;t read the content of your faxes, except when
          you&rsquo;ve asked for help with a specific problem, or where the law requires it. A
          small number of people have the access that would make it possible, and nothing in the
          system enforces the promise. It&rsquo;s a commitment, not a control.
        </p>
      </Section>

      <Section id="retention" label="How long we keep it">
        <p>
          <strong>Until you ask us to delete it.</strong> There is no automatic expiry on message
          content, and we would rather say so than publish a time limit we don&rsquo;t enforce.
          Rendered print output is the exception: it is deleted automatically after a few days.
        </p>
        <p>
          The text you composed is kept deliberately rather than only the printed output, so that
          resending re-renders your fax properly instead of replaying stale instructions.
        </p>
        <p>
          One exception to &ldquo;until you ask&rdquo;: a fax that already reached its recipient is
          their record of it as well as yours, so deleting your account removes your name from it
          rather than removing it from their history.
        </p>
      </Section>

      <Section id="sharing" label="Who else can see it">
        <p>
          <strong>Amazon Web Services</strong> hosts everything: the server, the database, the
          storage bucket, and the broker the printers connect to. They process it on our behalf
          rather than using it for their own purposes.
        </p>
        <p>
          <strong>Expo, Apple and Google</strong> handle push notifications. When a fax arrives, a
          notification goes out naming the sender and your printer, so those two names pass through
          their services. <strong>No message text and no images are ever included in a
          notification.</strong>
        </p>
        <p>
          <strong>If Gwart is ever sold, or its team forms a company,</strong> accounts and their
          data would move to whoever runs the service afterwards, who would be bound by this policy
          until they tell you otherwise. We would tell you before that happened.
        </p>
        <p className="meta">
          Beyond that, nothing. No advertisers, no analytics vendors, no data sales.
        </p>
      </Section>

      <Section id="legal-requests" label="Legal requests">
        <p>
          We will hand over your information to law enforcement only where we&rsquo;re legally
          required to, and we&rsquo;ll ask for valid legal process rather than taking a request at
          face value.
        </p>
        <p>
          If we ever receive one about your account, we&rsquo;ll tell you, unless we&rsquo;re
          legally barred from doing so. Nothing like this has happened so far.
        </p>
      </Section>

      <Section id="breach" label="If something goes wrong">
        <p>
          If we find that your information has been exposed, or taken, we will tell you directly
          and promptly, and say what we actually know rather than waiting until the picture is
          comfortable. There are few enough people using Gwart that a real message to each of them
          is possible.
        </p>
        <p className="meta">
          If you think you&rsquo;ve found a security problem, please email <Mail /> and we&rsquo;ll
          look at it straight away. We won&rsquo;t pursue anyone who reports something in good
          faith.
        </p>
      </Section>

      <Section id="printer" label="The printer is a physical object">
        <p>
          A fax is printed on paper, so anyone who walks past the printer can read it. Quiet hours
          delay printing; they don&rsquo;t hide anything. And a printer has one owner account. If a
          household shares a device, the account holder is the person whose account holds that
          record.
        </p>
      </Section>

      <Section id="choices" label="Your choices">
        <ul>
          <li>Turn off &ldquo;accepting faxes&rdquo;, or refuse images from others.</li>
          <li>Set quiet hours, so faxes queue instead of printing.</li>
          <li>Cap faxes per hour and paper rows per day, overall and per friend.</li>
          <li>
            Remove a friend, which revokes consent in both directions immediately. Nobody is
            notified.
          </li>
          <li>Revoke a device&rsquo;s push notifications.</li>
          <li>
            Ask us for a copy of everything held about you, or ask us to correct it, at <Mail />.
          </li>
        </ul>
      </Section>

      <Section id="delete" label="Deleting your account">
        <p>
          Email <Mail /> and ask. Requests are answered <strong>within 30 days</strong>, and in
          practice much sooner. The same address works if you only want a copy of your data, or a
          correction.
        </p>
        <p>
          <a href="/delete">What deleting your account removes</a> has the detail, including the
          two things that surprise people: faxes you already sent stay with the people you sent
          them to, and your printer is released rather than deleted.
        </p>
      </Section>

      <Section id="security" label="Security">
        <ul>
          <li>HTTPS everywhere. No plaintext HTTP.</li>
          <li>Passwords hashed with Argon2id; the server never stores a readable one.</li>
          <li>The database isn&rsquo;t reachable from the public internet.</li>
          <li>The storage bucket blocks public access and encrypts objects at rest.</li>
          <li>Links the printer uses to fetch a fax are signed and expire in five minutes.</li>
          <li>Printer pairing codes are single-use and expire in ten minutes.</li>
        </ul>
        <p className="meta">
          No system is perfectly secure, and this one is early software run by a small team.
        </p>
      </Section>

      <Section id="children" label="Children">
        <p>
          You must be <strong>13 or older</strong> to have a Gwart account. Gwart isn&rsquo;t
          directed at children, and accounts for under-13s aren&rsquo;t permitted. If we learn of
          one, we will delete it and its content. If you&rsquo;re under 18, set the account up with
          a parent&rsquo;s or guardian&rsquo;s knowledge.
        </p>
      </Section>

      <Section id="where" label="Where this is operated">
        <p>
          Gwart is operated from the United States, and all data is stored on servers in the United
          States. The printers are given only to recipients in the US, and the service isn&rsquo;t
          offered to people elsewhere.
        </p>
      </Section>

      <Section id="changes" label="Changes">
        <p>
          If this policy changes in a way that matters, we&rsquo;ll tell recipients directly. There
          are few enough users that an actual message is possible, and a silent edit wouldn&rsquo;t
          be honest.
        </p>
      </Section>
    </Layout>
  );
}
