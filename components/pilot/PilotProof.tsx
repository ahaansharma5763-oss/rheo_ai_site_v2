'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const STATS = [
  { value: '200+', label: 'bookings handled end to end' },
  { value: '0', label: 'staff touching a message' },
  { value: '24/7', label: 'never misses an enquiry' },
];

export default function PilotProof() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-right" shape="swirl" colorFront="#C4A25A" opacity={0.22} speed={0.22} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>The proof</span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: '28px' }}>
            Same leads. Same spend. They just stop leaking<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '62ch', marginBottom: 'clamp(36px, 5vh, 48px)' }}>
            We built a fully automated booking system for a sports facility in Pune that now runs entirely on its own,
            without the owner touching a single message.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: 'clamp(40px, 6vh, 56px)' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ background: 'rgba(11,23,41,0.55)', border: '1px solid rgba(196,162,90,0.22)', borderRadius: '14px', padding: 'clamp(24px, 3vw, 32px)', textAlign: 'center' }}>
                <div className="gold-text" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '12.5px', letterSpacing: '0.04em', color: 'var(--muted-cream)', marginTop: '12px', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 1.9vw, 23px)', lineHeight: 1.5, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', maxWidth: '60ch' }}>
            The pattern holds across every business we work with: the fastest responder wins the lead, and follow-up is
            where the money hides. The businesses we build this for convert 30 to 40% more of the leads they already have.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
