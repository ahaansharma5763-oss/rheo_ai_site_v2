'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Leak { icon: IconName; text: string; }

const LEAKS: Leak[] = [
  { icon: 'chat',  text: 'Someone asks about your service, you reply, and they go silent. No one follows up.' },
  { icon: 'clock', text: 'Someone says “let me think about it,” and three weeks later you have both forgotten.' },
  { icon: 'bolt',  text: 'Someone was ready to buy at 11pm, but your team saw the message at 10am the next day.' },
  { icon: 'users', text: 'A past customer would happily come back, but nobody ever reached out.' },
];

export default function PulseProblem() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="simplex" colorFront="#2E74AC" opacity={0.3} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            The real problem
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: '28px' }}>
            You do not have a lead problem. You have a follow-up problem<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '66ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            Most businesses think the answer to slow months is more leads — more ads, more agencies, more content.
            Then the new leads pile up next to the old ones, and the same thing happens. A handful convert. The rest go quiet.
            The leads you already paid for are leaking out of your business every single day:
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
          {LEAKS.map((leak, i) => (
            <Reveal key={i} delay={i * 80}>
              <article
                className="hover-rule"
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(15,30,54,0.4)', border: '1px solid rgba(46,116,172,0.24)', padding: 'clamp(22px, 2.6vw, 28px)', height: '100%', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(46,116,172,0.24)'; }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(46,116,172,0.12)', border: '1px solid rgba(46,116,172,0.3)' }}>
                  <Icon name={leak.icon} size={20} color="var(--crest)" />
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.6, color: 'var(--muted-cream)', fontWeight: 300 }}>{leak.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <blockquote style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '28px', maxWidth: '70ch' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(19px, 2vw, 26px)', lineHeight: 1.5, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic' }}>
              The majority of leads that go cold were never unqualified. They were simply never followed up with properly.
              The money was there. The follow-up was not.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
