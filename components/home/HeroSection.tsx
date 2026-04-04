'use client';

import { useEffect, useRef } from 'react';
import WaveSystem from '@/components/shared/WaveSystem';
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
      'hero-label': 200,
      'hero-title': 400,
      'hero-sub': 600,
    };

    animateEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const key = htmlEl.dataset.animate ?? '';
      const delay = delays[key] ?? 0;
      const hasTranslate = key === 'hero-title';
      if (hasTranslate) htmlEl.style.transform = 'translateY(20px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
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

  // [size, leftPct, topPct, duration, delay, color]
  const orbs: [number, number, number, number, number, string][] = [
    [400, 8,  8,  22, 0, 'rgba(196,162,90,0.04)'],
    [280, 70, 12, 28, 3, 'rgba(69,153,181,0.05)'],
    [320, 48, 30, 19, 6, 'rgba(196,162,90,0.03)'],
    [200, 20, 52, 25, 2, 'rgba(69,153,181,0.04)'],
    [360, 82, 48, 21, 8, 'rgba(196,162,90,0.035)'],
    [180, 3,  68, 17, 4, 'rgba(126,200,227,0.03)'],
    [240, 60, 62, 23, 5, 'rgba(196,162,90,0.025)'],
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        background: 'linear-gradient(160deg, #07101E 0%, #0D1F3C 60%, #1A3566 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>{`
        @keyframes chevronPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes heroOrbFloat {
          0%   { transform: translateY(0px) scale(1); }
          33%  { transform: translateY(-28px) scale(1.05); }
          66%  { transform: translateY(18px) scale(0.96); }
          100% { transform: translateY(0px) scale(1); }
        }
      `}</style>

      {/* WebGL smoke — base atmospheric layer */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.55,
          mixBlendMode: 'screen',
        }}
      >
        <SmokeBackground smokeColor="#C4A25A" />
      </div>

      {/* Animated background orbs */}
      {orbs.map(([size, left, top, dur, delay, color], i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            borderRadius: '50%',
            background: color,
            filter: 'blur(72px)',
            animation: `heroOrbFloat ${dur}s ease-in-out ${delay}s infinite`,
            willChange: 'transform',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

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
          paddingTop: '72px',
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
            margin: '0 0 16px 0',
            opacity: 0,
          }}
        >
          AI CONSULTANCY &amp; AUTOMATION
        </p>

        <h1
          data-animate="hero-title"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(52px, 9vw, 96px)',
            color: 'var(--gold)',
            letterSpacing: '0.35em',
            margin: '0 0 16px 0',
            lineHeight: 1,
            opacity: 0,
            textShadow: '0 0 120px rgba(196,162,90,0.2)',
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
            margin: '4px 0 0 0',
            opacity: 0,
          }}
        >
          ρέω · 流れ · Flow
        </p>
      </div>

      {/* Animated waves — bottom 72% */}
      <WaveSystem intensity="hero" style={{ height: '72%' }} />

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
