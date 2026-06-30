'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Leak { icon: IconName; text: string; }

const LEAKS: Leak[] = [
  { icon: 'clock', text: 'Someone messages at 9pm. They hear back the next afternoon, after they have already messaged someone else.' },
  { icon: 'chat', text: 'Someone asks about pricing or availability and waits hours for a human to reply.' },
  { icon: 'eye', text: 'Someone goes quiet after the first message, and no one ever brings them back.' },
  { icon: 'users', text: 'A past customer would happily return, but nobody ever reaches out.' },
];

export default function PilotProblem() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-left" shape="simplex" colorFront="#2E6B8E" opacity={0.28} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>The problem</span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.6vw, 54px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: '24px' }}>
            You do not have a lead problem. You have a follow-up problem<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '60ch', marginBottom: 'clamp(40px, 6vh, 60px)' }}>
            The enquiries are already coming in. The gap is what happens next.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: 'clamp(40px, 6vh, 56px)' }}>
          {LEAKS.map((l, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', background: 'rgba(11,23,41,0.5)', border: '1px solid rgba(46,107,142,0.22)', padding: 'clamp(20px, 2.4vw, 26px)', height: '100%', borderRadius: '2px' }}>
                <span style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(46,107,142,0.12)', border: '1px solid rgba(46,107,142,0.3)' }}>
                  <Icon name={l.icon} size={19} color="var(--crest)" />
                </span>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.6, color: 'var(--muted-cream)', fontWeight: 300 }}>{l.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 1.9vw, 23px)', lineHeight: 1.5, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', maxWidth: '60ch' }}>
            Every one of those is revenue you already paid to win. It does not leave because your marketing is bad. It
            leaves in the hours it takes to respond, and the follow-up that never happens.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
