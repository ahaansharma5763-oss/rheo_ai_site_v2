'use client';

import Reveal from '@/components/home/Reveal';

const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';

const NEEDS = [
  'Your contact list, exported once.',
  'Ten minutes to approve the message drafts.',
  'Your booking preferences and service details.',
];

export default function NamiSlots() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ border: '1px solid rgba(196,162,90,0.4)', background: 'rgba(196,162,90,0.05)', padding: 'clamp(28px, 3.4vw, 44px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(24px, 4vw, 48px)', marginBottom: 'clamp(56px, 9vh, 88px)' }}>
            <div style={{ flex: '1 1 380px' }}>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '16px' }}>Slots</span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--gold-end)', fontWeight: 500, lineHeight: 1.2, marginBottom: '14px' }}>
                Two campaigns a month. That is the cap.
              </h2>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, margin: 0, maxWidth: '60ch' }}>
                Every Nami campaign gets a dedicated build, three hand-written waves, and live reply handling for
                21 straight days. That does not scale past two at a time, so we do not pretend it does. When both
                slots for the month are taken, the next wave starts the following month.
              </p>
            </div>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="rev-btn" style={{ flexShrink: 0 }}>
              Check slot availability →
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>What we need from you</span>
        </Reveal>
        <Reveal delay={180}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.16, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, marginBottom: '30px' }}>
            Three things. That is the entire ask.
          </h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: '26px' }}>
          {NEEDS.map((t, i) => (
            <Reveal key={i} delay={i * 90}>
              <div style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(11,23,41,0.5)', padding: 'clamp(24px, 2.8vw, 32px)', height: '100%' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--crest)', display: 'block', marginBottom: '12px' }}>0{i + 1}</span>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>{t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--fg-mute)', fontWeight: 300 }}>
            Everything else, including every reply at every hour of those 21 days, is handled.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
