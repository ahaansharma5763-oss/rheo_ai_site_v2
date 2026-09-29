'use client';

/* §7 Emails sent per sending day, from our own campaigns (data.ts, counts
 * only). Single-hue navy ramp, zero-based bars, hairline axes, direct labels.
 * Hover, tap or arrow keys read any day. A table carries the same numbers
 * for screen readers. No gold here: the section's gold is the funnel's 9. */

import { useMemo, useState } from 'react';
import { SENDS } from './data';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parts(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const wd = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return { day: d, mon: MONTHS[m - 1], wd: DAYS[wd] };
}

/* Prussian #1E4080 → Ocean #2E74AC → Crest #3FAEDE, by value */
function ramp(t: number): string {
  const stops = [
    [0x1e, 0x40, 0x80],
    [0x2e, 0x74, 0xac],
    [0x3f, 0xae, 0xde],
  ];
  const x = Math.min(1, Math.max(0, t)) * 2;
  const i = Math.min(1, Math.floor(x));
  const f = x - i;
  const c = stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const TICKS = [0, 40, 80, 120];
const TOP = 120;
const STEP = 10;
const BAR = 7;

export default function SendsChart({ label }: { label: string }) {
  const n = SENDS.length;
  const max = useMemo(() => Math.max(...SENDS.map(d => d[1])), []);
  const firstMax = useMemo(() => SENDS.findIndex(d => d[1] === max), [max]);
  const sepIdx = useMemo(() => SENDS.findIndex(d => d[0].slice(5, 7) === '09'), []);
  const [sel, setSel] = useState(n - 1);

  const pick = (clientX: number, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    if (r.width <= 0) return;
    const i = Math.floor(((clientX - r.left) / r.width) * n);
    setSel(Math.min(n - 1, Math.max(0, i)));
  };

  const cur = SENDS[sel];
  const p = parts(cur[0]);
  const x = (i: number) => `${((i + 0.5) / n) * 100}%`;
  const y = (v: number) => `${100 - (v / TOP) * 100}%`;
  const first = parts(SENDS[0][0]);
  const last = parts(SENDS[n - 1][0]);
  const sep = sepIdx >= 0 ? parts(SENDS[sepIdx][0]) : null;

  return (
    <div
      className="ob-chart"
      data-stage
      role="group"
      aria-label={label}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') setSel(s => Math.min(n - 1, s + 1));
        else if (e.key === 'ArrowLeft') setSel(s => Math.max(0, s - 1));
        else if (e.key === 'Home') setSel(0);
        else if (e.key === 'End') setSel(n - 1);
        else return;
        e.preventDefault();
      }}
    >
      <div
        className="ob-chart-plot"
        onPointerMove={e => pick(e.clientX, e.currentTarget)}
        onPointerDown={e => pick(e.clientX, e.currentTarget)}
        aria-hidden
      >
        {TICKS.map(t => (
          <span key={t} className="ob-chart-y ob-mono" style={{ top: y(t) }}>
            {t}
          </span>
        ))}
        <svg viewBox={`0 0 ${n * STEP} 100`} preserveAspectRatio="none" focusable="false">
          {TICKS.map(t => (
            <line
              key={t}
              x1={0}
              x2={n * STEP}
              y1={100 - (t / TOP) * 100}
              y2={100 - (t / TOP) * 100}
              stroke={t === 0 ? '#1E4080' : 'rgba(143,220,248,0.13)'}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <g className="ob-chart-bars">
            {SENDS.map(([d, v], i) => {
              const h = (v / TOP) * 100;
              return (
                <rect
                  key={d}
                  x={i * STEP + (STEP - BAR) / 2}
                  y={100 - h}
                  width={BAR}
                  height={h}
                  fill={i === sel ? '#F4EDDF' : ramp(v / max)}
                />
              );
            })}
          </g>
        </svg>
        <span className="ob-chart-val ob-mono" style={{ left: x(0), top: y(SENDS[0][1]) }}>
          {SENDS[0][1]}
        </span>
        <span className="ob-chart-val ob-mono" style={{ left: x(firstMax), top: y(max) }}>
          {max}
        </span>
      </div>
      <div className="ob-chart-x" aria-hidden>
        <span className="ob-mono" style={{ left: 0 }}>
          {first.day} {first.mon}
        </span>
        {sep && (
          <span className="ob-mono" style={{ left: x(sepIdx), transform: 'translateX(-50%)' }}>
            {sep.day} {sep.mon}
          </span>
        )}
        <span className="ob-mono" style={{ right: 0 }}>
          {last.day} {last.mon}
        </span>
      </div>
      <p className="ob-chart-readout ob-mono" aria-live="polite">
        <b>
          {p.wd} {p.day} {p.mon}
        </b>{' '}
        · {cur[1]}
      </p>
      <table className="ob-sr">
        <caption>{label}</caption>
        <tbody>
          {SENDS.map(([d, v]) => {
            const q = parts(d);
            return (
              <tr key={d}>
                <th scope="row">
                  {q.wd} {q.day} {q.mon}
                </th>
                <td>{v}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
