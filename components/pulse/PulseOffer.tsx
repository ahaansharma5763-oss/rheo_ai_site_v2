'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface OfferItem { icon: IconName; title: string; body: string; }

const OFFER: OfferItem[] = [
  { icon: 'refresh',      title: 'We revive your entire pipeline for you', body: 'Every cold lead from the last several months gets a fresh, personal reason to come back. Done for you, starting day one.' },
  { icon: 'eye',          title: 'Every new lead read and followed up',     body: 'Read, understood, and answered at the perfect moment, in your voice, with zero manual work from you or your team.' },
  { icon: 'bolt',         title: 'Hot-lead alerts and at-risk flags',       body: 'A ping the second someone is ready to buy, and a heads-up before a good customer quietly drifts away.' },
  { icon: 'users',        title: 'Past customers won back on autopilot',    body: 'Pulse stays in touch with people who already bought and brings them back, so repeat revenue stops being accidental.' },
  { icon: 'sparkle',      title: 'Built around your business, live in days', body: 'Configured to your offers and your voice, handed over ready to run. Nothing to learn, nothing to log into every morning.' },
  { icon: 'shield',       title: 'Backed by a 60-day money-back promise',   body: 'If Pulse does not bring back more than it costs you in 60 days, you pay nothing. All of it refunded.' },
];

export default function PulseOffer() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="swirl" colorFront="#C4A25A" opacity={0.24} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            The Pulse offer
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: '24px' }}>
            Customer journey orchestration, done for you<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '62ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            You are not buying software you have to run. You are getting a complete intelligence layer, built around
            your business and handed over ready to work. Here is exactly what you get.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: 'clamp(40px, 6vh, 56px)' }}>
          {OFFER.map((o, i) => (
            <Reveal key={o.title} delay={i * 70}>
              <article
                className="hover-rule"
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(11,23,41,0.55)', border: '1px solid rgba(46,116,172,0.26)', padding: 'clamp(22px, 2.6vw, 30px)', height: '100%', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(46,116,172,0.26)'; }}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '11px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
                  <Icon name={o.icon} size={22} color="var(--gold)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: '8px' }}>{o.title}</h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--muted-cream)', fontWeight: 300 }}>{o.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', padding: 'clamp(22px, 2.6vw, 30px) clamp(24px, 3vw, 36px)', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(196,162,90,0.1) 0%, rgba(11,23,41,0.6) 70%)', border: '1px solid rgba(196,162,90,0.35)' }}>
            <Icon name="target" size={26} color="var(--gold)" />
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 1.9vw, 23px)', lineHeight: 1.45, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', flex: 1, minWidth: '260px' }}>
              One recovered customer usually covers the entire system. Pulse goes back and brings back many.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
