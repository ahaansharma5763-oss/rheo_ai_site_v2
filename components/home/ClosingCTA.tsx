'use client';

import Reveal from './Reveal';
import WaveField from '@/components/ui/wave-field';

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
      {/* Wave motif — the single gold-tinted wave on the page (gold appears once) */}
      <WaveField variant="full" shape="swirl" colorBack="#07101E" colorFront="#C4A25A" opacity={0.42} speed={0.26} />
      {/* Soft vignette so the centered headline holds against the wave */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(7,16,30,0.55) 0%, transparent 75%)',
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
            textShadow: '0 0 90px rgba(196,162,90,0.18)',
          }}>
            Every engagement begins the same way<span style={{ color: 'var(--gold)' }}>.</span>
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
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
              <a
                href="https://calendly.com/ahaan-rheoai-xnxc/30min"
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
                Book a Call
              </a>
              <a
                href="https://audit.rheoai.co.in"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--warm-foam)',
                  padding: '20px 48px',
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'inline-block',
                  border: '1px solid rgba(46,107,142,0.6)',
                  transition: 'border-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold-end)';
                  e.currentTarget.style.color = 'var(--gold-end)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(46,107,142,0.6)';
                  e.currentTarget.style.color = 'var(--warm-foam)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Free Ops Audit →
              </a>
            </div>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted-cream)',
              opacity: 0.6,
            }}>
              3-minute diagnostic · instant results
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
