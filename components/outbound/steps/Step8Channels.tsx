'use client';

/* Step 8 · Email, LinkedIn, call, WhatsApp: swimlanes and a CRM that fills
 * itself. One conversation hops across four lanes (WhatsApp last, only once
 * they agree). Below, CRM status cells update themselves in sequence, and a
 * research brief is ready before the meeting. Point at a row to see what
 * changed it and when. */

import { useState } from 'react';
import { COPY } from './copy';
import { useSequence, useStage } from './hooks';
import { Fig, Icon, type IconName, v } from './ui';

const C = COPY.s8;
const LANE_H = 38;
const LANES = C.lanes.length;
const EVENTS = C.path.length;

/* Status changes, in the order the CRM sees them: [row, status] */
const CHANGES: readonly (readonly [number, number])[] = [
  [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [3, 2], [0, 3],
];
const TIMES = CHANGES.map((_, i) => 900 + i * 420);
const BRIEF_AT = TIMES[TIMES.length - 1] + 300;

/* The conversation as a metro line: across, then down to the next lane */
function pathD(w: number) {
  const x = (i: number) => ((i + 0.5) / EVENTS) * w;
  const y = (lane: number) => lane * LANE_H + LANE_H / 2;
  let d = `M${x(0)} ${y(C.path[0].lane)}`;
  for (let i = 1; i < EVENTS; i++) {
    const a = C.path[i - 1];
    const b = C.path[i];
    if (a.lane === b.lane) d += ` H${x(i)}`;
    else {
      const mx = (x(i - 1) + x(i)) / 2;
      d += ` H${mx} V${y(b.lane)} H${x(i)}`;
    }
  }
  return d;
}
const PW = 500;
const PH = LANE_H * LANES;
const PATH = pathD(PW);

/* Narrow: the same journey as a vertical graph with lanes as columns */
const COL = 26;
const ROWH = 56;
function vPath() {
  const x = (lane: number) => lane * COL + COL / 2;
  const y = (i: number) => i * ROWH + 22;
  let d = `M${x(C.path[0].lane)} ${y(0)}`;
  for (let i = 1; i < EVENTS; i++) {
    const a = C.path[i - 1];
    const b = C.path[i];
    if (a.lane === b.lane) d += ` V${y(i)}`;
    else d += ` V${y(i) - ROWH / 2} H${x(b.lane)} V${y(i)}`;
  }
  return d;
}
const VPATH = vPath();

export default function Step8Channels() {
  const { ref, stage, started } = useStage<HTMLElement>(BRIEF_AT + 1200);
  const rest = stage === 'rest';
  const passed = useSequence(started, rest, TIMES);
  const [row, setRow] = useState<number | null>(null);

  const status = C.rows.map((_, r) => {
    let s = 0;
    CHANGES.slice(0, passed).forEach(([cr, cs]) => {
      if (cr === r) s = Math.max(s, cs);
    });
    return s;
  });
  const last = passed > 0 ? CHANGES[passed - 1] : null;
  const lastWhen = last ? C.rows[last[0]].steps.find(st => st.s === last[1])?.when : undefined;
  const why = (r: number) => C.rows[r].steps.find(st => st.s === status[r]);
  const briefOn = rest || passed >= TIMES.length;

  return (
    <Fig ref={ref} n={8} name={C.name} desc={C.desc} stage={stage}>
      <div className="ob-f8">
        {/* Wide: horizontal swimlanes */}
        <div className="ob-f8-lanes" aria-hidden>
          <ul className="ob-f8-lane-names">
            {C.lanes.map((l, i) => (
              <li key={l.key} data-rise style={v({ '--d': i * 80 })}>
                <Icon name={l.icon as IconName} size={14} />
                <span>
                  {l.label}
                  {'note' in l && <em>{l.note}</em>}
                </span>
              </li>
            ))}
          </ul>
          <div className="ob-f8-plot">
            <div className="ob-f8-bands">
              {C.lanes.map(l => (
                <span key={l.key} />
              ))}
            </div>
            <svg viewBox={`0 0 ${PW} ${PH}`} preserveAspectRatio="none" className="ob-f8-svg" data-wipe style={v({ '--d': 350 })}>
              <path d={PATH} className="ob-f8-path" vectorEffect="non-scaling-stroke" />
            </svg>
            {C.path.map((e, i) => (
              <span
                key={i}
                className="ob-f8-node"
                style={v({ left: `${((i + 0.5) / EVENTS) * 100}%`, top: `${e.lane * LANE_H + LANE_H / 2}px`, '--d': 450 + i * 260 })}
                data-rise
              />
            ))}
          </div>
          <ol className="ob-f8-caps">
            {C.path.map((e, i) => (
              <li key={i} data-rise style={v({ '--d': 500 + i * 260 })}>
                <span className="ob-mono">{e.t}</span>
                <span>{e.text}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Narrow: the same conversation, top to bottom */}
        <div className="ob-f8-graph" aria-hidden>
          <div className="ob-f8-graph-head" style={v({ '--cols': LANES, '--col': `${COL}px` })}>
            {C.lanes.map(l => (
              <Icon key={l.key} name={l.icon as IconName} size={14} />
            ))}
          </div>
          <div className="ob-f8-graph-body" style={v({ '--col': `${COL}px`, '--rowh': `${ROWH}px` })}>
            <svg width={COL * LANES} height={ROWH * EVENTS} viewBox={`0 0 ${COL * LANES} ${ROWH * EVENTS}`} className="ob-f8-gsvg">
              {C.lanes.map((l, i) => (
                <line key={l.key} x1={i * COL + COL / 2} x2={i * COL + COL / 2} y1={0} y2={ROWH * EVENTS} className="ob-f8-gl" />
              ))}
              <path d={VPATH} className="ob-f8-path" pathLength={1} data-draw style={v({ '--d': 300, '--dur': '1600ms' })} />
              {C.path.map((e, i) => (
                <rect key={i} x={e.lane * COL + COL / 2 - 4} y={i * ROWH + 22 - 4} width={8} height={8} className="ob-f8-gnode" />
              ))}
            </svg>
            <ol>
              {C.path.map((e, i) => (
                <li key={i} data-rise style={v({ '--d': 300 + i * 200 })}>
                  <span className="ob-mono">
                    {C.lanes[e.lane].label} · {e.t}
                  </span>
                  <span>{e.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="ob-f8-wa ob-mono">
            {C.lanes[3].label}: {C.lanes[3].note}
          </p>
        </div>

        <div className="ob-f8-lower">
          <div className="ob-f8-crm ob-card" data-rise style={v({ '--d': 600 })}>
            <div className="ob-f8-crm-h">
              <span className="ob-fx-k">{C.crmTitle}</span>
              <span className="ob-f8-stamp ob-mono" data-tick={passed}>
                <i aria-hidden />
                {C.stamp}
                {lastWhen && <span> · {lastWhen}</span>}
              </span>
            </div>
            <table className="ob-f8-table">
              <thead>
                <tr>
                  {C.cols.map((c, i) => (
                    <th key={c} scope="col" className={`ob-f8-c${i}`}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody onMouseLeave={() => setRow(null)}>
                {C.rows.map((r, i) => {
                  const w = why(i);
                  const s = status[i];
                  return (
                    <tr
                      key={r.company}
                      tabIndex={0}
                      data-on={row === i ? '' : undefined}
                      onMouseEnter={() => setRow(i)}
                      onFocus={() => setRow(i)}
                      onBlur={() => setRow(null)}
                    >
                      <td className="ob-f8-c0">{r.company}</td>
                      <td className="ob-f8-c1">{r.contact}</td>
                      <td className="ob-f8-c2">
                        <span
                          key={s}
                          className={`ob-f8-status${!rest && s > 0 && stage !== 'done' ? ' ob-flash' : ''}`}
                          data-s={s}
                        >
                          <i aria-hidden />
                          {C.statuses[s]}
                        </span>
                        {w && (
                          <span className="ob-sr">
                            {' '}
                            ({w.why}, {w.when})
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="ob-f8-why" aria-hidden>
              {row !== null && why(row)
                ? C.rowWhy(C.rows[row].company, C.statuses[status[row]], why(row)!.why, why(row)!.when)
                : C.rowHint}
            </p>
          </div>

          <aside className="ob-f8-brief ob-card" data-show={briefOn ? '' : undefined}>
            <div className="ob-f8-brief-h">
              <Icon name="doc" size={14} />
              <span>{C.brief.title}</span>
            </div>
            <p className="ob-f8-brief-for ob-mono">{C.brief.for}</p>
            <dl>
              {C.brief.items.map(it => (
                <div key={it.k}>
                  <dt className="ob-fx-k">{it.k}</dt>
                  <dd>{it.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </Fig>
  );
}
