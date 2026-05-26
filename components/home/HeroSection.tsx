'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('[data-animate]');
    if (!els) return;
    const delays: Record<string, number> = {
      'hero-label': 200,
      'hero-title': 420,
      'hero-sub':   680,
      'hero-body':  880,
      'hero-cta':   1040,
    };
    els.forEach(el => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(20px)';
      const delay = delays[htmlEl.dataset.animate ?? ''] ?? 0;
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, delay);
    });
  }, []);

  const openCalendly = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/ahaan-rheoai/30min' });
    } else {
      window.open('https://calendly.com/ahaan-rheoai/30min', '_blank');
    }
  };

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0 48px',
      }}
    >
      {/* Subtle radial gradient — depth without motion */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(13,31,60,0.6) 0%, transparent 70%)',
      }} />

      {/* Single static gold hairline — top accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1px', height: '80px',
        background: 'linear-gradient(to bottom, transparent, rgba(196,162,90,0.4))',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        maxWidth: '900px',
      }}>
        {/* Eyebrow label */}
        <p data-animate="hero-label" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          color: 'var(--crest)',
          textTransform: 'uppercase',
          letterSpacing: '0.55em',
          margin: '0 0 28px 0',
        }}>
          AI Consultancy & Automation · Pune
        </p>

        {/* Main wordmark */}
        <h1 data-animate="hero-title" style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(80px, 14vw, 160px)',
          color: 'var(--gold)',
          letterSpacing: '0.35em',
          margin: '0 0 20px 0',
          lineHeight: 1,
          textShadow: '0 0 80px rgba(196,162,90,0.2)',
        }}>
          RHEO
        </h1>

        {/* Cultural subtitle */}
        <p data-animate="hero-sub" style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: '16px',
          color: 'rgba(238,232,224,0.45)',
          letterSpacing: '0.3em',
          margin: '0 0 48px 0',
        }}>
          ρέω · 流れ · Flow
        </p>

        {/* Divider */}
        <div data-animate="hero-body" style={{
          width: '40px', height: '1px',
          background: 'rgba(196,162,90,0.5)',
          margin: '0 auto 32px',
        }} />

        {/* Value statement */}
        <p data-animate="hero-body" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          color: 'rgba(238,232,224,0.55)',
          lineHeight: 1.75,
          maxWidth: '520px',
          margin: '0 0 48px 0',
          letterSpacing: '0.02em',
        }}>
          We automate the space between data and decision.<br />
          Custom-built systems. Zero templates.
        </p>

        {/* CTAs */}
        <div data-animate="hero-cta" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={openCalendly}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'var(--ink)',
              background: 'var(--gold)',
              border: 'none',
              padding: '14px 32px',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Book a Call
          </button>
          <a
            href="#services"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'rgba(238,232,224,0.5)',
              textDecoration: 'none',
              padding: '14px 20px',
              border: '1px solid rgba(238,232,224,0.15)',
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--warm-foam)'; e.currentTarget.style.borderColor = 'rgba(238,232,224,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(238,232,224,0.5)'; e.currentTarget.style.borderColor = 'rgba(238,232,224,0.15)'; }}
          >
            See Our Work ↓
          </a>
        </div>

        {/* Proof line */}
        <p data-animate="hero-cta" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          color: 'rgba(126,200,227,0.3)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginTop: '40px',
        }}>
          38+ workflows deployed · 200+ bookings automated · &lt;2s response time
        </p>
      </div>

      {/* Bottom hairline */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1px', height: '60px',
        background: 'linear-gradient(to bottom, rgba(196,162,90,0.3), transparent)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
