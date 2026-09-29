'use client';

/* Step 3 · AI checks every company first: sources to verdict.
 * Four sources flow into one longlist (the only loop on the page, with a
 * pause button). Then an AI agent reads a company's homepage, the deciding
 * lines light up, and a verdict lands. A switch flips between a company that
 * fits and one that is skipped. */

import { useState } from 'react';
import { COPY } from './copy';
import { useLayoutBoxes, useOnScreen, usePhases, useReducedMotion, useStage } from './hooks';
import { Choices, Fig, Icon, type IconName, v } from './ui';

const C = COPY.s3;
type Key = (typeof C.companies)[number]['key'];
const OPTIONS = C.companies.map(c => ({ value: c.key as Key, label: c.name }));
const TIMES = [1350, 1750] as const; // reading done, verdict in

export default function Step3Check() {
  const { ref, stage, started } = useStage<HTMLElement>(3600);
  const reduced = useReducedMotion();
  const [sel, setSel] = useState<Key>('fit');
  const [clicks, setClicks] = useState(0);
  const [paused, setPaused] = useState(false);
  const [live, setLive] = useState('');
  const { ref: flowRef, m } = useLayoutBoxes<HTMLDivElement>('.ob-f3-source, .ob-f3-long');
  const { ref: seenRef, on } = useOnScreen<HTMLDivElement>();

  const co = C.companies.find(c => c.key === sel) ?? C.companies[0];
  const run = reduced ? 0 : (started ? 1 : 0) + clicks;
  const phase = usePhases(run, TIMES);
  const reading = run > 0 && phase === 0;

  // Curves from each source into the top of the longlist
  let curves: string[] = [];
  let spine = '';
  if (m && m.boxes.length === 5) {
    const src = m.boxes.slice(0, 4);
    const L = m.boxes[4];
    const lx = L.x + L.w / 2;
    const ly = L.y;
    const oneRow = Math.abs(src[0].y - src[3].y) < 2;
    if (oneRow) {
      curves = src.map(s => {
        const sx = s.x + s.w / 2;
        const sy = s.y + s.h;
        const my = (sy + ly) / 2;
        return `M${sx} ${sy} C${sx} ${my} ${lx} ${my} ${lx} ${ly}`;
      });
    } else {
      const top = Math.max(...src.map(s => s.y + s.h));
      spine = `M${lx} ${top} L${lx} ${ly}`;
    }
  }
  const flowing = !reduced && !paused && on;
  const paths = curves.length ? curves : spine ? [spine] : [];

  return (
    <Fig
      ref={ref}
      n={3}
      name={C.name}
      desc={C.desc}
      stage={stage}
      live={live}
      tools={
        !reduced && (
          <button
            type="button"
            className="ob-fx-btn"
            onClick={() => setPaused(p => !p)}
            aria-pressed={paused}
            aria-label={paused ? C.play : C.pause}
          >
            <Icon name={paused ? 'play' : 'pause'} size={12} />
            <span className="ob-fx-btn-t">{paused ? C.play : C.pause}</span>
          </button>
        )
      }
    >
      <div className="ob-f3" ref={seenRef}>
        <div className="ob-f3-flow" ref={flowRef} data-flowing={flowing ? '' : undefined}>
          {m && paths.length > 0 && (
            <svg className="ob-f3-wires" viewBox={`0 0 ${m.w} ${m.h}`} width={m.w} height={m.h} aria-hidden>
              {paths.map((d, i) => (
                <path key={`w${i}`} d={d} className="ob-f3-wire" pathLength={1} data-draw style={v({ '--d': 350 + i * 90 })} />
              ))}
              {!reduced &&
                paths.map((d, i) => (
                  <path key={`d${i}`} d={d} className="ob-f3-dots" pathLength={1} style={v({ '--o': i * 0.37 })} />
                ))}
            </svg>
          )}
          <ul className="ob-f3-sources">
            {C.sources.map((s, i) => (
              <li key={s.key} className="ob-f3-source" data-rise style={v({ '--d': i * 90 })}>
                <Icon name={s.icon as IconName} />
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <div className="ob-f3-long" data-rise style={v({ '--d': 750 })}>
            <span className="ob-f3-long-h">{C.longlist}</span>
            <span className="ob-f3-long-sub">{C.longlistSub}</span>
            <span className="ob-f3-long-rows" aria-hidden>
              {[72, 58, 66, 50].map((w, i) => (
                <i key={i} style={{ width: `${w}%` }} />
              ))}
            </span>
          </div>
        </div>

        <div className="ob-f3-reads" data-rise style={v({ '--d': 950 })}>
          <span className="ob-f3-reads-line" aria-hidden />
          <p>
            <span>{C.reads}.</span> <b>{C.note}</b>
          </p>
        </div>

        <div className="ob-f3-browser" data-rise style={v({ '--d': 1100 })} data-kind={co.key} data-phase={phase}>
          <Choices
            className="ob-f3-tabs"
            legend={C.pickLabel}
            legendHidden
            options={OPTIONS}
            value={sel}
            onChange={k => {
              setSel(k);
              setClicks(c => c + 1);
              const c = C.companies.find(x => x.key === k);
              if (c) setLive(c.announce);
            }}
            render={(o, i) => (
              <span className="ob-f3-tab">
                <i aria-hidden>{C.companies[i].short.slice(0, 1)}</i>
                <span>{o.label}</span>
              </span>
            )}
          />
          <div className="ob-f3-chrome" aria-hidden>
            <i />
            <i />
            <i />
            <span className="ob-f3-url">
              <Icon name="lock" size={12} />
              {co.url}
            </span>
          </div>
          <div className="ob-f3-nav" aria-hidden>
            <span className="ob-f3-brand">{co.short}</span>
            <span className="ob-f3-links">
              {C.nav.map(n => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </div>
          <div key={`${sel}-${run}`} className={`ob-f3-page${run ? ' ob-swap' : ''}`}>
            <p className="ob-f3-co">{co.name}</p>
            <p className="ob-f3-tagline">{co.tagline}</p>
            <ol className="ob-f3-lines">
              {co.lines.map((l, i) => (
                <li
                  key={i}
                  data-ev={phase >= 1 && (co.evidence as readonly number[]).includes(i) ? '' : undefined}
                  data-decoy={phase >= 1 && co.decoy === i ? '' : undefined}
                >
                  <span>{l}</span>
                  {co.decoy === i && <em className="ob-f3-decoy">{C.decoyTag}</em>}
                </li>
              ))}
              {reading && <span className="ob-f3-scan" aria-hidden />}
            </ol>
            {reading && (
              <span className="ob-f3-agent ob-mono" aria-hidden>
                {C.reading}
              </span>
            )}
          </div>
          <div className="ob-f3-verdict" data-show={phase >= 2 ? '' : undefined}>
            <span className="ob-f3-chip">
              <Icon name={co.key === 'fit' ? 'check' : 'x'} size={14} />
              {co.verdict}
            </span>
            <p className="ob-f3-why">{co.why}</p>
            <span className="ob-f3-next ob-mono">{co.next}</span>
          </div>
        </div>
      </div>
    </Fig>
  );
}
