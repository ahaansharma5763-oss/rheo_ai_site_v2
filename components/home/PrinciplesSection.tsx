'use client';

import { useEffect, useRef } from 'react';
import WaveSystem from '@/components/shared/WaveSystem';

const principles = [
  {
    name: 'Process before tools',
    explanation: 'Technology amplifies existing structure. Not the other way around.',
  },
  {
    name: 'Reliability over novelty',
    explanation: 'Systems that run every day matter more than systems that impress once.',
  },
  {
    name: 'Clarity over complexity',
    explanation: "If your ops team can't understand the flow, it will break.",
  },
  {
    name: 'Outcomes over outputs',
    explanation:
      'We measure success by time saved, errors eliminated, and revenue recovered.',
  },
];

export default function PrinciplesSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (!card) return;
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = parseInt(el.dataset.idx ?? '0', 10);
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, idx * 100);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        background: 'var(--navy)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <WaveSystem intensity="subtle" style={{ zIndex: 0 }} />
      {/* Top-left corner bracket */}
      <svg
        width="32"
        height="32"
        style={{ position: 'absolute', top: '4px', left: '4px' }}
        aria-hidden="true"
      >
        <path d="M0,32 L0,0 L32,0" stroke="#C4A25A" strokeWidth="1.5" fill="none" opacity="0.6" />
      </svg>

      {/* Bottom-right corner bracket */}
      <svg
        width="32"
        height="32"
        style={{ position: 'absolute', bottom: '4px', right: '4px' }}
        aria-hidden="true"
      >
        <path
          d="M32,0 L32,32 L0,32"
          stroke="#C4A25A"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
      </svg>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 64px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="principles-inner"
      >
        {/* Label */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            margin: '0 0 48px 0',
            position: 'relative',
            zIndex: 1,
          }}
        >
          WHAT WE STAND FOR
        </p>

        {/* 2x2 grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 0,
            textAlign: 'left',
          }}
          className="principles-grid"
        >
          {principles.map((p, i) => (
            <div
              key={p.name}
              ref={(el) => { cardRefs.current[i] = el; }}
              data-idx={i}
              className="principle-card"
              style={{
                padding: '32px 28px',
                borderTop: '1px solid rgba(196,162,90,0.35)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                // Right column gets left border to separate columns
                borderLeft: i % 2 === 1 ? '1px solid rgba(196,162,90,0.15)' : undefined,
                transition: 'transform 0.25s ease, background 0.25s ease',
                cursor: 'default',
              }}
            >
              {/* Gold square bullet */}
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'var(--gold)',
                  flexShrink: 0,
                }}
              />

              <p
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '22px',
                  color: 'var(--warm-foam)',
                  letterSpacing: '0.1em',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {p.name}
              </p>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  color: 'var(--ocean)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {p.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .principle-card:hover {
          transform: scale(1.02);
          background: rgba(26,53,102,0.3);
        }
        @media (max-width: 768px) {
          .principles-inner {
            padding: 0 24px !important;
          }
          .principles-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
