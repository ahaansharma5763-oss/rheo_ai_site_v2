'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

export default function AvaCTASection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(120px, 22vh, 220px) var(--rail-pad)',
        overflow: 'hidden',
        textAlign: 'center',
        borderTop: '1px solid rgba(46,107,142,0.12)',
      }}
    >
      {/* Wave finale — gold swirl */}
      <WaveField variant="bottom" shape="swirl" colorBack="#07101E" colorFront="#C4A25A" opacity={0.3} speed={0.24} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(7,16,30,0.5) 0%, transparent 75%)' }} />

      <style>{`
        .ava-cta-btn { display:inline-block; padding:18px 44px; background:linear-gradient(135deg,#F0D080 0%,#C4A25A 60%,#BDB5A5 100%); color:var(--bg); font-family:var(--sans); font-size:13px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition:box-shadow 0.4s ease, transform 0.2s ease; }
        .ava-cta-btn:hover { box-shadow:0 0 50px rgba(240,208,128,0.35); transform:translateY(-2px); }
      `}</style>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'var(--fg)',
            letterSpacing: '-0.025em',
            lineHeight: 1.08,
            margin: 0,
            fontWeight: 600,
          }}>
            Deploy Ava for your business<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'var(--muted-cream)',
            fontWeight: 300,
            maxWidth: '48ch',
            margin: '32px auto 0',
          }}>
            Every Ava deployment starts with an Ops Audit — we map your operation, then scope the build.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '48px' }}>
            <a href="https://audit.rheoai.co.in" target="_blank" rel="noreferrer" className="ava-cta-btn">
              Start with an Ops Audit →
            </a>
            <a
              href="https://calendly.com/ahaan-rheoai-xnxc/30min"
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-cream)', textDecoration: 'none', opacity: 0.65, transition: 'opacity 0.3s ease' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0.65'}
            >
              Or book a call directly →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
