'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const CASES = [
  { t: 'Answers new enquiries in seconds.', b: 'The 11pm message gets an 11pm reply. Being first is most of the battle, and Kai is always first.' },
  { t: 'Qualifies and books on the spot.', b: 'Timings, pricing, availability, the booking itself. Handled inside the first conversation.' },
  { t: 'Revives your dead leads.', b: 'Day one, months of cold leads get a real reason to talk again. This alone often pays for the system.' },
  { t: 'Rescues abandoned enquiries.', b: 'Someone asked about booking and vanished. Kai notices within the hour.' },
  { t: 'Handles the hesitations.', b: 'Price worries, timing worries, "I need to ask my partner." Each gets the right response instead of silence.' },
  { t: 'Brings customers back on schedule.', b: 'The treatment due in six weeks, the service due in six months. Kai remembers so you never have to.' },
  { t: 'Protects your best relationships.', b: 'Kai watches for the quiet signs someone is drifting and flags it while you can still act.' },
];

export default function KaiUseCases() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="wave" colorFront="#2E74AC" opacity={0.26} speed={0.22} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>In plain terms</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '22ch', marginBottom: 'clamp(48px, 7vh, 64px)' }}>
            What Kai handles<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {CASES.map((c, i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              <article style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(11,23,41,0.5)', padding: 'clamp(24px, 2.8vw, 32px)', height: '100%' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.35, marginBottom: '12px' }}>{c.t}</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300 }}>{c.b}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
