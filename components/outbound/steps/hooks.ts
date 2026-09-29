'use client';

/* Shared motion and measuring hooks for the nine step figures.
 *
 * The rule for every figure: the server renders the finished state, so a
 * visitor with no script, or with reduced motion, sees the whole picture.
 * Only when a figure can actually animate does it hide itself ("armed"),
 * and it plays once as it enters the view. */

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

export type Stage = 'rest' | 'armed' | 'play' | 'done';

const RM = '(prefers-reduced-motion: reduce)';

/** rest: finished, no motion · armed: waiting below the fold · play: animating in · done: finished after playing */
export function useStage<T extends HTMLElement>(playMs = 2600) {
  const ref = useRef<T>(null);
  const [stage, setStage] = useState<Stage>('rest');

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    if (window.matchMedia(RM).matches) return;
    let first = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (first) {
          first = false;
          // Already on screen, or already scrolled past: leave it finished.
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            io.disconnect();
            return;
          }
          setStage('armed');
          return;
        }
        if (e.isIntersecting || e.boundingClientRect.top < 0) {
          io.disconnect();
          setStage('play');
          timer = setTimeout(() => setStage('done'), playMs);
        }
      },
      { rootMargin: '0px 0px -14% 0px', threshold: 0.18 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [playMs]);

  return { ref, stage, started: stage === 'play' || stage === 'done', armed: stage === 'armed' };
}

function subscribeRM(cb: () => void) {
  const m = window.matchMedia(RM);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
}

/** True on the server, so nothing types or flies before the client knows. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeRM,
    () => window.matchMedia(RM).matches,
    () => true
  );
}

/** Runs once through a list of moments (ms from the start of play). Returns how many have passed. */
export function useSequence(started: boolean, rest: boolean, times: readonly number[]): number {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!started) return;
    const ids = times.map((t, k) => setTimeout(() => setI(k + 1), t));
    return () => ids.forEach(clearTimeout);
  }, [started, times]);
  return rest ? times.length : i;
}

/** Steps through moments (ms) each time `run` changes to a new non-zero value. run 0 = all passed. */
export function usePhases(run: number, times: readonly number[]): number {
  const [st, setSt] = useState({ run: 0, i: 0 });
  useEffect(() => {
    if (!run) return;
    const ids = times.map((t, k) => setTimeout(() => setSt({ run, i: k + 1 }), t));
    return () => ids.forEach(clearTimeout);
  }, [run, times]);
  if (!run) return times.length;
  return st.run === run ? st.i : 0;
}

/* The swell, cubic-bezier(0.2, 0.6, 0.2, 1), for values moved in script. */
function bez(t: number) {
  const x1 = 0.2, y1 = 0.6, x2 = 0.2, y2 = 1;
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  let u = t;
  for (let k = 0; k < 6; k++) {
    const x = ((ax * u + bx) * u + cx) * u - t;
    const d = (3 * ax * u + 2 * bx) * u + cx;
    if (Math.abs(x) < 1e-4 || d === 0) break;
    u -= x / d;
  }
  return ((ay * u + by) * u + cy) * u;
}
export const swell = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : bez(t));

/** Counts from 0 to target once the figure plays. Finished value at rest. */
export function useCountUp(target: number, started: boolean, rest: boolean, dur = 1100, delay = 0): number {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - t0) / dur));
      setV(Math.round(target * swell(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, dur, delay]);
  return rest ? target : v;
}

/** Types `text` out whenever `run` changes to a new non-zero value. run 0 = show it whole. */
export function useTyping(text: string, run: number, cps = 42, delay = 0) {
  const [st, setSt] = useState({ run: 0, n: 0 });
  useEffect(() => {
    if (!run) return;
    let n = 0;
    let id: ReturnType<typeof setInterval> | undefined;
    const wait = setTimeout(() => {
      id = setInterval(() => {
        n += 1;
        setSt({ run, n });
        if (n >= text.length && id) clearInterval(id);
      }, 1000 / cps);
    }, delay);
    return () => {
      clearTimeout(wait);
      if (id) clearInterval(id);
    };
  }, [run, text, cps, delay]);
  if (!run) return { shown: text, typing: false };
  const n = st.run === run ? st.n : 0;
  return { shown: text.slice(0, n), typing: n < text.length };
}

/** A counter that runs from 0 to `to` seconds of clock time over `dur` ms, restarted by `run`. */
export function useClock(to: number, run: number, dur = 1300) {
  const [st, setSt] = useState({ run: 0, v: 0 });
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setSt({ run, v: to * swell(p) });
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to, dur]);
  if (!run) return { v: to, running: false };
  const v = st.run === run ? st.v : 0;
  return { v, running: v < to };
}

export type Box = { x: number; y: number; w: number; h: number };

/** Measures elements inside a container, relative to it, whenever it resizes. */
export function useLayoutBoxes<T extends HTMLElement>(selector: string, deps: readonly unknown[] = []) {
  const ref = useRef<T>(null);
  const [m, setM] = useState<{ w: number; h: number; boxes: Box[] } | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('ResizeObserver' in window)) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const boxes = Array.from(el.querySelectorAll<HTMLElement>(selector)).map(n => {
        const b = n.getBoundingClientRect();
        return { x: b.left - r.left, y: b.top - r.top, w: b.width, h: b.height };
      });
      setM(prev => {
        if (
          prev &&
          Math.abs(prev.w - r.width) < 0.5 &&
          Math.abs(prev.h - r.height) < 0.5 &&
          prev.boxes.length === boxes.length &&
          prev.boxes.every((p, i) => Math.abs(p.x - boxes[i].x) < 0.5 && Math.abs(p.y - boxes[i].y) < 0.5 && Math.abs(p.w - boxes[i].w) < 0.5 && Math.abs(p.h - boxes[i].h) < 0.5)
        )
          return prev;
        return { w: r.width, h: r.height, boxes };
      });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.querySelectorAll<HTMLElement>(selector).forEach(n => ro.observe(n));
    // Web fonts change line breaks after first paint
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, ...deps]);
  return { ref, m };
}

/** Is the element on screen right now (for pausing loops out of view). */
export function useOnScreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, on };
}

/* Today's date, known only in the browser. null on the server. */
const noop = () => () => {};
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
export function useTodayKey(): string | null {
  return useSyncExternalStore(noop, todayKey, () => null);
}
