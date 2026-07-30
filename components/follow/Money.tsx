'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';
import { useCountUp } from './useCountUp';

/* §4 — "What it costs, in rupees."
 * A split ledger of the same 80 enquiries producing two outcomes.
 * The right column visibly keeps catching after the left has stopped —
 * that asymmetry is the argument. One orchestrated moment, plays once. */

const TOTAL = 80;

function SquareGrid({ converted, on }: { converted: number; on: boolean }) {
  return (
    <div
      aria-hidden
      className="fy-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(20, 1fr)',
        gap: '3px',
        width: '100%',
        maxWidth: '340px',
      }}
    >
      {Array.from({ length: TOTAL }, (_, i) => (
        <div key={i} style={{ position: 'relative', aspectRatio: '1', background: 'rgba(30,64,128,0.35)' }}>
          {i < converted && (
            <div
              className={`fy-sq${on ? ' in' : ''}`}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--crest)',
                transitionDelay: `${200 + i * 18}ms`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function LedgerCompare() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  const left = useCountUp(120000, 900, 800);
  const right = useCountUp(200000, 900, 800);
  const diff = useCountUp(80000, 700, 1800);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="the-money" style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div ref={rootRef} style={{ maxWidth: '880px', margin: '0 auto' }}>
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'var(--fs-h2)',
              color: 'var(--fg)',
              marginBottom: '20px',
            }}
          >
            What it costs, in rupees.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              color: 'var(--text-3)',
              marginBottom: '44px',
            }}
          >
            80 ENQUIRIES A MONTH · AVERAGE SALE ₹8,000
          </p>
        </Reveal>

        {/* The two outcomes, same raw material */}
        <div
          className="fy-ledger-cols"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1px 1fr',
            gap: 'clamp(24px, 4vw, 48px)',
            alignItems: 'start',
            marginBottom: '52px',
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-2)', marginBottom: '18px' }}>
              Convert 15 of them
            </p>
            <SquareGrid converted={15} on={on} />
            <div
              ref={left.ref}
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)',
                color: 'var(--fg)',
                marginTop: '22px',
                fontVariantNumeric: 'tabular-nums',
                minWidth: '9ch',
              }}
            >
              ₹{left.text}
            </div>
          </div>

          <div className="fy-ledger-rule" style={{ background: 'var(--line)', width: '1px', height: '100%', minHeight: '120px' }} />

          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-2)', marginBottom: '18px' }}>
              Convert 25 of them, from the same 80 enquiries, the same ads, the same money you already spent
            </p>
            <SquareGrid converted={25} on={on} />
            <div
              ref={right.ref}
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)',
                color: 'var(--fg)',
                marginTop: '22px',
                fontVariantNumeric: 'tabular-nums',
                minWidth: '9ch',
              }}
            >
              ₹{right.text}
            </div>
          </div>
        </div>

        {/* The difference — the section's one gold */}
        <div>
          <div
            className={`fy-drawline${on ? ' in' : ''}`}
            style={{ height: '1px', background: 'var(--gold-line)', transitionDelay: '1700ms', marginBottom: '28px' }}
          />
          <div
            ref={diff.ref}
            style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap', marginBottom: '18px' }}
          >
            <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-2)' }}>That is</span>
            <span
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(2.6rem, 5.5vw, 3.6rem)',
                lineHeight: 1,
                color: 'var(--gold-text)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              ₹{diff.text}
            </span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-2)' }}>more a month.</span>
          </div>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.04em',
              lineHeight: 1.8,
              color: 'var(--text-3)',
              marginBottom: '24px',
            }}
          >
            Close to ₹10 lakh a year. You spent nothing extra to get it. You stopped losing people in the middle.
          </p>
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              fontSize: 'var(--fs-lead)',
              color: 'var(--fg)',
              maxWidth: '46ch',
            }}
          >
            This is the cheapest money in your business, because you have already paid for it.
          </p>
        </div>
      </div>

      <style>{`
        .fy-ledger-cols .fy-grid { }
        @media (max-width: 700px) {
          .fy-ledger-cols { grid-template-columns: 1fr !important; }
          .fy-ledger-rule { width: 100% !important; height: 1px !important; min-height: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* Frozen proof numbers, compressed to a strip. Full stories live at /work. */
const STATS = [
  { stat: '14% → 30%', label: 'Close rate · aesthetics clinic, Pune' },
  { stat: '9% → 21%', label: 'Close rate · strategy consultant' },
  { stat: '24% fewer no-shows', label: 'First quarter · fitness studio, Pune' },
];

export function StatStrip() {
  return (
    <section style={{ padding: '0 var(--rail-pad) var(--section-gap)' }}>
      <div
        style={{
          maxWidth: '880px',
          margin: '0 auto',
          borderTop: '1px solid var(--line-soft)',
          borderBottom: '1px solid var(--line-soft)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      >
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 120}>
            <div style={{ padding: '26px 20px' }}>
              <div
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                  color: 'var(--fg)',
                  marginBottom: '8px',
                }}
              >
                {s.stat}
              </div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                }}
              >
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
