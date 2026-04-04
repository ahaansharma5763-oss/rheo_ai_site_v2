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
      'hero-label': 300,
      'hero-title': 600,
      'hero-sub': 900,
    };

    animateEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const key = htmlEl.dataset.animate ?? '';
      const delay = delays[key] ?? 0;
      const hasTranslate = key === 'hero-title';
      if (hasTranslate) htmlEl.style.transform = 'translateY(24px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 1s ease, transform 1s ease';
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
        minHeight: '600px',
        overflow: 'hidden',
        background: 'var(--ink)', // fallback while WebGL loads
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes chevronPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      {/* WebGL smoke IS the wave — fills the full hero */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <SmokeBackground smokeColor="#C4A25A" />
      </div>

      {/* Subtle dark vignette so text stays legible */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, rgba(7,16,30,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Centered content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          marginTop: '-60px', // nudge above true center toward upper-third
        }}
      >
        <p
          data-animate="hero-label"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            color: 'var(--crest)',
            textTransform: 'uppercase',
            letterSpacing: '0.5em',
            margin: '0 0 20px 0',
            opacity: 0,
          }}
        >
          AI CONSULTANCY &amp; AUTOMATION
        </p>

        <h1
          data-animate="hero-title"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(64px, 11vw, 112px)',
            color: 'var(--gold)',
            letterSpacing: '0.35em',
            margin: '0 0 20px 0',
            lineHeight: 1,
            opacity: 0,
            textShadow: '0 0 80px rgba(196,162,90,0.35), 0 0 160px rgba(196,162,90,0.12)',
          }}
        >
          RHEO
        </h1>

        <p
          data-animate="hero-sub"
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '15px',
            color: 'var(--foam)',
            letterSpacing: '0.26em',
            margin: 0,
            opacity: 0,
          }}
        >
          ρέω · 流れ · Flow
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          transition: 'opacity 0.4s ease',
        }}
      >
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '8px',
          color: 'rgba(69,153,181,0.5)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>SCROLL</span>
        <span style={{
          color: 'var(--gold)',
          fontSize: '14px',
          animation: 'chevronPulse 1.5s ease-in-out infinite',
          display: 'block',
          lineHeight: 1,
        }}>∨</span>
      </div>
    </section>
  );
}
