'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Cap { icon: IconName; title: string; body: string; }

const CAPS: Cap[] = [
  { icon: 'bolt', title: 'Replies in under 60 seconds', body: 'Every enquiry on WhatsApp gets a real answer in under a minute, any hour of the day or night.' },
  { icon: 'filter', title: 'Qualifies every lead', body: 'It asks the right questions automatically, so your team only ever sees the people who are warm.' },
  { icon: 'chat', title: 'Answers instantly', body: 'Timings, pricing, and the questions people actually ask, handled on the spot in your voice.' },
  { icon: 'calendar-check', title: 'Books the slot', body: 'It locks the booking or the callback without anyone on your side lifting a finger.' },
  { icon: 'refresh', title: 'Chases quiet leads', body: 'When someone goes silent, it follows up on its own until they convert or clearly say no.' },
  { icon: 'users', title: 'Wins back past customers', body: 'It reopens conversations with people who already bought, so repeat revenue stops being accidental.' },
];

export default function PilotSystem() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="wave" colorFront="#3FAEDE" opacity={0.26} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>What it looks like fixed</span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.6vw, 54px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '22ch', marginBottom: '24px' }}>
            Every lead answered in 60 seconds. Nothing slips<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '62ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            Bookings and callbacks locked while you sleep. Quiet leads chased automatically until they show up or say no.
            Your team only touches the people who are already warm and ready to buy. That is not more work for you. It is
            less. Here is the system that does it.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
          {CAPS.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(11,23,41,0.55)', border: '1px solid rgba(46,116,172,0.26)', padding: 'clamp(22px, 2.6vw, 30px)', height: '100%', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(46,116,172,0.26)'; }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '11px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
                  <Icon name={c.icon} size={22} color="var(--gold)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: '8px' }}>{c.title}</h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--muted-cream)', fontWeight: 300 }}>{c.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
