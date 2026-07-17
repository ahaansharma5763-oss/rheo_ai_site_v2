'use client';

import Link from 'next/link';
import Reveal from '@/components/home/Reveal';

export default function RevivalBridge() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            After the Sprint
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: '28px' }}>
            The Sprint is one campaign. Okeanos makes it permanent<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 17.5px)', lineHeight: 1.8, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '68ch', marginBottom: '36px' }}>
            The Sprint proves, in three weeks, what follow-up is worth to your business. Okeanos is what happens
            when that stops being a one-time event: every new lead read and nurtured the moment it arrives, every
            customer brought back when their next visit is due, every month closing with a report of what came
            back. Rheo is Greek for flow, and Okeanos is the river that never ends. Once the Sprint brings your
            customers back into the current, Okeanos keeps them there.
          </p>
        </Reveal>

        <Reveal delay={340}>
          <Link
            href="/okeanos"
            style={{ fontFamily: 'var(--sans)', fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--crest)', textDecoration: 'none', borderBottom: '1px solid rgba(63,174,222,0.4)', paddingBottom: '4px' }}
          >
            Meet Okeanos →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
