/**
 * The whole site: a holding page with the legal information on it.
 *
 * The privacy text here is a copy. The canonical version lives in
 * `legal/privacy-policy.md` in the main gwartfax project, which also records
 * the decisions behind it. **Change both together.** If they ever disagree,
 * the published one is the one people relied on.
 *
 * Internal notes from that document - the bracketed markers for unresolved
 * decisions - are deliberately not reproduced here.
 */

const UPDATED = '18 November 2026';
const CONTACT = 'info@gossfinch.com';

const SECTIONS = [
  { id: 'privacy', label: 'Privacy' },
  { id: 'delete', label: 'Delete your account' },
  { id: 'contact', label: 'Contact' },
] as const;

function Mail() {
  return <a href={`mailto:${CONTACT}`}>{CONTACT}</a>;
}

function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="panel">
      <h2 className="tape">{label}</h2>
      <hr className="rule" />
      {children}
    </section>
  );
}

export default function App() {
  return (
    <>
      <div className="page">
        <header className="head">
          <span className="led" aria-hidden="true" />
          <span className="wordmark">GWART</span>
          <span className="vents" aria-hidden="true">
            <span className="vent" />
            <span className="vent" />
            <span className="vent" />
            <span className="vent" />
          </span>
        </header>

        <main className="stack">
          <section className="panel">
            <h1 className="hero">Coming Soon</h1>
            <hr className="rule" />
            <p>
              Gwart is a little thermal printer that sits on your counter and prints notes from
              your friends, on paper, in the middle of your kitchen, the moment they send them.
            </p>
            <p className="meta">
              A handful of prototypes are out with friends while we build the rest. This page is
              here so the people holding one can read how their data is handled.
            </p>
          </section>

          <nav aria-label="On this page">
            <ul className="contents">
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <Section id="privacy" label="Privacy">
            <p className="meta">Last updated {UPDATED}.</p>

            <h3 className="title">The short version</h3>
            <ul>
              <li>
                Everything you send, text and photos alike, is stored{' '}
                <strong>unencrypted</strong> on the server.
              </li>
              <li>
                We <strong>can</strong> technically read it, and don&rsquo;t, except when you ask us
                for help with a problem or the law requires it.
              </li>
              <li>
                It is <strong>not</strong> end-to-end encrypted. Don&rsquo;t use Gwart for
                anything you&rsquo;d mind being read off a server.
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

            <h3 className="title">What is collected</h3>
            <ul>
              <li>
                <strong>Your account:</strong> username, display name, an optional and unverified
                email address, and your password stored only as a hash.
              </li>
              <li>
                <strong>What you send and receive:</strong> the text of each fax as you composed
                it, photos you attach, page height, and status and timestamps.
              </li>
              <li>
                <strong>Your printer:</strong> its device identity, nickname, timezone, quiet
                hours, and when it was last seen online.
              </li>
              <li>
                <strong>Your phone:</strong> a push notification token, the platform, and a device
                name.
              </li>
              <li>
                <strong>Your settings:</strong> timezone, whether you&rsquo;re accepting faxes,
                your receiving limits, and notification preferences.
              </li>
              <li>
                <strong>Operational records:</strong> rate-limiting counters, and web server
                access logs that include IP addresses. Those roll over automatically, so they last
                days to weeks and are then gone.
              </li>
            </ul>

            <h3 className="title">What is not collected</h3>
            <p>Worth stating plainly, because most apps can&rsquo;t:</p>
            <ul>
              <li>
                <strong>No analytics, telemetry, or crash reporting.</strong> No Firebase, no
                Sentry, no advertising SDK. The app carries no such dependency.
              </li>
              <li>
                <strong>No location data.</strong> Timezone is a field you set; it isn&rsquo;t GPS.
              </li>
              <li>
                <strong>No contact list upload.</strong> You add friends by typing their username.
              </li>
              <li>
                <strong>No tracking across apps or websites.</strong> Nothing is sold or shared
                with advertisers or data brokers.
              </li>
              <li>
                <strong>Your wifi password never reaches the server.</strong> During setup your
                phone sends it to the printer directly over Bluetooth, and the printer keeps it in
                its own flash memory.
              </li>
            </ul>

            <h3 className="title">Not end-to-end encrypted</h3>
            <p>
              Content is encrypted in transit and at rest in storage. But the server has to decrypt
              and render every fax to turn it into printer instructions, so plaintext exists on the
              server, and anyone with administrative access to it could read your faxes.
            </p>
            <p>
              <strong>The promise:</strong> we don&rsquo;t read the content of your faxes, except
              when you&rsquo;ve asked for help with a specific problem, or where the law requires
              it. A small number of people have the access that would make it possible, and
              nothing in the system enforces the promise. It&rsquo;s a commitment, not a control.
            </p>

            <h3 className="title">How long things are kept</h3>
            <p>
              <strong>Until you ask for them to be deleted.</strong> There is no automatic expiry
              on message content, and we would rather say so than publish a time limit we
              don&rsquo;t enforce. Rendered print output is the exception: it is deleted
              automatically after a few days.
            </p>
            <p>
              The text you composed is kept deliberately rather than only the printed output, so
              that resending re-renders your fax properly instead of replaying stale instructions.
            </p>
            <p>
              One exception to &ldquo;until you ask&rdquo;: a fax that already reached its
              recipient is their record of it as well as yours, so deleting your account removes
              your name from it rather than removing it from their history.
            </p>

            <h3 className="title">Who else can see your data</h3>
            <p>
              <strong>Amazon Web Services</strong> hosts everything: the server, the
              database, the storage bucket, and the broker the printers connect to. They process
              it on our behalf rather than using it for their own purposes.
            </p>
            <p>
              <strong>Expo, Apple and Google</strong> handle push notifications. When a fax
              arrives, a notification goes out naming the sender and your printer, so those two
              names pass through their services. <strong>No message text and no images are ever
              included in a notification.</strong>
            </p>
            <p>
              Beyond that, nothing. No advertisers, no analytics vendors, no data sales.
            </p>

            <h3 className="title">The printer is a physical object</h3>
            <p>
              A fax is printed on paper, so anyone who walks past the printer can read it. Quiet
              hours delay printing; they don&rsquo;t hide anything. And a printer has one owner
              account. If a household shares a device, the account holder is the person
              whose account holds that record.
            </p>

            <h3 className="title">Your choices</h3>
            <ul>
              <li>Turn off &ldquo;accepting faxes&rdquo;, or refuse images from others.</li>
              <li>Set quiet hours, so faxes queue instead of printing.</li>
              <li>Cap faxes per hour and paper rows per day, overall and per friend.</li>
              <li>
                Remove a friend, which revokes consent in both directions immediately. Nobody is
                notified.
              </li>
              <li>Revoke a device&rsquo;s push notifications.</li>
            </ul>

            <h3 className="title">Security</h3>
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

            <h3 className="title">Children</h3>
            <p>
              You must be <strong>13 or older</strong> to have a Gwart account. Gwart isn&rsquo;t
              directed at children, and accounts for under-13s aren&rsquo;t permitted. If we learn
              of one, we will delete it and its content. If you&rsquo;re under 18, set the
              account up with a parent&rsquo;s or guardian&rsquo;s knowledge.
            </p>

            <h3 className="title">Where this is operated</h3>
            <p>
              Gwart is operated from the United States, and all data is stored on servers in the
              United States. The printers are given only to recipients in the US, and the service
              isn&rsquo;t offered to people elsewhere.
            </p>

            <h3 className="title">Changes</h3>
            <p>
              If this policy changes in a way that matters, recipients will be told directly.
              There are few enough users that an actual message is possible, and a silent edit
              wouldn&rsquo;t be honest.
            </p>
          </Section>

          <Section id="delete" label="Delete your account">
            <p>
              Email <Mail /> from any address and ask for your account to be deleted. Say which
              username it is. Requests are answered{' '}
              <strong>within 30 days</strong>, and in practice much sooner.
            </p>
            <p className="meta">
              The app doesn&rsquo;t have a delete button yet, so for now this is the way to do it.
              Deletion itself is automated, so a request is carried out in full rather than
              approximated by hand.
            </p>

            <hr className="rule" />

            <h3 className="title">What gets removed</h3>
            <p>
              The account itself, your settings, your contacts, every fax you received with its
              text and images, and any fax you sent that never actually reached anyone. It takes
              effect immediately and cannot be undone. There is no grace period and no way to
              restore a single account.
            </p>
            <p className="meta">
              One honest caveat: the database is backed up automatically, and those backups exist
              for a few days before they roll off. Your data is gone from the live service at
              once, and disappears from the backups shortly after.
            </p>

            <h3 className="title">Three things worth knowing first</h3>
            <ul>
              <li>
                <strong>Faxes you already sent stay with the people you sent them to.</strong>{' '}
                Deleting your account doesn&rsquo;t retract them, in the same way closing an email
                account doesn&rsquo;t unsend your email. What is removed is you: the fax stays in
                the recipient&rsquo;s history attributed to a deleted account rather than to your
                name. It also already printed on their paper, which was never ours to take back.
              </li>
              <li>
                <strong>A fax that never reached anyone is deleted.</strong> If it was still
                queued, or never made it to the printer, nobody has a record of it and it goes with
                the account.
              </li>
              <li>
                <strong>Your printer is not deleted, it is released.</strong> The hardware
                keeps working and can be set up again, by you or by whoever has it. Its nickname,
                timezone and quiet hours are cleared.
              </li>
            </ul>

            <h3 className="title">A copy of your data</h3>
            <p>
              The same address works for asking what is held about you. Email <Mail /> and
              you&rsquo;ll get everything stored under your account.
            </p>
          </Section>

          <Section id="contact" label="Contact">
            <p>
              Gwart is built by a small independent team. Responsibility for everything described
              on this page sits with <strong>Sebastian Finch</strong>, who you can reach at the
              address below.
            </p>
            <p>
              Privacy questions, requests for your data, and deletion requests all go to{' '}
              <Mail />.
            </p>
            <p className="meta">
              Gwart is still early: the hardware and the software are both prototypes, in the
              hands of a small number of friends. It isn&rsquo;t a certified consumer product, and
              it comes with no warranty.
            </p>
          </Section>
        </main>
      </div>

      <footer className="dock">
        <div className="dock-inner">
          <p className="meta" style={{ color: 'inherit' }}>
            Gwart &middot; a thermal fax machine for friends &middot; <Mail />
          </p>
        </div>
      </footer>
    </>
  );
}
