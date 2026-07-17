'use client';

import Reveal from '@/components/home/Reveal';

const NAVY = '#0B2147';
const NAVY_SOFT = 'rgba(11,33,71,0.68)';
const LINE = 'rgba(11,33,71,0.24)';
const GOLD_LIGHT = '#7A6128';

const FACTS = [
  'Dormant lists re-engage at several times the rate of any cold audience.',
  'Winning back a past customer costs a fraction of acquiring a new one.',
  'The single biggest reason clients never return is that no one followed up.',
];

export default function RevivalMath() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', background: '#F4EDDF' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: GOLD_LIGHT }}>
            The math
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: NAVY, fontWeight: 500, maxWidth: '24ch', marginBottom: '28px' }}>
            Run your own numbers before you talk to us.
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: NAVY_SOFT, fontWeight: 400, maxWidth: '64ch', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            Industry data on list reactivation is remarkably consistent:
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
          {FACTS.map((text, i) => (
            <Reveal key={i} delay={i * 90}>
              <article style={{ border: `1px solid ${LINE}`, background: '#FBF6EB', padding: 'clamp(24px, 2.8vw, 32px)', height: '100%' }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.7vw, 19px)', lineHeight: 1.55, color: NAVY, fontWeight: 500 }}>
                  {text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: '36px', maxWidth: '70ch' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.8, color: NAVY_SOFT, fontWeight: 400 }}>
              So take your own list. Count the contacts. Assume only{' '}
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: GOLD_LIGHT, fontWeight: 500 }}>3 in every 100</span>{' '}
              book, at your average ticket. That number is what silence is costing you, and it is the conservative
              case. On a List Review call we work this out with your real figures in about ten minutes.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
