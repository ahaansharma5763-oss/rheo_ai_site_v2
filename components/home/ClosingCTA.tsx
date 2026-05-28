'use client';

import Reveal from './Reveal';

export default function ClosingCTA() {
  return (
    <section
      id="begin"
      style={{
        padding: 'clamp(120px, 24vh, 240px) var(--rail-pad)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating blur orbs for depth */}
      <div aria-hidden style={{
        position: 'absolute',
        top: '50%', left: 0,
        width: '320px', height: '320px',
        transform: 'translate(-30%, -50%)',
        background: 'rgba(46,107,142,0.18)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div aria-hidden style={{
        position: 'absolute',
        bottom: 0, right: 0,
        width: '480px', height: '480px',
        transform: 'translate(25%, 25%)',
        background: 'rgba(240,208,128,0.08)',
        filter: 'blur(150px)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            fontWeight: 600,
            marginBottom: '40px',
          }}>
            Ready to flow<span style={{ color: 'var(--gold)' }}>?</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'var(--muted-cream)',
            fontWeight: 300,
            maxWidth: '52ch',
            margin: '0 auto 56px',
          }}>
            Every Rheo engagement begins with an Ops Audit. Forty-five minutes on a call, a written
            scorecard in five business days, a clear list of what to fix first.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <a
            href="https://calendly.com/ahaan-rheoai/30min"
            target="_blank"
            rel="noreferrer"
            className="gold-bg"
            style={{
              color: 'var(--bg)',
              padding: '20px 48px',
              fontFamily: 'var(--sans)',
              fontSize: '14px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 700,
              display: 'inline-block',
              transition: 'box-shadow 0.5s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 80px rgba(240,208,128,0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Request Advisory
          </a>
        </Reveal>
      </div>
    </section>
  );
}
