'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

export default function PulseCTA() {
  return (
    <section
      style={{ position: 'relative', padding: 'clamp(120px, 22vh, 220px) var(--rail-pad)', overflow: 'hidden', textAlign: 'center', borderTop: '1px solid rgba(46,116,172,0.12)' }}
    >
      <WaveField variant="bottom" shape="swirl" colorBack="#050E1D" colorFront="#C4A25A" opacity={0.32} speed={0.24} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(5,14,29,0.5) 0%, transparent 75%)' }} />

      <style>{`
        .pulse-cta-btn { display:inline-block; padding:18px 44px; background:linear-gradient(135deg,#FFDF8F 0%,#C4A25A 60%,#C6BCA3 100%); color:var(--bg); font-family:var(--sans); font-size:13px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition:box-shadow 0.4s ease, transform 0.2s ease; }
        .pulse-cta-btn:hover { box-shadow:0 0 50px rgba(255,223,143,0.35); transform:translateY(-2px); }
      `}</style>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px, 6vw, 68px)', color: 'var(--fg)', letterSpacing: '-0.025em', lineHeight: 1.08, margin: 0, fontWeight: 600 }}>
            The revenue is already yours. Let Okeanos go and get it<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '18px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, maxWidth: '52ch', margin: '32px auto 0' }}>
            Every day you wait, another batch of leads goes quiet for good. Book a Pipeline Review and we will show you,
            with your own numbers, exactly what Okeanos can bring back.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '48px' }}>
            <a href="https://calendly.com/ahaan-rheoai-xnxc/30min" target="_blank" rel="noreferrer" className="pulse-cta-btn">
              Book Your Pipeline Review →
            </a>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--fg-dim)', maxWidth: '46ch', lineHeight: 1.6 }}>
              Backed by our 60-day money-back promise. If Okeanos does not pay for itself, you pay nothing.
            </p>
            <a href="/revival-sprint" style={{ fontFamily: 'var(--sans)', fontSize: '12.5px', letterSpacing: '0.08em', color: 'var(--crest)', textDecoration: 'none', borderBottom: '1px solid rgba(63,174,222,0.4)', paddingBottom: '3px' }}>
              Not ready for the full system? Start with a Revival Sprint instead
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
