'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';

/* 21 days, five beats. The line fills as the section enters view. */

const BEATS = [
  { day: 'DAY 0', title: 'Wave one goes out', body: 'The recall wave. Cleaned, segmented, written in your voice, approved by you. First replies usually land within hours.' },
  { day: 'DAYS 1–6', title: 'Conversations run', body: 'Every reply answered in seconds, at any hour. Bookings taken, questions handled, hot leads flagged to you the moment they turn warm.' },
  { day: 'DAY 7', title: 'Wave two', body: 'Non-responders only. A different angle, never a repeat. Anyone who opted out is already suppressed forever.' },
  { day: 'DAY 15', title: 'Wave three', body: 'The strongest reason to act, reserved for last. Still no discounting unless you approved it.' },
  { day: 'DAY 21', title: 'The report', body: 'One page. Reached, replied, booked, and the rupee figure recovered, next to the guarantee threshold we agreed before launch.' },
];

export default function RevivalTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setFill(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            The 21 days
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            Day by day, exactly what happens<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div ref={ref} style={{ position: 'relative' }}>
          <style>{`
            .rev-tl { display:grid; grid-template-columns:repeat(5, 1fr); gap:18px; position:relative; }
            .rev-tl-line { position:absolute; top:5px; left:0; right:0; height:1px; background:rgba(46,116,172,0.24); }
            .rev-tl-fill { position:absolute; top:5px; left:0; height:1px; background:linear-gradient(90deg, #3FAEDE, #C4A25A); transition:width 2.4s cubic-bezier(0.2,0.6,0.2,1); }
            @media(max-width:900px) {
              .rev-tl { grid-template-columns:1fr; gap:26px; padding-left:22px; }
              .rev-tl-line { top:0; bottom:0; left:5px; right:auto; width:1px; height:auto; }
              .rev-tl-fill { top:0; left:5px; width:1px !important; background:linear-gradient(180deg, #3FAEDE, #C4A25A); transition:height 2.4s cubic-bezier(0.2,0.6,0.2,1); }
              .rev-tl-node { position:absolute; left:-22px; top:2px; }
            }
          `}</style>

          <div className="rev-tl-line" aria-hidden />
          <div className="rev-tl-fill" aria-hidden style={{ width: fill ? '100%' : '0%', height: fill ? '100%' : undefined }} />

          <div className="rev-tl">
            {BEATS.map((b, i) => (
              <div key={i} style={{ position: 'relative', paddingTop: '26px' }}>
                <span
                  className="rev-tl-node"
                  aria-hidden
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '11px', height: '11px',
                    background: i === BEATS.length - 1 ? 'var(--gold)' : 'var(--bg)',
                    border: `1px solid ${i === BEATS.length - 1 ? 'var(--gold)' : 'rgba(63,174,222,0.55)'}`,
                    opacity: fill ? 1 : 0.3,
                    transition: `opacity 0.5s ease ${0.4 + i * 0.42}s`,
                  }}
                />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', color: i === BEATS.length - 1 ? 'var(--gold-end)' : 'var(--crest)', display: 'block', marginBottom: '10px' }}>
                  {b.day}
                </span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.3, marginBottom: '10px' }}>
                  {b.title}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300 }}>
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
