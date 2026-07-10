'use client';

import { useEffect, useRef } from 'react';

/* ────────────────────────────────────────────────
 * Deep-sea descent. A fixed overlay that darkens as
 * the visitor scrolls, like sinking below the light.
 * Eased so the surface stays bright and the depth
 * arrives gradually; capped so text stays readable.
 * ──────────────────────────────────────────────── */

const MAX_DARK = 0.5;

export default function SEDeepSea() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      // light falls off faster the deeper you go
      el.style.opacity = String(Math.pow(p, 1.4) * MAX_DARK);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5,
        pointerEvents: 'none',
        opacity: 0,
        background: 'linear-gradient(180deg, #010409 0%, #000308 100%)',
      }}
    />
  );
}
