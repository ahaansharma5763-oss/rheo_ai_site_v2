'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Step { num: string; icon: IconName; title: string; sub: string; }

const STEPS: Step[] = [
  { num: '01', icon: 'chat',  title: 'WhatsApp Cloud API', sub: 'Inbound message received and authenticated' },
  { num: '02', icon: 'tree',  title: 'n8n Orchestration',  sub: 'Conditional workflow trees route the event' },
  { num: '03', icon: 'brain', title: 'Claude (Anthropic)', sub: 'Intent, context and the next best action' },
  { num: '04', icon: 'grid',  title: 'Sheets & Calendar',  sub: 'Customer history, bookings, availability' },
  { num: '05', icon: 'card',  title: 'Razorpay',           sub: 'Payment link, capture, reconciliation' },
];

export default function HowAvaWorksSection() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-left" shape="ripple" colorFront="#4599B5" opacity={0.32} speed={0.26} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            Under the hood
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(30px, 4.2vw, 50px)',
            lineHeight: 1.14,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            fontWeight: 500,
            maxWidth: '24ch',
            marginBottom: '28px',
          }}>
            Enterprise-grade infrastructure. WhatsApp-native delivery<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={250}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(15px, 1.3vw, 17px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '64ch',
            marginBottom: 'clamp(56px, 8vh, 88px)',
          }}>
            Ava runs as a stateful multi-agent system. Every WhatsApp event triggers a workflow in n8n,
            routes through Claude with your business context injected, and commits the result — booking,
            payment, escalation — back to your data layer.
          </p>
        </Reveal>

        <div className="ava-flow" style={{ display: 'flex', alignItems: 'stretch', gap: '0' }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="ava-flow-item" style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{
                  flex: 1,
                  background: 'rgba(11,23,41,0.6)',
                  border: '1px solid rgba(46,107,142,0.28)',
                  borderTop: '2px solid var(--gold)',
                  padding: 'clamp(22px, 2.4vw, 30px) clamp(18px, 1.8vw, 22px)',
                  display: 'flex',
                  flexDirection: 'column',
                  minWidth: 0,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '11px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)',
                    }}>
                      <Icon name={s.icon} size={22} color="var(--gold)" />
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.3em', color: 'var(--ocean)' }}>{s.num}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '12.5px', lineHeight: 1.55, color: 'var(--muted-cream)', fontWeight: 300 }}>{s.sub}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="ava-flow-arrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', flexShrink: 0, opacity: 0.7 }}>
                    <Icon name="arrow-right" size={20} color="var(--gold)" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .ava-flow { flex-wrap: nowrap; }
        .ava-flow > div { flex: 1; }
        .ava-flow-item { width: 100%; }
        @media (max-width: 900px) {
          .ava-flow { flex-direction: column; gap: 14px; }
          .ava-flow-item { flex-direction: column !important; }
          .ava-flow-arrow { width: 100% !important; height: 28px; transform: rotate(90deg); }
        }
      `}</style>
    </section>
  );
}
