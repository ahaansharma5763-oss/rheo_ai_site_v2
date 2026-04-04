'use client';

import { useRef } from 'react';
import { GreekMeander } from '@/components/shared/GreekElements';

export default function CTASection() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    // Ripple effect
    const container = rippleContainerRef.current;
    if (container) {
      const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 10px;
        height: 10px;
        marginLeft: -5px;
        marginTop: -5px;
        border: 2px solid #C4A25A;
        border-radius: 50%;
        transform: scale(0);
        opacity: 1;
        pointer-events: none;
        animation: ctaRipple 600ms ease forwards;
      `;
      container.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    }

    // Navigate
    // @ts-ignore
    if (window.Calendly) window.Calendly.initPopupWidget({ url: 'https://calendly.com/ahaan-rheoai/30min' })
    else window.location.href = 'mailto:ahaan@rheoai.co.in'
  }

  return (
    <section
      style={{
        background: 'var(--ink)',
        padding: 0,
        minHeight: '500px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <style>{`
        @keyframes ctaRipple {
          from {
            transform: scale(0);
            opacity: 1;
          }
          to {
            transform: scale(30);
            opacity: 0;
          }
        }
        .cta-btn {
          background: transparent;
          border: 1px solid var(--gold);
          color: var(--gold);
          padding: 13px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 250ms ease, color 250ms ease;
          margin-top: 24px;
        }
        .cta-btn:hover {
          background: var(--gold);
          color: var(--ink);
        }
        .cta-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--gold);
          letter-spacing: 0.24em;
          text-align: center;
          text-decoration: none;
          display: block;
        }
        .cta-link:hover {
          text-decoration: underline;
        }
      `}</style>

      {/* Centered content — vertically centered in top 40% */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '80px 24px 40px',
        }}
      >
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(28px, 4.5vw, 42px)',
            color: 'var(--warm-foam)',
            letterSpacing: '0.15em',
            maxWidth: '700px',
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Let&apos;s make your business flow.
        </h2>

        {/* Greek meander centered below headline */}
        <div style={{ marginTop: '20px' }}>
          <GreekMeander width={200} opacity={0.15} color="#C4A25A"/>
        </div>

        {/* Gold diamond divider */}
        <span
          style={{
            display: 'block',
            textAlign: 'center',
            color: 'var(--gold)',
            fontSize: '16px',
            margin: '16px auto',
          }}
          aria-hidden="true"
        >
          ◆
        </span>

        {/* Domain */}
        <a href="https://rheoai.co.in" className="cta-link" target="_blank" rel="noopener noreferrer">
          rheoai.co.in
        </a>

        {/* CTA Button */}
        <button
          ref={btnRef}
          className="cta-btn"
          onClick={handleButtonClick}
          type="button"
        >
          <div ref={rippleContainerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          Get in touch →
        </button>
      </div>

      {/* Wave layers — bottom 80% of section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {/* Layer 1 — deepest (prussian) */}
        <svg
          viewBox="0 0 1440 240"
          width="100%"
          height="240"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,100 C200,20 500,180 800,80 C1100,-20 1300,140 1440,60 L1440,240 L0,240 Z"
            fill="#1A3566"
            fillOpacity="0.35"
          />
        </svg>

        {/* Layer 2 — prussian */}
        <svg
          viewBox="0 0 1440 240"
          width="100%"
          height="240"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,140 C300,40 600,200 900,100 C1200,0 1350,160 1440,90 L1440,240 L0,240 Z"
            fill="#1A3566"
            fillOpacity="0.5"
          />
        </svg>

        {/* Layer 3 — ocean */}
        <svg
          viewBox="0 0 1440 240"
          width="100%"
          height="240"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,160 C250,80 550,210 850,120 C1150,30 1320,180 1440,110 L1440,240 L0,240 Z"
            fill="#2E6B8E"
            fillOpacity="0.45"
          />
        </svg>

        {/* Layer 4 — ocean */}
        <svg
          viewBox="0 0 1440 240"
          width="100%"
          height="240"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,180 C280,100 560,220 840,150 C1120,80 1300,200 1440,140 L1440,240 L0,240 Z"
            fill="#2E6B8E"
            fillOpacity="0.55"
          />
        </svg>

      </div>

      {/* Bottom tagline */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10px',
          color: 'rgba(26,53,102,0.6)',
          letterSpacing: '0.2em',
          textAlign: 'center',
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          margin: 0,
          whiteSpace: 'nowrap',
        }}
      >
        ρέω · 流れ · Flow
      </p>
    </section>
  );
}
