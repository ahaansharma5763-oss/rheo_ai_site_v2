'use client';

import Link from 'next/link';
import Reveal from '@/components/home/Reveal';

export default function KaiBridge() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/sea/kai-bridge.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,14,29,0.9) 0%, rgba(5,14,29,0.6) 55%, rgba(5,14,29,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #050E1D 0%, transparent 22%, transparent 78%, #050E1D 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'clamp(90px, 15vh, 150px) var(--rail-pad)' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>Start with a wave</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.16, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: '22px' }}>
            Want proof before the system? Send Nami first<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '15.5px', lineHeight: 1.8, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '62ch', marginBottom: '30px' }}>
            Nami is one 21-day win-back campaign on your dormant list, with its own guarantee and one number at
            the end. Most Kai clients start there, see what came back, and never want to go without it again.
            The Nami build cost is credited when you move to Kai.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <Link href="/nami" style={{ fontFamily: 'var(--sans)', fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--crest)', textDecoration: 'none', borderBottom: '1px solid rgba(63,174,222,0.4)', paddingBottom: '4px' }}>
            See Nami →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
