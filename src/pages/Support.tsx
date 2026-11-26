/**
 * Where the app's "Help & support" row lands.
 *
 * It exists because the app links to it: `SUPPORT_URL` in gwart-mobile's
 * `src/links.ts`. App Store guideline 1.2 wants published contact information
 * reachable from inside an app carrying user content, and a mailto buried in
 * a settings screen is thin cover for that - this is the page a reviewer, or
 * anyone locked out of their account, can actually read.
 *
 * Mostly the handful of things that go wrong with a printer on house wifi,
 * answered here so they do not have to be answered one email at a time. The
 * email address is the point of the page all the same, and appears near the
 * top rather than at the bottom.
 */

import { Layout, Mail, Section } from '../Layout';

export function Support() {
  return (
    <Layout current="/support">
      <section className="panel">
        <h1 className="hero">Support</h1>
        <hr className="rule" />
        <p>
          Email <Mail /> and a person will read it. We usually answer within a few hours, and
          always within a couple of days.
        </p>
        <p className="meta">
          Tell us your username and, if it is about a printer, its nickname. The app shows the
          version it is running at the bottom of Account, which is worth including too.
        </p>
      </section>

      <Section id="printer" label="Nothing is printing">
        <p>Four things, in the order worth trying:</p>
        <ul>
          <li>
            <b>Check the paper.</b> A roll in back to front prints nothing at all - thermal paper
            only takes ink on one side. Pull a little out and scratch it with a fingernail; the
            side that marks is the side that faces the head.
          </li>
          <li>
            <b>Check quiet hours.</b> Notes that arrive inside a printer&rsquo;s quiet window wait
            instead of printing, and nothing is lost: they come out when it ends. Each printer has
            its own window, on its own screen in the app.
          </li>
          <li>
            <b>Check the inbox switch.</b> Account &rsaquo; Receiving has a setting for whether
            friends&rsquo; notes print as they arrive, wait, or are turned away.
          </li>
          <li>
            <b>Check wifi.</b> The app shows a printer as asleep when it has not heard from it
            recently. A thermal printer on house wifi drops off and comes back by itself, so a few
            minutes of asleep is normal; a day of it usually means the printer moved out of range,
            or the wifi password changed.
          </li>
        </ul>
      </Section>

      <Section id="setup" label="Setting a printer up">
        <p>
          Setup hands the printer your wifi name and password over Bluetooth, once. The phone has
          to be near the printer and the printer has to be plugged in and showing its pairing
          code.
        </p>
        <p>
          If the app scans and finds nothing: check the printer is powered, and that the phone is
          allowed to use Bluetooth. Gwart uses Bluetooth for setup only, and never to work out
          where you are.
        </p>
        <p className="meta">
          A 2.4 GHz network is what the printer can join. Many routers publish 2.4 and 5 GHz under
          the same name, which is fine; a 5 GHz-only network is not.
        </p>
      </Section>

      <Section id="reporting" label="Someone is sending you things you don't want">
        <p>
          Nobody can send you anything until you have accepted them as a friend, and you can
          change your mind at any time. Open the person from your friends list and{' '}
          <b>Remove friend</b>: it stops notes in both directions straight away, and they are not
          told.
        </p>
        <p>
          If what they sent was worse than unwanted, <b>Report</b> on the same screen tells us
          about it. Pick a reason, add anything you want us to know, and it reaches a person who
          can act on it. Reporting removes them as a friend at the same time unless you say
          otherwise.
        </p>
        <p>
          We read every report. What we do about one depends on what it is, and ranges from a word
          with the sender to deleting their account. We will not tell them who reported them.
        </p>
        <p className="meta">
          If somebody is in danger, contact your local emergency services first. We are a small
          team and cannot act as quickly as they can.
        </p>
      </Section>

      <Section id="account" label="Your account">
        <ul>
          <li>
            <b>Locked out.</b> There is no self-service password reset yet. Email <Mail /> from
            any address and we will send you a single-use link to set a new password. You choose
            it; we never see it.
          </li>
          <li>
            <b>Deleting it.</b> In the app, Account &rsaquo; Delete account. It takes your
            friends, your unprinted notes and the notes sent to you, and releases your printers.{' '}
            <a href="/privacy#delete">Privacy</a> says exactly what goes and what stays.
          </li>
        </ul>
      </Section>

      <Section label="Everything else">
        <p>
          <a href="/privacy">Privacy</a> covers what Gwart stores, who can see it and how long it
          is kept. <a href="/terms">Terms</a> covers what you agree to by using it.
        </p>
        <p>
          Anything neither answers, ask: <Mail />.
        </p>
      </Section>
    </Layout>
  );
}
