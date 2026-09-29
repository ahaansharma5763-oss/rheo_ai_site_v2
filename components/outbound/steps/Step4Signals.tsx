'use client';

/* Step 4 · A reason to write: a 30-day signal timeline to a first line.
 * Five markers sit on the last 30 days. Choosing one retypes the email's
 * first line for that reason, with a "why now" label. The rest of the email
 * does not change. */

import { useState } from 'react';
import { COPY } from './copy';
import { useReducedMotion, useStage, useTyping } from './hooks';
import { Choices, Fig, Icon, v } from './ui';

const C = COPY.s4;
type Key = (typeof C.signals)[number]['key'];
const OPTIONS = C.signals.map(s => ({ value: s.key as Key, label: s.label }));
const TICKS = [30, 25, 20, 15, 10, 5, 0];

export default function Step4Signals() {
  const { ref, stage, started } = useStage<HTMLElement>(3200);
  const reduced = useReducedMotion();
  const [sel, setSel] = useState<Key>('hire');
  const [clicks, setClicks] = useState(0);
  const [live, setLive] = useState('');
  const sig = C.signals.find(s => s.key === sel) ?? C.signals[C.signals.length - 1];
  const run = reduced ? 0 : (started ? 1 : 0) + clicks;
  const { shown, typing } = useTyping(sig.line, run, 46, clicks ? 120 : 1500);

  return (
    <Fig ref={ref} n={4} name={C.name} desc={C.desc} stage={stage} live={live}>
      <div className="ob-f4">
        <div className="ob-f4-tl">
          <span className="ob-fx-k ob-f4-watch" data-rise>
            {C.watch}
          </span>
          <div className="ob-f4-track">
            <span className="ob-f4-end ob-f4-end--l ob-mono" data-rise>
              {C.axisStart}
            </span>
            <div className="ob-f4-axis">
              <span className="ob-f4-rule" data-grow style={v({ '--d': 150 })} aria-hidden />
              {TICKS.map(t => (
                <span key={t} className="ob-f4-tick" style={{ left: `${((30 - t) / 30) * 100}%` }} aria-hidden />
              ))}
              <Choices
                className="ob-f4-marks"
                legend={C.pickLabel}
                legendHidden
                options={OPTIONS}
                value={sel}
                onChange={k => {
                  setSel(k);
                  setClicks(c => c + 1);
                  const s = C.signals.find(x => x.key === k);
                  if (s) setLive(C.announce(s.label, s.line));
                }}
                render={(o, i, on) => {
                  const s = C.signals[i];
                  const x = ((30 - s.ago) / 30) * 100;
                  return (
                    <span
                      className="ob-f4-mk"
                      data-side={i % 2 ? 'down' : 'up'}
                      data-edge={x < 18 ? 'l' : x > 82 ? 'r' : undefined}
                      data-on={on ? '' : undefined}
                      style={v({ '--x': `${x}%`, '--d': 450 + i * 110 })}
                      data-rise
                    >
                      <span className="ob-f4-node" aria-hidden />
                      <span className="ob-f4-lab">
                        <span className="ob-f4-name">{s.short}</span>
                        <span className="ob-f4-ago ob-mono">{C.ago(s.ago)}</span>
                      </span>
                    </span>
                  );
                }}
              />
            </div>
            <span className="ob-f4-end ob-f4-end--r ob-mono" data-rise>
              {C.axisEnd}
            </span>
          </div>
        </div>

        <div className="ob-f4-mail ob-card" data-rise style={v({ '--d': 1000 })}>
          <div className="ob-f4-mail-bar" aria-hidden>
            <Icon name="mail" size={14} />
            <span>{C.newMsg}</span>
            <span className="ob-f4-mail-dots">
              <i />
              <i />
              <i />
            </span>
          </div>
          <dl className="ob-f4-hdr">
            <div>
              <dt>{C.from}</dt>
              <dd>{C.fromValue}</dd>
            </div>
            <div>
              <dt>{C.to}</dt>
              <dd key={sel} className={clicks ? 'ob-swap' : undefined}>
                {sig.to}
              </dd>
            </div>
            <div>
              <dt>{C.subject}</dt>
              <dd key={`s-${sel}`} className={`ob-f4-subj${clicks ? ' ob-swap' : ''}`}>
                {sig.subject}
              </dd>
            </div>
          </dl>
          <div className="ob-f4-body">
            <p className="ob-f4-why">
              <span className="ob-fx-k">{C.whyNow}</span>
              <span key={sel} className={`ob-f4-why-v${clicks ? ' ob-swap' : ''}`}>
                {sig.label} <span className="ob-mono">· {C.ago(sig.ago)}</span>
              </span>
            </p>
            <p className="ob-f4-first" aria-hidden={typing || undefined}>
              {shown}
              {typing && <span className="ob-caret" aria-hidden />}
            </p>
            {typing && <p className="ob-sr">{sig.line}</p>}
            <div className="ob-f4-rest" aria-hidden>
              <i style={{ width: '94%' }} />
              <i style={{ width: '88%' }} />
              <i style={{ width: '62%' }} />
            </div>
            <p className="ob-f4-rest-l ob-mono">{C.rest}</p>
          </div>
        </div>
      </div>
    </Fig>
  );
}
