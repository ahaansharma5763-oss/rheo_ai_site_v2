'use client';

import { useEffect, useRef } from 'react';
import WaveSystem from '@/components/shared/WaveSystem';

const yourFocusItems = [
  'Client acquisition',
  'Face-to-face conversations',
  'Strategic decisions',
  'Relationship depth',
];

export default function ShiftSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

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
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Stagger reveal on focus items
    itemRefs.current.forEach((item) => {
      if (!item) return;
      item.style.opacity = '0';
      item.style.transform = 'translateX(-16px)';
    });

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt((entry.target as HTMLElement).dataset.shiftIdx ?? '0', 10);
            setTimeout(() => {
              const item = entry.target as HTMLElement;
              item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateX(0)';
            }, idx * 120);
            itemObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((item) => {
      if (item) itemObserver.observe(item);
    });

    return () => {
      observer.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  return (
    <section
      style={{
        background: 'var(--warm-foam)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <WaveSystem intensity="subtle" style={{ zIndex: 0, opacity: 0.06 }} />
      <style>{`
        @media (max-width: 767px) {
          .shift-cols {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .shift-inner {
            padding: 0 24px !important;
          }
        }
      `}</style>

      {/* Left gold vertical bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          background: 'var(--gold)',
        }}
        aria-hidden="true"
      />

      {/* Top flipped dark wave */}
      <svg
        viewBox="0 0 1440 80"
        width="100%"
        height="80"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          display: 'block',
          pointerEvents: 'none',
        }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,0 480,80 720,40 C960,0 1200,60 1440,30 L1440,0 L0,0 Z"
          fill="#0D1F3C"
          transform="scale(1,-1) translate(0,-80)"
        />
      </svg>

      {/* Main content */}
      <div
        ref={contentRef}
        className="shift-inner"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 64px',
          paddingTop: '40px',
        }}
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
          THE SHIFT
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '46px',
            color: 'var(--gold)',
            lineHeight: 1.2,
            letterSpacing: '0.12em',
            marginTop: '16px',
            marginBottom: 0,
            maxWidth: '700px',
          }}
        >
          We handle the data layer. You own the human layer.
        </h2>

        {/* Two columns */}
        <div
          className="shift-cols"
          style={{
            display: 'flex',
            marginTop: '48px',
            gap: '64px',
          }}
        >
          {/* YOUR FOCUS */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                color: 'var(--crest)',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                margin: '0 0 20px 0',
              }}
            >
              YOUR FOCUS
            </p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {yourFocusItems.map((item, idx) => (
                <li
                  key={item}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  data-shift-idx={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '15px',
                    color: 'var(--warm-foam)',
                    lineHeight: 1.8,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '4px',
                      height: '4px',
                      background: 'var(--gold)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* OUR RESPONSIBILITY */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                color: 'var(--crest)',
                textTransform: 'uppercase',
                letterSpacing: '0.24em',
                margin: '0 0 20px 0',
              }}
            >
              OUR RESPONSIBILITY
            </p>
            <p
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '13px',
                color: 'rgba(238,232,224,0.7)',
                lineHeight: 1.9,
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              Every lead, booking, payment, report, reminder, and reconciliation — automated,
              reliable, invisible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
