'use client';

import Reveal from '@/components/home/Reveal';

export default function AboutHero() {
  return (
    <section style={{
      minHeight: '95vh',
      padding: 'clamp(140px, 18vh, 220px) var(--rail-pad) clamp(80px, 12vh, 140px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      maxWidth: '1280px',
      margin: '0 auto',
      position: 'relative',
    }}>
      {/* Atmospheric backdrop */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/images/about-hero.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.22,
        zIndex: 0,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%, black 100%)',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <Reveal delay={100}>
        <p className="eyebrow" style={{ marginBottom: '40px' }}>About</p>
      </Reveal>

      <Reveal delay={250}>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(48px, 9vw, 132px)',
          letterSpacing: '-0.028em',
          lineHeight: 0.98,
          color: 'var(--fg)',
          fontWeight: 400,
          maxWidth: '20ch',
        }}>
          We design the <span style={{ color: 'var(--fg-mute)' }}>connective tissue</span> between every system in your business<span style={{ color: 'var(--gold)' }}>.</span>
        </h1>
      </Reveal>

      <Reveal delay={500}>
        <p style={{
          marginTop: '56px',
          fontSize: 'clamp(18px, 1.6vw, 22px)',
          lineHeight: 1.6,
          color: 'var(--fg-mute)',
          fontWeight: 300,
          maxWidth: '60ch',
        }}>
          Rheo AI is an AI-native infrastructure studio. We build intelligent workflows and agentic
          systems that let a business&apos;s data, tools, and people talk to each other across customers,
          operations, partners, and supply. Not an agency. Not a SaaS subscription. The team that
          builds the layer your stack is missing.
        </p>
      </Reveal>
      </div>
    </section>
  );
}
