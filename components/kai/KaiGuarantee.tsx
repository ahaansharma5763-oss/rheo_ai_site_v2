'use client';

import Reveal from '@/components/home/Reveal';

const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';

export default function KaiGuarantee() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>The guarantee</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '26ch', marginBottom: '28px' }}>
            If Kai does not pay for itself in 60 days, you pay nothing<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 17.5px)', lineHeight: 1.8, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '70ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            Kai needs about 60 days to do its work properly: revive a pipeline, nurture relationships back, learn
            your customers. We will not pretend otherwise. So here is the promise: give Kai 60 days, and if it
            has not brought back more than it cost you, we refund every rupee. All of it. The only way you lose
            here is by leaving another month of leads to go cold.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ border: '1px solid rgba(196,162,90,0.4)', background: 'rgba(196,162,90,0.05)', padding: 'clamp(28px, 3.4vw, 44px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(24px, 4vw, 48px)' }}>
            <div style={{ flex: '1 1 380px' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(21px, 2.4vw, 28px)', color: 'var(--gold-end)', fontWeight: 500, lineHeight: 1.25, marginBottom: '14px' }}>
                Two new builds a month.
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, margin: 0, maxWidth: '58ch' }}>
                Kai is configured around your business by hand: your offers, your voice, your customers. That
                work does not scale past two new builds at a time, so we cap it there. If the month is full, we
                tell you on the call and hold your place for the next one.
              </p>
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="kai-btn" style={{ flexShrink: 0 }}>
              Check availability →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
