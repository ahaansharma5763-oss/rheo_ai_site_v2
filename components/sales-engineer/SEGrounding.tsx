'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

/* ────────────────────────────────────────────────
 * The trust section. An animated spec-table lookup:
 * a query arrives, the matching row lights up, and a
 * citation chip appears. Numbers are looked up, never
 * generated. This is the difference between us and
 * every chatbot the visitor has seen.
 * ──────────────────────────────────────────────── */

const ROWS = [
  { model: 'KP-3',  flow: '18 LPM', pressure: '160 bar', supply: '415V 3ph' },
  { model: 'KP-5',  flow: '30 LPM', pressure: '180 bar', supply: '415V 3ph' },
  { model: 'KP-7',  flow: '45 LPM', pressure: '210 bar', supply: '415V 3ph' },
  { model: 'KP-9',  flow: '60 LPM', pressure: '210 bar', supply: '415V 3ph' },
];

const MATCH_INDEX = 2;
const CYCLE = 5200;

const PRINCIPLES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'database', title: 'Numbers are looked up, never generated', body: 'Every pressure, flow rate, and price comes out of a structured spec database built from your documents. The AI reads it. It does not imagine it.' },
  { icon: 'doc',      title: 'Every answer cites its source',          body: 'Recommendations point to the catalogue page and document version they came from. Your team can audit any answer it has ever given.' },
  { icon: 'alert',    title: 'Unknown means escalate, not improvise',  body: 'Ask it about a model that does not exist and it will tell you so, capture the lead, and route the question to a human. Tested adversarially before every launch.' },
];

function useLookupLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0); // 0 idle, 1 query, 2 scanning, 3 matched

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let loop: ReturnType<typeof setTimeout> | undefined;
    let running = false;

    const run = () => {
      timers.forEach(clearTimeout); timers = [];
      setStage(0);
      timers.push(setTimeout(() => setStage(1), 500));
      timers.push(setTimeout(() => setStage(2), 1400));
      timers.push(setTimeout(() => setStage(3), 2600));
      loop = setTimeout(run, CYCLE);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; run(); }
      else if (!e.isIntersecting) {
        running = false;
        timers.forEach(clearTimeout);
        if (loop) clearTimeout(loop);
      }
    }, { threshold: 0.3 });
    io.observe(el);

    return () => { io.disconnect(); timers.forEach(clearTimeout); if (loop) clearTimeout(loop); };
  }, []);

  return { ref, stage };
}

