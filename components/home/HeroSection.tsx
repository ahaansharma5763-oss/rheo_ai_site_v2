'use client';

import { useEffect, useRef } from 'react';
import { SmokeBackground } from '@/components/ui/spooky-smoke-animation';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateEls = sectionRef.current?.querySelectorAll('[data-animate]');
    if (!animateEls) return;

    animateEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.transition = 'none';
      htmlEl.style.opacity = '0';
    });

    const delays: Record<string, number> = {
      'hero-logo':  100,
      'hero-label': 500,
      'hero-title': 750,
      'hero-sub':   1000,
    };

    animateEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const key = htmlEl.dataset.animate ?? '';
      const delay = delays[key] ?? 0;
      const hasTranslate = key === 'hero-logo' || key === 'hero-title';
      if (hasTranslate) htmlEl.style.transform = 'translateY(28px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 1.1s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1)';
        htmlEl.style.opacity = '1';
        if (hasTranslate) htmlEl.style.transform = 'translateY(0)';
      }, delay);
    });

    const handleScroll = () => {
      if (!scrollIndicatorRef.current) return;
      scrollIndicatorRef.current.style.opacity = window.scrollY > 100 ? '0' : '1';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        background: 'var(--ink)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes chevronPulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50%       { opacity: 0.3; transform: translateY(4px); }
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(69,153,181,0.3)); }
          50%       { filter: drop-shadow(0 0 44px rgba(69,153,181,0.55)); }
        }
      `}</style>

      {/* Blue smoke — matches the ocean wave palette of sections below */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <SmokeBackground smokeColor="#4599B5" />
      </div>

      {/* Subtle vignette — just enough to keep text readable, not enough to hide smoke */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 50% 42%, rgba(7,16,30,0.52) 0%, transparent 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        padding: '0 32px',
        marginTop: '-40px',
      }}>
        {/* Logo */}
        <div
          data-animate="hero-logo"
          style={{
            opacity: 0, marginBottom: '24px',
            animation: 'logoPulse 4s ease-in-out 1.5s infinite',
          }}
        >
          <img
            src="/rheo-logo.png"
            alt="Rheo AI"
            style={{
              width: '160px', height: '160px',
              objectFit: 'contain', display: 'block',
              borderRadius: '12px',
            }}
          />
        </div>

        {/* Label */}
        <p data-animate="hero-label" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px', color: 'var(--foam)',
          textTransform: 'uppercase', letterSpacing: '0.55em',
          margin: '0 0 16px 0', opacity: 0,
        }}>
          AI CONSULTANCY &amp; AUTOMATION
        </p>

        {/* RHEO */}
        <h1 data-animate="hero-title" style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(68px, 11vw, 112px)',
          color: 'var(--gold)', letterSpacing: '0.38em',
          margin: '0 0 16px 0', lineHeight: 1, opacity: 0,
          textShadow: '0 0 60px rgba(196,162,90,0.4), 0 0 120px rgba(196,162,90,0.12)',
        }}>
          RHEO
        </h1>

        {/* Sub */}
        <p data-animate="hero-sub" style={{
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
          fontSize: '15px', color: 'var(--foam)',
          letterSpacing: '0.26em', margin: 0, opacity: 0,
        }}>
          ρέω · 流れ · Flow
        </p>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} style={{
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        transition: 'opacity 0.4s ease',
      }}>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '8px',
          color: 'rgba(126,200,227,0.5)', letterSpacing: '0.3em', textTransform: 'uppercase',
        }}>SCROLL</span>
        <span style={{
          color: 'var(--gold)', fontSize: '16px',
          animation: 'chevronPulse 1.8s ease-in-out infinite',
          display: 'block', lineHeight: 1,
        }}>∨</span>
      </div>
    </section>
  );
}
