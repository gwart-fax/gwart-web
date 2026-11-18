/**
 * The published terms of service.
 *
 * Canonical copy: `legal/terms-of-service.md` in the main gwartfax project.
 * **Change both together.**
 *
 * Deliberately short. The clauses that look like boilerplate are not padding:
 * the licence in "What you send", the transfer clause, and the IP clause are
 * the three that are cheap to write now and awkward to retrofit if the team
 * ever incorporates or sells. See `legal/README.md`.
 */

import { Layout, Mail, Section, UPDATED } from '../Layout';

export function Terms() {
  return (
    <Layout current="/terms">
      <section className="panel">
        <h1 className="hero">Terms</h1>
        <hr className="rule" />
        <p className="meta">Effective {UPDATED}.</p>
        <p>
          These are the terms you agree to by using Gwart. They&rsquo;re written to be read, not to
          be impressive. &ldquo;We&rdquo; and &ldquo;us&rdquo; mean the team that operates Gwart,
          and whoever operates it after us.
        </p>
        <p className="meta">
          If you don&rsquo;t agree with them, don&rsquo;t use Gwart, and email <Mail /> and
          we&rsquo;ll delete your account.
        </p>
      </section>

      <Section id="what" label="What Gwart is">
        <p>
          Gwart is a thermal printer and an app that sends messages to it. Right now both are
          prototypes in the hands of a small number of people, and it should be treated as such:
          things will break, change, and occasionally print sideways.
        </p>
        <p>
          How we handle your data is covered separately, in <a href="/privacy">Privacy</a>.
        </p>
      </Section>

      <Section id="account" label="Your account">
        <ul>
          <li>You must be 13 or older. If you&rsquo;re under 18, ask a parent or guardian first.</li>
          <li>
            Keep your password to yourself. You&rsquo;re responsible for what happens under your
            account, so tell us at <Mail /> if you think someone else is using it.
          </li>
          <li>One person per account. Don&rsquo;t share one, and don&rsquo;t impersonate anyone.</li>
        </ul>
      </Section>

      <Section id="use" label="How you may use it">
        <p>Use Gwart to send things to people who want to hear from you. Don&rsquo;t use it to:</p>
        <ul>
          <li>harass, threaten, or frighten anyone, or keep printing at someone who wants you to stop</li>
          <li>send anything unlawful, or any sexual content involving minors</li>
          <li>send anything you don&rsquo;t have the right to send</li>
          <li>
            waste someone else&rsquo;s paper on purpose, or work around the limits and quiet hours
            they set
          </li>
          <li>break into, overload, or probe the service, or anyone&rsquo;s printer but your own</li>
        </ul>
        <p className="meta">
          A printer is in somebody&rsquo;s home, and paper costs them money. Most of the rules here
          are that one fact repeated.
        </p>
      </Section>

      <Section id="content" label="What you send">
        <p>
          <strong>What you write and photograph stays yours.</strong> We don&rsquo;t claim
          ownership of any of it.
        </p>
        <p>
          To actually deliver a fax we need your permission to handle it, so by sending one you
          give us a licence to store, format, render and transmit it, and to print it on the
          recipient&rsquo;s printer. That licence is worldwide and royalty-free, it lasts as long
          as we hold the content, and it can be passed on to anyone who operates Gwart after us. It
          exists only so that Gwart can work. We don&rsquo;t use your content for anything else.
        </p>
        <p>
          You&rsquo;re responsible for what you send, including having the right to send it.
        </p>
      </Section>

      <Section id="printer" label="The printer itself">
        <p>
          The hardware is an early prototype. It is not a certified consumer product, it is not
          sold to you, and it comes with no warranty of any kind.
        </p>
        <ul>
          <li>Use it with the power supply it came with, and don&rsquo;t modify the wiring.</li>
          <li>Unplug it if you&rsquo;re away for a long stretch, and don&rsquo;t leave it running unattended with the paper path blocked.</li>
          <li>Tell us at <Mail /> if it ever smells hot, discolours, or behaves oddly, and stop using it until we&rsquo;ve talked.</li>
          <li>
            Whoever owns the account that claimed a printer is responsible for it, including what
            other people in the household do with it.
          </li>
        </ul>
      </Section>

      <Section id="no-promises" label="What we don't promise">
        <p>
          Gwart is provided as is. We don&rsquo;t promise it will be available, that faxes will
          arrive, that they&rsquo;ll arrive intact or on time, or that anything you send will be
          kept safely enough for anything that matters.
        </p>
        <p>
          <strong>Don&rsquo;t rely on Gwart for anything important or urgent.</strong> It is not a
          medical device, a security system, or a way to reach someone in an emergency.
        </p>
      </Section>

      <Section id="liability" label="Limits on what we owe you">
        <p>
          To the fullest extent the law allows, we aren&rsquo;t liable for indirect or
          consequential losses, for lost messages or data, or for anything that follows from Gwart
          not working.
        </p>
        <p>
          Some places don&rsquo;t allow those limits, and where that&rsquo;s true, they
          don&rsquo;t apply to you. Nothing here limits liability for death or personal injury
          caused by our negligence, or for fraud.
        </p>
      </Section>

      <Section id="termination" label="Suspension and ending things">
        <p>
          You can stop at any time. Email <Mail /> and we&rsquo;ll delete your account, as
          described in <a href="/privacy#delete">Privacy</a>.
        </p>
        <p>
          We can suspend or close an account that breaks these terms, or that is being used to hurt
          someone. We&rsquo;ll tell you why unless telling you would make things worse for the
          person being hurt. Where it&rsquo;s a misunderstanding, email <Mail /> and we&rsquo;ll
          sort it out.
        </p>
      </Section>

      <Section id="changes" label="Changes">
        <p>
          Gwart is early, so it will change, and we may add, alter or stop features. We may also
          introduce paid features or charges later, in which case we&rsquo;ll say so clearly before
          anything costs you money, and you&rsquo;ll never be charged for something you
          haven&rsquo;t agreed to.
        </p>
        <p>
          If these terms change in a way that matters, we&rsquo;ll tell you directly rather than
          editing the page quietly.
        </p>
      </Section>

      <Section id="ours" label="Our side of it">
        <p>
          The Gwart software, firmware, hardware designs, name and look belong to us. Using Gwart
          doesn&rsquo;t give you rights to any of it beyond using the service as intended.
        </p>
        <p>
          We may transfer these terms, and the accounts and data they cover, to a company we form
          or to anyone who takes over running Gwart. Your rights under these terms stay the same
          when that happens, and <a href="/privacy#sharing">Privacy</a> says what it would mean for
          your data.
        </p>
      </Section>

      <Section id="law" label="Which law applies">
        <p>
          These terms are governed by the laws of the State of California, and any dispute belongs
          in the state or federal courts there.
        </p>
        <p className="meta">
          There is no arbitration clause and no class action waiver. If something goes wrong,
          we&rsquo;d rather you emailed us.
        </p>
      </Section>

      <Section id="odds" label="Odds and ends">
        <p>
          If part of these terms turns out to be unenforceable, the rest still stands. If we
          don&rsquo;t enforce something straight away, we haven&rsquo;t given up the right to.
          Together with <a href="/privacy">Privacy</a>, this is the whole agreement between us
          about Gwart.
        </p>
        <p>
          Questions about any of it: <Mail />.
        </p>
      </Section>
    </Layout>
  );
}
