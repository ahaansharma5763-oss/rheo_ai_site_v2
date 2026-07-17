'use client';

/* Tracing-beam treatment (adapted from raw/kai-nami-build-assets/tracing-beam.tsx):
 * a scroll-fed vertical line, Crest into Gold, running beside the four steps. */

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const STEPS = [
  { t: 'We map your funnel.', b: 'Every lead, every customer, every stage where money currently leaks. Most owners are shocked at what is sitting there.' },
  { t: 'We build Kai around your business.', b: 'Your offers, your voice, your customers’ exact path from first message to loyal regular. Done for you, end to end.' },
  { t: 'Kai goes to work.', b: 'Day one starts with your dormant pipeline. From then on, every new enquiry is answered in seconds and every existing relationship is carried forward at the right moment.' },
  { t: 'You watch the sea fill.', b: 'Booked calls. Recovered customers. Returning clients. And every month, one page that says exactly what came back.' },
];

export default function KaiHow() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.75 - rect.top) / rect.height));
        setProgress(p);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="simplex" colorFront="#3FAEDE" opacity={0.22} speed={0.22} />
      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>How it works</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 50px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, marginBottom: 'clamp(48px, 7vh, 64px)' }}>
            Four steps. Zero effort from you.
          </h2>
        </Reveal>

        <div ref={ref} style={{ position: 'relative', paddingLeft: '42px' }}>
          <span aria-hidden style={{ position: 'absolute', left: '5px', top: 0, bottom: 0, width: '1px', background: 'rgba(46,116,172,0.24)' }} />
          <span aria-hidden style={{ position: 'absolute', left: '5px', top: 0, width: '1px', height: `${progress * 100}%`, background: 'linear-gradient(180deg, #3FAEDE, #C4A25A)', transition: 'height 0.2s linear' }} />
          {STEPS.map((s, i) => (
            <div key={i} style={{ position: 'relative', paddingBottom: i < STEPS.length - 1 ? 'clamp(36px, 6vh, 56px)' : 0 }}>
              <span aria-hidden style={{ position: 'absolute', left: '-42px', top: '6px', width: '11px', height: '11px', background: progress > (i + 0.5) / STEPS.length ? 'var(--gold)' : 'var(--bg)', border: '1px solid rgba(63,174,222,0.55)', transition: 'background 0.4s ease' }} />
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(19px, 2vw, 24px)', color: 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.3, marginBottom: '10px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--crest)', marginRight: '14px' }}>0{i + 1}</span>
                {s.t}
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, maxWidth: '62ch' }}>{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
