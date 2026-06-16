'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface UseCase { icon: IconName; title: string; description: string; }

const CASES: UseCase[] = [
  { icon: 'refresh',      title: 'Revives your dead leads',        description: 'On day one, Pulse goes through months of cold leads and reopens conversations with a fresh reason to talk. This alone often pays for the entire system.' },
  { icon: 'bolt',         title: 'Catches ready buyers instantly', description: 'The second someone signals they are ready, Pulse moves them toward the close and alerts you in real time. No more “saw it too late.”' },
  { icon: 'clock',        title: 'Rescues the abandoned ones',     description: 'Someone asked about booking and then disappeared. Pulse notices within the hour and brings them back before the moment passes.' },
  { icon: 'chat',         title: 'Handles the hesitations',        description: 'Price worries, timing worries, “I need to ask my partner.” Pulse responds to each the right way, in your voice, instead of letting them end the conversation.' },
  { icon: 'users',        title: 'Wins back past customers',       description: 'Pulse stays in touch with people who already bought and brings them back when the time is right. The cheapest customer to win is the one who already trusts you.' },
  { icon: 'shield',       title: 'Protects your best relationships', description: 'For ongoing clients, Pulse watches for the quiet signs that someone is drifting away and flags it while you can still do something about it.' },
];

export default function PulseUseCases() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-left" shape="simplex" colorFront="#2E6B8E" opacity={0.34} speed={0.26} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            What Pulse does, in plain terms
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: 'clamp(56px, 8vh, 88px)' }}>
            Six ways it brings revenue back<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {CASES.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article
                className="hover-rule"
                style={{ background: 'rgba(15,30,54,0.45)', border: '1px solid rgba(46,107,142,0.28)', padding: 'clamp(28px, 3.2vw, 36px)', height: '100%', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, border-color 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(15,30,54,0.7)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(15,30,54,0.45)'; e.currentTarget.style.borderColor = 'rgba(46,107,142,0.28)'; }}
              >
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)', marginBottom: '24px' }}>
                  <Icon name={c.icon} size={26} color="var(--gold)" />
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '21px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.012em', marginBottom: '12px', lineHeight: 1.2 }}>{c.title}</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300 }}>{c.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
