/**
 * Account deletion, on its own page and its own URL.
 *
 * Deliberately not a section inside Privacy. Someone who wants their account
 * gone should not have to read a privacy policy to find out how, and both app
 * stores ask for a deletion URL that works without the app. /delete is short
 * enough to say out loud and stable enough to put in a store listing.
 *
 * This is the only copy of these words. Privacy links here rather than
 * repeating them, so there is one place to change when the flow changes.
 */

import { Layout, Mail, Section, UPDATED } from '../Layout';

export function Delete() {
  return (
    <Layout current="/delete">
      <section className="panel">
        <h1 className="hero">Delete your account</h1>
        <hr className="rule" />
        <p>
          Email <Mail /> from any address and ask for your account to be deleted. Say which
          username it is. Requests are answered <strong>within 30 days</strong>, and in practice
          much sooner.
        </p>
        <p className="meta">
          The app doesn&rsquo;t have a delete button yet, so for now this is the way to do it.
          Deletion itself is automated, so a request is carried out in full rather than
          approximated by hand.
        </p>
      </section>

      <Section id="removed" label="What gets removed">
        <p>
          The account itself, your settings, your contacts, every fax you received with its text
          and images, and any fax you sent that never actually reached anyone. It takes effect
          immediately and cannot be undone. There is no grace period and no way to restore a
          single account.
        </p>
        <p className="meta">
          One honest caveat: the database is backed up automatically, and those backups exist for
          a few days before they roll off. Your data is gone from the live service at once, and
          disappears from the backups shortly after.
        </p>
      </Section>

      <Section id="before" label="Three things worth knowing first">
        <ul>
          <li>
            <strong>Faxes you already sent stay with the people you sent them to.</strong> Deleting
            your account doesn&rsquo;t retract them, in the same way closing an email account
            doesn&rsquo;t unsend your email. What is removed is you: the fax stays in the
            recipient&rsquo;s history attributed to a deleted account rather than to your name. It
            also already printed on their paper, which was never ours to take back.
          </li>
          <li>
            <strong>A fax that never reached anyone is deleted.</strong> If it was still queued, or
            never made it to the printer, nobody has a record of it and it goes with the account.
          </li>
          <li>
            <strong>Your printer is not deleted, it is released.</strong> The hardware keeps
            working and can be set up again, by you or by whoever has it. Its nickname, timezone
            and quiet hours are cleared.
          </li>
        </ul>
      </Section>

      <Section id="copy" label="Just want a copy of your data?">
        <p>
          The same address works for that, and for correcting anything that&rsquo;s wrong. Email{' '}
          <Mail /> and say what you&rsquo;re after. You don&rsquo;t have to delete anything to ask.
        </p>
        <p className="meta">
          What&rsquo;s held about you in the first place is listed in{' '}
          <a href="/privacy#collect">Privacy</a>. Last updated {UPDATED}.
        </p>
      </Section>
    </Layout>
  );
}
