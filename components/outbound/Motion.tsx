'use client';

/* One observer for the whole page.
 *  [data-reveal]  rises 14px on the swell, once, staggered by --i x 120ms.
 *  [data-stage]   gets .is-on as it crosses the lower third: the gap line,
 *                 the closing line, the report bars, the chart, the timeline.
 *
 * The page is complete at rest. Nothing is hidden until this runs, and it
 * only runs when it can finish the job: IntersectionObserver exists and the
 * visitor has not asked for reduced motion. Anything already on screen is
 * marked done first, so nothing flashes out and back in. */

import { useEffect } from 'react';

export default function Motion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.ob-page');
    if (!root || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const vh = window.innerHeight || document.documentElement.clientHeight;
    const reveals = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const stages = Array.from(root.querySelectorAll<HTMLElement>('[data-stage]'));

    const seen = (el: HTMLElement, line: number) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return false; // not displayed at this width
      return r.top < line;
    };
    reveals.forEach(el => seen(el, vh) && el.classList.add('is-in'));
    stages.forEach(el => seen(el, vh * 0.8) && el.classList.add('is-on'));

    root.classList.add('ob-motion');

    const revealIO = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.classList.add('is-in');
            revealIO.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );
    const stageIO = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            e.target.classList.add('is-on');
            stageIO.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -30% 0px', threshold: 0 }
    );
    reveals.forEach(el => !el.classList.contains('is-in') && revealIO.observe(el));
    stages.forEach(el => !el.classList.contains('is-on') && stageIO.observe(el));

    return () => {
      revealIO.disconnect();
      stageIO.disconnect();
    };
  }, []);

  return null;
}
