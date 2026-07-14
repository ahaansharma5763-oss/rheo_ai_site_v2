'use client';

import { useState } from 'react';
import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon from '@/components/ui/icon';

interface QA { q: string; a: string; }

const FAQS: QA[] = [
  { q: 'Our catalogue and pricing are confidential. Where does our data go?', a: 'Your data stays yours. Deployments run in an isolated environment with access controls, your documents are never used to serve any other company, and we sign an NDA before we see a single spec sheet. Your pricing rules live in your deployment and nowhere else.' },
  { q: 'What happens if it quotes the wrong spec?', a: 'This is the exact failure we engineered against. Numbers come from a structured spec database built from your documents, they are looked up, never generated. When the system is not certain, it refuses and escalates to your team instead of improvising. And before launch, we and your engineers attack it deliberately to prove that holds.' },
  { q: 'Our buyers write in Hindi, Marathi, or a mix. Can it keep up?', a: 'Yes, natively. It reads and replies in the language each buyer uses, including the mixed Hindi-English most real enquiries arrive in. Try it on the live demo right now. Ask it something in Marathi.' },
  { q: 'Where does it live? Do our customers need to install anything?', a: 'Nothing to install. It works on your website, on WhatsApp, on Telegram, wherever your buyers and dealers already are. They message the way they always have. The difference is that now someone excellent always answers.' },
  { q: 'Will it replace our sales engineers?', a: 'No, and that is not the goal. It absorbs the repetitive 80% of technical questions so your engineers spend their week on site visits, negotiations, and the deals that genuinely need a human. When it escalates, it hands over the full conversation so your engineer starts warm, not cold.' },
  { q: 'Does it work with our ERP and CRM?', a: 'It integrates with what you have. And if what you have today is Excel and WhatsApp, that works too. Every conversation, lead, and quote is logged somewhere your team can see, from day one.' },
  { q: 'How do we start?', a: 'Book a build call. Thirty minutes, bring a catalogue. We will walk through your product line and show you exactly what your pilot would look like on your own machines. We take two new deployments a month, so the sooner the call, the sooner the slot.' },
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
      <div style={{ maxHeight: open ? '360px' : '0', opacity: open ? 1 : 0, transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease', overflow: 'hidden' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, padding: '0 clamp(18px, 2.2vw, 24px) clamp(22px, 2.4vw, 26px)' }}>{qa.a}</p>
      </div>
    </div>
  );
}

export default function SEFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="wave" colorFront="#3FAEDE" opacity={0.28} speed={0.24} />

      <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: 'var(--gold-end)' }}>
            Asked by every MD we meet
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
