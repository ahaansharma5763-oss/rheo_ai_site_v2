'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

const ATTACKS: { icon: IconName; text: string }[] = [
  { icon: 'globe',  text: 'Ask it in Hindi, Marathi, or half-and-half' },
  { icon: 'target', text: 'Invent a model number and watch it refuse' },
  { icon: 'card',   text: 'Demand a 25% discount and a 10-day delivery' },
  { icon: 'bolt',   text: 'Corner it on an impossible spec' },
];

export default function SEDemo() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-right" shape="ripple" colorFront="#4599B5" opacity={0.3} speed={0.26} />

      <style>{`
        .se-demo-btn { display:inline-flex; align-items:center; gap:10px; padding:18px 40px; border:1px solid rgba(196,162,90,0.55); color:var(--gold-end); font-family:var(--sans); font-size:12.5px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition:background 0.3s ease, box-shadow 0.4s ease, transform 0.2s ease; }
        .se-demo-btn:hover { background:rgba(196,162,90,0.1); box-shadow:0 0 44px rgba(240,208,128,0.22); transform:translateY(-2px); }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            The proof
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.8vw, 54px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 600, maxWidth: '18ch', margin: '0 auto 24px' }}>
            Do not take our word for it. Try to break it<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '58ch', margin: '0 auto clamp(36px, 5vh, 48px)' }}>
            We keep a live Metis deployment running on a fictional hydraulics catalogue, open to anyone.
            Treat it the way your most difficult customer treats your team. This is the standard your own
            deployment ships at:
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: 'clamp(40px, 6vh, 52px)', textAlign: 'left' }}>
          {ATTACKS.map((a, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(11,23,41,0.55)', border: '1px solid rgba(46,107,142,0.26)', borderRadius: '12px', padding: '16px 18px', height: '100%' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
                  <Icon name={a.icon} size={17} color="var(--gold)" />
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.5, color: 'var(--muted-cream)', fontWeight: 300 }}>{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <a href="https://t.me/KestrelSalesEngineer_bot" target="_blank" rel="noreferrer" className="se-demo-btn">
              Open the live demo on Telegram
              <Icon name="arrow-right" size={16} color="var(--gold-end)" />
            </a>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--fg-dim)', letterSpacing: '0.04em' }}>
              No signup. No sales call. Ask it anything a real buyer would.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
