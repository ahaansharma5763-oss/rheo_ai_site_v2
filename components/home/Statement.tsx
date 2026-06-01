'use client';

import Reveal from './Reveal';

export default function Statement() {
  return (
    <section style={{
      padding: 'clamp(140px, 22vh, 240px) var(--rail-pad)',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      <Reveal>
        <h2 style={{
          fontSize: 'clamp(34px, 5.2vw, 76px)',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          color: 'var(--fg)',
          fontWeight: 400,
          maxWidth: '22ch',
        }}>
          We are not an agency. Not a SaaS subscription.
          <span style={{ color: 'var(--fg-dim)' }}> We are the team that looks at how your business actually operates, finds the broken parts, and rebuilds them.</span>
        </h2>
      </Reveal>
      <Reveal delay={200}>
        <a
          href="https://audit.rheoai.co.in"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '48px',
            fontFamily: 'var(--sans)',
            fontSize: '13px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            textDecoration: 'none',
            fontWeight: 600,
            borderBottom: '1px solid rgba(196,162,90,0.3)',
            paddingBottom: '4px',
            transition: 'border-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.color = 'var(--gold-end)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(196,162,90,0.3)';
            e.currentTarget.style.color = 'var(--gold)';
          }}
        >
          Find out where your business is leaking — free 3-min audit →
        </a>
      </Reveal>
    </section>
  );
}
