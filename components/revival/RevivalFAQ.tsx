'use client';

import { useState } from 'react';
import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

interface QA { q: string; a: string; }

const FAQS: QA[] = [
  {
    q: 'Will this annoy my customers?',
    a: 'The opposite, and this matters to us as much as to you. Messages are spaced weeks apart, written for each group, and anyone uninterested is marked and never contacted again. Most owners are surprised by how many people reply with some version of "I was actually meaning to come back."',
  },
  {
    q: 'Is it okay to message old customers?',
    a: 'Yes, when they are genuinely your customers. These are people who chose to give your business their number. We confirm that with you before anything goes out, every first message clearly says who it is from, and opting out takes one word.',
  },
  {
    q: 'What do you need from me?',
    a: 'Three things: your contact list exported, ten minutes to approve the message drafts, and your booking preferences. Everything else, including every reply at every hour, is handled.',
  },
  {
    q: 'My list is old. Is it too late?',
    a: 'Lists up to about two years old perform well. Older than that, we will tell you honestly on the call what to expect, and if it is not worth running, we will say so.',
  },
  {
    q: 'How fast do I see something?',
    a: 'The first replies usually arrive within hours of the first wave. Bookings typically start in the first week. The full picture is in your 21-day report.',
  },
  {
    q: 'Does this work for my kind of business?',
    a: 'If people buy from you more than once, or enquire and take time to decide, yes. Clinics, studios, salons, premium services, and event businesses see the strongest results, because their lists are full of people with a real reason to return.',
  },
];

function Item({ qa, open, onToggle }: { qa: QA; open: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        border: `1px solid ${open ? 'rgba(196,162,90,0.4)' : 'rgba(46,116,172,0.24)'}`,
        background: open ? 'rgba(196,162,90,0.05)' : 'rgba(11,23,41,0.5)',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease, background 0.4s ease',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
          padding: 'clamp(18px, 2.2vw, 24px)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.7vw, 19px)', color: open ? 'var(--warm-foam)' : 'var(--fg)', fontWeight: 500, lineHeight: 1.3 }}>{qa.q}</span>
        <span
          aria-hidden
          style={{ flexShrink: 0, fontFamily: 'var(--sans)', fontSize: '20px', fontWeight: 300, color: 'var(--gold)', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.2,0.6,0.2,1)', lineHeight: 1 }}
        >
          +
        </span>
      </button>
      <div style={{ maxHeight: open ? '340px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.45s cubic-bezier(0.2,0.6,0.2,1), opacity 0.4s ease', overflow: 'hidden' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, padding: '0 clamp(18px, 2.2vw, 24px) clamp(22px, 2.4vw, 26px)' }}>{qa.a}</p>
      </div>
    </div>
  );
}

export default function RevivalFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="simplex" colorFront="#3FAEDE" opacity={0.24} speed={0.22} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            Questions, answered
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, marginBottom: 'clamp(40px, 6vh, 60px)' }}>
            Everything owners ask us first.
          </h2>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.map((qa, i) => (
            <Reveal key={i} delay={i * 60}>
              <Item qa={qa} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
