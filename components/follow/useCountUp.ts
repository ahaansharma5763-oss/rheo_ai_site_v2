'use client';

import { useEffect, useRef, useState } from 'react';

const fmtINR = new Intl.NumberFormat('en-IN');

export const formatINR = (n: number) => fmtINR.format(n);

/**
 * rAF count-up that starts when the element enters the viewport.
 * en-IN grouping so ₹1,20,000 reads lakh-style, never ₹120,000.
 * Renders the final value immediately under prefers-reduced-motion.
 */
export function useCountUp(target: number, ms = 900, startDelay = 0) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target);
      setDone(true);
      return;
    }
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting && e.boundingClientRect.top >= 0) return;
        io.disconnect();
        timer = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / ms);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(target * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
            else setDone(true);
          };
          raf = requestAnimationFrame(tick);
        }, startDelay);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, [target, ms, startDelay]);

  return { ref, val, done, text: fmtINR.format(val) };
}
