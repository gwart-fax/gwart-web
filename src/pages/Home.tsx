import { Layout, Mail } from '../Layout';

export function Home() {
  return (
    <Layout current="/">
      <section className="panel">
        <h1 className="hero">Coming Soon</h1>
        <hr className="rule" />
        <p>
          Gwart is a little thermal printer that sits on your counter and prints notes from your
          friends, on paper, in the middle of your kitchen, the moment they send them.
        </p>
      </section>

      <section className="panel">
        <h2 className="tape">The paperwork</h2>
        <hr className="rule" />
        <p>
          <a href="/privacy">Privacy</a> covers what Gwart stores, who can see it, how long it is
          kept, and how to delete your account.
        </p>
        <p>
          <a href="/terms">Terms</a> covers what you agree to by using it, and what we do and
          don&rsquo;t promise in return.
        </p>
        <p>
          <a href="/support">Support</a> covers the things that go wrong with a printer, and how
          to reach us.
        </p>
        <p className="meta">
          Anything none of them answers, ask: <Mail />.
        </p>
      </section>
    </Layout>
  );
}
