'use client';

import Link from 'next/link';

const LINKS = [
  { label: 'What we build', href: '/what-we-build' },
  { label: 'Results', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Get your leak number', href: 'https://audit.rheoai.co.in' },
  { label: 'Book a call', href: 'https://calendly.com/ahaan-rheoai-xnxc/30min' },
  { label: 'Contact', href: 'mailto:ahaan@rheoai.co.in' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-low)',
        /* The footer's one gold: a single hairline rule at the top */
        borderTop: '1px solid rgba(196,162,90,0.35)',
        padding: '80px var(--rail-pad)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <span
            style={{
              fontFamily: 'var(--serif)',
              color: 'var(--fg)',
              letterSpacing: '0.3em',
              fontSize: '17px',
              fontWeight: 400,
            }}
          >
            RHEO AI
          </span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '13px', letterSpacing: '0.04em', color: 'var(--text-2)' }}>
            Answers in seconds. Forgets nothing.
          </span>
        </div>

        <nav style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(18px, 3.5vw, 48px)' }}>
          {LINKS.map(l =>
            l.href.startsWith('/') ? (
              <Link
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--text-2)',
                  fontWeight: 500,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--fg)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-2)')}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '11px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--text-2)',
                  fontWeight: 500,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--fg)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-2)')}
              >
                {l.label}
              </a>
            )
          )}
        </nav>

        <div style={{ width: '96px', height: '1px', background: 'var(--line-soft)' }} />

        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '10px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--text-3)',
            fontWeight: 500,
          }}
        >
          © 2026 Rheo AI &nbsp;·&nbsp; ρέω &nbsp;·&nbsp; 流れ
        </div>
      </div>
    </footer>
  );
}
