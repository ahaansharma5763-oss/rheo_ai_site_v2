'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

export default function SECTA() {
  return (
    <section
      style={{ position: 'relative', padding: 'clamp(120px, 22vh, 220px) var(--rail-pad)', overflow: 'hidden', textAlign: 'center', borderTop: '1px solid rgba(46,116,172,0.12)' }}
    >
      <WaveField variant="bottom" shape="swirl" colorBack="#050E1D" colorFront="#C4A25A" opacity={0.32} speed={0.24} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(5,14,29,0.5) 0%, transparent 75%)' }} />

      <style>{`
        .se-cta-btn { display:inline-block; padding:18px 44px; background:linear-gradient(135deg,#FFDF8F 0%,#C4A25A 60%,#C6BCA3 100%); color:var(--bg); font-family:var(--sans); font-size:13px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition:box-shadow 0.4s ease, transform 0.2s ease; }
        .se-cta-btn:hover { box-shadow:0 0 50px rgba(255,223,143,0.35); transform:translateY(-2px); }
        .se-cta-ghost { display:inline-block; padding:18px 36px; border:1px solid rgba(196,162,90,0.5); color:var(--gold-end); font-family:var(--sans); font-size:13px; letter-spacing:0.2em; text-transform:uppercase; font-weight:600; text-decoration:none; transition:background 0.3s ease, transform 0.2s ease; }
        .se-cta-ghost:hover { background:rgba(196,162,90,0.08); transform:translateY(-2px); }
      `}</style>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px, 6vw, 68px)', color: 'var(--fg)', letterSpacing: '-0.025em', lineHeight: 1.08, margin: 0, fontWeight: 600 }}>
            Your catalogue already knows the answers. Give it a voice<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '18px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, maxWidth: '54ch', margin: '32px auto 0' }}>
            Every week this waits, enquiries get answered late, quotes go out slow, and deals close somewhere
            else. Book a build call. Bring a catalogue. We will show you your pilot on your own machines.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="cta-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '48px' }}>
            <a href="https://calendly.com/ahaan-rheoai-xnxc/30min" target="_blank" rel="noreferrer" className="se-cta-btn">
              Book Your Build Call →
            </a>
            <a href="https://t.me/KestrelSalesEngineer_bot" target="_blank" rel="noreferrer" className="se-cta-ghost">
              Try the live demo first
            </a>
          </div>
        </Reveal>

        <Reveal delay={420}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--fg-dim)', maxWidth: '50ch', lineHeight: 1.6, margin: '24px auto 0' }}>
            Live in under 3 weeks · 60-day pay-for-itself guarantee · Two deployments a month.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
