'use client';

import { useEffect, useRef } from 'react';

export default function ProblemSection() {
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = leftRef.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';

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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const gapItems = [
    'WhatsApp ≠ CRM',
    'CRM ≠ Finance',
    'Finance ≠ Operations',
  ];

  const boxes = [
    { label: 'WhatsApp', x: 20, y: 40, w: 90, h: 36 },
    { label: 'CRM',      x: 250, y: 40, w: 80, h: 36 },
    { label: 'Finance',  x: 20, y: 200, w: 90, h: 36 },
    { label: 'Ops',      x: 250, y: 200, w: 80, h: 36 },
  ];

  // Midpoints for X markers
  const xMarkers = [
    // WhatsApp→CRM (horizontal top): midpoint of top edge centers
    { x: (20 + 45 + 250 + 40) / 2, y: 40 + 18 },
    // Finance→Ops (horizontal bottom)
    { x: (20 + 45 + 250 + 40) / 2, y: 200 + 18 },
    // WhatsApp→Finance (vertical left)
    { x: 20 + 45, y: (40 + 18 + 200 + 18) / 2 },
    // CRM→Ops (vertical right)
    { x: 250 + 40, y: (40 + 18 + 200 + 18) / 2 },
  ];

  return (
    <section
      style={{
        background: 'var(--ink)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes dashDraw {
          from { stroke-dashoffset: 80; }
          to   { stroke-dashoffset: 0; }
        }
        .problem-dash-line {
          animation: dashDraw 2s ease forwards;
          animation-play-state: paused;
        }
        .problem-svg-visible .problem-dash-line {
          animation-play-state: running;
        }
        .problem-gap-item:hover {
          color: var(--warm-foam) !important;
          border-left-color: var(--gold) !important;
        }
        @media (max-width: 767px) {
          .problem-right { display: none !important; }
          .problem-inner {
            flex-direction: column !important;
            padding: 0 24px !important;
          }
          .problem-left {
            width: 100% !important;
          }
        }
      `}</style>

      <div
        className="problem-inner"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 64px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* LEFT — 55% */}
        <div
          ref={leftRef}
          className="problem-left"
          style={{ width: '55%', flexShrink: 0 }}
        >
          {/* Label */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.44em',
              margin: 0,
            }}
          >
            THE PROBLEM
          </p>

          {/* Headline */}
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '42px',
              color: 'var(--warm-foam)',
              lineHeight: 1.25,
              letterSpacing: '0.12em',
              marginTop: '16px',
              marginBottom: 0,
            }}
          >
            Your operations are fragmented. Your data doesn&apos;t flow.
          </h2>

          {/* Body */}
          <div
            style={{
              marginTop: '24px',
              maxWidth: '480px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              color: 'var(--ocean)',
              lineHeight: 1.85,
            }}
          >
            <p style={{ margin: '0 0 16px 0' }}>
              Most businesses generate significant operational data — across WhatsApp, CRM platforms,
              accounting software, booking systems, and internal spreadsheets. These systems operate
              in isolation. No shared state. No event propagation. No unified data layer.
            </p>
            <p style={{ margin: 0 }}>
              The result is manual reconciliation, missed follow-ups, delayed decisions, and revenue
              leakage that compounds silently — every single day.
            </p>
          </div>

          {/* Gap items */}
          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {gapItems.map((item) => (
              <span
                key={item}
                className="problem-gap-item"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  color: 'var(--ocean)',
                  paddingLeft: '14px',
                  borderLeft: '2px solid rgba(196,162,90,0.5)',
                  lineHeight: 1.4,
                  transition: 'color 0.2s ease, border-left-color 0.2s ease',
                  cursor: 'default',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — 45%, desktop only */}
        <div
          className="problem-right"
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg
            viewBox="0 0 360 320"
            width="100%"
            style={{ maxWidth: '360px', display: 'block' }}
            aria-hidden="true"
          >
            {/* Dashed connecting lines */}
            {/* WhatsApp → CRM (horizontal top) */}
            <line
              className="problem-dash-line"
              x1={20 + 90} y1={40 + 18}
              x2={250}     y2={40 + 18}
              stroke="#C4A25A"
              strokeOpacity="0.6"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            {/* Finance → Ops (horizontal bottom) */}
            <line
              className="problem-dash-line"
              x1={20 + 90} y1={200 + 18}
              x2={250}     y2={200 + 18}
              stroke="#C4A25A"
              strokeOpacity="0.6"
              strokeWidth="1"
              strokeDasharray="4 8"
              style={{ animationDelay: '0.2s' }}
            />
            {/* WhatsApp → Finance (vertical left) */}
            <line
              className="problem-dash-line"
              x1={20 + 45} y1={40 + 36}
              x2={20 + 45} y2={200}
              stroke="#C4A25A"
              strokeOpacity="0.6"
              strokeWidth="1"
              strokeDasharray="4 8"
              style={{ animationDelay: '0.4s' }}
            />
            {/* CRM → Ops (vertical right) */}
            <line
              className="problem-dash-line"
              x1={250 + 40} y1={40 + 36}
              x2={250 + 40} y2={200}
              stroke="#C4A25A"
              strokeOpacity="0.6"
              strokeWidth="1"
              strokeDasharray="4 8"
              style={{ animationDelay: '0.6s' }}
            />

            {/* X markers at midpoints */}
            {xMarkers.map((m, i) => (
              <text
                key={i}
                x={m.x}
                y={m.y + 4}
                textAnchor="middle"
                fontSize="12"
                fill="#C4A25A"
                fillOpacity="0.4"
                fontFamily="'DM Sans', sans-serif"
              >
                ✕
              </text>
            ))}

            {/* Boxes */}
            {boxes.map((b) => (
              <g key={b.label}>
                <rect
                  x={b.x}
                  y={b.y}
                  width={b.w}
                  height={b.h}
                  rx="4"
                  ry="4"
                  fill="#1A3566"
                />
                <text
                  x={b.x + b.w / 2}
                  y={b.y + b.h / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#EEE8E0"
                  fontFamily="'DM Sans', sans-serif"
                >
                  {b.label}
                </text>
              </g>
            ))}

            {/* Caption */}
            <text
              x="180"
              y="310"
              textAnchor="middle"
              fontSize="10"
              fill="#2E6B8E"
              fontFamily="'DM Sans', sans-serif"
            >
              Isolated systems. No shared state.
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