export default function SEGrounding() {
  const { ref, stage } = useLookupLoop();

  return (
    <section ref={ref} style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="wave" colorFront="#C4A25A" opacity={0.26} speed={0.22} />

      <style>{`
        @keyframes seChipIn { from{opacity:0;transform:translateY(8px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes seScan { 0%{transform:translateY(0)} 100%{transform:translateY(148px)} }
        .se-ground-grid { display:grid; grid-template-columns: 1fr 1fr; gap: clamp(32px, 4vw, 56px); align-items:center; }
        @media (max-width: 920px) { .se-ground-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            Why you can trust it with your buyers
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '20ch', marginBottom: '28px' }}>
            It never guesses. That is the whole point<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '66ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            You have seen AI chatbots invent things. On a consumer website that is embarrassing. On an industrial
            quote it is a lost customer and a warranty dispute. So we build the engine differently, and this
            difference is the entire product:
          </p>
        </Reveal>

        <div className="se-ground-grid">
          {/* Animated lookup visual */}
          <Reveal>
            <div style={{
              background: 'rgba(5,14,29,0.72)', border: '1px solid rgba(46,116,172,0.3)',
              borderRadius: '18px', padding: 'clamp(20px, 2.4vw, 28px)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Icon name="database" size={15} color="var(--crest)" />
                <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 500 }}>
                  Your spec database
                </span>
              </div>

              {/* Incoming query chip */}
              <div style={{ minHeight: '34px', marginBottom: '14px' }}>
                {stage >= 1 && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    padding: '7px 14px', borderRadius: '999px',
                    background: 'rgba(46,116,172,0.18)', border: '1px solid rgba(63,174,222,0.4)',
                    fontFamily: 'var(--mono)', fontSize: '11.5px', color: 'var(--warm-foam)',
                    animation: 'seChipIn 0.4s cubic-bezier(0.16,1,0.3,1) both',
                  }}>
                    <Icon name="eye" size={13} color="var(--crest)" />
                    query: continuous duty · ≥40 LPM · 415V
                  </span>
                )}
              </div>

              {/* Spec table */}
              <div style={{ position: 'relative', border: '1px solid rgba(46,116,172,0.25)', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1.1fr', padding: '10px 14px', borderBottom: '1px solid rgba(46,116,172,0.25)', background: 'rgba(15,30,54,0.7)' }}>
                  {['Model', 'Flow', 'Pressure', 'Supply'].map(h => (
                    <span key={h} style={{ fontFamily: 'var(--sans)', fontSize: '9.5px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-dim)', fontWeight: 600 }}>{h}</span>
                  ))}
                </div>
                {ROWS.map((r, i) => {
                  const matched = stage >= 3 && i === MATCH_INDEX;
                  return (
                    <div key={r.model} style={{
                      display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1.1fr',
                      padding: '11px 14px',
                      borderBottom: i < ROWS.length - 1 ? '1px solid rgba(46,116,172,0.15)' : 'none',
                      background: matched ? 'rgba(196,162,90,0.12)' : 'transparent',
                      boxShadow: matched ? 'inset 3px 0 0 var(--gold)' : 'none',
                      transition: 'background 0.5s ease, box-shadow 0.5s ease',
                    }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: matched ? 'var(--gold-end)' : 'var(--warm-foam)', fontWeight: matched ? 600 : 400, transition: 'color 0.5s ease' }}>{r.model}</span>
                      {[r.flow, r.pressure, r.supply].map((v, j) => (
                        <span key={j} style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: matched ? 'var(--muted-cream)' : 'var(--fg-mute)', transition: 'color 0.5s ease' }}>{v}</span>
                      ))}
                    </div>
                  );
                })}
                {/* Scanning beam */}
                {stage === 2 && (
                  <div aria-hidden style={{
                    position: 'absolute', left: 0, right: 0, top: '38px', height: '38px',
                    background: 'linear-gradient(90deg, transparent, rgba(63,174,222,0.14), transparent)',
                    borderTop: '1px solid rgba(63,174,222,0.3)', borderBottom: '1px solid rgba(63,174,222,0.3)',
                    animation: 'seScan 1.1s linear both',
                  }} />
                )}
              </div>

              {/* Result chip */}
              <div style={{ minHeight: '38px', marginTop: '14px' }}>
                {stage >= 3 && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '7px',
                    padding: '7px 14px', borderRadius: '999px',
                    background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.45)',
                    boxShadow: '0 0 22px rgba(196,162,90,0.15)',
                    fontFamily: 'var(--mono)', fontSize: '11.5px', color: 'var(--gold-end)',
                    animation: 'seChipIn 0.45s cubic-bezier(0.16,1,0.3,1) both',
                  }}>
                    <Icon name="check-circle" size={13} color="var(--gold)" />
                    KP-7 · cited: Catalogue v2.3, p.34
                  </span>
                )}
              </div>
            </div>
          </Reveal>

          {/* Principles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <article
                  className="hover-rule"
                  style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', background: 'rgba(11,23,41,0.55)', border: '1px solid rgba(46,116,172,0.26)', padding: 'clamp(20px, 2.2vw, 26px)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(46,116,172,0.26)'; }}
                >
                  <div style={{ width: '44px', height: '44px', borderRadius: '11px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
                    <Icon name={p.icon} size={21} color="var(--gold)" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--serif)', fontSize: '17px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: '8px' }}>{p.title}</h3>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.6, color: 'var(--muted-cream)', fontWeight: 300 }}>{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
