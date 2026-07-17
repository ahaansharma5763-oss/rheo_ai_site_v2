'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const LEAKS = [
  'A new enquiry lands at 11pm. It gets seen at 10am. By then they have booked elsewhere.',
  'Someone asks for a price, you reply, they go quiet. Nobody follows up.',
  'Someone says "let me think about it," and three weeks later you have both forgotten.',
  'A customer finishes their service, walks out happy, and is never contacted again.',
];

const STATS = [
  { n: '62 / 100', t: 'calls to small businesses go unanswered. 85 of those callers never call back.' },
  { n: '78 / 100', t: 'customers choose whoever responds first.' },
  { n: '7 in 10', t: 'new clients never return, and 68 of 100 who leave say the reason was silence, not price.' },
];

export default function KaiProblem() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="simplex" colorFront="#2E74AC" opacity={0.28} speed={0.22} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>The problem</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '26ch', marginBottom: '28px' }}>
            You do not have a lead problem. You have a funnel that leaks at every stage<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '66ch', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            Most businesses answer slow months with more leads. More ads, more agencies, more content. But pour
            more water into a leaking bucket and you just lose more water. Look at where your funnel actually
            loses money:
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
          {LEAKS.map((text, i) => (
            <Reveal key={i} delay={i * 80}>
              <article style={{ background: 'rgba(15,30,54,0.4)', border: '1px solid rgba(46,116,172,0.24)', padding: 'clamp(22px, 2.6vw, 28px)', height: '100%' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--crest)', display: 'block', marginBottom: '12px' }}>0{i + 1}</span>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300 }}>{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(46,116,172,0.24)', border: '1px solid rgba(46,116,172,0.24)', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ background: 'var(--bg-low)', padding: 'clamp(24px, 2.8vw, 32px)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(24px, 2.6vw, 34px)', color: i === 2 ? 'var(--gold-end)' : 'var(--crest)', display: 'block', marginBottom: '10px', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.65, color: 'var(--fg-mute)', fontWeight: 300 }}>{s.t}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginTop: '-32px', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            What the industry data says
          </p>
        </Reveal>

        <Reveal delay={120}>
          <blockquote style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '28px', maxWidth: '70ch' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(19px, 2vw, 26px)', lineHeight: 1.5, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic' }}>
              Every stage of the funnel leaks for the same reason. Not price. Not quality. Nobody was there at
              the right moment. The money was there. The follow-up was not.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
