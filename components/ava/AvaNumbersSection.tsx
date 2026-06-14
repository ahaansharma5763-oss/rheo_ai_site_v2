'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

interface Stat { number: string; label: string; }

const STATS: Stat[] = [
  { number: '< 2s',   label: 'Average response time' },
  { number: '24/7',   label: 'Operational uptime' },
  { number: '0',      label: 'Manual follow-ups required' },
  { number: '₹38K+',  label: 'Avg. revenue recovered / month' },
  { number: '94%',    label: 'Reduction in missed bookings' },
  { number: '3×',     label: 'Marketing reach via WhatsApp' },
  { number: '18 hrs', label: 'Staff time saved per week' },
  { number: '15 min', label: 'Inquiry to confirmed booking' },
  { number: '100%',   label: 'Custom-built. Never templated.' },
];

export default function AvaNumbersSection() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden' }}>
      <WaveField variant="corner-right" shape="wave" colorFront="#4599B5" opacity={0.3} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: 'var(--gold-end)' }}>
            By the numbers
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(34px, 5vw, 56px)',
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            margin: '0 0 clamp(48px, 7vh, 72px)',
            lineHeight: 1.1,
            fontWeight: 600,
          }}>
            Ava delivers<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(46,107,142,0.18)',
          border: '1px solid rgba(46,107,142,0.18)',
        }}
        className="ava-stats-grid">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={(i % 3) * 80}>
              <div style={{ background: 'rgba(11,23,41,0.55)', textAlign: 'center', padding: 'clamp(32px, 4vw, 48px) 20px', height: '100%' }}>
                <p className="gold-text" style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(40px, 4.4vw, 60px)', lineHeight: 1, letterSpacing: '-0.02em', margin: 0, fontWeight: 500 }}>
                  {stat.number}
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted-cream)', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '16px', marginBottom: 0, lineHeight: 1.5 }}>
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--fg-dim)', letterSpacing: '0.04em', marginTop: '20px', textAlign: 'center', opacity: 0.55 }}>
          Benchmarks across active deployments. Individual results vary by business type and volume.
        </p>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .ava-stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 460px) {
          .ava-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
