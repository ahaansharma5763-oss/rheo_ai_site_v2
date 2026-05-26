'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-a]');
    if (!els) return;
    const delays: Record<string, number> = {
      '0': 100, '1': 280, '2': 460, '3': 620, '4': 800,
    };
    els.forEach(el => {
      const h = el as HTMLElement;
      h.style.opacity = '0';
      h.style.transform = 'translateY(18px)';
      setTimeout(() => {
        h.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)';
        h.style.opacity = '1';
        h.style.transform = 'translateY(0)';
      }, delays[h.dataset.a ?? '0'] ?? 0);
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
    <section ref={ref} className="hero-section" style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--ink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '120px 48px 80px',
    }}>
      {/* Grain texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.028, mixBlendMode: 'overlay',
      }} />

      {/* Glow orb behind R */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -58%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(46,107,142,0.22) 0%, transparent 65%)',
        filter: 'blur(60px)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Content — two column on desktop, stacked on mobile */}
      <div className="hero-inner" style={{
        position: 'relative', zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        maxWidth: '1100px',
        width: '100%',
      }}>
        {/* Left — text */}
        <div>
          <p data-a="0" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px', color: 'var(--crest)',
            textTransform: 'uppercase', letterSpacing: '0.5em',
            margin: '0 0 24px 0',
          }}>
            AI Consultancy & Automation · Pune
          </p>

          <h1 data-a="1" style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: 'var(--warm-foam)',
            letterSpacing: '0.12em',
            lineHeight: 1.05,
            margin: '0 0 12px 0',
          }}>
            Your operations
          </h1>
          <h1 data-a="1" style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: 'var(--gold)',
            letterSpacing: '0.1em',
            lineHeight: 1.05,
            margin: '0 0 36px 0',
          }}>
            are leaking revenue.
          </h1>

          <div data-a="2" style={{
            width: '36px', height: '1px',
            background: 'rgba(196,162,90,0.5)',
            marginBottom: '28px',
          }} />

          <p data-a="2" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            color: 'rgba(238,232,224,0.55)',
            lineHeight: 1.8,
            maxWidth: '440px',
            margin: '0 0 40px 0',
          }}>
            We build custom AI automation systems that fix fragmented operations — faster responses, zero missed bookings, payments that collect themselves.
          </p>

          <div data-a="3" style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={openCalendly} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px', textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'var(--ink)', background: 'var(--gold)',
              border: 'none', padding: '14px 32px',
              cursor: 'pointer', transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              Book a Free Audit
            </button>
            <a href="#services" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px', textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'rgba(238,232,224,0.45)',
              textDecoration: 'none',
              padding: '14px 20px',
              border: '1px solid rgba(238,232,224,0.12)',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--warm-foam)'; e.currentTarget.style.borderColor = 'rgba(238,232,224,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(238,232,224,0.45)'; e.currentTarget.style.borderColor = 'rgba(238,232,224,0.12)'; }}
            >
              See Services ↓
            </a>
          </div>

          {/* Proof strip */}
          <div data-a="4" style={{
            display: 'flex', gap: '28px', marginTop: '48px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(196,162,90,0.12)',
            flexWrap: 'wrap',
          }}>
            {[
              { num: '38+', label: 'Workflows Deployed' },
              { num: '<2s', label: 'Response Time' },
              { num: '200+', label: 'Bookings Automated' },
            ].map(s => (
              <div key={s.label}>
                <p style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '22px', color: 'var(--gold)',
                  margin: '0 0 2px 0', letterSpacing: '0.05em',
                }}>
                  {s.num}
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px', color: 'rgba(126,200,227,0.5)',
                  textTransform: 'uppercase', letterSpacing: '0.2em',
                  margin: 0,
                }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Hokusai Wave R */}
        <div data-a="1" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Gold ring accent behind the R */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            width: '420px', height: '420px',
            border: '1px solid rgba(196,162,90,0.08)',
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
          }} />

          <Image
            src="/wave-r-hero.png"
            alt="Rheo AI — Flow"
            width={480}
            height={480}
            priority
            style={{
              width: 'min(480px, 100%)',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 60px rgba(46,107,142,0.35))',
            }}
          />
        </div>
      </div>

      {/* Bottom cultural tag */}
      <p style={{
        position: 'absolute', bottom: '28px', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Georgia, serif', fontStyle: 'italic',
        fontSize: '12px', color: 'rgba(238,232,224,0.2)',
        letterSpacing: '0.3em', whiteSpace: 'nowrap',
        zIndex: 2, margin: 0,
      }}>
        ρέω · 流れ · Flow
      </p>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-inner > div:first-child { order: 2; }
          .hero-inner > div:last-child { order: 1; }
          .hero-inner > div:first-child > div[style*='justify-content'] { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
