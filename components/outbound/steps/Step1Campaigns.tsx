'use client';

/* Step 1 · Who you want as customers: a campaign designer.
 * The ideal-customer spec sheet on the left feeds five campaign types on the
 * right. Picking a type draws a hairline to it and shows its one goal, who it
 * reaches and an example opening line. */

import { useState } from 'react';
import { COPY } from './copy';
import { useLayoutBoxes, useStage } from './hooks';
import { Choices, Fig, Icon, v } from './ui';

const C = COPY.s1;
type Key = (typeof C.campaigns)[number]['key'];
const OPTIONS = C.campaigns.map(c => ({ value: c.key as Key, label: c.name }));

export default function Step1Campaigns() {
  const { ref, stage } = useStage<HTMLElement>(2600);
  const [sel, setSel] = useState<Key>('new');
  const [live, setLive] = useState('');
  const [touched, setTouched] = useState(false);
  const idx = Math.max(0, C.campaigns.findIndex(c => c.key === sel));
  const cur = C.campaigns[idx];
  const { ref: gridRef, m } = useLayoutBoxes<HTMLDivElement>('.ob-f1-spec, .ob-f1-list .ob-choice');

  // The wire: from the spec sheet's edge to each campaign row (wide layout only)
  let wires: { d: string; on: boolean; y1: number }[] = [];
  let x0 = 0, y0 = 0, x1 = 0;
  if (m && m.boxes.length === 1 + C.campaigns.length) {
    const spec = m.boxes[0];
    const rows = m.boxes.slice(1);
    if (rows[0].x > spec.x + spec.w + 8) {
      x0 = spec.x + spec.w;
      y0 = spec.y + Math.min(spec.h / 2, 96);
      x1 = rows[0].x;
      const mid = (x0 + x1) / 2;
      wires = rows.map((r, i) => {
        const y1 = r.y + r.h / 2;
        return { d: `M${x0} ${y0} C${mid} ${y0} ${mid} ${y1} ${x1} ${y1}`, on: i === idx, y1 };
      });
    }
  }

  return (
    <Fig ref={ref} n={1} name={C.name} desc={C.desc} stage={stage} live={live}>
      <div ref={gridRef} className="ob-f1-grid">
        {wires.length > 0 && m && (
          <svg className="ob-f1-wires" viewBox={`0 0 ${m.w} ${m.h}`} width={m.w} height={m.h} aria-hidden>
            {wires.map((w, i) => (
              <path key={i} d={w.d} className="ob-f1-wire-ghost" />
            ))}
            <path
              key={`on-${idx}`}
              d={wires[idx].d}
              className={`ob-f1-wire${touched ? ' ob-draw' : ''}`}
              pathLength={1}
              data-draw
              style={v({ '--d': 900 })}
            />
            <rect x={x0 - 3} y={y0 - 3} width={6} height={6} className="ob-f1-node" data-rise style={v({ '--d': 700 })} />
            <rect
              key={`n-${idx}`}
              x={x1 - 3}
              y={wires[idx].y1 - 3}
              width={6}
              height={6}
              className={`ob-f1-node ob-f1-node--end${touched ? ' ob-pop' : ''}`}
              data-rise
              style={v({ '--d': 1300 })}
            />
          </svg>
        )}

        <div className="ob-f1-specwrap">
        <span className="ob-fx-k ob-f1-speck">{C.specLabel}</span>
        <section className="ob-f1-spec ob-card" data-rise style={v({ '--d': 0 })}>
          <header className="ob-f1-spec-h">
            <Icon name="user" />
            <span>{C.specTitle}</span>
          </header>
          <dl className="ob-f1-fields">
            {C.spec.map((f, i) => (
              <div key={f.k} className="ob-f1-field" data-rise style={v({ '--d': 120 + i * 90 })}>
                <dt className="ob-fx-k">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>
        </div>

        <Choices
          className="ob-f1-list"
          legend={C.listLabel}
          options={OPTIONS}
          value={sel}
          onChange={k => {
            setSel(k);
            setTouched(true);
            const c = C.campaigns.find(x => x.key === k);
            if (c) setLive(C.announce(c.name, c.goal));
          }}
          render={(o, i) => {
            const c = C.campaigns[i];
            return (
              <span className="ob-f1-row" data-rise style={v({ '--d': 260 + i * 90 })}>
                <span className="ob-f1-n ob-mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="ob-f1-nm">{c.name}</span>
                <span className="ob-f1-arc">
                  {c.from} <span aria-hidden>→</span>
                  <span className="ob-sr"> to </span> {c.to}
                </span>
              </span>
            );
          }}
        />

        <div className="ob-f1-detail" data-rise style={v({ '--d': 1100 })}>
          <div key={sel} className={`ob-f1-detail-in${touched ? ' ob-swap' : ''}`}>
            <div className="ob-f1-d">
              <span className="ob-fx-k">{C.goalLabel}</span>
              <p className="ob-f1-goal">{cur.goal}</p>
            </div>
            <div className="ob-f1-d">
              <span className="ob-fx-k">{C.reachLabel}</span>
              <p>{cur.reach}</p>
            </div>
            <div className="ob-f1-d ob-f1-open">
              <span className="ob-fx-k">{C.openLabel}</span>
              <p>
                <Icon name="mail" />
                <span>{cur.opening}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fig>
  );
}
