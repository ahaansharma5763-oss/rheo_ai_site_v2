'use client';

import Link from 'next/link';

const LINKS = [
  { label: 'Work',    href: '/#work' },
  { label: 'About',   href: '/about' },
  { label: 'Athena', href: '/sales-engineer' },
  { label: 'Contact', href: 'mailto:ahaan@rheoai.co.in' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-low)',
      borderTop: '1px solid rgba(46,107,142,0.12)',
      padding: '80px var(--rail-pad)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '48px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            fontFamily: 'var(--mono)',
            color: 'var(--crest)',
            letterSpacing: '0.4em',
            fontSize: '18px',
            fontWeight: 500,
          }}>
            RHEO AI
          </span>
        </div>

        <nav style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(20px, 4vw, 56px)',
        }}>
          {LINKS.map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--muted-cream)',
                fontWeight: 500,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold-end)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted-cream)'}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div style={{ width: '96px', height: '1px', background: 'rgba(46,107,142,0.25)' }} />

        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '10px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          color: 'rgba(189,181,165,0.5)',
          fontWeight: 500,
        }}>
          © 2026 Rheo AI &nbsp;·&nbsp; ρέω &nbsp;·&nbsp; 流れ
        </div>
      </div>
    </footer>
  );
}
