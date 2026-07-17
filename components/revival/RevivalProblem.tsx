'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const DRIFTS = [
  'The enquiry that asked for a price and went silent.',
  'The customer who came twice, loved it, and drifted away.',
  'The client whose treatment or service was due months ago, who never got a reminder.',
];

export default function RevivalProblem() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="simplex" colorFront="#2E74AC" opacity={0.28} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            The problem
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: '28px' }}>
            The most expensive customers you own are the ones you stopped talking to<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '66ch', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            Think about everyone who has ever messaged you, called you, or walked in. You paid for every one of
            them, in ads, in referrals, in years of reputation. Now think about how many you never spoke to again.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
          {DRIFTS.map((text, i) => (
            <Reveal key={i} delay={i * 90}>
              <article
                style={{ background: 'rgba(15,30,54,0.4)', border: '1px solid rgba(46,116,172,0.24)', padding: 'clamp(24px, 2.8vw, 32px)', height: '100%', transition: 'transform 0.5s cubic-bezier(0.2,0.6,0.2,1), border-color 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(46,116,172,0.24)'; }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--crest)', display: 'block', marginBottom: '14px' }}>
                  0{i + 1}
                </span>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300 }}>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(46,116,172,0.24)', border: '1px solid rgba(46,116,172,0.24)', marginBottom: '14px' }}>
            {[
              { n: '68 / 100', t: 'lost clients say they left because nobody followed up. Only 14 mention price.' },
              { n: '4 to 10x', t: 'cheaper to win back a past customer than to acquire a new one.' },
              { n: '3 to 8x', t: 'higher response from dormant lists than cold outreach. These people already know you.' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--bg-low)', padding: 'clamp(24px, 2.8vw, 32px)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(24px, 2.6vw, 34px)', color: i === 0 ? 'var(--gold-end)' : 'var(--crest)', display: 'block', marginBottom: '10px', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.65, color: 'var(--fg-mute)', fontWeight: 300 }}>{s.t}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={60}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            What the industry data says
          </p>
        </Reveal>

        <Reveal delay={120}>
          <blockquote style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '28px', maxWidth: '70ch' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(19px, 2vw, 26px)', lineHeight: 1.5, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic' }}>
              None of these people said no. They were simply never followed up with. Not price. Not quality. Silence.
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '66ch', marginTop: '36px' }}>
            That list in your phone is not a contact list. It is unclaimed revenue, and every month it sits
            untouched, more of it goes cold for good.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
