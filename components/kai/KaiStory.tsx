'use client';

import Reveal from '@/components/home/Reveal';

export default function KaiStory() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      {/* Full-bleed banner: gold river converging into the navy sea */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/sea/kai-story.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '30% center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,14,29,0.35) 0%, rgba(5,14,29,0.55) 50%, rgba(5,14,29,0.88) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #050E1D 0%, transparent 18%, transparent 82%, #050E1D 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'clamp(110px, 18vh, 190px) var(--rail-pad)', display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ maxWidth: '560px' }}>
          <Reveal>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>Why we named it Kai</span>
          </Reveal>
          <Reveal delay={140}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.16, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, marginBottom: '24px' }}>
              Kai is Japanese for sea. Here is why that is the only name that fit<span style={{ color: 'var(--gold)' }}>.</span>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.8, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>
                Rheo is Greek for flow, and our mark has always been the great wave, drawn after Hokusai. When we
                went looking for this product&apos;s name, we asked one question: what do you call the thing that
                holds an entire journey, not just one moment of it?
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.8, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>
                The answer is the sea. Every river ends in it. Every wave rises from it and returns to it. Every
                drop of rain finds its way back. The sea is the one body of water that contains all the others,
                and it never loses a drop. That is exactly what this system is. Your funnel has a dozen
                touchpoints: the first enquiry, the price question, the booking, the visit, the follow-up, the
                recall, the referral. Kai is the one layer all of them flow through. Not a tool for one stage.
                The sea that holds every stage.
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.8, color: 'var(--muted-cream)', fontWeight: 300, margin: 0 }}>
                There is history in it too. Our first-generation agent answered enquiries for a premium detailing
                studio in Mumbai in under a minute, at any hour, and our booking system for a sports facility in
                Baner has processed over 200 bookings. Those systems each guarded one gate brilliantly. But we
                watched their owners win the first conversation and still lose people later, at gates nobody was
                guarding. Kai is everything we learned from those builds, grown into one system that guards every
                gate at once.
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '16.5px', lineHeight: 1.7, color: 'var(--warm-foam)', margin: 0 }}>
                The wave catches a moment. The sea keeps a customer.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
