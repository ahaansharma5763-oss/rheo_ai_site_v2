'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon from '@/components/ui/icon';

const POINTS: string[] = [
  'You manufacture or distribute technical products. Pumps, compressors, machine tools, packaging lines, electrical equipment, hydraulics, components.',
  'Your catalogue runs into hundreds of SKUs, variants, and spec sheets, and only two or three people in the company truly know all of it.',
  'Every sale needs qualification before it needs a price. Duty cycle, capacity, voltage, material, application. A wrong answer costs the deal.',
  'Quotes take days because they wait on your best engineers, and your best engineers are always in the field or in a meeting.',
  'You sell through dealers and distributors who call your team with the same technical questions every single day.',
];

export default function SEWhoFor() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="simplex" colorFront="#2E74AC" opacity={0.3} speed={0.24} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            Who this is for
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: 'clamp(40px, 6vh, 60px)' }}>
            Built for companies that sell machines, not merchandise<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {POINTS.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '18px 0', borderBottom: '1px solid rgba(46,116,172,0.16)' }}>
                <span style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
                  <Icon name="check" size={16} color="var(--gold)" />
                </span>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.6, color: 'var(--muted-cream)', fontWeight: 300 }}>{p}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.5, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', marginTop: 'clamp(40px, 6vh, 56px)', maxWidth: '60ch' }}>
            If your buyers ask &quot;will this work for my application&quot; before they ask the price, this was built for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
