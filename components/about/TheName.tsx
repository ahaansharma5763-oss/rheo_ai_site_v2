'use client';

import Reveal from '@/components/home/Reveal';

export default function TheName() {
  return (
    <section style={{
      padding: 'clamp(140px, 22vh, 240px) var(--rail-pad)',
      borderTop: '1px solid rgba(242,240,236,0.06)',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.3fr)',
        gap: 'clamp(48px, 8vw, 120px)',
        alignItems: 'center',
      }}
      className="name-grid">
        <Reveal>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '36px',
          }}>
            <p className="eyebrow">The Name</p>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(96px, 14vw, 196px)',
              lineHeight: 1,
              color: 'var(--gold)',
              letterSpacing: '0.01em',
              fontWeight: 300,
            }}>
              ρέω
            </div>
            <div style={{
              fontFamily: 'var(--sans)',
              fontSize: '13px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
            }}>
              rhe&#x14D;  &nbsp;·&nbsp;  to flow
            </div>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(40px, 5vw, 64px)',
              color: 'var(--fg-mute)',
              letterSpacing: '0.01em',
              fontWeight: 300,
              lineHeight: 1,
            }}>
              流れ
            </div>
            <div style={{
              fontFamily: 'var(--sans)',
              fontSize: '13px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
            }}>
              nagare &nbsp;·&nbsp; the same idea, in Japanese
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(34px, 4.8vw, 64px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--fg)',
              fontWeight: 400,
              marginBottom: '40px',
              maxWidth: '20ch',
            }}>
              The word is two and a half thousand years old. The idea is the same.
            </h2>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(16px, 1.4vw, 19px)',
              lineHeight: 1.75,
              color: 'var(--fg-mute)',
              fontWeight: 300,
              marginBottom: '24px',
              maxWidth: '54ch',
            }}>
              Rheo comes from the Greek <em style={{ color: 'var(--gold)', fontStyle: 'normal' }}>rheō</em>, the verb Heraclitus used
              when he said no one steps in the same river twice. Everything is in motion. Nothing is static.
              The same word gave English its rheology, rhythm, rheostat. The same idea gave Japanese
              its <em style={{ color: 'var(--fg-mute)', fontStyle: 'normal' }}>nagare</em>: a flow, a current, a continuity.
            </p>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(16px, 1.4vw, 19px)',
              lineHeight: 1.75,
              color: 'var(--fg-mute)',
              fontWeight: 300,
              maxWidth: '54ch',
            }}>
              We picked the name because a good business runs the way a river runs. Quietly. Constantly.
              Without anyone watching it. Customer enquiries arrive and get answered.
              Bookings happen and reminders go out. Reviews come in. Payments collect.
              Staff know what to do. The owner sees the numbers in the morning and goes back to the work
              that actually matters. That is the kind of business we build for our clients.
            </p>
          </div>
        </Reveal>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .name-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      ` }} />
    </section>
  );
}
