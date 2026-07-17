'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Step { num: string; icon: IconName; title: string; sub: string; }

const STEPS: Step[] = [
  { num: '01', icon: 'grid',        title: 'We map your pipeline',        sub: 'Every lead and customer you have — in WhatsApp, your CRM, your notes. Most owners are shocked at how much is sitting there.' },
  { num: '02', icon: 'brain',       title: 'We build your intelligence',  sub: 'Okeanos is configured around your business, offers, and voice, and the exact way your customers move from interested to sold. Done for you.' },
  { num: '03', icon: 'bolt',        title: 'Okeanos goes to work',          sub: 'On day one it starts reviving your dormant pipeline. From then on, every new lead is read, understood, and nurtured at the perfect moment.' },
  { num: '04', icon: 'trending-up', title: 'You watch the pipeline move', sub: 'Booked calls. Recovered customers. Returning clients. You see exactly what Okeanos is doing and exactly what it is bringing back.' },
];

export default function PulseHowItWorks() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="ripple" colorFront="#3FAEDE" opacity={0.32} speed={0.26} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            How it works
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.2vw, 50px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: 'clamp(56px, 8vh, 88px)' }}>
            Four steps. Zero effort from you<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div className="pulse-flow" style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="pulse-flow-item" style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{ flex: 1, background: 'rgba(11,23,41,0.6)', border: '1px solid rgba(46,116,172,0.28)', borderTop: '2px solid var(--gold)', padding: 'clamp(22px, 2.4vw, 30px) clamp(18px, 1.8vw, 22px)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
                      <Icon name={s.icon} size={22} color="var(--gold)" />
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.3em', color: 'var(--ocean)' }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '12.5px', lineHeight: 1.55, color: 'var(--muted-cream)', fontWeight: 300 }}>{s.sub}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="pulse-flow-arrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', flexShrink: 0, opacity: 0.7 }}>
                    <Icon name="arrow-right" size={20} color="var(--gold)" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .pulse-flow { flex-wrap: nowrap; }
        .pulse-flow > div { flex: 1; }
        .pulse-flow-item { width: 100%; }
        @media (max-width: 900px) {
          .pulse-flow { flex-direction: column; gap: 14px; }
          .pulse-flow-item { flex-direction: column !important; }
          .pulse-flow-arrow { width: 100% !important; height: 28px; transform: rotate(90deg); }
        }
      `}</style>
    </section>
  );
}
