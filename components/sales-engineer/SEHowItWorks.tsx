'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Step { num: string; icon: IconName; title: string; sub: string; }

const STEPS: Step[] = [
  { num: '01', icon: 'grid',     title: 'One handover',         sub: 'Send us your catalogues, price lists, and spec sheets in whatever state they are in. PDFs, Excel, scanned brochures, all of it. One call to align, and we take it from there.' },
  { num: '02', icon: 'database', title: 'We build the brain',   sub: 'Your documents become a structured spec database and a cited knowledge layer, configured to your pricing rules, your terms, and the languages your buyers actually speak.' },
  { num: '03', icon: 'shield',   title: 'We try to break it',   sub: 'Before you ever see it, we attack it. Fake model numbers, impossible specs, discount pressure, trick questions. Then your toughest engineer gets a turn. It ships only when it refuses correctly.' },
  { num: '04', icon: 'bolt',     title: 'Live in under 3 weeks', sub: 'On your website, on WhatsApp, wherever your buyers already are. Dealers onboarded, team trained in one session, every conversation logged where you can see it.' },
];

export default function SEHowItWorks() {
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
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.2vw, 50px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '26ch', marginBottom: 'clamp(56px, 8vh, 88px)' }}>
            One handover and one call. That is all we need from you<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div className="se-flow" style={{ display: 'flex', alignItems: 'stretch', gap: '0', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 90}>
              <div className="se-flow-item" style={{ display: 'flex', alignItems: 'stretch' }}>
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
                  <div className="se-flow-arrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', flexShrink: 0, opacity: 0.7 }}>
                    <Icon name="arrow-right" size={20} color="var(--gold)" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <div style={{
            borderRadius: '16px', border: '1px solid rgba(196,162,90,0.35)',
            background: 'linear-gradient(135deg, rgba(196,162,90,0.08) 0%, rgba(11,23,41,0.65) 65%)',
            padding: 'clamp(26px, 3.2vw, 40px)',
          }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '18px', color: 'var(--gold-end)' }}>
              Everything we need from you
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              {[
                'Your catalogues, price lists, and spec sheets. Any format, any mess.',
                'One 30-minute alignment call with whoever knows the products best.',
                'A number or website to deploy on. Nothing to install, nothing to buy.',
                'One person to receive escalations when a buyer needs a human.',
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.12)', border: '1px solid rgba(196,162,90,0.4)' }}>
                    <Icon name="check" size={14} color="var(--gold)" />
                  </span>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--fg)', fontWeight: 400 }}>{r}</p>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(15px, 1.6vw, 19px)', color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', margin: 0 }}>
              That is the entire list. No IT project, no new software for your team, no six-month rollout.
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        .se-flow { flex-wrap: nowrap; }
        .se-flow > div { flex: 1; }
        .se-flow-item { width: 100%; }
        @media (max-width: 900px) {
          .se-flow { flex-direction: column; gap: 14px; }
          .se-flow-item { flex-direction: column !important; }
          .se-flow-arrow { width: 100% !important; height: 28px; transform: rotate(90deg); }
        }
      `}</style>
    </section>
  );
}
