'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';
import { useCountUp } from './useCountUp';

/* §9 — "One page that shows you every lead in your business."
 * CSS-built mock. Anonymous placeholder rows, stage vocabulary lifted
 * exactly from the master copy. Stats are operational counts a mock can
 * honestly show — never invented revenue or conversion claims. The
 * dashboard interior is semantic-exempt on gold: Hot = gold, max two rows. */

interface LeadRow {
  id: string;
  source: string;
  stage: string;
  heat: 'Hot' | 'Warm' | 'Cold' | '·';
  next: string;
  turn: 'Ours' | 'Theirs' | '·';
}

const ROWS: LeadRow[] = [
  { id: 'Lead 014', source: 'Instagram', stage: 'Quoted', heat: 'Hot', next: 'Touch 3, tomorrow 10:00', turn: 'Theirs' },
  { id: 'Lead 015', source: 'WhatsApp', stage: 'New', heat: '·', next: 'Reply due', turn: 'Ours' },
  { id: 'Lead 013', source: 'Website', stage: 'Booked', heat: 'Warm', next: 'Reminder, Thursday', turn: '·' },
  { id: 'Lead 012', source: 'Google', stage: 'Answered', heat: 'Warm', next: 'Touch 1, 6:00 pm', turn: 'Theirs' },
  { id: 'Lead 011', source: 'Referral', stage: 'Qualified', heat: 'Hot', next: 'Slot offered', turn: 'Theirs' },
  { id: 'Lead 010', source: 'Instagram', stage: 'Completed', heat: '·', next: 'Review ask sent', turn: '·' },
  { id: 'Lead 009', source: 'WhatsApp', stage: 'Lost', heat: 'Cold', next: 'Closed politely', turn: '·' },
];

const heatColor = (h: LeadRow['heat']) =>
  h === 'Hot' ? 'var(--gold-text)' : h === 'Warm' ? 'var(--crest)' : 'var(--text-3)';

const MONO_CELL: React.CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: '0.72rem',
  letterSpacing: '0.02em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

