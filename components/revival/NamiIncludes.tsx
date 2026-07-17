'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const ITEMS = [
  'List cleaning, de-duplication, and segmentation by recency, service, and spend',
  'Three campaign waves written in your voice and approved by you before anything sends',
  'Every reply answered in seconds, at any hour, for all 21 days',
  'Booking capture wired to your calendar or front desk',
  'Hot-lead alerts to your phone the moment someone turns warm',
  'Automatic opt-out handling and a permanent suppression list',
  'A live bookings ledger you can watch throughout',
  'The day-21 report with the recovered revenue figure',
];

export default function NamiIncludes() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="swirl" colorFront="#2E74AC" opacity={0.24} speed={0.22} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>Everything Nami includes</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: 'clamp(48px, 7vh, 64px)' }}>
            The full campaign, done for you.
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {ITEMS.map((t, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
              <SpotlightCard>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--crest)', paddingTop: '3px', flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>{t}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
