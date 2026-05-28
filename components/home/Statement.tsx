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
    </section>
  );
}
