'use client';

import Reveal from '@/components/home/Reveal';

export default function AboutCTA() {
  return (
    <section style={{
      padding: 'clamp(160px, 24vh, 260px) var(--rail-pad)',
      borderTop: '1px solid rgba(242,240,236,0.06)',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(56px, 11vw, 168px)',
            lineHeight: 0.94,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            fontWeight: 400,
            maxWidth: '14ch',
          }}>
            Talk to us<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            marginTop: '40px',
            fontSize: 'clamp(17px, 1.5vw, 21px)',
            lineHeight: 1.55,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '50ch',
          }}>
            Every Rheo engagement begins with an Ops Audit. A forty-five minute call, a written scorecard
            in five business days, and a clear list of what to fix first. No commitment beyond that.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div style={{ marginTop: '56px', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="https://calendly.com/ahaan-rheoai-xnxc/30min"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--bg)',
                background: 'var(--fg)',
                padding: '16px 32px',
                borderRadius: '999px',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--fg)'}
            >
              Book the audit
            </a>
            <a
              href="https://audit.rheoai.co.in"
              target="_blank"
              rel="noreferrer"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                color: 'var(--gold)',
                padding: '16px 0',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-end)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--gold)'}
            >
              Take the self-serve audit →
            </a>
            <a
              href="mailto:ahaan@rheoai.co.in"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                color: 'var(--fg-mute)',
                padding: '16px 0',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-mute)'}
            >
              ahaan@rheoai.co.in →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
