'use client';

import { useEffect, useRef } from 'react';
import { RhoWatermark, GreekMeander } from '@/components/shared/GreekElements';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animations
    const animateEls = sectionRef.current?.querySelectorAll('[data-animate]');
    if (!animateEls) return;

    animateEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.transition = 'none';
      htmlEl.style.opacity = '0';
    });

    // Staggered fade-in per delay
    const delays: Record<string, number> = {
      'hero-label': 200,
      'hero-title': 400,
      'hero-sub': 600,
    };

    animateEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const key = htmlEl.dataset.animate ?? '';
      const delay = delays[key] ?? 0;
      const hasTranslate = key === 'hero-title';

      if (hasTranslate) {
        htmlEl.style.transform = 'translateY(20px)';
      }

      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        htmlEl.style.opacity = '1';
        if (hasTranslate) {
          htmlEl.style.transform = 'translateY(0)';
        }
      }, delay);
    });

    // Scroll indicator hide
    const handleScroll = () => {
      if (!scrollIndicatorRef.current) return;
      const scrolled = window.scrollY > 100;
      scrollIndicatorRef.current.style.opacity = scrolled ? '0' : '1';
      scrollIndicatorRef.current.style.pointerEvents = scrolled ? 'none' : 'auto';
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
        background: 'linear-gradient(to bottom, var(--ink), var(--navy))',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Center content — top 28% */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: '0 0 28%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          paddingBottom: '20px',
        }}
      >
        {/* Rho watermark behind the RHEO text */}
        <RhoWatermark style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.04,
        }}/>

        <p
          data-animate="hero-label"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            color: 'var(--ocean)',
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            margin: '0 0 10px 0',
            opacity: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          AGENTIC AI FOR BUSINESS OPERATIONS
        </p>

        <h1
          data-animate="hero-title"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(48px, 9vw, 88px)',
            color: 'var(--gold)',
            letterSpacing: '0.3em',
            margin: '0 0 16px 0',
            lineHeight: 1,
            opacity: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          RHEO
        </h1>

        <p
          data-animate="hero-sub"
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '14px',
            color: 'var(--crest)',
            letterSpacing: '0.24em',
            margin: '8px 0 0 0',
            opacity: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          ρέω · 流れ · Flow
        </p>
      </div>

      {/* Greek meander border above waves */}
      <div style={{
        position: 'absolute',
        bottom: '72%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        pointerEvents: 'none',
      }}>
        <GreekMeander width={320} opacity={0.2} color="#C4A25A"/>
      </div>

      {/* Wave section — bottom 72% */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '72%',
          zIndex: 1,
        }}
      >
        {/* Fuji silhouette behind waves */}
        <svg
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
        >
          <polygon points="820,180 920,60 1020,180" fill="#1A3566" opacity="0.08" />
        </svg>

        {/* Layer 1 — deepest back (Y values * 1.3) */}
        <svg
          data-speed="0.3"
          viewBox="0 0 1440 200"
          width="100%"
          height="200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,156 C240,78 480,208 720,104 C960,0 1200,156 1440,78 L1440,200 L0,200 Z"
            fill="#1A3566"
            fillOpacity="0.4"
          />
        </svg>

        {/* Layer 2 (Y values * 1.3) */}
        <svg
          data-speed="0.5"
          viewBox="0 0 1440 200"
          width="100%"
          height="200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,130 C200,52 440,182 720,91 C1000,0 1240,143 1440,65 L1440,200 L0,200 Z"
            fill="#1A3566"
            fillOpacity="0.6"
          />
        </svg>

        {/* Layer 3 (Y values * 1.3) */}
        <svg
          data-speed="0.7"
          viewBox="0 0 1440 200"
          width="100%"
          height="200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,182 C280,104 520,208 760,130 C1000,52 1200,182 1440,104 L1440,200 L0,200 Z"
            fill="#2E6B8E"
            fillOpacity="0.5"
          />
        </svg>

        {/* Layer 4 — front with gold hairline (Y values * 1.3) */}
        <svg
          data-speed="1.0"
          viewBox="0 0 1440 200"
          width="100%"
          height="200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          {/* Gold crest hairline */}
          <path
            d="M0,208 C200,130 440,234 720,156 C1000,78 1240,208 1440,130"
            fill="none"
            stroke="#C4A25A"
            strokeWidth="0.7"
          />
          {/* Fill body */}
          <path
            d="M0,208 C200,130 440,234 720,156 C1000,78 1240,208 1440,130 L1440,200 L0,200 Z"
            fill="#0D1F3C"
            fillOpacity="0.9"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'absolute',
          bottom: '28px',
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
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '8px',
            color: 'rgba(69,153,181,0.5)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </span>
        <span
          style={{
            color: 'var(--gold)',
            fontSize: '14px',
            animation: 'chevronPulse 1.5s ease-in-out infinite',
            display: 'block',
            lineHeight: 1,
          }}
        >
          ∨
        </span>
      </div>

      <style>{`
        @keyframes chevronPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
