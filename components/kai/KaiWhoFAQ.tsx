'use client';

import { useState } from 'react';
import Reveal from '@/components/home/Reveal';

const WHO = [
  'You spend money or effort getting leads, and not enough of them become customers.',
  'You have past enquiries and customers nobody has properly followed up with.',
  'Your follow-up depends on someone remembering, which means it is inconsistent.',
  'One recovered customer clearly outweighs the cost of the system that recovers them.',
  'You would rather your team closed warm people than chased cold ones.',
];

const FAQS = [
  { q: 'Do I need to change my tools or learn anything new?', a: 'No. Kai works with what you already use, starting with WhatsApp. Built for you, configured to your business, handed over running.' },
  { q: 'Will it sound like a robot?', a: 'The opposite. Every message is written in your voice and references what each person actually said. Customers feel remembered, not processed.' },
  { q: 'How is this different from the WhatsApp tools I have seen?', a: 'Those blast the same message to a list on a schedule. Kai reads each person and responds to what they actually need. One is a megaphone. The other is intelligence.' },
  { q: 'Which channels does Kai work on?', a: 'Wherever your customers already talk to you. WhatsApp first, and the same brain extends across your other enquiry channels as you grow.' },
  { q: 'Can I test this before committing?', a: 'Yes. Send Nami first: one 21-day win-back campaign with its own guarantee. See the number, then decide.' },
  { q: 'How quickly will I see results?', a: 'Usually the first recovered customer inside a week or two, as Kai works the dormant pipeline. The full effect builds across the 60 days the guarantee covers.' },
  { q: 'How do I get started?', a: 'Book a Pipeline Review. We look at what is sitting in your funnel and show you exactly what Kai can recover. No pressure, no obligation.' },
];

function Item({ qa, open, onToggle }: { qa: { q: string; a: string }; open: boolean; onToggle: () => void }) {
  return (
    <div style={{ border: `1px solid ${open ? 'rgba(196,162,90,0.4)' : 'rgba(46,116,172,0.24)'}`, background: open ? 'rgba(196,162,90,0.05)' : 'rgba(11,23,41,0.5)', overflow: 'hidden', transition: 'border-color 0.4s ease, background 0.4s ease' }}>
      <button onClick={onToggle} aria-expanded={open} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', padding: 'clamp(18px, 2.2vw, 24px)', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.7vw, 19px)', color: open ? 'var(--warm-foam)' : 'var(--fg)', fontWeight: 500, lineHeight: 1.3 }}>{qa.q}</span>
        <span aria-hidden style={{ flexShrink: 0, fontFamily: 'var(--sans)', fontSize: '20px', fontWeight: 300, color: 'var(--gold)', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.2,0.6,0.2,1)', lineHeight: 1 }}>+</span>
      </button>
      <div style={{ maxHeight: open ? '340px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.45s cubic-bezier(0.2,0.6,0.2,1), opacity 0.4s ease', overflow: 'hidden' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, padding: '0 clamp(18px, 2.2vw, 24px) clamp(22px, 2.4vw, 26px)' }}>{qa.a}</p>
      </div>
    </div>
  );
}

export default function KaiWhoFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>Who Kai is for</span>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ maxWidth: '760px', marginBottom: 'clamp(56px, 9vh, 88px)' }}>
            {WHO.map((t, i) => (
              <p key={i} style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, paddingLeft: '18px', borderLeft: '1px solid rgba(63,174,222,0.4)', marginBottom: i < WHO.length - 1 ? '16px' : 0 }}>{t}</p>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 46px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, marginBottom: 'clamp(36px, 5vh, 52px)' }}>
            Questions, answered.
          </h2>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '860px' }}>
          {FAQS.map((qa, i) => (
            <Reveal key={i} delay={i * 50}>
              <Item qa={qa} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
