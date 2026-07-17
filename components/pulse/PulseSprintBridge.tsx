'use client';

import Link from 'next/link';
import Reveal from '@/components/home/Reveal';

export default function PulseSprintBridge() {
  return (
    <section style={{ padding: 'clamp(56px, 9vh, 96px) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ border: '1px solid rgba(196,162,90,0.35)', background: 'rgba(196,162,90,0.05)', padding: 'clamp(28px, 3.4vw, 44px)', maxWidth: '860px' }}>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '16px' }}>
              Want proof first
            </span>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(21px, 2.4vw, 28px)', color: 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.25, marginBottom: '16px' }}>
              Start with a Revival Sprint.
            </h3>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '64ch', marginBottom: '24px' }}>
              One 21-day campaign on your dormant list, one report, one number. If the number convinces you, the
              Sprint&apos;s setup cost is credited when you move to Pulse.
            </p>
            <Link
              href="/revival-sprint"
              style={{ fontFamily: 'var(--sans)', fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--crest)', textDecoration: 'none', borderBottom: '1px solid rgba(63,174,222,0.4)', paddingBottom: '4px' }}
            >
              See the Revival Sprint →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
