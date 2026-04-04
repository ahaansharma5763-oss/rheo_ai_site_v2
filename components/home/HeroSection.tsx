'use client';

import { useEffect, useRef } from 'react';

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
      'hero-label': 500,
      'hero-title': 750,
      'hero-sub': 1000,
    };

    animateEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const key = htmlEl.dataset.animate ?? '';
      const delay = delays[key] ?? 0;
      const hasTranslate = key === 'hero-logo' || key === 'hero-title';
      if (hasTranslate) htmlEl.style.transform = 'translateY(30px)';
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
        background: 'linear-gradient(180deg, #07101E 0%, #0D1F3C 50%, #1A3566 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{`
        @keyframes wave1 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave2 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave3 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave4 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wave5 {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes chevronPulse {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50%       { opacity: 0.3; transform: translateY(4px); }
        }
        @keyframes logoPulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(126,200,227,0.3)); }
          50%       { filter: drop-shadow(0 0 44px rgba(126,200,227,0.55)); }
        }
      `}</style>

      {/* ── ANIMATED WAVE LAYERS ── */}
      {/* Layer 1 — back, slowest, darkest */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '68%', overflow: 'hidden', zIndex: 1,
      }}>
        <div style={{
          width: '200%', height: '100%',
          animation: 'wave1 28s linear infinite',
          display: 'flex',
        }}>
          {[0, 1].map(n => (
            <svg key={n} viewBox="0 0 1440 420" style={{ width: '50%', height: '100%', flexShrink: 0 }}
              preserveAspectRatio="none">
              <path d="M0,200 C180,100 360,300 540,180 C720,60 900,260 1080,150 C1260,40 1380,200 1440,130 L1440,420 L0,420 Z"
                fill="#1A3566" fillOpacity="0.5"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Layer 2 */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '58%', overflow: 'hidden', zIndex: 2,
      }}>
        <div style={{
          width: '200%', height: '100%',
          animation: 'wave2 22s linear infinite',
          display: 'flex',
        }}>
          {[0, 1].map(n => (
            <svg key={n} viewBox="0 0 1440 360" style={{ width: '50%', height: '100%', flexShrink: 0 }}
              preserveAspectRatio="none">
              <path d="M0,180 C200,80 400,280 600,160 C800,40 1000,240 1200,130 C1350,50 1420,180 1440,120 L1440,360 L0,360 Z"
                fill="#2E6B8E" fillOpacity="0.45"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Layer 3 — mid */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '46%', overflow: 'hidden', zIndex: 3,
      }}>
        <div style={{
          width: '200%', height: '100%',
          animation: 'wave3 16s linear infinite',
          display: 'flex',
        }}>
          {[0, 1].map(n => (
            <svg key={n} viewBox="0 0 1440 300" style={{ width: '50%', height: '100%', flexShrink: 0 }}
              preserveAspectRatio="none">
              <path d="M0,150 C240,60 480,240 720,130 C960,20 1200,200 1440,100 L1440,300 L0,300 Z"
                fill="#4599B5" fillOpacity="0.4"/>
              {/* crest hairline */}
              <path d="M0,150 C240,60 480,240 720,130 C960,20 1200,200 1440,100"
                fill="none" stroke="#7EC8E3" strokeWidth="1.5" strokeOpacity="0.5"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Layer 4 — lighter blue, faster */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '34%', overflow: 'hidden', zIndex: 4,
      }}>
        <div style={{
          width: '200%', height: '100%',
          animation: 'wave4 11s linear infinite',
          display: 'flex',
        }}>
          {[0, 1].map(n => (
            <svg key={n} viewBox="0 0 1440 220" style={{ width: '50%', height: '100%', flexShrink: 0 }}
              preserveAspectRatio="none">
              <path d="M0,110 C200,50 400,170 600,90 C800,10 1000,150 1200,70 C1360,10 1420,100 1440,65 L1440,220 L0,220 Z"
                fill="#7EC8E3" fillOpacity="0.22"/>
              <path d="M0,110 C200,50 400,170 600,90 C800,10 1000,150 1200,70 C1360,10 1420,100 1440,65"
                fill="none" stroke="#C4A25A" strokeWidth="1" strokeOpacity="0.5"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Layer 5 — front, darkest, fastest */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '22%', overflow: 'hidden', zIndex: 5,
      }}>
        <div style={{
          width: '200%', height: '100%',
          animation: 'wave5 8s linear infinite',
          display: 'flex',
        }}>
          {[0, 1].map(n => (
            <svg key={n} viewBox="0 0 1440 140" style={{ width: '50%', height: '100%', flexShrink: 0 }}
              preserveAspectRatio="none">
              <path d="M0,70 C180,30 360,110 540,60 C720,10 900,90 1080,45 C1260,0 1380,70 1440,40 L1440,140 L0,140 Z"
                fill="#07101E" fillOpacity="0.95"/>
              <path d="M0,70 C180,30 360,110 540,60 C720,10 900,90 1080,45 C1260,0 1380,70 1440,40"
                fill="none" stroke="#7EC8E3" strokeWidth="2" strokeOpacity="0.6"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Fuji silhouette behind mid waves */}
      <svg aria-hidden="true" style={{
        position: 'absolute', bottom: '20%', left: '50%',
        transform: 'translateX(-50%)', zIndex: 2,
        width: '60%', maxWidth: '500px', opacity: 0.05,
        pointerEvents: 'none',
      }} viewBox="0 0 500 200">
        <polygon points="250,0 450,200 50,200" fill="#7EC8E3"/>
      </svg>

      {/* ── CONTENT ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        padding: '0 32px',
        marginTop: '-80px', // sit in upper-third above the waves
      }}>
        {/* Real logo */}
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
        transform: 'translateX(-50%)', zIndex: 10,
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
