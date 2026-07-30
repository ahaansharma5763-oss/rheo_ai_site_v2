'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';

/* §7 — "What happens to your next enquiry", steps 1 to 9.
 * Titles carry the whole story on their own; detail opens on tap. Steps 1 and
 * 2 start open so the pattern is obvious. Ghosted serif numerals rise to foam
 * as each step activates; the rail fills in discrete compositor-only beats. */

/* Chat display — approved script, 2026-07-29. Neutral navy chat, 0 radius,
 * deliberately not WhatsApp: no green, no logo, no ticks. */
export function ChatProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(4);
      return;
    }
    let timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && e.boundingClientRect.top >= 0) return;
        io.disconnect();
        timers = [
          setTimeout(() => setPhase(1), 200),
          setTimeout(() => setPhase(2), 1100),
          setTimeout(() => setPhase(3), 2400),
          setTimeout(() => setPhase(4), 3200),
        ];
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const bubble: React.CSSProperties = {
    padding: '13px 16px',
    fontFamily: 'var(--sans)',
    fontSize: 'var(--fs-body-sm)',
    lineHeight: 1.6,
    color: 'var(--fg)',
    animation: 'fyMsgIn 0.4s var(--ease) both',
  };

  return (
    <div
      ref={ref}
      style={{
        maxWidth: '440px',
        border: '1px solid var(--line)',
        background: 'rgba(5,14,29,0.6)',
        padding: '20px 18px',
        marginTop: '26px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '240px' }}>
        <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '0.66rem', letterSpacing: '0.18em', color: 'var(--text-3)' }}>
          SUNDAY · 11:40 PM
        </div>

        {phase >= 1 && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '88%' }}>
            <div style={{ ...bubble, background: 'var(--panel)', border: '1px solid var(--line)' }}>
              Hi, do you do ceramic coating for a Creta? What will it cost?
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-3)', marginTop: '5px' }}>11:40 PM</div>
          </div>
        )}

        {phase === 2 && (
          <div
            aria-hidden
            style={{
              alignSelf: 'flex-end',
              display: 'flex',
              gap: '5px',
              padding: '14px 16px',
              background: 'rgba(30,64,128,0.4)',
              border: '1px solid var(--line)',
              animation: 'fyMsgIn 0.4s var(--ease) both',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: '5px', height: '5px', background: 'var(--text-2)', animation: `fyTyping 1.1s ease-in-out ${i * 0.18}s infinite` }} />
            ))}
          </div>
        )}

        {phase >= 3 && (
          <div style={{ alignSelf: 'flex-end', maxWidth: '88%' }}>
            <div style={{ ...bubble, background: 'rgba(30,64,128,0.4)', border: '1px solid var(--line)' }}>
              Yes, we do. Ceramic coating for a Creta is ₹18,500 and takes two days. Thursday 11am is open if
              you want to bring it in. Should I hold the slot?
            </div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--text-3)', marginTop: '5px', textAlign: 'right' }}>
              11:41 PM
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          borderTop: '1px solid var(--line-soft)',
          marginTop: '14px',
          paddingTop: '12px',
          textAlign: 'center',
          fontFamily: 'var(--mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.22em',
          color: 'var(--gold-text)',
          opacity: phase >= 4 ? 1 : 0,
          transition: 'opacity 0.5s var(--ease)',
        }}
      >
        REPLIED IN 41 SECONDS
      </div>
    </div>
  );
}

interface Step {
  title: string;
  detail: string;
  extra?: React.ReactNode;
}

/* Titles alone tell the whole story. Detail is one tight paragraph. */
const STEPS: Step[] = [
  {
    title: 'The enquiry arrives, from anywhere.',
    detail:
      'WhatsApp, Instagram, your website form, a Google enquiry, a missed call. Five inboxes that five people half-watch become one.',
  },
  {
    title: 'It replies in under 60 seconds.',
    detail:
      'At 2pm on a Tuesday or 11:40pm on a Sunday. It greets them by name and answers what they actually asked, not “our team will contact you shortly”. This step alone is usually the biggest change, because it is the moment your competitors lose them.',
    extra: <ChatProof />,
  },
  {
    title: 'It answers their questions, properly.',
    detail:
      'Prices. What is included. How long it takes. Whether you do this particular thing. The fifteen questions your team answers by hand every day, answered from your real information.',
  },
  {
    title: 'It works out who this person is.',
    detail:
      'What they want, how soon, roughly what they will spend, and whether they are ready or still comparing. Each person is marked hot, warm or cold. By the time you look at your screen, your leads are already sorted.',
  },
  {
    title: 'It moves them towards the booking.',
    detail:
      'Two available slots, a quotation, or a locked callback time. It does not wait to be asked. If someone is ready, the next step is in front of them while they still care.',
  },
  {
    title: 'If they go quiet, it follows up. Five times.',
    detail: 'This is where most businesses lose the most money, because almost nobody follows up more than once.',
  },
  {
    title: 'The booking lands in your calendar.',
    detail:
      'Nobody enters it. The customer gets a confirmation, then a reminder before the appointment so they actually turn up.',
  },
  {
    title: 'Anything it should not handle goes to a human.',
    detail:
      'Outside what your business told it, it does not guess. Angry, complicated, or they simply ask for a person: it hands over with everything already discussed attached.',
  },
  {
    title: 'Every bit of it is recorded.',
    detail: 'Which brings us to your screen.',
  },
];

