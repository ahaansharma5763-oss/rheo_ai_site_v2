'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

/* Brand rule 6 codified once: primary = gold hairline border + foam text
 * (never gold-filled); secondary = Prussian border. 0 radius, no shadows. */
export function BrandButton({
  href,
  children,
  variant = 'primary',
  newTab = false,
}: {
  href: string;
  children: React.ReactNode;
  /* 'panel' = Prussian border on a lifted navy surface. Used where the
   * section's one gold is spent elsewhere but the button must still read
   * as the primary target. Depth by tonal stacking, per v1.1 rule 3. */
  variant?: 'primary' | 'secondary' | 'panel';
  newTab?: boolean;
}) {
  const primary = variant === 'primary';
  return (
    <a
      href={href}
      {...(newTab ? { target: '_blank', rel: 'noreferrer' } : {})}
      style={{
        display: 'inline-block',
        padding: '16px 32px',
        border: primary ? '1px solid rgba(196,162,90,0.65)' : '1px solid var(--line)',
        background: variant === 'panel' ? 'var(--panel)' : 'transparent',
        color: 'var(--fg)',
        fontFamily: 'var(--sans)',
        fontSize: '12px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        fontWeight: 500,
        transition: 'border-color 0.16s var(--ease), background 0.16s var(--ease)',
        textAlign: 'center',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = primary ? 'var(--gold-hi)' : 'var(--crest)';
        if (primary) e.currentTarget.style.background = 'rgba(196,162,90,0.07)';
        if (variant === 'panel') e.currentTarget.style.background = 'var(--bg-card)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = primary ? 'rgba(196,162,90,0.65)' : 'var(--line)';
        e.currentTarget.style.background = variant === 'panel' ? 'var(--panel)' : 'transparent';
      }}
    >
      {children}
    </a>
  );
}

/* §1 — Hero. Headline is the diagnosis; no tagline, no eyebrow.
 * Mobile: headline + button hold the first viewport, subhead follows. */
export function FYHero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        padding: 'clamp(110px, 15vh, 200px) var(--rail-pad) clamp(60px, 10vh, 120px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <WaveField variant="full" shape="wave" colorBack="#0B2147" colorFront="#3FAEDE" opacity={0.5} speed={0.24} />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 70% at 30% 50%, rgba(5,14,29,0.68) 0%, transparent 78%)',
        }}
      />

      <div
        className="fy-hero-col"
        style={{
          maxWidth: 'var(--container-max)',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Reveal delay={150}>
          <h1
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2.3rem, 6.4vw, 4.5rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.015em',
              color: 'var(--fg)',
              maxWidth: '17ch',
              marginBottom: '36px',
            }}
          >
            You don’t have a lead problem.
            <br />
            {/* The hero's one gold element (brand rule 1). Solid colour, never
              * a gradient background-clip and never a glow: clipping on an
              * inline child renders transparent, and v1.1 rule 3 forbids
              * shadows. The CTA below therefore carries a Prussian border. */}
            <span style={{ color: 'var(--gold-hi)' }}>You have a follow-up problem.</span>
          </h1>
        </Reveal>

        <Reveal delay={350}>
          <p
            className="fy-hero-sub"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(17px, 1.5vw, 20px)',
              lineHeight: 1.7,
              color: 'var(--text-2)',
              maxWidth: '52ch',
              marginBottom: '44px',
            }}
          >
            The enquiries are coming in. But nobody’s actual job is to answer them in a minute, chase them
            five times, and remember who is due back. So they go cold, and you never find out. We built the
            system that does all of it.
          </p>
        </Reveal>

        <Reveal delay={550}>
          <div className="cta-row fy-hero-cta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {/* Prussian on navy, not gold: the headline holds this section's gold */}
            <BrandButton href="https://audit.rheoai.co.in" variant="panel">
              Show me what I’m losing
            </BrandButton>
          </div>
        </Reveal>
      </div>

      {/* Mobile fold fix: headline + button in the first viewport, subhead after */}
      <style>{`
        @media (max-width: 600px) {
          .fy-hero-col > * { order: 2 !important; }
          .fy-hero-col > *:first-child { order: 0 !important; }
          .fy-hero-col > *:last-child { order: 1 !important; margin-bottom: 36px; }
        }
      `}</style>

      <div
        className="scroll-cue"
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '9px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
            fontWeight: 500,
          }}
        >
          Scroll
        </span>
        <span style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, var(--crest), transparent)' }} />
      </div>
    </section>
  );
}

/* §16 — Close. Bookend of the hero: the wave returns, same primary button. */
export function FYClose() {
  return (
    <section
      style={{
        position: 'relative',
        padding: 'clamp(120px, 18vh, 220px) var(--rail-pad)',
        overflow: 'hidden',
        borderTop: '1px solid var(--line-soft)',
      }}
    >
      <WaveField variant="bottom" shape="wave" colorBack="#050E1D" colorFront="#3FAEDE" opacity={0.4} speed={0.22} />

      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <Reveal>
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'var(--fs-body)',
              lineHeight: 1.8,
              color: 'var(--text-2)',
              maxWidth: '54ch',
              margin: '0 auto 32px',
            }}
          >
            Every owner we speak to believes the answer is more leads. Almost none of them need more leads.
            They need to stop losing the ones they already have.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: 'var(--fg)',
              marginBottom: '44px',
            }}
          >
            That money is already yours. It is walking out while somebody is busy.
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <div className="cta-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <BrandButton href="https://audit.rheoai.co.in">Show me what I’m losing</BrandButton>
            <BrandButton href="https://calendly.com/ahaan-rheoai-xnxc/30min" variant="secondary" newTab>
              Book a call
            </BrandButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
