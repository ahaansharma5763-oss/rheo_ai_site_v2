'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface OfferItem { icon: IconName; title: string; body: string; }

const OFFER: OfferItem[] = [
  { icon: 'target',      title: 'Built on your real catalogue, first',      body: 'We start with a pilot on one product line, built from your actual documents. You judge it on your machines and your numbers, not on a slide deck.' },
  { icon: 'shield',      title: 'You try to break it before it goes live',  body: 'Sit your toughest engineer in front of it. Invent models, push discounts, corner it on specs. If it cannot hold up, you walk away and owe us nothing meaningful.' },
  { icon: 'clock',       title: 'Live in under 3 weeks',                    body: 'One handover of documents and one alignment call is all we ask from your side. We build, test, and deploy. Your team keeps selling the entire time.' },
  { icon: 'trending-up', title: 'It pays for itself, or it is free',        body: 'Sixty days, usage-tracked. Quotes sent, leads captured, response times, hours returned. If the value is not visibly there, we remove it ourselves and refund everything.' },
  { icon: 'users',       title: 'Your dealers get it too',                  body: 'The same engine answers your dealers and distributors, so every branch quotes correctly and instantly. Your channel gets sharper without a single training seminar.' },
  { icon: 'sparkle',     title: 'Handed over ready to run',                 body: 'Nothing to learn, no software for your team to babysit. It works where your buyers already are, and the important moments come to you.' },
];

export default function SEOffer() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="swirl" colorFront="#C4A25A" opacity={0.24} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            The offer
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: '24px' }}>
            We made saying yes the easy option<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '62ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            You have been pitched software before. This is not that. We build the system on your data, prove it in
            front of you, carry the risk ourselves, and hand it over working. Here is the whole deal:
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
            <Icon name="clock" size={26} color="var(--gold)" />
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.8vw, 22px)', lineHeight: 1.5, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', flex: 1, minWidth: '260px' }}>
              We build every deployment by hand, so we take on two new companies a month. If the live demo
              convinced you, do not sit on it. The slot goes to whoever books first.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
