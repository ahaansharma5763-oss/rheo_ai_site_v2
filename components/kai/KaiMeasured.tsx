'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

/* Count-up stat tickers (Magic UI number-ticker pattern, hand-rolled). */
function Ticker({ target, suffix, prefix }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const ms = 1400;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        setVal(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{val.toLocaleString('en-IN')}{suffix}</span>;
}

const CASES = [
  { t: 'A transformation coach', b: 'Spending heavily on ads and closing a handful. After intelligent follow-up, the same budget produced more than double the enrolled clients, and one pass through old leads returned three clients in the first two weeks.' },
  { t: 'A premium service studio', b: 'Strong word of mouth but silent enquiries. Abandoned conversations were caught within the hour and past customers reopened. Repeat business went from accidental to predictable.' },
  { t: 'A multi-location clinic', b: 'A front desk drowning in follow-up. Every enquiry nurtured, every quiet patient gently recalled, and the team pointed only at conversations that needed a human.' },
];

export default function KaiMeasured() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="simplex" colorFront="#3FAEDE" opacity={0.24} speed={0.22} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>Measured, every month</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: '28px' }}>
            Every month closes with a number<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 17.5px)', lineHeight: 1.8, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '70ch', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            Kai&apos;s work is visible, not vibes. Every conversation it starts is tagged. Every booking traces back
            to the message that caused it. You hold a live ledger all month, and on the first of the next month
            you get one page: recovered revenue, new bookings, hours saved, next month&apos;s plan. If a month ever
            looks thin, you see that too, and we fix it in the review. That is what keeps this honest.
          </p>
        </Reveal>

        {/* Real, published stats */}
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(46,116,172,0.24)', border: '1px solid rgba(46,116,172,0.24)', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            <div style={{ background: 'var(--bg-low)', padding: 'clamp(26px, 3vw, 36px)', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(30px, 3.4vw, 44px)', color: 'var(--gold-end)', display: 'block', marginBottom: '8px', fontVariantNumeric: 'tabular-nums' }}><Ticker target={200} suffix="+" /></span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>Live bookings processed</span>
            </div>
            <div style={{ background: 'var(--bg-low)', padding: 'clamp(26px, 3vw, 36px)', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(30px, 3.4vw, 44px)', color: 'var(--crest)', display: 'block', marginBottom: '8px', fontVariantNumeric: 'tabular-nums' }}>&lt;<Ticker target={60} suffix="s" /></span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>Replies, any hour</span>
            </div>
            <div style={{ background: 'var(--bg-low)', padding: 'clamp(26px, 3vw, 36px)', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(30px, 3.4vw, 44px)', color: 'var(--crest)', display: 'block', marginBottom: '8px', fontVariantNumeric: 'tabular-nums' }}><Ticker target={18} suffix=" hrs" /></span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-mute)' }}>Staff time returned / week</span>
            </div>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: '18px' }}>
          {CASES.map((c, i) => (
            <Reveal key={i} delay={i * 90}>
              <article style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(15,30,54,0.4)', padding: 'clamp(24px, 2.8vw, 32px)', height: '100%' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.3, marginBottom: '12px' }}>{c.t}</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300 }}>{c.b}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={80}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '11.5px', color: 'var(--fg-dim)', letterSpacing: '0.04em' }}>
            Results are representative of what intelligent lifecycle follow-up produces.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
