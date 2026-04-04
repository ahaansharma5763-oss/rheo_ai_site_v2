'use client';

import { useEffect, useRef } from 'react';
import { HeroDithering } from '@/components/ui/hero-dithering-card';

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
      'hero-logo': 100,
      'hero-label': 400,
      'hero-title': 650,
      'hero-sub': 900,
    };

    animateEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const key = htmlEl.dataset.animate ?? '';
      const delay = delays[key] ?? 0;
      const hasTranslate = key === 'hero-logo' || key === 'hero-title';
      if (hasTranslate) htmlEl.style.transform = 'translateY(30px) scale(0.96)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 1.1s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1)';
        htmlEl.style.opacity = '1';
        if (hasTranslate) htmlEl.style.transform = 'translateY(0) scale(1)';
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
          50% { opacity: 0.3; transform: translateY(4px); }
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 24px rgba(126,200,227,0.25)); }
          50% { filter: drop-shadow(0 0 48px rgba(126,200,227,0.45)); }
        }
      `}</style>

      {/* Dithering wave background */}
      <HeroDithering
        colorBack="#07101E"
        colorFront="#7EC8E3"
        shape="wave"
        type="4x4"
        speed={0.4}
      />

      {/* Gradient vignette — darkens center & edges so text stays legible */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: [
          'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(7,16,30,0.6) 0%, transparent 100%)',
          'linear-gradient(to bottom, rgba(7,16,30,0.35) 0%, transparent 25%, transparent 75%, rgba(7,16,30,0.5) 100%)',
        ].join(', '),
      }} />

      {/* Hero content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        padding: '0 32px', gap: '0',
      }}>

        {/* ── LOGO ── */}
        <div
          data-animate="hero-logo"
          style={{ opacity: 0, marginBottom: '28px', animation: 'logoPulse 4s ease-in-out infinite' }}
        >
          {/* Wave-R SVG logo — replace with <img src="/rheo-logo.png"> once saved to public/ */}
          <svg
            style={{ display: 'block', width: '160px', height: '160px' }}
            viewBox="0 0 160 160"
            fill="none"
          >
            <defs>
              <clipPath id="rMask">
                {/* R letterform */}
                <path d="M24 16 L24 144 L52 144 L52 96 L96 144 L132 144 L83 92 Q128 82 128 52 Q128 16 76 16 Z" />
              </clipPath>
              <linearGradient id="waveG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7EC8E3" />
                <stop offset="60%" stopColor="#2E6B8E" />
                <stop offset="100%" stopColor="#1A3566" />
              </linearGradient>
            </defs>
            {/* R fill */}
            <path d="M24 16 L24 144 L52 144 L52 96 L96 144 L132 144 L83 92 Q128 82 128 52 Q128 16 76 16 Z M52 36 L72 36 Q100 36 100 52 Q100 68 72 68 L52 68 Z"
              fill="url(#waveG)" opacity="0.15" />
            {/* Wave lines clipped to R shape */}
            <g clipPath="url(#rMask)">
              {/* Wave rows */}
              {[0,1,2,3,4,5,6,7,8].map((i) => (
                <path key={i}
                  d={`M0 ${28+i*14} C30 ${22+i*14} 60 ${34+i*14} 90 ${28+i*14} C120 ${22+i*14} 150 ${34+i*14} 180 ${28+i*14}`}
                  stroke={i < 3 ? '#7EC8E3' : i < 6 ? '#4599B5' : '#2E6B8E'}
                  strokeWidth={i === 0 ? 2.5 : 1.5}
                  fill="none"
                  opacity={i < 2 ? 0.9 : i < 5 ? 0.65 : 0.4}
                />
              ))}
              {/* Foam dots at wave crests */}
              {[[88,28],[100,28],[112,28],[95,42]].map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} r="2" fill="#EEE8E0" opacity="0.8"/>
              ))}
            </g>
            {/* R outline stroke */}
            <path d="M24 16 L24 144 L52 144 L52 96 L96 144 L132 144 L83 92 Q128 82 128 52 Q128 16 76 16 Z M52 36 L72 36 Q100 36 100 52 Q100 68 72 68 L52 68 Z"
              stroke="#4599B5" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
        </div>

        {/* Label */}
        <p
          data-animate="hero-label"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            color: 'var(--foam)',
            textTransform: 'uppercase',
            letterSpacing: '0.55em',
            margin: '0 0 18px 0',
            opacity: 0,
          }}
        >
          AI CONSULTANCY &amp; AUTOMATION
        </p>

        {/* RHEO */}
        <h1
          data-animate="hero-title"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(72px, 12vw, 120px)',
            color: 'var(--gold)',
            letterSpacing: '0.4em',
            margin: '0 0 18px 0',
            lineHeight: 1,
            opacity: 0,
            textShadow: '0 0 60px rgba(196,162,90,0.45), 0 0 120px rgba(196,162,90,0.15)',
          }}
        >
          RHEO
        </h1>

        {/* Tagline */}
        <p
          data-animate="hero-sub"
          style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '16px',
            color: 'var(--foam)',
            letterSpacing: '0.28em',
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
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 3,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          transition: 'opacity 0.4s ease',
        }}
      >
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
