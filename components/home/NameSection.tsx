'use client';

import { useEffect, useRef } from 'react';

export default function NameSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cols = [leftRef.current, rightRef.current];
    const transforms = ['translateX(-40px)', 'translateX(40px)'];

    cols.forEach((col, i) => {
      if (!col) return;
      col.style.opacity = '0';
      col.style.transform = transforms[i];
      col.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateX(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    cols.forEach((col) => {
      if (col) observer.observe(col);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: 'var(--navy)',
        padding: '120px 0',
      }}
    >
      {/* Inner container */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 64px',
        }}
        className="name-inner"
      >
        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 0,
          }}
          className="name-grid"
        >
          {/* LEFT */}
          <div
            ref={leftRef}
            style={{ paddingRight: '64px' }}
            className="name-col-left"
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                margin: '0 0 20px 0',
              }}
            >
              THE NAME
            </p>

            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '72px',
                color: 'var(--gold)',
                letterSpacing: '0.1em',
                margin: 0,
                lineHeight: 1,
              }}
            >
              ρέω
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: 'var(--ocean)',
                letterSpacing: '0.12em',
                margin: '8px 0 0 0',
              }}
            >
              Greek · rheō · to flow
            </p>

            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: '14px',
                color: 'var(--warm-foam)',
                lineHeight: 1.8,
                margin: '20px 0 0 0',
              }}
            >
              Movement without friction. Intelligence without noise.
            </p>
          </div>

          {/* DIVIDER */}
          <div
            className="name-divider"
            style={{
              width: '1px',
              borderRight: '1px solid rgba(196,162,90,0.3)',
              alignSelf: 'stretch',
            }}
          />

          {/* RIGHT */}
          <div
            ref={rightRef}
            style={{ paddingLeft: '64px' }}
            className="name-col-right"
          >
            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '66px',
                color: 'var(--gold)',
                letterSpacing: '0.1em',
                margin: 0,
                lineHeight: 1,
              }}
            >
              流れ
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '12px',
                color: 'var(--ocean)',
                letterSpacing: '0.12em',
                margin: '8px 0 0 0',
              }}
            >
              Japanese · Nagare · The natural state, unobstructed
            </p>

            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: '14px',
                color: 'var(--warm-foam)',
                lineHeight: 1.8,
                margin: '20px 0 0 0',
              }}
            >
              Two philosophies. One name. One purpose.
            </p>
          </div>
        </div>

        {/* Decorative wave */}
        <div style={{ marginTop: '64px' }}>
          <svg
            viewBox="0 0 1200 40"
            width="100%"
            height="40"
            preserveAspectRatio="none"
            style={{ display: 'block' }}
          >
            <path
              d="M0,20 C100,10 200,30 300,20 C400,10 500,30 600,20 C700,10 800,30 900,20 C1000,10 1100,30 1200,20"
              fill="none"
              stroke="var(--ocean)"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
            <path
              d="M0,26 C100,16 200,36 300,26 C400,16 500,36 600,26 C700,16 800,36 900,26 C1000,16 1100,36 1200,26"
              fill="none"
              stroke="var(--ocean)"
              strokeWidth="0.5"
              strokeOpacity="0.2"
            />
          </svg>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .name-inner {
            padding: 0 24px !important;
          }
          .name-grid {
            grid-template-columns: 1fr !important;
          }
          .name-col-left {
            padding-right: 0 !important;
            padding-bottom: 32px !important;
          }
          .name-col-right {
            padding-left: 0 !important;
            padding-top: 32px !important;
          }
          .name-divider {
            width: 40px !important;
            height: 1px !important;
            border-right: none !important;
            border-top: 1px solid rgba(196,162,90,0.3) !important;
            margin: 0 auto !important;
            align-self: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
