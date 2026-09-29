'use client';

/* Step 5 · Every address checked: the pipeline and the gate.
 * One illustrative list flows through four checks as a band that narrows,
 * with what each check removes peeling away below it and the risky addresses
 * set aside as their own group. Then "still works there". Below, the bounce
 * gate: drag the estimate across 2 in 100 and the list flips from Loaded to
 * Held, not sent, in words and colour. Beside it, our own sending. */

import { useState } from 'react';
import type { Step } from '../types';
import { COPY } from './copy';
import { useCountUp, useStage } from './hooks';
import { Fig, Range, Tag, v } from './ui';

const C = COPY.s5;
const N = [C.startN, ...C.stages.map(s => s.n), C.finalN]; // 1000 … 830
const LABELS = [C.start, ...C.stages.map(s => s.label), C.final];
const W = 600;
const H = 124;
const TOP = 8;
const K = 0.074; // 1000 addresses = 74 units
const T = 16; // half-width of each narrowing
const COLW = W / N.length;
const RISKY_AT = 4; // the check on addresses that accept anything
const GONE_AT = 5; // still works there
const LIMIT = 2;

const bottom = (c: number) => TOP + N[c] * K;

function bandPath() {
  let d = `M0 ${TOP} L${W} ${TOP} L${W} ${bottom(N.length - 1)}`;
  for (let c = N.length - 1; c >= 1; c--) {
    const b = c * COLW;
    d += ` L${b + T} ${bottom(c)} C${b} ${bottom(c)} ${b} ${bottom(c - 1)} ${b - T} ${bottom(c - 1)}`;
  }
  return `${d} L0 ${bottom(0)} Z`;
}
const BAND = bandPath();

/* What each check removes: a thread peeling off the bottom of the band */
const DROPS = N.slice(1).map((n, i) => {
  const c = i + 1;
  const b = c * COLW;
  const w = Math.max(1, (N[c - 1] - n) * K);
  const y = bottom(c) + w / 2;
  return { c, w, n: N[c - 1] - n, d: `M${b - T} ${y} C${b + 6} ${y} ${b + 14} ${y + 14} ${b + 14} ${H}` };
});

const fmt = (n: number) => n.toLocaleString('en-IN');

function Count({ n, started, rest, delay }: { n: number; started: boolean; rest: boolean; delay: number }) {
  const val = useCountUp(n, started, rest, 1000, delay);
  return <>{fmt(val)}</>;
}

