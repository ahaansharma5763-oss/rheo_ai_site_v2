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
    </section>
  );
}