function TimelineStep({ n, step, last, startOpen }: { n: number; step: Step; last: boolean; startOpen: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(startOpen);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="fy-step" style={{ display: 'grid', gridTemplateColumns: '84px 1fr', columnGap: '12px' }}>
      {/* Rail: numeral + discrete fill segment */}
      <div
        className="fy-step-rail"
        style={{ position: 'relative', display: 'flex', justifyContent: 'center', ['--fy-num-h' as string]: 'clamp(1.9rem, 3.2vw, 2.9rem)' }}
      >
        <span
          className="fy-step-num"
          aria-hidden
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'var(--fy-num-h)',
            lineHeight: 1,
            color: active ? 'var(--fg)' : 'var(--text-3)',
            opacity: active ? 1 : 0.45,
            transition: 'color 0.4s var(--ease), opacity 0.4s var(--ease)',
          }}
        >
          {n}
        </span>
        {!last && (
          <>
            <div
              aria-hidden
              style={{ position: 'absolute', top: 'calc(var(--fy-num-h) + 12px)', bottom: '6px', width: '1px', background: 'rgba(30,64,128,0.45)' }}
            />
            <div
              aria-hidden
              className={`fy-seg${active ? ' in' : ''}`}
              style={{ position: 'absolute', top: 'calc(var(--fy-num-h) + 12px)', bottom: '6px', width: '1px', background: 'var(--crest)' }}
            />
          </>
        )}
      </div>

      {/* Content — title always visible, detail on tap */}
      <div style={{ paddingBottom: last ? '0' : 'clamp(26px, 4vh, 40px)', minWidth: 0 }}>
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls={`step-d-${n}`}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '16px',
            background: 'none',
            border: 'none',
            padding: '0.3em 0 0',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <span style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'var(--fs-h3)', lineHeight: 1.3, color: 'var(--fg)' }}>
            {step.title}
          </span>
          <span
            aria-hidden
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '1rem',
              color: 'var(--text-3)',
              transform: open ? 'rotate(45deg)' : 'none',
              transition: 'transform 0.16s var(--ease)',
              flexShrink: 0,
            }}
          >
            +
          </span>
        </button>
        {open && (
          <div id={`step-d-${n}`} style={{ paddingTop: '12px' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)', color: 'var(--text-2)' }}>
              {step.detail}
            </p>
            {n === 6 && (
              <p style={{ marginTop: '12px' }}>
                <a href="#five-follow-ups" className="fy-link" style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body-sm)' }}>
                  See the five follow-ups
                </a>
              </p>
            )}
            {step.extra}
          </div>
        )}
      </div>
    </div>
  );
}

export function StepTimeline() {
  return (
    <section id="how-it-works" style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow eyebrow--quiet" style={{ display: 'block', marginBottom: '20px' }}>
            How it works
          </span>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'var(--fs-h2)',
              lineHeight: 1.14,
              color: 'var(--fg)',
              marginBottom: '12px',
            }}
          >
            What happens to your next enquiry
          </h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-3)', marginBottom: 'clamp(40px, 6vh, 60px)' }}>
            Nine steps. Tap any one to see the detail.
          </p>
        </Reveal>

        <div>
          {STEPS.map((s, i) => (
            <TimelineStep key={i} n={i + 1} step={s} last={i === STEPS.length - 1} startOpen={i < 2} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .fy-step { grid-template-columns: 42px 1fr !important; }
          .fy-step-rail { --fy-num-h: 1.5rem; }
        }
      `}</style>
    </section>
  );
}
