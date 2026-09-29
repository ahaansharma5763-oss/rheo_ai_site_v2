'use client';

/* Step 9 · Booked, confirmed, reminded: the meeting lifecycle.
 * A state diagram: the main path, the no-show loop that comes back to
 * booked, and the not-now branch that sets a wake date. Pick a not-now
 * reason and the wake date is worked out from today, in the browser, and
 * lands on a small calendar. */

import { useId, useState } from 'react';
import { COPY } from './copy';
import { type Box, useLayoutBoxes, useStage, useTodayKey } from './hooks';
import { Choices, Fig, Icon, v } from './ui';

const C = COPY.s9;
type Reason = (typeof C.reasons)[number]['key'];
const OPTIONS = C.reasons.map(r => ({ value: r.key as Reason, label: r.label }));

/* Node order in the DOM (and in the measured boxes) */
const NODES = ['reply', ...C.main.map(n => n.key), ...C.noshow.map(n => n.key), ...C.notnow.map(n => n.key)] as const;
type NodeKey = (typeof NODES)[number];
const at = (k: NodeKey) => NODES.indexOf(k);

/* ─── dates, in the visitor's own calendar ─── */
function mondayOnOrAfter(d: Date) {
  const r = new Date(d);
  while (r.getDay() !== 1) r.setDate(r.getDate() + 1);
  return r;
}
function wakeDate(key: Reason, today: Date): Date {
  const y = today.getFullYear();
  const m = today.getMonth();
  if (key === 'budget') {
    const d = mondayOnOrAfter(new Date(y, 0, 1));
    return d > today ? d : mondayOnOrAfter(new Date(y + 1, 0, 1));
  }
  if (key === 'freeze') {
    const d = new Date(y, m, today.getDate() + 60);
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() + 1);
    return d;
  }
  return mondayOnOrAfter(new Date(y, (Math.floor(m / 3) + 1) * 3, 8));
}
const fmtDate = (d: Date) => `${C.wd[d.getDay()]} ${d.getDate()} ${C.monthsShort[d.getMonth()]} ${d.getFullYear()}`;
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function monthCells(d: Date) {
  const first = new Date(d.getFullYear(), d.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7; // Monday first
  const days = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
  for (let i = 1; i <= days; i++) cells.push(new Date(d.getFullYear(), d.getMonth(), i));
  while (cells.length < 42) cells.push(null);
  return cells;
}

/* ─── the diagram's lines, from measured node boxes ─── */
type Edge = { d: string; dash?: boolean };
function edges(b: Box[]): { wide: boolean; list: Edge[] } {
  const g = (k: NodeKey) => b[at(k)];
  const R = (n: Box) => n.x + n.w;
  const cy = (n: Box) => n.y + n.h / 2;
  const cx = (n: Box) => n.x + n.w / 2;
  const booked = g('booked');
  const confirmed = g('confirmed');
  const wide = Math.abs(booked.y - confirmed.y) < 4;
  const list: Edge[] = [];
  const h = (a: Box, z: Box) => list.push({ d: `M${R(a)} ${cy(a)} L${z.x} ${cy(z)}` });
  const hl = (a: Box, z: Box) => list.push({ d: `M${a.x} ${cy(a)} L${R(z)} ${cy(z)}` });
  const vd = (a: Box, z: Box) => list.push({ d: `M${a.x + 16} ${a.y + a.h} L${z.x + 16} ${z.y}` });
  if (wide) {
    const reply = g('reply');
    const ex = R(reply) + 13;
    const notnow = g('notnow');
    list.push({ d: `M${R(reply)} ${cy(reply)} H${ex} V${cy(booked)} H${booked.x}` });
    list.push({ d: `M${R(reply)} ${cy(reply)} H${ex} V${cy(notnow)} H${notnow.x}` });
    h(booked, confirmed);
    h(confirmed, g('reminded'));
    h(g('reminded'), g('held'));
    const rem = g('reminded');
    const ns = g('noshow');
    list.push({ d: `M${cx(rem)} ${rem.y + rem.h} L${cx(ns)} ${ns.y}` });
    hl(ns, g('followed'));
    hl(g('followed'), g('rebooked'));
    const rb = g('rebooked');
    list.push({ d: `M${cx(rb)} ${rb.y} L${cx(booked)} ${booked.y + booked.h}`, dash: true });
    h(notnow, g('wake'));
    h(g('wake'), g('auto'));
  } else {
    vd(booked, confirmed);
    vd(confirmed, g('reminded'));
    vd(g('reminded'), g('held'));
    vd(g('noshow'), g('followed'));
    vd(g('followed'), g('rebooked'));
    vd(g('notnow'), g('wake'));
    vd(g('wake'), g('auto'));
  }
  return { wide, list };
}

function Node({ k, label, sub, d, children }: { k: NodeKey; label: string; sub?: string; d: number; children?: React.ReactNode }) {
  return (
    <div className={`ob-f9-node ob-f9-n-${k}`} data-rise style={v({ '--d': d })}>
      <span className="ob-f9-label">{label}</span>
      {sub && <span className="ob-f9-sub">{sub}</span>}
      {children}
    </div>
  );
}

export default function Step9Lifecycle() {
  const { ref, stage } = useStage<HTMLElement>(2800);
  const mid = useId().replace(/:/g, '');
  const [reason, setReason] = useState<Reason>('budget');
  const [touched, setTouched] = useState(false);
  const [live, setLive] = useState('');
  const key = useTodayKey();
  const { ref: diaRef, m } = useLayoutBoxes<HTMLDivElement>('.ob-f9-node', [reason]);

  const today = key ? new Date(Number(key.split('-')[0]), Number(key.split('-')[1]) - 1, Number(key.split('-')[2])) : null;
  const wake = today ? wakeDate(reason, today) : null;
  const r = C.reasons.find(x => x.key === reason) ?? C.reasons[0];
  const lines = m && m.boxes.length === NODES.length ? edges(m.boxes) : null;

  return (
    <Fig ref={ref} n={9} name={C.name} desc={C.desc} stage={stage} live={live}>
      <div className="ob-f9">
        <div className="ob-f9-dia" ref={diaRef} data-lines={lines ? '' : undefined}>
          {lines && m && (
            <svg className="ob-f9-lines" viewBox={`0 0 ${m.w} ${m.h}`} width={m.w} height={m.h} aria-hidden>
              <defs>
                <marker id={`${mid}-a`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
                  <path d="M1 1 L7 4 L1 7" className="ob-f9-head" />
                </marker>
              </defs>
              {lines.list.map((e, i) => (
                <path
                  key={i}
                  d={e.d}
                  className={`ob-f9-edge${e.dash ? ' ob-f9-edge--dash' : ''}`}
                  markerEnd={`url(#${mid}-a)`}
                  pathLength={e.dash ? undefined : 1}
                  data-draw={e.dash ? undefined : ''}
                  data-rise={e.dash ? '' : undefined}
                  style={v({ '--d': 300 + i * 90 })}
                />
              ))}
            </svg>
          )}

          <Node k="reply" label={C.reply} d={0} />

          <p className="ob-f9-track ob-fx-k">{C.tracks[0]}</p>
          {C.main.map((n, i) => (
            <Node key={n.key} k={n.key} label={n.label} sub={n.sub} d={150 + i * 120} />
          ))}

          <p className="ob-f9-track ob-fx-k">{C.tracks[1]}</p>
          {C.noshow.map((n, i) => (
            <Node key={n.key} k={n.key} label={n.label} sub={n.sub} d={700 + i * 120} />
          ))}

          <p className="ob-f9-track ob-fx-k">{C.tracks[2]}</p>
          <Node k="notnow" label={C.notnow[0].label} sub={C.notnow[0].sub} d={1000} />
          <Node k="wake" label={C.notnow[1].label} d={1120}>
            <span key={reason} className={`ob-f9-wake${touched ? ' ob-swap' : ''}`}>
              <span>{r.label}</span>
              <span className="ob-mono">{wake ? fmtDate(wake) : r.rule}</span>
            </span>
          </Node>
          <Node k="auto" label={C.notnow[2].label} sub={C.notnow[2].sub} d={1240} />
        </div>

        <div className="ob-f9-lower">
          <div className="ob-f9-reasons" data-rise style={v({ '--d': 1300 })}>
            <Choices
              className="ob-f9-pick"
              legend={C.reasonsLabel}
              options={OPTIONS}
              value={reason}
              onChange={k => {
                setReason(k);
                setTouched(true);
                const rr = C.reasons.find(x => x.key === k);
                if (rr) setLive(C.announce(rr.label, today ? fmtDate(wakeDate(k, today)) : rr.rule));
              }}
              render={(o, i) => (
                <span className="ob-f9-reason">
                  <span>{o.label}</span>
                  <span className="ob-mono">{C.reasons[i].rule}</span>
                </span>
              )}
            />
          </div>

          <div className="ob-f9-cal ob-card" data-rise style={v({ '--d': 1450 })}>
            {wake && today ? (
              <>
                <div className="ob-f9-cal-h">
                  <span className="ob-fx-k">{C.wakeLabel}</span>
                  <span key={`${reason}-m`} className={`ob-f9-cal-m${touched ? ' ob-swap' : ''}`}>
                    <Icon name="calendar" size={14} />
                    {C.monthsLong[wake.getMonth()]} {wake.getFullYear()}
                  </span>
                </div>
                <div className="ob-f9-grid" role="presentation">
                  {C.weekdays.map(w => (
                    <span key={w} className="ob-f9-wd ob-mono">
                      {w}
                    </span>
                  ))}
                  {monthCells(wake).map((d, i) => (
                    <span
                      key={i}
                      className="ob-f9-day ob-mono"
                      data-wake={d && sameDay(d, wake) ? '' : undefined}
                      data-today={d && sameDay(d, today) ? '' : undefined}
                      data-we={i % 7 >= 5 ? '' : undefined}
                    >
                      {d ? d.getDate() : ''}
                      {d && sameDay(d, wake) && <i key={reason} className={touched ? 'ob-pop' : undefined} aria-hidden />}
                    </span>
                  ))}
                </div>
                <p key={`${reason}-o`} className={`ob-f9-out${touched ? ' ob-swap' : ''}`}>
                  {C.wakeOut(fmtDate(wake))}
                </p>
              </>
            ) : (
              <p className="ob-f9-nodate">{C.noDate}</p>
            )}
          </div>
        </div>
      </div>
    </Fig>
  );
}
