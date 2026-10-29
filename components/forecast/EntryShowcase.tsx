'use client';

/* /forecast: one forecast entry taken apart. Three anonymised entries from a forecast built in October 2026
 * rotate every 7 seconds (paused on hover, focus or by the button; never under reduced motion). The three parts
 * on the left light up the matching row of the card. One orchestrated moment: the entry rising into place. */

import { useEffect, useRef, useState } from 'react';
import { SHOWCASE as S } from './content';

type Part = 'why' | 'who' | 'route';

export default function EntryShowcase() {
  const [i, setI] = useState(0);
  const [part, setPart] = useState<Part>('why');
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [still, setStill] = useState(false);
  const [seen, setSeen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const n = S.entries.length;
  const e = S.entries[i];

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setStill(m.matches);
    const on = () => setStill(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);

  useEffect(() => {   // rotate only while the card is on screen
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([x]) => setSeen(x.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || hover || still || !seen) return;
    const t = setInterval(() => setI(x => (x + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, hover, still, seen, n]);
  const rotating = !(paused || hover || still) && seen;

  const go = (d: number) => setI(x => (x + d + n) % n);

  return (
    <div ref={root} className="pf-show" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)} onBlurCapture={() => setHover(false)}>
      <div className="pf-parts" role="tablist" aria-label={S.heading}>
        {S.parts.map(p => (
          <button key={p.key} type="button" role="tab" aria-selected={part === p.key}
            className="pf-part" onClick={() => setPart(p.key as Part)} onMouseEnter={() => setPart(p.key as Part)}>
            <span className="pf-part-l">{p.label}</span>
            <span className="pf-part-b">{p.body}</span>
          </button>
        ))}
        <p className="pf-show-note">{S.note}</p>
      </div>

      <div className="pf-entry-wrap">
        <div key={i} className={`pf-entry${still ? '' : ' pf-rise'}`} aria-live={rotating ? 'off' : 'polite'}>
          <div className="pf-entry-head">
            <span className="pf-mono">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
            <p className="pf-entry-co">{e.company}</p>
            <p className="pf-entry-size">{e.size}</p>
          </div>
          <div className={`pf-row${part === 'why' ? ' is-on' : ''}`}>
            <span className="pf-row-l">Why now</span>
            <p className="pf-row-meta"><span className="pf-date">{e.date}</span> {e.source}</p>
            <p className="pf-row-t">{e.why}</p>
          </div>
          <div className={`pf-row${part === 'who' ? ' is-on' : ''}`}>
            <span className="pf-row-l">Who signs</span>
            <p className="pf-row-t">{e.who}</p>
          </div>
          <div className={`pf-row${part === 'route' ? ' is-on' : ''}`}>
            <span className="pf-row-l">How to reach them</span>
            <p className="pf-row-t">{e.route}</p>
          </div>
        </div>
        <div className="pf-entry-ctl">
          <div className="pf-dots" aria-hidden>
            {S.entries.map((_, k) => <span key={k} className={k === i ? 'is-on' : ''} />)}
          </div>
          <div className="pf-ctl-btns">
            <button type="button" className="pf-ctl pf-ctl--text" onClick={() => go(-1)}>{S.prev}</button>
            {!still && (
              <button type="button" className="pf-ctl pf-ctl--text" onClick={() => setPaused(p => !p)}>
                {paused ? S.play : S.pause}
              </button>
            )}
            <button type="button" className="pf-ctl pf-ctl--text" onClick={() => go(1)}>{S.next}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
