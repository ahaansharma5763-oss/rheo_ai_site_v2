'use client';

import Reveal from '@/components/home/Reveal';

const TIMELINE = [
  {
    year: 'Early 2026',
    title: 'The first attempt.',
    body:
      'Rheo started with a single product: an automated deadline tracker for accounting firms. Built on Make, OpenAI, and Google Sheets. The product worked. The market was too narrow. We learned that selling one feature is not the same as solving the whole problem.',
  },
  {
    year: 'Spring 2026',
    title: 'The pivot.',
    body:
      'We stopped chasing one vertical and started watching where modern businesses were actually losing money. The pattern was everywhere. Disconnected tools. Data that did not talk to itself. Decisions made on gut feel because the system never told the operator what was happening. The stack moved to n8n and Claude. The thesis got broader.',
  },
  {
    year: 'Summer 2026',
    title: 'The first deployment.',
    body:
      'Ascend Arena, a premium football turf, went live on a Rheo-built booking system. Two hundred bookings later, no double-bookings, no missed enquiries, no manual coordination. One business now runs without a human in the booking loop. We knew the model was right.',
  },
  {
    year: 'Today',
    title: 'The follow-up problem.',
    body:
      'Deployments running across clinics, detailing, fitness, catering and consulting. The thesis is no longer "automate this one thing." It is "own the gap where customers get lost." Every engagement custom-scoped, retainer-backed, owned by the client.',
  },
];

export default function HowWeGotHere() {
  return (
    <section style={{
      padding: 'clamp(160px, 24vh, 260px) var(--rail-pad)',
      borderTop: '1px solid rgba(242,240,236,0.06)',
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '40px' }}>How We Got Here</p>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            fontWeight: 400,
            maxWidth: '18ch',
            marginBottom: 'clamp(72px, 10vh, 120px)',
          }}>
            A short history of a young company.
          </h2>
        </Reveal>

        <div style={{ position: 'relative' }}>
          {/* Vertical timeline rule */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(196,162,90,0.5) 10%, rgba(196,162,90,0.5) 90%, transparent 100%)',
          }}
          className="tl-rule" />

          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 100}>
              <div style={{
                display: 'flex',
                gap: '40px',
                paddingLeft: '0',
                marginBottom: 'clamp(56px, 8vh, 96px)',
                position: 'relative',
              }}
              className="tl-row">
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  left: '18px',
                  top: '12px',
                  width: '13px',
                  height: '13px',
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  border: '1.5px solid var(--gold)',
                  boxShadow: '0 0 0 4px rgba(5,14,29,1), 0 0 12px rgba(196,162,90,0.4)',
                  zIndex: 1,
                }}
                className="tl-dot" />

                <div style={{
                  marginLeft: '72px',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(120px, 0.5fr) minmax(0, 2fr)',
                  gap: 'clamp(24px, 5vw, 64px)',
                  flex: 1,
                  alignItems: 'baseline',
                }}
                className="tl-grid">
                  <div>
                    <p style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '12px',
                      letterSpacing: '0.32em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      fontWeight: 500,
                      marginBottom: '12px',
                    }}>
                      {t.year}
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(22px, 2.4vw, 30px)',
                      color: 'var(--fg)',
                      letterSpacing: '-0.015em',
                      fontWeight: 400,
                      lineHeight: 1.15,
                    }}>
                      {t.title}
                    </h3>
                  </div>
                  <p style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 'clamp(15px, 1.3vw, 17px)',
                    lineHeight: 1.75,
                    color: 'var(--fg-mute)',
                    fontWeight: 300,
                    maxWidth: '56ch',
                  }}>
                    {t.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .tl-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      ` }} />
    </section>
  );
}
