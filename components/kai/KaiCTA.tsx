'use client';

import Reveal from '@/components/home/Reveal';

const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';
const AUDIT_URL = 'https://audit.rheoai.co.in';

export default function KaiCTA() {
  return (
    <section style={{ position: 'relative', padding: 'clamp(120px, 22vh, 220px) var(--rail-pad)', overflow: 'hidden', textAlign: 'center', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      {/* Caustic texture backdrop */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/sea/caustic-texture.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 75% 60% at 50% 45%, rgba(5,14,29,0.55) 0%, rgba(5,14,29,0.9) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #050E1D 0%, transparent 20%, transparent 80%, #050E1D 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5.6vw, 64px)', color: 'var(--fg)', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0, fontWeight: 500 }}>
            The revenue is already yours. Let Kai go and get it<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '18px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, maxWidth: '54ch', margin: '32px auto 0' }}>
            Every day you wait, another batch of leads goes quiet for good. Book a Pipeline Review and we will
            show you, with your own numbers, exactly what Kai can bring back. Two builds a month. If the month is
            full, your slot holds for the next.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px', marginTop: '48px' }}>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="kai-btn">
              Book Your Pipeline Review →
            </a>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.06em', color: 'var(--fg-dim)', maxWidth: '52ch', lineHeight: 1.6 }}>
              Backed by the 60-day money-back promise. Prefer to see the leak first?{' '}
              <a href={AUDIT_URL} target="_blank" rel="noreferrer" style={{ color: 'var(--crest)', textDecoration: 'none', borderBottom: '1px solid rgba(63,174,222,0.4)' }}>The 3-minute audit is free</a>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
