'use client';

import Reveal from './Reveal';

export default function Philosophy() {
  return (
    <section style={{
      padding: 'clamp(140px, 22vh, 240px) var(--rail-pad)',
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'left',
    }}>
      <Reveal>
        <p className="eyebrow" style={{ marginBottom: '40px' }}>
          ρέω &nbsp;·&nbsp; To flow
        </p>
      </Reveal>

      <Reveal delay={150}>
        <h2 style={{
          fontSize: 'clamp(32px, 4.6vw, 64px)',
          lineHeight: 1.18,
          letterSpacing: '-0.018em',
          color: 'var(--fg)',
          fontWeight: 400,
          maxWidth: '26ch',
        }}>
          <span style={{ color: 'var(--fg-mute)' }}>Process before tools.</span> Reliability over novelty.
          <span style={{ color: 'var(--fg-mute)' }}> Clarity over complexity.</span> Outcomes over outputs.
        </h2>
      </Reveal>

      <Reveal delay={400}>
        <p style={{
          marginTop: '64px',
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(16px, 1.4vw, 19px)',
          lineHeight: 1.75,
          color: 'var(--fg-mute)',
          fontWeight: 300,
          maxWidth: '60ch',
        }}>
          Every Rheo system is built once and meant to run for years. n8n for orchestration, Claude for the agent brain, WhatsApp for the channel your customers already use. Hosted on Indian servers. Owned by you on day one.
        </p>
      </Reveal>
    </section>
  );
}
