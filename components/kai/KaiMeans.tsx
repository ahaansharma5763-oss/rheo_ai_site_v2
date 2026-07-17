'use client';

import Reveal from '@/components/home/Reveal';

const PILLARS = [
  {
    title: 'More revenue',
    body: 'Kai plugs every leak at once. New enquiries stop dying overnight because the answer arrives in seconds. Quiet leads stop rotting because someone always follows up. Past customers stop vanishing because the system remembers when they are due. Businesses running intelligent follow-up routinely double the share of leads that become customers, on the same ad spend. You are not buying software. You are buying the customers you already paid to find and never closed.',
  },
  {
    title: 'More time',
    body: 'Right now, good follow-up means someone remembering who said what and when to circle back. That is hours every week, and it still misses people. Kai carries all of it. Across the systems we run, owners get back on the order of 18 hours of staff time a week.',
  },
  {
    title: 'Less effort',
    body: 'Nothing to learn, nothing to log into, nothing to manage. Kai runs in the background and brings you only the moments that need a human: a hot lead ready to buy, a good customer quietly drifting.',
  },
];

export default function KaiMeans() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>What this means for you</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: 'clamp(48px, 7vh, 64px)' }}>
            More revenue. More time. Less effort. In that order<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {PILLARS.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <article style={{ display: 'flex', gap: 'clamp(20px, 3vw, 44px)', alignItems: 'flex-start', border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(15,30,54,0.4)', padding: 'clamp(26px, 3vw, 38px)', flexWrap: 'wrap' }}>
                <h3 style={{ flex: '0 0 220px', fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.2vw, 26px)', color: i === 0 ? 'var(--gold-end)' : 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.25 }}>{p.title}</h3>
                <p style={{ flex: '1 1 340px', fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.75, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>{p.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
