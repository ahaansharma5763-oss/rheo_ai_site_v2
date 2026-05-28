'use client';

import Reveal from '@/components/home/Reveal';

const BELIEFS = [
  {
    n: '01',
    title: 'Process before tools.',
    body:
      'Software does not fix broken workflows. It accelerates them. Before we build a single automation, we map how the work actually moves through your business. Where does it stall? Where does it get lost? Where does the owner end up doing what the system should be doing? Then we build. Most agencies skip this step. We refuse to.',
  },
  {
    n: '02',
    title: 'Reliability over novelty.',
    body:
      'There is a new AI model every week. We do not chase them. We use a small set of proven tools (n8n, Claude, WhatsApp Business API, Razorpay) and we use them well. A system that works every day for two years matters more than one that demos brilliantly once. Boring on purpose. Reliable by design.',
  },
  {
    n: '03',
    title: 'Clarity over complexity.',
    body:
      'Clever workflows break in production at 11pm on a Saturday. Clear workflows scale. We keep architecture simple, name things plainly, and write documentation a junior staff member can follow. If we cannot explain a system to you in a single sentence, we have not finished building it.',
  },
  {
    n: '04',
    title: 'Outcomes over outputs.',
    body:
      'Nobody cares how many workflows we built. They care whether the leads got answered, the bookings got confirmed, the payments came in, the staff showed up. Every system we ship is measured against a number, before and after. If the number does not move, the system is not done.',
  },
];

export default function WhatWeBelieve() {
  return (
    <section style={{
      padding: 'clamp(160px, 24vh, 260px) var(--rail-pad)',
      borderTop: '1px solid rgba(242,240,236,0.06)',
    }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '40px' }}>What We Believe</p>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            fontWeight: 400,
            maxWidth: '18ch',
            marginBottom: 'clamp(80px, 12vh, 140px)',
          }}>
            Four principles. We do not break them.
          </h2>
        </Reveal>

        <div>
          {BELIEFS.map((b, i) => (
            <Reveal key={b.n} delay={i * 80}>
              <article style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 2fr)',
                gap: 'clamp(32px, 6vw, 96px)',
                padding: 'clamp(48px, 7vh, 80px) 0',
                borderTop: '1px solid rgba(242,240,236,0.08)',
                alignItems: 'baseline',
              }}
              className="belief-row">
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}>
                  <span style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '13px',
                    letterSpacing: '0.4em',
                    color: 'var(--gold)',
                    fontWeight: 500,
                  }}>
                    {b.n}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(28px, 3.6vw, 44px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.018em',
                    color: 'var(--fg)',
                    fontWeight: 400,
                    maxWidth: '14ch',
                  }}>
                    {b.title}
                  </h3>
                </div>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontSize: 'clamp(16px, 1.4vw, 19px)',
                  lineHeight: 1.75,
                  color: 'var(--fg-mute)',
                  fontWeight: 300,
                  maxWidth: '60ch',
                }}>
                  {b.body}
                </p>
              </article>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid rgba(242,240,236,0.08)' }} />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .belief-row { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      ` }} />
    </section>
  );
}
