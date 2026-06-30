'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Req { icon: IconName; title: string; body: string; }

const REQS: Req[] = [
  { icon: 'trending-up', title: 'At least 50 enquiries a month', body: 'Enough volume for the system to recover real money inside the 14 days.' },
  { icon: 'card', title: 'Average customer value of ₹7,000 or more', body: 'So a single recovered customer more than covers the system.' },
  { icon: 'chat', title: 'Leads already coming in', body: 'Through WhatsApp, Instagram, or your website. We work with the flow you already have.' },
  { icon: 'target', title: 'A real offer people enquire about', body: 'A service, a booking, a consultation, or a high-ticket purchase.' },
];

export default function PilotWhoFor() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-left" shape="simplex" colorFront="#2E6B8E" opacity={0.3} speed={0.24} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>Who this is for</span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: '16px' }}>
            The Pilot only works when the math is on your side<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(14px, 1.2vw, 16px)', letterSpacing: '0.02em', color: 'var(--muted-cream)', fontWeight: 400, marginBottom: 'clamp(32px, 5vh, 44px)' }}>
            To qualify for a build slot, you need:
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: 'clamp(40px, 6vh, 56px)' }}>
          {REQS.map((r, i) => (
            <Reveal key={r.title} delay={i * 70}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', background: 'linear-gradient(135deg, rgba(196,162,90,0.08) 0%, rgba(11,23,41,0.55) 70%)', border: '1px solid rgba(196,162,90,0.28)', padding: 'clamp(20px, 2.4vw, 26px)', height: '100%', borderRadius: '14px' }}>
                <span style={{ flexShrink: 0, width: '42px', height: '42px', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.12)', border: '1px solid rgba(196,162,90,0.35)' }}>
                  <Icon name={r.icon} size={20} color="var(--gold)" />
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '16.5px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: '6px' }}>{r.title}</h3>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: 1.55, color: 'var(--muted-cream)', fontWeight: 300 }}>{r.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: 'clamp(20px, 2.4vw, 26px)', background: 'rgba(11,23,41,0.5)', border: '1px solid rgba(46,107,142,0.22)', borderRadius: '14px' }}>
            <Icon name="filter" size={22} color="var(--crest)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(14px, 1.2vw, 16px)', lineHeight: 1.7, color: 'var(--fg-mute)', fontWeight: 300 }}>
              It is <span style={{ color: 'var(--warm-foam)' }}>not</span> for you if you get a handful of enquiries a month,
              sell low-ticket one-offs, or you are looking for more traffic rather than more from the leads you already have.
              The Pilot recovers what you already have. It is not a traffic machine.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
