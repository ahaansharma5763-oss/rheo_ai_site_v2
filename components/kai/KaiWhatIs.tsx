'use client';

/* Adapted from Aceternity StickyScroll (raw/kai-nami-build-assets/sticky-scroll-reveal.tsx):
 * page-scroll variant, navy tonal steps, triptych images in the sticky panel. */

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';

const BEATS = [
  {
    title: 'First touch.',
    body: 'A new enquiry gets a real answer in seconds, any hour of any day. Questions answered, price shared the way you want it shared, booking offered while the interest is hot.',
    img: '/images/sea/kai-first-touch.webp',
  },
  {
    title: 'The middle.',
    body: 'The hesitant get reassurance. The price-worried get value, not discounts. The ghosts get a reason to come back. Every lead is read, understood, and moved forward at its own pace, in your voice.',
    img: '/images/sea/kai-the-middle.webp',
  },
  {
    title: 'The return.',
    body: 'Customers are brought back when their next visit or service is due. The lapsed are won back. The loyal are kept close and turned into referrals.',
    img: '/images/sea/kai-the-return.webp',
  },
];

const ENGINE = [
  { k: 'It reads.', v: 'Every message, every signal, every moment of interest or hesitation.' },
  { k: 'It decides.', v: 'The right next move for that exact person, at that exact moment.' },
  { k: 'It acts.', v: 'A message written for that person and that moment. Personal because it is.' },
  { k: 'It learns.', v: 'Every response makes the next move smarter, the longer it runs.' },
];

export default function KaiWhatIs() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        setActive(Math.min(BEATS.length - 1, Math.floor(progress * BEATS.length)));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>What Kai is</span>
        </Reveal>
        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            One layer. The entire funnel. First touch to last<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div ref={ref} style={{ display: 'flex', gap: '48px', alignItems: 'flex-start' }}>
          <style>{`
            @media(max-width:900px){ .kai-sticky-img { display:none !important; } .kai-beat-img { display:block !important; } }
          `}</style>
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            {BEATS.map((b, i) => (
              <div key={i} style={{ padding: 'clamp(32px, 6vh, 64px) 0', opacity: active === i ? 1 : 0.35, transition: 'opacity 0.5s cubic-bezier(0.2,0.6,0.2,1)' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--crest)', display: 'block', marginBottom: '14px' }}>0{i + 1}</span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 2.8vw, 34px)', color: 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.2, marginBottom: '16px' }}>{b.title}</h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '15.5px', lineHeight: 1.75, color: 'var(--muted-cream)', fontWeight: 300, maxWidth: '52ch' }}>{b.body}</p>
                <img className="kai-beat-img" src={b.img} alt="" style={{ display: 'none', width: '100%', maxWidth: '420px', marginTop: '24px', border: '1px solid rgba(46,116,172,0.24)' }} />
              </div>
            ))}
          </div>
          <div className="kai-sticky-img" style={{ flex: '0 0 400px', position: 'sticky', top: '110px' }}>
            <div style={{ position: 'relative', width: '400px', height: '400px', border: '1px solid rgba(46,116,172,0.3)', overflow: 'hidden' }}>
              {BEATS.map((b, i) => (
                <img key={i} src={b.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: active === i ? 1 : 0, transition: 'opacity 0.7s cubic-bezier(0.2,0.6,0.2,1)' }} />
              ))}
              <span style={{ position: 'absolute', bottom: '14px', right: '16px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(244,237,223,0.7)', letterSpacing: '0.12em', zIndex: 2 }}>
                0{active + 1} / 03
              </span>
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(46,116,172,0.24)', border: '1px solid rgba(46,116,172,0.24)', marginTop: 'clamp(48px, 7vh, 72px)' }}>
            {ENGINE.map((e, i) => (
              <div key={i} style={{ background: 'rgba(11,23,41,0.6)', padding: 'clamp(22px, 2.4vw, 28px)' }}>
                <h4 style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: i === 3 ? 'var(--gold-end)' : 'var(--warm-foam)', fontWeight: 500, marginBottom: '10px' }}>{e.k}</h4>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.65, color: 'var(--fg-mute)', fontWeight: 300 }}>{e.v}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
