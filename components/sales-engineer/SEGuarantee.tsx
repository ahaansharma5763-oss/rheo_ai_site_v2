'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon from '@/components/ui/icon';

export default function SEGuarantee() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="ripple" colorFront="#C4A25A" opacity={0.24} speed={0.22} />

      <div style={{ maxWidth: '880px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{
            position: 'relative',
            background: 'linear-gradient(160deg, rgba(196,162,90,0.1) 0%, rgba(11,23,41,0.7) 60%)',
            border: '1px solid rgba(196,162,90,0.4)',
            borderRadius: '20px',
            padding: 'clamp(36px, 5vw, 64px)',
            textAlign: 'center',
            boxShadow: '0 50px 120px rgba(0,0,0,0.5), inset 0 0 60px rgba(196,162,90,0.04)',
          }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.12)', border: '1px solid rgba(196,162,90,0.4)', margin: '0 auto 28px' }}>
              <Icon name="shield" size={32} color="var(--gold)" />
            </div>

            <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>The guarantee</span>

            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 52px)', color: 'var(--fg)', letterSpacing: '-0.022em', lineHeight: 1.1, fontWeight: 600, marginBottom: '24px', maxWidth: '20ch', marginInline: 'auto' }}>
              If it has not paid for itself in 60 days, we remove it and refund every rupee<span style={{ color: 'var(--gold)' }}>.</span>
            </h2>

            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.75, color: 'var(--muted-cream)', fontWeight: 300, maxWidth: '58ch', margin: '0 auto 22px' }}>
              And this is not measured on vibes. Every deployment ships with a usage log: enquiries answered,
              quotes sent, leads captured, response times, engineering hours returned. At day 60 we sit down with
              that log together. If the system has not clearly earned its keep, we take it down ourselves and
              refund everything you have paid. You do not have to ask twice, and you do not have to argue.
            </p>

            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.6vw, 20px)', lineHeight: 1.6, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', maxWidth: '52ch', margin: '0 auto' }}>
              The only way to lose is to keep quoting at the speed of your busiest engineer.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
