'use client';

import Link from 'next/link';
import Reveal from '@/components/home/Reveal';

export default function RevivalBridge() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      {/* Backplate: wave calming into deep still sea */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/sea/nami-bridge.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,14,29,0.88) 0%, rgba(5,14,29,0.55) 55%, rgba(5,14,29,0.35) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #050E1D 0%, transparent 22%, transparent 78%, #050E1D 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'clamp(90px, 15vh, 150px) var(--rail-pad)' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>After the wave, the sea</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.16, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '22ch', marginBottom: '22px' }}>
            Nami is one wave. Kai is the sea<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '15.5px', lineHeight: 1.8, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '64ch', marginBottom: '30px' }}>
            Nami proves in three weeks what follow-up is worth to your business. Kai is what happens when that
            stops being a one-time event: every new lead read the moment it arrives, every customer brought back
            when they are due, every month closing with a report of what came home. Waves return to the sea.
            Kai is the sea.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <Link href="/kai" style={{ fontFamily: 'var(--sans)', fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--crest)', textDecoration: 'none', borderBottom: '1px solid rgba(63,174,222,0.4)', paddingBottom: '4px' }}>
            Meet Kai →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