function Frame() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const enq = useCountUp(47, 800, 300);

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
    <div ref={rootRef} style={{ background: 'var(--bg-low)', border: '1px solid var(--line)' }}>
      {/* Chrome */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <span style={{ ...MONO_CELL, color: 'var(--text-3)', letterSpacing: '0.14em' }}>LEADS · THIS WEEK</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
          <span aria-hidden style={{ width: '6px', height: '6px', background: 'var(--ok)' }} />
          <span style={{ ...MONO_CELL, color: 'var(--text-3)', letterSpacing: '0.14em' }}>LIVE</span>
        </span>
      </div>

      <div className="fy-dash-body" style={{ display: 'grid', gridTemplateColumns: '1fr 240px' }}>
        {/* Table */}
        <div style={{ padding: '6px 0', borderRight: '1px solid var(--line)', minWidth: 0 }}>
          <div
            className="fy-dash-row fy-dash-head"
            style={{ padding: '10px 16px', borderBottom: '1px solid var(--line-soft)' }}
          >
            {['LEAD', 'SOURCE', 'STAGE', 'HEAT', 'NEXT TOUCH', 'TURN'].map(h => (
              <span key={h} className={`fy-c-${h.split(' ')[0].toLowerCase()}`} style={{ ...MONO_CELL, fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--text-3)' }}>
                {h}
              </span>
            ))}
          </div>
          {ROWS.map((r, i) => (
            <div
              key={r.id}
              className={`fy-row fy-dash-row${on ? ' in' : ''}`}
              style={{
                padding: '11px 16px',
                borderBottom: i < ROWS.length - 1 ? '1px solid var(--line-soft)' : 'none',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <span className="fy-c-lead" style={{ ...MONO_CELL, color: 'var(--fg)' }}>{r.id}</span>
              <span className="fy-c-source" style={{ ...MONO_CELL, color: 'var(--text-2)' }}>{r.source}</span>
              <span className="fy-c-stage" style={{ ...MONO_CELL, color: 'var(--text-2)' }}>{r.stage}</span>
              <span className="fy-c-heat" style={{ ...MONO_CELL, color: heatColor(r.heat) }}>{r.heat}</span>
              <span className="fy-c-next" style={{ ...MONO_CELL, color: 'var(--text-2)' }}>{r.next}</span>
              <span
                className="fy-c-turn"
                style={{
                  ...MONO_CELL,
                  color: r.turn === 'Ours' ? 'var(--crit)' : 'var(--text-3)',
                  animation: r.turn === 'Ours' && on ? 'fyBlink 3s ease-in-out infinite' : 'none',
                }}
              >
                {r.turn}
              </span>
            </div>
          ))}
        </div>

        {/* Operational stats — counts and states only */}
        <div className="fy-dash-stats" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '18px 16px', borderBottom: '1px solid var(--line-soft)', flex: 1 }}>
            <div style={{ ...MONO_CELL, fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--text-3)', marginBottom: '8px' }}>
              ENQUIRIES THIS WEEK
            </div>
            <div ref={enq.ref} style={{ fontFamily: 'var(--serif)', fontSize: '1.9rem', color: 'var(--fg)', fontVariantNumeric: 'tabular-nums' }}>
              {enq.val}
            </div>
          </div>
          <div style={{ padding: '18px 16px', borderBottom: '1px solid var(--line-soft)', flex: 1 }}>
            <div style={{ ...MONO_CELL, fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--text-3)', marginBottom: '8px' }}>
              WAITING ON YOU
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.9rem', color: 'var(--crit)' }}>3</div>
          </div>
          <div style={{ padding: '18px 16px', flex: 1 }}>
            <div style={{ ...MONO_CELL, fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--text-3)', marginBottom: '8px' }}>
              NEXT FOLLOW-UP
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '1.9rem', color: 'var(--fg)' }}>10:00 am</div>
          </div>
        </div>
      </div>

      <style>{`
        .fy-dash-row {
          display: grid;
          grid-template-columns: 72px 78px 82px 52px 1fr 56px;
          gap: 10px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .fy-dash-body { grid-template-columns: 1fr !important; }
          .fy-dash-stats { flex-direction: row !important; border-top: 1px solid var(--line); }
          .fy-dash-stats > div { border-bottom: none !important; border-right: 1px solid var(--line-soft); }
          .fy-dash-stats > div:last-child { border-right: none; }
        }
        @media (max-width: 700px) {
          .fy-dash-row { grid-template-columns: 70px 46px 1fr; }
          .fy-c-source, .fy-c-stage, .fy-c-turn { display: none; }
        }
        @media (max-width: 520px) {
          .fy-dash-stats { flex-direction: column !important; }
          .fy-dash-stats > div { border-right: none; border-bottom: 1px solid var(--line-soft) !important; }
          .fy-dash-stats > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </div>
  );
}

const LIST_A = [
  'Where it came from. WhatsApp, Instagram, website, referral.',
  'The full conversation. Exactly what the customer asked, and exactly what was said back. Nothing hidden.',
  'What stage they are at. New, answered, qualified, quoted, booked, completed, or lost.',
  'Whether they are hot, warm or cold.',
  'What they asked about and what they were quoted.',
  'Which follow-up they are on, and when the next one goes out.',
  'Whose turn it is. Yours, or theirs.',
];

const LIST_B = [
  'How many enquiries you got this week, and how many turned into bookings.',
  'Your average order value, which most owners are surprised by.',
  'Which service brings in the most money, and which one only looks like it does.',
  'Which channel brings you customers who actually spend, and which one brings you time-wasters.',
  'Who is sitting there unattended right now, waiting on you.',
];

const BODY: React.CSSProperties = {
  fontFamily: 'var(--sans)',
  fontSize: 'clamp(15px, 1.3vw, 17px)',
  lineHeight: 1.75,
  color: 'var(--text-2)',
};

export function FYDashboard() {
  return (
    <section id="your-screen" style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow eyebrow--quiet" style={{ display: 'block', marginBottom: '20px' }}>
            Your screen
          </span>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
              lineHeight: 1.15,
              color: 'var(--fg)',
              marginBottom: '18px',
            }}
          >
            One page that shows you every lead in your business.
          </h2>
          <p style={{ ...BODY, maxWidth: '62ch', marginBottom: '40px' }}>
            We build it around how your business actually works. It is not a general tool with fields that do
            not match what you do.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <Frame />
        </Reveal>

        <div
          className="fy-dash-lists"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px, 5vw, 56px)', marginTop: '52px' }}
        >
          <Reveal delay={100}>
            <div>
              <p style={{ ...BODY, fontWeight: 500, color: 'var(--fg)', marginBottom: '8px' }}>
                For every enquiry that has ever come in, you can see:
              </p>
              {LIST_A.map((li, i) => (
                <p key={i} style={{ ...BODY, fontSize: '15px', padding: '12px 0', borderBottom: i < LIST_A.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                  {li}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div>
              <p style={{ ...BODY, fontWeight: 500, color: 'var(--fg)', marginBottom: '8px' }}>And across all of them:</p>
              {LIST_B.map((li, i) => (
                <p key={i} style={{ ...BODY, fontSize: '15px', padding: '12px 0', borderBottom: i < LIST_B.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                  {li}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p style={{ ...BODY, marginTop: '44px' }}>
            You can also run the system from that same screen. Pause a follow-up. Take over a conversation
            yourself. Change what gets said.
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'clamp(16px, 1.5vw, 19px)', color: 'var(--fg)', marginTop: '16px' }}>
            Nobody updates it. It fills itself.
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .fy-dash-lists { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* §10 — "It remembers every customer, forever." The dashboard shows many
 * leads shallowly; memory shows one customer deeply. Same product-UI language. */
function MemoryCard() {
  const FIELDS = [
    ['FIRST ENQUIRY', 'February 2026'],
    ['ASKED ABOUT', 'Full detailing'],
    ['QUOTED', '₹12,000'],
    ['BOUGHT', 'Ceramic coating, March'],
    ['SAID NO TO', 'Paint protection film'],
    ['DUE BACK', 'This month'],
  ];
  return (
    <div style={{ background: 'var(--bg-low)', border: '1px solid var(--line)', padding: '4px 18px', maxWidth: '360px', width: '100%' }}>
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.14em',
          color: 'var(--text-3)',
          padding: '12px 0',
          borderBottom: '1px solid var(--line-soft)',
        }}
      >
        CUSTOMER 0112 · ONE FILE
      </div>
      {FIELDS.map(([k, v], i) => (
        <div
          key={k}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '11px 0',
            borderBottom: i < FIELDS.length - 1 ? '1px solid var(--line-soft)' : 'none',
          }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--text-3)' }}>{k}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--fg)', textAlign: 'right' }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

const BEFORE = [
  'Contact every customer whose service is due this month, automatically, without checking a list.',
  'Go back to everyone who was quoted in the last six months and never went ahead.',
  'See that customers from one source spend twice as much as customers from another, and put your money where it works.',
  'Find out that the service you assumed was your best earner has the lowest average order value on the list.',
];

export function FYMemory() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
              lineHeight: 1.15,
              color: 'var(--fg)',
              marginBottom: '28px',
            }}
          >
            It remembers every customer, forever.
          </h2>
        </Reveal>

        <div className="fy-mem-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'clamp(32px, 5vw, 56px)', alignItems: 'start' }}>
          <Reveal delay={120}>
            <div>
              <p style={{ ...BODY, marginBottom: '18px' }}>
                Right now, your customer history lives in four phones and one person’s head. When that
                person leaves, it leaves with them. This is not a criticism of how you run things. It is how
                nearly every business of your size operates.
              </p>
              <p style={{ ...BODY, marginBottom: '18px' }}>
                Once this system is running, every customer you have ever spoken to has one permanent file.
                Who they are. What they asked about. What you quoted them. What they actually bought, and
                when. What they said no to. When they are due to come back.
              </p>
              <p style={{ ...BODY }}>Nobody has to build this. It builds itself out of conversations that were happening anyway.</p>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <MemoryCard />
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p style={{ ...BODY, fontWeight: 500, color: 'var(--fg)', margin: '48px 0 8px' }}>
            And then you can do things you could not do before:
          </p>
        </Reveal>
        <div className="fy-before-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 clamp(28px, 5vw, 56px)' }}>
          {BEFORE.map((b, i) => (
            <Reveal key={i} delay={i * 100}>
              <p style={{ ...BODY, fontSize: '15px', padding: '18px 0', borderTop: '1px solid var(--line-soft)' }}>{b}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'clamp(16px, 1.5vw, 19px)', color: 'var(--fg)', marginTop: '36px' }}>
            Your customers stop being names in a phone. They become something your business owns.
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .fy-mem-grid { grid-template-columns: 1fr !important; }
          .fy-before-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
