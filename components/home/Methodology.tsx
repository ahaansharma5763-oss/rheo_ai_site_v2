'use client';

import Reveal from './Reveal';

type MethodCard = { icon: string; title: string; body: string; cta?: { label: string; href: string } };

const CARDS: MethodCard[] = [
  {
    icon: 'architecture',
    title: 'Audit',
    body: 'A forensic walkthrough across the four intelligent layers: customer, operations, network, decision. We map where data is moving, where it is not, and where the leverage is. A written scorecard delivered in five business days.',
    cta: { label: 'Take the self-serve audit →', href: 'https://audit.rheoai.co.in' },
  },
  {
    icon: 'account_tree',
    title: 'Build',
    body: 'Custom deployment on n8n and Claude, integrated with whichever tools your business already runs. Indicative scope and timeline confirmed in writing. Most workflows ship in two to six weeks. Progress visible every week.',
  },
  {
    icon: 'speed',
    title: 'Maintain',
    body: 'The retainer is not a maintenance fee. It is weekly monitoring, a monthly performance review, and the search for your next highest-ROI improvement. Someone permanently accountable for the system. Thirty-day hypercare on full builds, third-party costs at actuals, zero markup.',
  },
];

export default function Methodology() {
  return (
    <section id="methodology" style={{
      padding: 'var(--section-gap) var(--rail-pad)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Backdrop photo at very low opacity */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/images/methodology-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.08,
        zIndex: 0,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 20%, transparent 80%)',
      }} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            The Methodology
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(32px, 4.4vw, 52px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            fontWeight: 500,
            maxWidth: '20ch',
            marginBottom: '24px',
          }}>
            A surgical approach to building the operating fabric.
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '18px',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '60ch',
            marginBottom: '80px',
          }}>
            We do not build generic automations. We architect intelligent loops that fit your business
            and evolve with it.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article
                className="hover-rule"
                style={{
                  background: 'rgba(15,30,54,0.45)',
                  border: '1px solid rgba(46,107,142,0.3)',
                  padding: '40px',
                  transition: 'background 0.5s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(15,30,54,0.7)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  const ic = e.currentTarget.querySelector<HTMLElement>('.method-icon');
                  if (ic) ic.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(15,30,54,0.45)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  const ic = e.currentTarget.querySelector<HTMLElement>('.method-icon');
                  if (ic) ic.style.transform = 'scale(1)';
                }}
              >
                <span
                  className="icon method-icon"
                  style={{
                    color: 'var(--crest)',
                    fontSize: '48px',
                    display: 'block',
                    marginBottom: '32px',
                    transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    lineHeight: 1,
                  }}
                >
                  {c.icon}
                </span>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '26px',
                  color: 'var(--warm-foam)',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  marginBottom: '16px',
                }}>
                  {c.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--muted-cream)',
                  fontWeight: 300,
                  marginBottom: c.cta ? '28px' : '24px',
                }}>
                  {c.body}
                </p>
                {c.cta && (
                  <a
                    href={c.cta.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '11px',
                      letterSpacing: '0.26em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      textDecoration: 'none',
                      fontWeight: 600,
                      display: 'inline-block',
                      borderBottom: '1px solid rgba(196,162,90,0.35)',
                      paddingBottom: '3px',
                      transition: 'border-color 0.3s ease',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(196,162,90,0.35)'}
                  >
                    {c.cta.label}
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
