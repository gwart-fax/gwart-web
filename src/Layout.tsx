/**
 * The shell every page sits in, and the handful of pieces they share.
 *
 * There is no router. Each page is a real HTML file built by Vite and served
 * from its own key in the bucket, so a link is a navigation and a legal
 * document has a URL that will not move when the marketing copy changes.
 */

import type { ReactNode } from 'react';

export const CONTACT = 'info@gossfinch.com';

/** Bumped by hand when either document changes in a way that matters. */
export const UPDATED = '18 November 2026';

export function Mail() {
  return <a href={`mailto:${CONTACT}`}>{CONTACT}</a>;
}

/** A heading on label-maker tape, with a dashed rule under it. */
export function Section({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="panel">
      <h2 className="tape">{label}</h2>
      <hr className="rule" />
      {children}
    </section>
  );
}

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/privacy#delete', label: 'Delete your account' },
];

export function Layout({ current, children }: { current: string; children: ReactNode }) {
  return (
    <>
      <div className="page">
        <header className="head">
          <span className="led" aria-hidden="true" />
          <a className="wordmark" href="/">
            GWART
          </a>
          <span className="vents" aria-hidden="true">
            <span className="vent" />
            <span className="vent" />
            <span className="vent" />
            <span className="vent" />
          </span>
        </header>

        <nav aria-label="Pages">
          <ul className="contents">
            {LINKS.filter((link) => link.href !== current).map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <main className="stack">{children}</main>
      </div>

      <footer className="dock">
        <div className="dock-inner">
          <p className="meta" style={{ color: 'inherit' }}>
            Gwart &middot; a thermal fax machine for friends &middot; <Mail />
          </p>
          <p className="meta" style={{ color: 'inherit' }}>
            <a href="/privacy">Privacy</a> &middot; <a href="/terms">Terms</a> &middot;{' '}
            <a href="/privacy#delete">Delete your account</a>
          </p>
        </div>
      </footer>
    </>
  );
}
