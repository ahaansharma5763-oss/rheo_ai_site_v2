'use client';

import Reveal from './Reveal';

const STATS = [
  { value: '200+',  label: 'Live bookings processed' },
  { value: '<60s',  label: 'Average lead response' },
  { value: '14',    label: 'Productised systems' },
  { value: '100%',  label: 'Indian data residency' },
];

export default function Metrics() {
  return (
    <section style={{
      padding: '72px var(--rail-pad)',
      borderTop: '1px solid rgba(46,107,142,0.12)',
      borderBottom: '1px solid rgba(46,107,142,0.12)',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '40px',
        alignItems: 'center',
      }}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
              <span className="gold-text" style={{
                fontFamily: 'var(--mono)',
                fontSize: 'clamp(28px, 3.4vw, 42px)',
                letterSpacing: '-0.02em',
                fontWeight: 500,
                marginBottom: '12px',
                lineHeight: 1,
              }}>
                {s.value}
              </span>
              <span style={{
                fontFamily: 'var(--sans)',
                fontSize: '10.5px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--muted-cream)',
                fontWeight: 500,
              }}>
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{
        gridColumn: '1 / -1',
        marginTop: '8px',
        paddingTop: '32px',
        borderTop: '1px solid rgba(46,107,142,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '13px',
          color: 'var(--fg-mute)',
          fontWeight: 300,
          letterSpacing: '0.04em',
        }}>
          Not sure where your business stands operationally?
        </p>
        <a
          href="https://audit.rheoai.co.in"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '11px',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            textDecoration: 'none',
            fontWeight: 600,
            border: '1px solid rgba(196,162,90,0.35)',
            padding: '10px 20px',
            transition: 'border-color 0.3s ease, background 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--gold)';
            e.currentTarget.style.background = 'rgba(196,162,90,0.07)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(196,162,90,0.35)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Take the free audit →
        </a>
      </div>
    </section>
  );
}
