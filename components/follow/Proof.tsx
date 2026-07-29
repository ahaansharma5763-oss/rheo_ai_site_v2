'use client';

import { useState } from 'react';
import Reveal from '@/components/home/Reveal';

/* §13 — Results. Frozen numbers, anonymized exactly as published, no
 * count-ups (animating historical numbers reads as inflation). Ink Night
 * plate: proof gets the vault treatment. */

const CASES = [
  {
    stat: '14% → 30%',
    line: 'A Pune clinic on the same ad spend moved its close rate from 14% to 30% just by answering enquiries in time, about ₹49,000 more a month.',
    quote: '“We were blaming the leads. Turns out we just weren’t answering them.”',
    who: 'Founder, aesthetics clinic, Pune',
    window: 'FIRST 90 DAYS',
  },
  {
    stat: '9% → 21%',
    line: 'A consultant we set this up for went from closing 9% of enquiries to 21%, purely from follow-up that ran on its own.',
    quote: '“I was giving up after one message. The system follows up the way I never had time to.”',
    who: 'Independent strategy consultant',
    window: 'FIRST 90 DAYS',
  },
  {
    stat: '24% fewer no-shows',
    line: 'A Pune studio cut no-shows by around 24% and started catching the members who used to quietly lapse.',
    quote: '“No-shows used to kill us and lapsed members just vanished. Now both get caught automatically.”',
    who: 'Owner, boutique fitness studio, Pune',
    window: 'FIRST QUARTER · NO-SHOW RECOVERY + REACTIVATION',
  },
];

export function FYProof() {
  return (
    <section
      id="results"
      style={{
        background: 'var(--bg-low)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: 'var(--section-gap) var(--rail-pad)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            Results
          </span>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
              color: 'var(--fg)',
              marginBottom: 'clamp(40px, 6vh, 56px)',
            }}
          >
            Same leads. Same spend.
          </h2>
        </Reveal>

        <div className="fy-proof-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {CASES.map((c, i) => (
            <Reveal key={c.who} delay={i * 130}>
              <a
                href="/work"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  background: 'var(--panel)',
                  border: '1px solid var(--line)',
                  padding: 'clamp(24px, 3vw, 32px)',
                  transition: 'border-color 0.16s var(--ease)',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(196,162,90,0.45)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'var(--text-3)', marginBottom: '18px' }}>
                  {c.window}
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(1.7rem, 2.6vw, 2.2rem)', lineHeight: 1.1, color: 'var(--fg)', marginBottom: '18px' }}>
                  {c.stat}
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--text-2)', marginBottom: '22px', flex: 1 }}>
                  {c.line}
                </p>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '15px', lineHeight: 1.6, color: 'var(--fg)', marginBottom: '10px' }}>
                  {c.quote}
                </p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                  {c.who}
                </p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p style={{ marginTop: '36px' }}>
            <a href="/work" className="fy-link" style={{ fontFamily: 'var(--sans)', fontSize: '14px', letterSpacing: '0.04em' }}>
              Read the full results
            </a>
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .fy-proof-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* FAQ — the master copy's objection answers, verbatim. Placed between
 * "What this is not" and "Who this is for". */

import { FAQS } from './faqData';

export function FYFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section style={{ padding: '0 var(--rail-pad) var(--section-gap)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow eyebrow--quiet" style={{ display: 'block', marginBottom: '12px' }}>
            Questions
          </span>
        </Reveal>
        <div style={{ borderTop: '1px solid var(--line-soft)' }}>
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--line-soft)' }}>
                <h3 style={{ margin: 0, fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'normal' }}>
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: '18px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: '20px 0',
                  }}
                >
                  <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'clamp(15px, 1.4vw, 17px)', color: 'var(--fg)', lineHeight: 1.5 }}>
                    {f.q}
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
                </h3>
                {open && (
                  <p
                    id={`faq-a-${i}`}
                    aria-labelledby={`faq-q-${i}`}
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '15px',
                      lineHeight: 1.75,
                      color: 'var(--text-2)',
                      padding: '0 0 22px',
                      maxWidth: '60ch',
                    }}
                  >
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
