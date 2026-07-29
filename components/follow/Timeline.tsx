'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';

/* §7 — "What happens to your next enquiry", steps 1 to 9.
 * Ghosted serif numerals rise to foam as each step activates; the rail
 * fills in discrete swell-eased segments (IO class toggles, compositor
 * transforms only — no scroll-linked JS). The section's single gold lives
 * inside the chat at Step 2: "REPLIED IN 41 SECONDS". */

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
        if (!e.isIntersecting) return;
        io.disconnect();
        timers = [
          setTimeout(() => setPhase(1), 200),
          setTimeout(() => setPhase(2), 1100),
          setTimeout(() => setPhase(3), 2400),
          setTimeout(() => setPhase(4), 3200),
        ];
      },
      { threshold: 0.4, rootMargin: '100% 0px 0px 0px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const bubble: React.CSSProperties = {
    padding: '12px 15px',
    fontFamily: 'var(--sans)',
    fontSize: '14px',
    lineHeight: 1.55,
    color: 'var(--fg)',
    animation: 'fyMsgIn 0.4s var(--ease) both',
  };

  return (
    <div
      ref={ref}
      style={{
        maxWidth: '420px',
        border: '1px solid var(--line)',
        background: 'rgba(5,14,29,0.6)',
        padding: '20px 18px',
        marginTop: '28px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '230px' }}>
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'var(--mono)',
            fontSize: '0.66rem',
            letterSpacing: '0.18em',
            color: 'var(--text-3)',
          }}
        >
          SUNDAY · 11:40 PM
        </div>

        {phase >= 1 && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '86%' }}>
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
              <span
                key={i}
                style={{
                  width: '5px',
                  height: '5px',
                  background: 'var(--text-2)',
                  animation: `fyTyping 1.1s ease-in-out ${i * 0.18}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        {phase >= 3 && (
          <div style={{ alignSelf: 'flex-end', maxWidth: '86%' }}>
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
  body: React.ReactNode;
}

function TimelineStep({ n, step, last }: { n: number; step: Step; last: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

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
      { threshold: 0.25, rootMargin: '0px 0px -15% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="fy-step" style={{ display: 'grid', gridTemplateColumns: '88px 1fr', columnGap: '12px' }}>
      {/* Rail: numeral + discrete fill segment. --fy-num-h is overridden by
          the mobile media query so the rail offset tracks the numeral size. */}
      <div
        className="fy-step-rail"
        style={{ position: 'relative', display: 'flex', justifyContent: 'center', ['--fy-num-h' as string]: 'clamp(1.9rem, 3.2vw, 3rem)' }}
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
              style={{
                position: 'absolute',
                top: 'calc(var(--fy-num-h) + 14px)',
                bottom: '10px',
                width: '1px',
                background: 'rgba(30,64,128,0.45)',
              }}
            />
            <div
              aria-hidden
              className={`fy-seg${active ? ' in' : ''}`}
              style={{
                position: 'absolute',
                top: 'calc(var(--fy-num-h) + 14px)',
                bottom: '10px',
                width: '1px',
                background: 'var(--crest)',
              }}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: last ? '0' : 'clamp(48px, 7vh, 72px)', minWidth: 0 }}>
        <h3
          style={{
            fontFamily: 'var(--serif)',
            fontWeight: 400,
            fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
            lineHeight: 1.3,
            color: 'var(--fg)',
            margin: '0.35em 0 14px',
          }}
        >
          {step.title}
        </h3>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 16.5px)', lineHeight: 1.75, color: 'var(--text-2)' }}>
          {step.body}
        </div>
      </div>
    </div>
  );
}

const P = ({ children, last = false }: { children: React.ReactNode; last?: boolean }) => (
  <p style={{ marginBottom: last ? 0 : '14px' }}>{children}</p>
);

const STEPS: Step[] = [
  {
    title: 'The enquiry arrives, from anywhere.',
    body: (
      <>
        <P>
          WhatsApp, Instagram, your website form, a Google enquiry, a missed call. It does not matter which
          one. They all come into the same place.
        </P>
        <P last>
          Right now, those five channels are five different inboxes that five different people half-watch.
          From now on, they are one.
        </P>
      </>
    ),
  },
  {
    title: 'It replies in under 60 seconds.',
    body: (
      <>
        <P>At 2pm on a Tuesday, or 11:40pm on a Sunday. Same speed either way.</P>
        <P>
          It greets them by name, and answers what they actually asked, not a generic “thanks for reaching
          out, our team will contact you shortly.”
        </P>
        <P last>
          <span style={{ fontWeight: 500, color: 'var(--fg)' }}>
            This one step alone is usually the biggest change
          </span>
          , because it is the moment your competitors are losing them.
        </P>
        <ChatProof />
      </>
    ),
  },
  {
    title: 'It answers their questions, properly.',
    body: (
      <>
        <P>
          Prices. What is included and what is not. How long it takes. Whether you do this particular thing.
          Where you are. What time you open. Whether it is safe. Whether it will suit their case.
        </P>
        <P last>
          These are the fifteen or twenty questions your team answers every day by hand. It answers them
          from your real information, in the way you would answer them.
        </P>
      </>
    ),
  },
  {
    title: 'It works out who this person is.',
    body: (
      <>
        <P>
          While it is talking to them, it is figuring out what they actually want, how soon they want it,
          roughly what they are willing to spend, and whether they are ready to book or still comparing.
        </P>
        <P>
          It marks each person as <span style={{ fontWeight: 500, color: 'var(--fg)' }}>hot, warm or cold</span>,
          and records what stage of the decision they are at.
        </P>
        <P last>By the time you look at your screen, your leads are already sorted. You know who to call first.</P>
      </>
    ),
  },
  {
    title: 'It moves them towards the booking.',
    body: (
      <>
        <P>
          Depending on your business, that means offering two available slots, sending a quotation, or
          locking a callback time.
        </P>
        <P last>
          It does not wait to be asked. If someone is ready, it puts the next step in front of them while
          they are still interested.
        </P>
      </>
    ),
  },
  {
    title: 'If they go quiet, it follows up. Five times.',
    body: (
      <>
        <P>
          This is where most businesses lose the most money, because in practice almost nobody follows up
          more than once. It does.
        </P>
        <P last>
          <a href="#five-follow-ups" className="fy-link">
            See the five follow-ups
          </a>
        </P>
      </>
    ),
  },
  {
    title: 'The booking lands directly in your calendar.',
    body: (
      <P last>
        No one has to enter it. It appears in your calendar, the customer gets a confirmation, and they get
        a reminder before the appointment so they actually turn up.
      </P>
    ),
  },
  {
    title: 'Anything it should not handle goes straight to a human.',
    body: (
      <>
        <P>
          If someone asks something outside what your business has told it, it does not guess. It says so
          and brings your team in.
        </P>
        <P last>
          If someone is angry, or the case is complicated, or they simply ask for a person, it hands over
          immediately, along with everything already discussed. Your team never has to say “sorry, can you
          explain that again from the start.”
        </P>
      </>
    ),
  },
  {
    title: 'Every bit of it is recorded.',
    body: <P last>Which brings us to your screen.</P>,
  },
];

export function StepTimeline() {
  return (
    <section id="how-it-works" style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow eyebrow--quiet" style={{ display: 'block', marginBottom: '20px' }}>
            How it works
          </span>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
              lineHeight: 1.15,
              color: 'var(--fg)',
              marginBottom: '12px',
            }}
          >
            What happens to your next enquiry
          </h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '16px', color: 'var(--text-2)', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            Step by step.
          </p>
        </Reveal>

        <div>
          {STEPS.map((s, i) => (
            <TimelineStep key={i} n={i + 1} step={s} last={i === STEPS.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .fy-step { grid-template-columns: 44px 1fr !important; }
          .fy-step-rail { --fy-num-h: 1.5rem; }
        }
      `}</style>
    </section>
  );
}
