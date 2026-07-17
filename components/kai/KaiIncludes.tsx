'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import { SpotlightCard } from '@/components/ui/spotlight-card';

const ITEMS = [
  'Instant response to every new enquiry, in seconds, at any hour',
  'Qualification and booking built into the first conversation',
  'Intent reading across every state: ready, price-worried, timing-worried, ghosted, dormant',
  'A different, personal response path for each state, in your voice',
  'Day-one revival of your dormant pipeline, then a fresh scan every week',
  'A recall calendar: every customer brought back when their next visit or service is due',
  'Hot-lead alerts to your phone in real time',
  'Automatic opt-out handling and permanent suppression',
  'A live pipeline ledger you can open any day',
  'A monthly one-page revenue report: recovered, booked, and saved',
  'A monthly review where we tune the system on what the data shows',
];

export default function KaiIncludes() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="swirl" colorFront="#2E74AC" opacity={0.24} speed={0.22} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>Everything Kai includes</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: 'clamp(48px, 7vh, 64px)' }}>
            The full funnel, running for you.
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {ITEMS.map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
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
