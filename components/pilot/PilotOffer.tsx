'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface OfferItem { icon: IconName; title: string; body: string; }

const OFFER: OfferItem[] = [
  { icon: 'sparkle', title: 'A complete lead-recovery system', body: 'Built around your business, your offers, and your voice. Not a template, not a demo.' },
  { icon: 'bolt', title: 'Installed on your real, live enquiries', body: 'It runs on your actual leads from day one, so what you see is real, not a projection.' },
  { icon: 'check-circle', title: 'Live in 14 days, done for you', body: 'We build it end to end. You do not lift a finger and you do not wait around.' },
  { icon: 'trending-up', title: 'A full 14-day run', body: 'Long enough to see real recovered revenue land in your own numbers before you decide anything.' },
  { icon: 'eye', title: 'Complete visibility', body: 'You watch every lead it catches and exactly what it brings back, the whole way through.' },
  { icon: 'shield', title: 'You only continue if it works', body: 'If it does not recover more than it costs, you walk away. We carry the build, you carry no risk.' },
];

export default function PilotOffer() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-right" shape="swirl" colorFront="#C4A25A" opacity={0.24} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>The offer</span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: '24px' }}>
            Here is exactly what you get in the Pilot<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '62ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            We carry the build. You carry none of the risk. The only thing you bring is 14 days.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: 'clamp(40px, 6vh, 56px)' }}>
          {OFFER.map((o, i) => (
            <Reveal key={o.title} delay={i * 70}>
              <article
                style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(11,23,41,0.55)', border: '1px solid rgba(46,107,142,0.26)', padding: 'clamp(22px, 2.6vw, 30px)', height: '100%', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(46,107,142,0.26)'; }}
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
              One recovered customer usually covers the whole thing. The Pilot proves that on your own leads before you commit.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
