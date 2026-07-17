'use client';

import { useEffect, useRef, useState } from 'react';

/* ────────────────────────────────────────────────
 * Deep-ocean descent system for the Revival page.
 *
 * Three layers:
 *  1. An absolute full-height gradient that darkens
 *     from Deep Navy at the surface to near-black at
 *     the sea floor, so scrolling IS descending.
 *  2. Fixed "marine snow": slow-drifting foam motes.
 *  3. A fixed depth gauge on the right edge that
 *     tracks scroll as metres below the surface.
 * ──────────────────────────────────────────────── */

const MOTES = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  size: 1 + (i % 3),
  dur: 16 + (i % 7) * 4,
  delay: -(i * 2.3),
  op: 0.05 + (i % 5) * 0.025,
}));

export default function DeepOcean() {
  const [depth, setDepth] = useState(0);
  const [visible, setVisible] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const f = max > 0 ? window.scrollY / max : 0;
        setDepth(Math.round(f * 210));
        setVisible(window.scrollY > 140);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      {/* Layer 1 — the descent gradient (absolute: darkens with page depth) */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: `linear-gradient(180deg,
            #0E2850 0%,
            #0B2147 10%,
            #0A1C3D 22%,
            #081733 34%,
            #071229 46%,
            #060E20 58%,
            #050B18 70%,
            #040811 82%,
            #03060C 92%,
            #020409 100%
          )`,
        }}
      />

      {/* Surface light rays, fading fast with depth */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '120vh', zIndex: 0, pointerEvents: 'none',
          background: `
            linear-gradient(168deg, transparent 32%, rgba(143,220,248,0.045) 40%, transparent 52%),
            linear-gradient(190deg, transparent 22%, rgba(143,220,248,0.035) 34%, transparent 50%),
            radial-gradient(ellipse 80% 40% at 50% -8%, rgba(63,174,222,0.10) 0%, transparent 70%)
          `,
        }}
      />

      {/* Layer 2 — marine snow (fixed, drifts up while you sink) */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <style>{`
          @keyframes moteDrift {
            from { transform: translateY(6vh); }
            to   { transform: translateY(-106vh); }
          }
          @media (prefers-reduced-motion: reduce) {
            .ocean-mote { animation: none !important; }
            .depth-gauge { transition: none !important; }
          }
        `}</style>
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="ocean-mote"
            style={{
              position: 'absolute',
              left: `${m.left}%`,
              top: '100%',
              width: `${m.size}px`,
              height: `${m.size}px`,
              background: '#C6BCA3',
              opacity: m.op,
              animation: `moteDrift ${m.dur}s linear ${m.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Layer 3 — depth gauge */}
      <div
        aria-hidden
        className="depth-gauge"
        style={{
          position: 'fixed', right: '22px', top: '50%', transform: 'translateY(-50%)', zIndex: 5,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px',
          opacity: visible ? 1 : 0, transition: 'opacity 0.6s cubic-bezier(0.2,0.6,0.2,1)',
          pointerEvents: 'none',
        }}
      >
        <style>{`@media (max-width: 900px) { .depth-gauge { display: none !important; } }`}</style>
        <span style={{ width: '1px', height: '54px', background: 'linear-gradient(180deg, transparent, rgba(143,220,248,0.35))' }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(143,220,248,0.6)', fontVariantNumeric: 'tabular-nums' }}>
          −{depth} m
        </span>
        <span style={{ width: '1px', height: '54px', background: 'linear-gradient(180deg, rgba(143,220,248,0.35), transparent)' }} />
      </div>
    </>
  );
}
