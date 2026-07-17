'use client';

import Reveal from '@/components/home/Reveal';

export default function NamiStory() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      {/* Full-bleed banner: storm-energy foam swirl, brass crest */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/sea/nami-story.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '70% center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,14,29,0.9) 0%, rgba(5,14,29,0.65) 45%, rgba(5,14,29,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #050E1D 0%, transparent 18%, transparent 82%, #050E1D 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'clamp(110px, 18vh, 190px) var(--rail-pad)' }}>
        <div style={{ maxWidth: '560px' }}>
          <Reveal>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>Why we call it Nami</span>
          </Reveal>
          <Reveal delay={140}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.16, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, marginBottom: '24px' }}>
              Nami is Japanese for wave<span style={{ color: 'var(--gold)' }}>.</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.8, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>
                Look at our logo. It is the great wave, drawn in the tradition of Hokusai, and it has been
                Rheo&apos;s mark from the first day. Rheo itself is Greek for flow. A wave is what happens when the
                flow gathers itself and moves with intent, and a wave always returns to shore.
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.8, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>
                Nami exists because of what we kept seeing inside the systems we built before it. The booking
                system we run for a sports facility in Baner has processed over 200 bookings. The lead-response
                system we built for a premium detailing studio in Mumbai answers every enquiry in under a minute.
                And in every one of these businesses, the same thing kept happening: some of the best revenue came
                from people everyone had written off. The enquiry from four months ago that suddenly booked. The
                lapsed customer who replied &ldquo;I was actually meaning to come back.&rdquo;
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.8, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>
                Nobody was messaging these people. So we built the wave that does. That pattern, watching
                written-off contacts quietly outperform, is the entire reason Nami exists as its own campaign.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
