'use client';

/* §5 The nine steps. Each step is its own full-width block: the text
 * (01 / 09, title, body, proof, the film chip) beside a large figure built
 * in code, alternating sides for rhythm. Nothing is sticky and nothing swaps.
 * Each figure animates in once as it enters the view, then waits to be
 * touched. The theatre scrolls to each step's id, so the ids stay. */

import { useEffect, useRef } from 'react';
import FilmButton from './FilmButton';
import { track } from './track';
import type { Chapter, Step } from './types';
import { UI } from './ui';
import { FIGURES } from './steps/index';
import '@/app/outbound/steps.css';

const pad = (n: number) => String(n).padStart(2, '0');

export function chapterIndexFor(chapters: Chapter[], step: Step): number {
  const bySection = chapters.findIndex(c => c.section === step.id);
  if (bySection >= 0) return bySection;
  const byTime = chapters.findIndex(c => c.t === step.filmChapter);
  return byTime >= 0 ? byTime : 0;
}

/* Step 5 shows its proof inside the figure, beside the bounce gate. */
const PROOF_IN_FIGURE = new Set([5]);

export default function Steps({ steps, chapters }: { steps: Step[]; chapters: Chapter[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const total = steps.length;

  useEffect(() => {
    const list = listRef.current;
    if (!list || !('IntersectionObserver' in window)) return;
    const seen = new Set<number>();
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.step);
          if (seen.has(i)) continue;
          seen.add(i);
          track('step_view', { step: i + 1 });
          io.unobserve(e.target);
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    list.querySelectorAll<HTMLElement>('[data-step]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={listRef} className="ob-sx-list">
      {steps.map((s, i) => {
        const ch = chapterIndexFor(chapters, s);
        const Figure = FIGURES[s.n];
        return (
          <li key={s.id} id={s.id} className="ob-sx" data-step={i} data-flip={i % 2 === 1 ? '' : undefined}>
            <div className="ob-sx-text">
              <p className="ob-sx-idx ob-mono" data-reveal>
                <b>{pad(s.n)}</b> / {pad(total)}
              </p>
              <h3 className="ob-sx-title" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
                {s.title}
              </h3>
              <p className="ob-sx-body" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
                {s.body}
              </p>
              {s.proof && !PROOF_IN_FIGURE.has(s.n) && (
                <p className="ob-sx-proof" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
                  {s.proof}
                </p>
              )}
              <div data-reveal style={{ '--i': 3 } as React.CSSProperties}>
                <FilmButton chapter={ch} source={`step_${s.n}`} className="ob-chip ob-sx-chip">
                  <span className="ob-chip-tri" aria-hidden />
                  {UI.watchInFilm}
                  <span className="ob-mono">{chapters[ch]?.t ?? s.filmChapter}</span>
                </FilmButton>
              </div>
            </div>
            <div className="ob-sx-fig">{Figure ? <Figure step={s} /> : null}</div>
          </li>
        );
      })}
    </ol>
  );
}
