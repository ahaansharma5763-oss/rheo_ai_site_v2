'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon from '@/components/ui/icon';
import PilotForm from '@/components/pilot/PilotForm';

export default function PilotCTA() {
  return (
    <section style={{ position: 'relative', padding: 'clamp(96px, 18vh, 180px) var(--rail-pad)', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="bottom" shape="swirl" colorBack="#07101E" colorFront="#C4A25A" opacity={0.32} speed={0.24} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(7,16,30,0.5) 0%, transparent 75%)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1040px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(40px, 6vw, 72px)' }}>
        <div style={{ flex: '1 1 360px', minWidth: 0 }}>
          <Reveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '9px', border: '1px solid rgba(196,162,90,0.35)', borderRadius: '999px', padding: '8px 16px', marginBottom: '24px' }}>
              <Icon name="clock" size={15} color="var(--gold)" />
              <span style={{ fontFamily: 'var(--sans)', fontSize: '10.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold-end)', fontWeight: 500 }}>
                Two build slots a month
              </span>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px, 5vw, 60px)', color: 'var(--fg)', letterSpacing: '-0.025em', lineHeight: 1.08, margin: '0 0 22px', fontWeight: 600 }}>
              The leads are already yours. Let us go and get them<span style={{ color: 'var(--gold)' }}>.</span>
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, maxWidth: '46ch', margin: 0 }}>
              We build each Pilot properly, tuned to one business and watched closely through the 14 days. So we take two a
              month, and when the slots are gone they are gone until the next month. If one is open, claim it now and we
              start within 24 hours.
            </p>
          </Reveal>
        </div>

        <div style={{ flex: '1 1 380px', minWidth: 0, maxWidth: '440px', width: '100%' }}>
          <Reveal delay={200}>
            <PilotForm idPrefix="pilot-cta" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