export default function Step5Verify({ step }: { step: Step }) {
  const proof = step.proof;
  const { ref, stage, started } = useStage<HTMLElement>(3000);
  const rest = stage === 'rest';
  const [pct, setPct] = useState(1.2);
  const [live, setLive] = useState('');
  const held = pct > LIMIT;
  const p = (x: number) => x / 5;

  return (
    <Fig ref={ref} n={5} name={C.name} desc={C.desc} stage={stage} tag={false} live={live}>
      <div className="ob-f5">
        <div className="ob-f5-flow">
          <div className="ob-f5-flow-h">
            <span className="ob-fx-k">{C.flowTitle}</span>
            <Tag />
          </div>

          {/* Wide: the narrowing band */}
          <div className="ob-f5-band-wrap" aria-hidden>
            <ol className="ob-f5-cols">
              {N.map((n, c) => (
                <li key={c} data-rise style={v({ '--d': c * 140 })}>
                  <span className="ob-f5-lab">
                    {c > 0 && c < N.length - 1 && <span className="ob-mono ob-f5-no">{String(c).padStart(2, '0')}</span>}
                    {LABELS[c]}
                  </span>
                  <span className="ob-f5-n">
                    <Count n={n} started={started} rest={rest} delay={c * 140} />
                  </span>
                  <span className="ob-f5-unit ob-mono">
                    {c === RISKY_AT ? C.verified : c === N.length - 1 ? C.ready : '\u00a0'}
                  </span>
                </li>
              ))}
            </ol>
            <div className="ob-f5-svg" style={v({ '--ar': `${W} / ${H}` })}>
              <svg viewBox={`0 0 ${W} ${H}`}>
                {N.slice(1).map((_, i) => (
                  <line key={i} x1={(i + 1) * COLW} x2={(i + 1) * COLW} y1={0} y2={H} className="ob-f5-div" />
                ))}
                <path d={BAND} fill="#2E74AC" fillOpacity={0.55} className="ob-f5-band" />
                <path d={`M0 ${TOP} L${W} ${TOP}`} className="ob-f5-top" pathLength={1} data-draw style={v({ '--d': 0, '--dur': '1300ms' })} />
                {DROPS.map(dr => (
                  <path
                    key={dr.c}
                    d={dr.d}
                    strokeWidth={dr.w}
                    className={`ob-f5-drop${dr.c === RISKY_AT ? ' ob-f5-drop--risky' : ''}`}
                    stroke={dr.c === RISKY_AT ? undefined : '#3FAEDE'}
                    strokeOpacity={dr.c === RISKY_AT ? undefined : 0.4}
                    data-rise
                    style={v({ '--d': 500 + dr.c * 140 })}
                  />
                ))}
              </svg>
            </div>
            <ol className="ob-f5-drops">
              <li />
              {DROPS.map(dr => (
                <li key={dr.c} data-rise style={v({ '--d': 700 + dr.c * 140 })}>
                  <b className="ob-mono">{dr.n}</b>{' '}
                  {dr.c === RISKY_AT ? C.riskyLabel : dr.c === GONE_AT ? C.finalGone : C.removed}
                </li>
              ))}
            </ol>
          </div>

          {/* Narrow: the same list as rows */}
          <ol className="ob-f5-rows">
            {N.map((n, c) => (
              <li key={c} data-rise style={v({ '--d': c * 110 })}>
                <span className="ob-f5-row-l">{LABELS[c]}</span>
                <span className="ob-f5-row-n">
                  <Count n={n} started={started} rest={rest} delay={c * 110} />
                  {c === RISKY_AT && <span className="ob-mono"> {C.verified}</span>}
                  {c === N.length - 1 && <span className="ob-mono"> {C.ready}</span>}
                </span>
                <span className="ob-f5-row-bar" aria-hidden>
                  <i style={v({ '--w': n / N[0] })} />
                </span>
                {c === RISKY_AT && (
                  <span className="ob-f5-row-side">
                    <b>{C.risky}</b> {C.riskyLabel}
                  </span>
                )}
                {c === GONE_AT && (
                  <span className="ob-f5-row-side">
                    <b>{N[GONE_AT - 1] - N[GONE_AT]}</b> {C.finalGone}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="ob-f5-lower">
          <div className="ob-f5-gate ob-card" data-rise style={v({ '--d': 900 })}>
            <div className="ob-f5-flow-h">
              <span className="ob-fx-k">{C.gateTitle}</span>
              <Tag />
            </div>
            <p className="ob-f5-list">
              <span>{C.sliderFor(fmt(C.finalN))}</span>
              <b className="ob-f5-val ob-mono">{C.pct(pct)}</b>
            </p>
            <Range
              labelHidden
              label={C.sliderLabel}
              min={0}
              max={5}
              step={0.1}
              value={pct}
              valueText={`${C.pct(pct)}, ${held ? C.held : C.loaded}`}
              onChange={n => {
                const next = Math.round(n * 10) / 10;
                if (next > LIMIT !== held) setLive(C.announce(next > LIMIT ? C.held : C.loaded, C.pct(next)));
                setPct(next);
              }}
              className="ob-f5-range"
            >
              <span className="ob-f5-limit" style={v({ '--at': p(LIMIT) })} aria-hidden>
                <span>{C.limit}</span>
              </span>
              <span className="ob-f5-ours" style={v({ '--at': p(0.43) })} aria-hidden>
                <span>
                  {C.ours} 0.43%
                </span>
              </span>
            </Range>
            <p className="ob-f5-status" data-held={held ? '' : undefined}>
              <span className="ob-f5-sq" aria-hidden />
              <b>{held ? C.held : C.loaded}</b>
              <span>{held ? C.heldWhy : C.loadedWhy}</span>
            </p>
          </div>

          {proof && (
            <aside className="ob-f5-proof" data-rise style={v({ '--d': 1100 })}>
              <span className="ob-f5-proof-n">0.43%</span>
              <p>{proof}</p>
            </aside>
          )}
        </div>
      </div>
    </Fig>
  );
}
