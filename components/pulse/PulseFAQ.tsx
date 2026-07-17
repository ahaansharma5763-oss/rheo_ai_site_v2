'use client';

import { useState } from 'react';
import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon from '@/components/ui/icon';

interface QA { q: string; a: string; }

const FAQS: QA[] = [
  { q: 'Do I need to change my tools or learn anything new?', a: 'No. Okeanos works with what you already use, starting with WhatsApp. It is built for you, configured to your business, and handed over ready to run. There is nothing to learn and nothing to manage.' },
  { q: 'Will it sound like a robot?', a: 'The opposite. Every message is written in your voice and references what each person actually said. The entire point of Okeanos is that it does not sound automated. Customers feel remembered, not processed.' },
  { q: 'How is this different from the WhatsApp tools I have seen?', a: 'Most of those send messages — they blast the same thing to a list on a schedule. Okeanos reads each message, understands the person behind it, and responds differently based on what they actually need. One is a megaphone. The other is intelligence.' },
  { q: 'What if I already run Athena?', a: 'Then you are already ahead. Athena, our AI Sales Engineer, and Okeanos are designed to work as one system. Athena handles the first conversation, Okeanos handles the entire journey around it. Running both closes the loop completely.' },
  { q: 'Can I test this before committing to the full system?', a: 'Yes. The Revival Sprint is exactly that: a single 21-day reactivation campaign on your dormant list, with its own guarantee. Most Okeanos clients start there, see what came back, and upgrade.' },
  { q: 'How quickly will I see results?', a: 'Many businesses see the first recovered customer within the first week or two, as Okeanos works through the dormant pipeline. The full effect builds over the 60 days the guarantee is based on.' },
  { q: 'How do I get started?', a: 'Book a Pipeline Review. We will look at what is sitting in your pipeline right now and show you exactly how much revenue Okeanos can go and recover. No pressure, no obligation.' },
];

function Item({ qa, open, onToggle }: { qa: QA; open: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        border: `1px solid ${open ? 'rgba(196,162,90,0.4)' : 'rgba(46,116,172,0.24)'}`,
        background: open ? 'rgba(196,162,90,0.05)' : 'rgba(11,23,41,0.5)',
        borderRadius: '12px',
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
        <span style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,162,90,0.4)', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
          <Icon name="arrow-right" size={15} color="var(--gold)" />
        </span>
      </button>
      <div style={{ maxHeight: open ? '320px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease', overflow: 'hidden' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, padding: '0 clamp(18px, 2.2vw, 24px) clamp(22px, 2.4vw, 26px)' }}>{qa.a}</p>
      </div>
    </div>
  );
}

export default function PulseFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="wave" colorFront="#3FAEDE" opacity={0.28} speed={0.24} />

      <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: 'var(--gold-end)' }}>
            Frequently asked
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.8vw, 52px)', color: 'var(--fg)', letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 clamp(40px, 6vh, 60px)', lineHeight: 1.1, fontWeight: 600 }}>
            Questions, answered<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map((qa, i) => (
              <Item key={i} qa={qa} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
