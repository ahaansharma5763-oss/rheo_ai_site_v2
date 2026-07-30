'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';

/* §8 — "If they go quiet, it follows up. Five times."
 * Rows on a connector line, not cards: the spacing IS the content, so the
 * gaps physically widen down the ladder. Past Touch 5 the line runs on and
 * terminates in a square gold node — a literal full stop — beside the page's
 * one italic serif line. The draw halts dead with no ease-out tail: the
 * animation stopping is the message. */

const TOUCHES = [
  {
    marker: '+3 HRS',
    title: 'Touch 1, a few hours later.',
    body: 'A short nudge. Is there anything else they wanted to know.',
    gap: 0,
  },
  {
    marker: 'DAY 2',
    title: 'Touch 2, day 2.',
    body: 'Answers the question they were probably too polite to ask. Usually the price objection, or the “is this really needed” hesitation.',
    gap: 24,
  },
  {
    marker: 'DAY 4',
    title: 'Touch 3, day 4.',
    body: 'Proof. A real customer’s result or testimonial, matched to what this person asked about.',
    gap: 32,
  },
  {
    marker: 'DAY 7',
    title: 'Touch 4, day 7.',
    body: 'A specific slot. Not “let us know,” but “Saturday 4pm is open, should I hold it.”',
    gap: 40,
  },
  {
    marker: 'DAY 12',
    title: 'Touch 5, day 12.',
    body: 'The polite close. Should we keep this open, or close it for now. This one gets more replies than people expect.',
    gap: 48,
  },
];

export function FollowUpLadder() {
  const stopRef = useRef<HTMLDivElement>(null);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    const el = stopRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStopped(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          setStopped(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="five-follow-ups" style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'var(--fs-h2)',
              lineHeight: 1.15,
              color: 'var(--fg)',
              marginBottom: '16px',
            }}
          >
            If they go quiet, it follows up. Five times.
          </h2>
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: 'var(--fs-body)',
              lineHeight: 1.75,
              color: 'var(--text-2)',
              marginBottom: 'clamp(44px, 6vh, 60px)',
            }}
          >
            Five separate touchpoints, spaced out, each one saying something different.
          </p>
        </Reveal>

        <div style={{ position: 'relative', paddingLeft: '96px' }} className="fy-ladder">
          {/* Connector */}
          <div
            aria-hidden
            style={{ position: 'absolute', left: '20px', top: '6px', bottom: 0, width: '1px', background: 'rgba(30,64,128,0.45)' }}
          />

          {TOUCHES.map((t, i) => (
            <Reveal key={t.marker} delay={i * 120}>
              <div style={{ position: 'relative', marginTop: `${t.gap}px`, opacity: stopped ? 0.65 : 1, transition: 'opacity 0.4s var(--ease)' }}>
                {/* Tick node on the line */}
                <span
                  aria-hidden
                  className="fy-tick"
                  style={{ position: 'absolute', top: '7px', width: '5px', height: '5px', background: 'var(--crest)' }}
                />
                <span
                  className="fy-ladder-marker"
                  style={{
                    position: 'absolute',
                    left: '-96px',
                    top: '26px',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-3)',
                    width: '60px',
                  }}
                >
                  {t.marker}
                </span>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'var(--fs-body)', color: 'var(--fg)', marginBottom: '6px' }}>
                  {t.title}
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body-sm)', lineHeight: 'var(--lh-body)', color: 'var(--text-2)' }}>{t.body}</p>
              </div>
            </Reveal>
          ))}

          {/* The stop */}
          <div ref={stopRef} style={{ position: 'relative', marginTop: '56px', paddingTop: '8px' }}>
            <span
              aria-hidden
              className="fy-seg fy-seg--stop fy-stopseg"
              style={{
                position: 'absolute',
                top: '-48px',
                height: '48px',
                width: '1px',
                background: 'var(--gold-line)',
                transform: stopped ? 'scaleY(1)' : 'scaleY(0)',
              }}
            />
            <span
              aria-hidden
              className="fy-stopnode"
              style={{
                position: 'absolute',
                top: '2px',
                width: '7px',
                height: '7px',
                background: 'var(--gold-line)',
                opacity: stopped ? 1 : 0,
                transition: 'opacity 0.1s steps(1, end)',
              }}
            />
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.25rem, 2.2vw, 1.45rem)',
                lineHeight: 1.4,
                color: 'var(--fg)',
                marginBottom: '10px',
              }}
            >
              The moment they reply at any point, all of it stops.
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body-sm)', lineHeight: 'var(--lh-body)', color: 'var(--text-2)' }}>
              Nobody ever gets chased after they have already answered.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .fy-tick { left: -78px; }
        .fy-stopseg { left: -76px; }
        .fy-stopnode { left: -79px; }
        @media (max-width: 700px) {
          .fy-ladder { padding-left: 44px !important; }
          .fy-tick { left: -26px; }
          .fy-stopseg { left: -24px; }
          .fy-stopnode { left: -27px; }
          .fy-ladder .fy-ladder-marker {
            position: static !important;
            display: block;
            width: auto !important;
            margin-bottom: 6px;
          }
        }
      `}</style>
    </section>
  );
}
