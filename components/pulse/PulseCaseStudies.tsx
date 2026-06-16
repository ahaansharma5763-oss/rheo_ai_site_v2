'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

interface Study { who: string; story: string; changed: string; }

const STUDIES: Study[] = [
  {
    who: 'A transformation coach',
    story: 'Spending heavily on ads, getting plenty of enquiries, closing only a handful. Most leads replied once, then vanished. After putting an intelligent follow-up layer in place, the same ad budget started producing more than twice the enrolled clients, and a single pass through old leads brought back three clients in the first two weeks.',
    changed: 'Conversion roughly doubled. Three clients recovered from a dead list in fourteen days. Several hours a week handed back to the founder.',
  },
  {
    who: 'A premium service studio',
    story: 'High-value bookings, strong word of mouth, but enquiries often went quiet and past customers were never contacted again. Intelligent follow-up caught abandoned enquiries within the hour and reopened relationships with previous customers. Repeat business, once almost accidental, became a steady and predictable stream.',
    changed: 'Abandoned enquiries recovered before they went cold. A reliable flow of repeat customers from people who had already bought once.',
  },
  {
    who: 'A multi-location clinic',
    story: 'A high volume of enquiries across locations, a small front-desk team, and no time to chase the ones who did not book immediately. Intelligent follow-up nurtured every enquiry and gently brought back quiet patients, while flagging the people the team needed to call personally.',
    changed: 'More enquiries turned into booked appointments. The team freed from manual chasing and pointed only at the conversations that needed a human.',
  },
];

export default function PulseCaseStudies() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-right" shape="wave" colorFront="#4599B5" opacity={0.3} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            What intelligent follow-up produces
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: '18px' }}>
            The revenue was always there<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: 1.7, color: 'var(--fg-dim)', fontWeight: 300, maxWidth: '60ch', marginBottom: 'clamp(48px, 7vh, 72px)', fontStyle: 'italic' }}>
            Results from businesses using intelligent lifecycle follow-up. Figures are representative of the recovery and conversion gains this approach produces.
          </p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {STUDIES.map((s, i) => (
            <Reveal key={s.who} delay={i * 100}>
              <article
                className="pulse-study"
                style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', background: 'rgba(11,23,41,0.55)', border: '1px solid rgba(46,107,142,0.26)', borderLeft: '3px solid var(--gold)', padding: 'clamp(28px, 3.4vw, 40px)', transition: 'border-color 0.4s ease, background 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(11,23,41,0.78)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; e.currentTarget.style.borderLeftColor = 'var(--gold-end)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(11,23,41,0.55)'; e.currentTarget.style.borderColor = 'rgba(46,107,142,0.26)'; e.currentTarget.style.borderLeftColor = 'var(--gold)'; }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.2vw, 26px)', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '16px' }}>{s.who}</h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--fg-mute)', fontWeight: 300, marginBottom: '22px' }}>{s.story}</p>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px 18px', borderRadius: '10px', background: 'rgba(196,162,90,0.07)', border: '1px solid rgba(196,162,90,0.22)' }}>
                    <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, paddingTop: '2px', flexShrink: 0 }}>What changed</span>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.6, color: 'var(--warm-foam)', fontWeight: 400 }}>{s.changed}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 760px) {
          .pulse-study > div > div { flex-direction: row; }
        }
      `}</style>
    </section>
  );
}
