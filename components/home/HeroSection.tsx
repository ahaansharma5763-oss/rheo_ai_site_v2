'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll('[data-a]');
    if (!els) return;
    const delays: Record<string, number> = {
      '0': 80, '1': 220, '2': 380, '3': 520, '4': 680,
    };
    els.forEach(el => {
      const h = el as HTMLElement;
      h.style.opacity = '0';
      h.style.transform = 'translateY(14px)';
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
    <section ref={ref} style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'var(--ink)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '120px 48px 80px',
      textAlign: 'center',
    }}>
      {/* Grain texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        opacity: 0.028, mixBlendMode: 'overlay',
      }} />

      {/* Deep radial glow behind the R */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -52%)',
        width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(196,162,90,0.07) 0%, transparent 60%)',
        filter: 'blur(80px)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Content column */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', width: '100%' }}>

        {/* Eyebrow */}
        <p data-a="0" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px', color: 'var(--crest)',
          textTransform: 'uppercase', letterSpacing: '0.5em',
          margin: '0 0 40px 0',
        }}>
          AI Consultancy & Automation · Pune
        </p>

        {/* Wave-R — centered, large */}
        <div data-a="1" style={{
          position: 'relative',
          display: 'inline-block',
          marginBottom: '32px',
        }}>
          {/* Subtle gold ring */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            width: '520px', height: '520px',
            border: '1px solid rgba(196,162,90,0.07)',
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
          }} />
          <div aria-hidden="true" style={{
            position: 'absolute',
            width: '420px', height: '420px',
            border: '1px solid rgba(196,162,90,0.05)',
            borderRadius: '50%',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
          }} />

          <Image
            src="/wave-r-hero.png"
            alt="Rheo AI — Flow"
            width={500}
            height={500}
            priority
            style={{
              width: 'min(500px, 80vw)',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 0 80px rgba(196,162,90,0.25)) drop-shadow(0 0 30px rgba(196,162,90,0.12))',
            }}
          />
        </div>

        {/* RHEO wordmark */}
        <div data-a="1" style={{ marginBottom: '20px' }}>
          <span style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            color: 'var(--gold)',
            letterSpacing: '0.72em',
            fontWeight: 400,
          }}>
            RHEO AI
          </span>
        </div>

        {/* Thin gold rule */}
        <div data-a="2" style={{
          width: '40px', height: '1px',
          background: 'rgba(196,162,90,0.4)',
          margin: '0 auto 28px',
        }} />

        {/* Headline */}
        <h1 data-a="2" style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(32px, 4.5vw, 58px)',
          color: 'var(--warm-foam)',
          letterSpacing: '0.1em',
          lineHeight: 1.1,
          margin: '0 0 8px 0',
        }}>
          Your operations
        </h1>
        <h1 data-a="2" style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(32px, 4.5vw, 58px)',
          color: 'var(--gold)',
          letterSpacing: '0.08em',
          lineHeight: 1.1,
          margin: '0 0 28px 0',
        }}>
          are leaking revenue.
        </h1>

        {/* Subtext */}
        <p data-a="3" style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '16px',
          color: 'rgba(238,232,224,0.5)',
          lineHeight: 1.8,
          maxWidth: '500px',
          margin: '0 auto 40px',
        }}>
          We build custom AI automation systems that fix fragmented operations — faster responses, zero missed bookings, payments that collect themselves.
        </p>

        {/* CTAs */}
        <div data-a="4" style={{
          display: 'flex', gap: '14px',
          alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: '52px',
        }}>
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
            color: 'rgba(238,232,224,0.4)',
            textDecoration: 'none',
            padding: '14px 20px',
            border: '1px solid rgba(238,232,224,0.1)',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--warm-foam)'; e.currentTarget.style.borderColor = 'rgba(238,232,224,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(238,232,224,0.4)'; e.currentTarget.style.borderColor = 'rgba(238,232,224,0.1)'; }}
          >
            See Services ↓
          </a>
        </div>

        {/* Proof strip */}
        <div data-a="4" style={{
          display: 'flex', gap: '0',
          justifyContent: 'center',
          paddingTop: '28px',
          borderTop: '1px solid rgba(196,162,90,0.1)',
          flexWrap: 'wrap',
        }}>
          {[
            { num: '38+', label: 'Workflows Deployed' },
            { num: '<2s', label: 'Response Time' },
            { num: '200+', label: 'Bookings Automated' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: '0 36px',
              borderRight: i < 2 ? '1px solid rgba(196,162,90,0.1)' : 'none',
            }}>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '22px', color: 'var(--gold)',
                margin: '0 0 4px 0', letterSpacing: '0.05em',
              }}>
                {s.num}
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px', color: 'rgba(245,240,232,0.38)',
                textTransform: 'uppercase', letterSpacing: '0.22em',
                margin: 0,
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom cultural tag */}
      <p style={{
        position: 'absolute', bottom: '28px', left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'Georgia, serif', fontStyle: 'italic',
        fontSize: '11px', color: 'rgba(238,232,224,0.18)',
        letterSpacing: '0.3em', whiteSpace: 'nowrap',
        zIndex: 2, margin: 0,
      }}>
        ρέω · 流れ · Flow
      </p>
    </section>
  );
}
