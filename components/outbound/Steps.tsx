'use client';
/* eslint-disable @next/next/no-img-element -- pre-sized portrait stills, served as-is */

/* §5 The nine steps. Text scrolls on the left while a sticky portrait still
 * from the film holds on the right and changes with the step in view, under
 * the film's own progress rail (01 / 09). On phones each still sits above
 * its step. Every step has a chip that opens the theatre at its chapter.
 * Release 2 swaps the stills for live stages; the frame keeps its box. */

import { useEffect, useRef, useState } from 'react';
import FilmButton from './FilmButton';
import { track } from './track';
import { MEDIA, type Chapter, type Step } from './types';
import { UI } from './ui';

const pad = (n: number) => String(n).padStart(2, '0');

export function chapterIndexFor(chapters: Chapter[], step: Step): number {
  const bySection = chapters.findIndex(c => c.section === step.id);
  if (bySection >= 0) return bySection;
  const byTime = chapters.findIndex(c => c.t === step.filmChapter);
  return byTime >= 0 ? byTime : 0;
}

export default function Steps({ steps, chapters }: { steps: Step[]; chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const [reach, setReach] = useState(1);
  const listRef = useRef<HTMLOListElement>(null);
  const viewed = useRef<Set<number>>(new Set());
  const total = steps.length;

  useEffect(() => {
    const list = listRef.current;
    if (!list || !('IntersectionObserver' in window)) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>('[data-step]'));
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.step);
          setActive(i);
          setReach(r => Math.max(r, i + 1));
          if (!viewed.current.has(i)) {
            viewed.current.add(i);
            track('step_view', { step: i + 1 });
          }
        }
      },
      // A thin band across the middle of the screen: the step crossing it is the one on stage
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const current = steps[active] ?? steps[0];

  return (
    <div className="ob-steps-grid">
      <ol ref={listRef} className="ob-steps-list">
        {steps.map((s, i) => {
          const ch = chapterIndexFor(chapters, s);
          return (
            <li key={s.id} id={s.id} className="ob-step" data-step={i}>
              <figure className="ob-step-still" data-reveal>
                <div className="ob-step-still-frame">
                  <img src={MEDIA.step(s.n)} alt={s.srDescription} width={720} height={1280} loading="lazy" decoding="async" />
                </div>
                <figcaption className="ob-step-cap ob-mono">{s.touchLabel}</figcaption>
              </figure>
              <p className="ob-sr ob-desk-sr">{s.srDescription}</p>
              <p className="ob-step-idx ob-mono" data-reveal>
                <b>{pad(s.n)}</b> / {pad(total)}
              </p>
              <h3 className="ob-step-title" data-reveal style={{ '--i': 1 } as React.CSSProperties}>
                {s.title}
              </h3>
              <p className="ob-step-body" data-reveal style={{ '--i': 2 } as React.CSSProperties}>
                {s.body}
              </p>
              {s.proof && (
                <p className="ob-step-proof" data-reveal style={{ '--i': 3 } as React.CSSProperties}>
                  {s.proof}
                </p>
              )}
              <FilmButton chapter={ch} source={`step_${s.n}`} className="ob-chip">
                <span className="ob-chip-tri" aria-hidden />
                {UI.watchInFilm}
                <span className="ob-mono">{chapters[ch]?.t ?? s.filmChapter}</span>
              </FilmButton>
            </li>
          );
        })}
      </ol>

      <div className="ob-stage" aria-hidden>
        <div className="ob-rail">
          <span className="ob-rail-count ob-mono">
            <b>{pad(active + 1)}</b> / {pad(total)}
          </span>
          <span className="ob-rail-ticks">
            {steps.map((s, i) => (
              <i key={s.id} className={i <= active ? 'is-past' : undefined} />
            ))}
          </span>
        </div>
        <div className="ob-stage-frame">
          {steps.map((s, i) => (
            // Only the stills up to one past the furthest step reached get a src,
            // so the sticky frame never pulls all nine at once.
            <img
              key={s.id}
              src={i < Math.max(reach, 1) + 1 ? MEDIA.step(s.n) : undefined}
              alt=""
              width={720}
              height={1280}
              decoding="async"
              className={i === active ? 'is-active' : undefined}
            />
          ))}
        </div>
        <p className="ob-stage-cap ob-mono">{current?.touchLabel}</p>
      </div>
    </div>
  );
}
