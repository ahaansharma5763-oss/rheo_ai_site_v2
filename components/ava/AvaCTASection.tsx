'use client';

import { useEffect, useRef } from 'react';

export default function AvaCTASection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        background: 'rgba(7,16,30,0.35)',
        padding: '140px 24px 0',
        overflow: 'hidden',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <style>{`
        .ava-cta-btn {
          display: inline-block;
          padding: 14px 36px;
          border: 1px solid var(--gold);
          background: transparent;
          color: var(--gold);
          font-family: var(--sans);
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
          margin-top: 40px;
        }
        .ava-cta-btn:hover {
          background: var(--gold);
          color: var(--ink);
        }
      `}</style>

      {/* Main content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '700px',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '48px',
            color: 'var(--warm-foam)',
            letterSpacing: '0.1em',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Deploy Ava for your business.
        </h2>

        {/* Gold diamond */}
        <div
          style={{
            fontSize: '16px',
            color: 'var(--gold)',
            marginTop: '28px',
            letterSpacing: '0.3em',
          }}
          aria-hidden="true"
        >
          ◆
        </div>

        <button
          className="ava-cta-btn"
          onClick={() => {
            // @ts-ignore
            if (window.Calendly) window.Calendly.initPopupWidget({ url: 'https://calendly.com/ahaan-rheoai/30min' })
            else window.location.href = 'mailto:ahaan@rheoai.co.in'
          }}
          type="button"
        >
          Get in touch →
        </button>
      </div>

      {/* Wave system, bottom 65% */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {/* Layer 1, deepest back */}
        <svg
          viewBox="0 0 1440 200"
          width="100%"
          height="200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,120 C240,60 480,160 720,80 C960,0 1200,120 1440,60 L1440,200 L0,200 Z"
            fill="#1A3566"
            fillOpacity="0.4"
          />
        </svg>

        {/* Layer 2 */}
        <svg
          viewBox="0 0 1440 200"
          width="100%"
          height="200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,100 C200,40 440,140 720,70 C1000,0 1240,110 1440,50 L1440,200 L0,200 Z"
            fill="#1A3566"
            fillOpacity="0.6"
          />
        </svg>

        {/* Layer 3 */}
        <svg
          viewBox="0 0 1440 200"
          width="100%"
          height="200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,140 C280,80 520,160 760,100 C1000,40 1200,140 1440,80 L1440,200 L0,200 Z"
            fill="#2E6B8E"
            fillOpacity="0.5"
          />
        </svg>

        {/* Layer 4, front with gold hairline */}
        <svg
          viewBox="0 0 1440 200"
          width="100%"
          height="200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,160 C200,100 440,180 720,120 C1000,60 1240,160 1440,100"
            fill="none"
            stroke="#C4A25A"
            strokeWidth="0.7"
          />
          <path
            d="M0,160 C200,100 440,180 720,120 C1000,60 1240,160 1440,100 L1440,200 L0,200 Z"
            fill="#0D1F3C"
            fillOpacity="0.9"
          />
        </svg>
      </div>
    </section>
  );
}
