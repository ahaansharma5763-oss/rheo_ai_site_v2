'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';

export default function RevivalCTA() {
  return (
    <section style={{ position: 'relative', padding: 'clamp(120px, 22vh, 220px) var(--rail-pad)', overflow: 'hidden', textAlign: 'center', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="bottom" shape="swirl" colorBack="#050E1D" colorFront="#C4A25A" opacity={0.3} speed={0.24} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(5,14,29,0.5) 0%, transparent 75%)' }} />

      <style>{`
        .rev-cta-btn { display:inline-block; padding:18px 44px; background:linear-gradient(135deg,#FFDF8F 0%,#C4A25A 60%,#C6BCA3 100%); color:var(--bg); font-family:var(--sans); font-size:13px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition: box-shadow 0.4s ease, transform 0.2s ease; }
        .rev-cta-btn:hover { box-shadow:0 0 50px rgba(255,223,143,0.35); transform: translateY(-2px); }
      `}</style>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5.6vw, 64px)', color: 'var(--fg)', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0, fontWeight: 500 }}>
            Your list already paid for itself once. Make it pay again.
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '18px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, maxWidth: '54ch', margin: '32px auto 0' }}>
            Every month this waits, more of your list goes cold for good. Book a List Review and we will tell you,
            with your numbers, exactly what a Sprint would recover, and whether it is worth running at all.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '48px' }}>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="rev-cta-btn">
              Book Your List Review →
            </a>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--fg-dim)', maxWidth: '48ch', lineHeight: 1.6 }}>
              If the Sprint does not recover more than twice what it costs, you only cover the deposit.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
