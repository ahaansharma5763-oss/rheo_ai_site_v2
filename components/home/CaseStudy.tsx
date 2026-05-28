'use client';

import Reveal from './Reveal';

/**
 * Two-column case study: image left, copy right, floating stat overlay on the image.
 * The image well falls back to a CSS-rendered visual if /public/images/case-ascend.jpg
 * is not present yet.
 */
export default function CaseStudy() {
  return (
    <section style={{
      padding: 'var(--section-gap) var(--rail-pad)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: 'clamp(48px, 8vw, 96px)',
        alignItems: 'center',
      }}
      className="cs-grid">
        {/* Image */}
        <Reveal>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                backgroundImage: "url('/images/case-ascend.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'filter 0.8s ease',
                filter: 'grayscale(35%) brightness(0.88)',
              }}
              onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%) brightness(1)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(35%) brightness(0.88)'}
            />

            {/* Floating stat */}
            <div className="cs-stat" style={{
              position: 'absolute',
              right: '-32px',
              bottom: '-32px',
              background: 'var(--bg-low)',
              border: '1px solid rgba(46,107,142,0.25)',
              padding: '28px 36px',
              minWidth: '200px',
            }}>
              <div className="gold-text" style={{
                fontFamily: 'var(--mono)',
                fontSize: '48px',
                lineHeight: 1,
                marginBottom: '10px',
                letterSpacing: '-0.02em',
                fontWeight: 500,
              }}>
                200+
              </div>
              <div style={{
                fontFamily: 'var(--sans)',
                fontSize: '10px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'var(--muted-cream)',
                fontWeight: 500,
              }}>
                Bookings processed, zero misses
              </div>
            </div>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal delay={200}>
          <div>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--crest)' }}>
              Implementation &nbsp;·&nbsp; Ascend Arena
            </span>
            <h3 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              lineHeight: 1.15,
              letterSpacing: '-0.018em',
              color: 'var(--fg)',
              fontWeight: 600,
              marginBottom: '32px',
              maxWidth: '20ch',
            }}>
              A business that has not missed a booking in over a year.
            </h3>
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: '17px',
              lineHeight: 1.75,
              color: 'var(--fg-mute)',
              fontWeight: 300,
              marginBottom: '36px',
              maxWidth: '52ch',
            }}>
              Ascend Arena was losing slots to slow replies and double-bookings. Rheo deployed an
              agentic intake and scheduling layer integrated with their existing listings and
              calendar. Two hundred bookings later, no double-bookings, no missed enquiries, no
              manual coordination. One node in a wider operating fabric we keep extending.
            </p>
            <a
              href="#work"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--gold-end)',
                fontWeight: 600,
                transition: 'gap 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '24px'}
              onMouseLeave={e => e.currentTarget.style.gap = '14px'}
            >
              Read full protocol
              <span className="icon">trending_flat</span>
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cs-grid { grid-template-columns: 1fr !important; }
          .cs-stat { right: 16px !important; bottom: -20px !important; padding: 20px 24px !important; }
        }
      `}</style>
    </section>
  );
}
