'use client';

import Reveal from './Reveal';

const CONTRASTS: { not: string; but: string }[] = [
  { not: 'An agency that sells hours', but: 'A partner accountable for outcomes' },
  { not: 'A SaaS tool you subscribe to', but: 'Infrastructure built around your business' },
  { not: 'A vendor who builds and disappears', but: 'A team that stays on the system for years' },
];

export default function Positioning() {
  return (
    <section style={{
      padding: 'var(--section-gap) var(--rail-pad)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '24px', color: 'var(--gold-end)' }}>
            Who We Are · Who We Serve
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(30px, 4.4vw, 56px)',
            lineHeight: 1.14,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            fontWeight: 500,
            maxWidth: '24ch',
            marginBottom: '32px',
          }}>
            We are not an agency. We are your operating infrastructure<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(16px, 1.4vw, 19px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '60ch',
            marginBottom: 'clamp(56px, 8vh, 88px)',
          }}>
            We work with growing businesses drowning in their own operations. The ones where leads go
            cold overnight, staff lose hours to repetitive work, and the owner is the only thing holding
            it together. We build and run the intelligent systems that carry that load, so the business
            keeps compounding whether you are in the room or not.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'rgba(46,116,172,0.18)',
          border: '1px solid rgba(46,116,172,0.18)',
        }}>
          {CONTRASTS.map((c, i) => (
            <Reveal key={c.not} delay={i * 90}>
              <div className="card-lift" style={{
                background: 'rgba(11,23,41,0.55)',
                padding: 'clamp(28px, 4vw, 40px)',
                height: '100%',
              }}>
                <div style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '13px',
                  lineHeight: 1.55,
                  color: 'var(--fg-dim)',
                  fontWeight: 300,
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(196,162,90,0.5)',
                  marginBottom: '16px',
                }}>
                  {c.not}
                </div>
                <div style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(18px, 1.8vw, 23px)',
                  lineHeight: 1.35,
                  letterSpacing: '-0.012em',
                  color: 'var(--warm-foam)',
                  fontWeight: 400,
                }}>
                  {c.but}<span style={{ color: 'var(--gold)' }}>.</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
