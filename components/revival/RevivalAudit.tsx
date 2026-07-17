'use client';

import Reveal from '@/components/home/Reveal';

const AUDIT_URL = 'https://audit.rheoai.co.in';

const LEAKS = ['Missed enquiries', 'Slow follow-up', 'No-shows', 'The dormant list'];

export default function RevivalAudit() {
  return (
    <section style={{ padding: 'clamp(72px, 12vh, 120px) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{ border: '1px solid rgba(63,174,222,0.3)', background: 'rgba(15,30,54,0.5)', padding: 'clamp(32px, 4.5vw, 56px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(28px, 4vw, 56px)' }}>
            <div style={{ flex: '1 1 380px', minWidth: 0 }}>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '16px' }}>
                Measure the leak
              </span>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.4vw, 40px)', lineHeight: 1.18, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, marginBottom: '16px' }}>
                How much is your business leaking right now<span style={{ color: 'var(--gold)' }}>?</span>
              </h2>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '56ch', marginBottom: '22px' }}>
                The Sprint plugs one leak. The free 3-minute audit measures all of them, itemised in rupees for
                your business, with a plan for the next 90 days:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {LEAKS.map(l => (
                  <span key={l} style={{ fontFamily: 'var(--sans)', fontSize: '10.5px', color: 'var(--crest)', letterSpacing: '0.14em', textTransform: 'uppercase', border: '1px solid rgba(63,174,222,0.26)', padding: '7px 14px', background: 'rgba(63,174,222,0.05)' }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
              <a
                href={AUDIT_URL}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'inline-block', padding: '17px 40px', border: '1px solid var(--gold)', background: 'transparent', color: 'var(--warm-foam)', fontFamily: 'var(--sans)', fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500, textDecoration: 'none', transition: 'background 0.3s cubic-bezier(0.2,0.6,0.2,1), transform 0.3s cubic-bezier(0.2,0.6,0.2,1)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,162,90,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Run the 3-minute audit →
              </a>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '11.5px', color: 'var(--fg-dim)', letterSpacing: '0.04em' }}>
                Free. No call needed. Your number in three minutes.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
