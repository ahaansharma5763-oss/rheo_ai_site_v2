'use client';

/* Step 6 · Three short emails: the week line and the one-change test.
 * Day 0, day 3 and day 7 on one line, the third with a new angle, then a
 * stop or a move to LinkedIn. Below, version A and B differ in exactly one
 * line, highlighted when you flip between them, with the rule beside it. */

import { useState } from 'react';
import { COPY } from './copy';
import { useStage } from './hooks';
import { Choices, Fig, Icon, v } from './ui';

const C = COPY.s6;
type Ver = (typeof C.versions)[number]['key'];
const OPTIONS = C.versions.map(x => ({ value: x.key as Ver, label: x.label }));

export default function Step6Sequence() {
  const { ref, stage } = useStage<HTMLElement>(2800);
  const [ver, setVer] = useState<Ver>('a');
  const [flips, setFlips] = useState(0);
  const [live, setLive] = useState('');
  const ask = ver === 'a' ? C.askA : C.askB;

  return (
    <Fig ref={ref} n={6} name={C.name} desc={C.desc} stage={stage} live={live}>
      <div className="ob-f6">
        <div className="ob-f6-week">
          <span className="ob-fx-k" data-rise>
            {C.week}
          </span>
          <ol className="ob-f6-days">
            {C.days.map((d, i) => (
              <li key={d.day} className="ob-f6-day" data-angle={'angle' in d ? '' : undefined}>
                <span className="ob-f6-seg" data-grow style={v({ '--d': 150 + i * 260 })} aria-hidden />
                <span className="ob-f6-node" data-rise style={v({ '--d': 100 + i * 260 })} aria-hidden />
                <span className="ob-f6-dlabel ob-mono" data-rise style={v({ '--d': 100 + i * 260 })}>
                  {d.day}
                </span>
                <article className="ob-f6-mail" data-rise style={v({ '--d': 250 + i * 260 })}>
                  <header>
                    <Icon name="mail" size={14} />
                    <span className="ob-mono">{d.n}</span>
                    {'angle' in d && <span className="ob-f6-angle">{d.angle}</span>}
                  </header>
                  <p className="ob-f6-subj">{d.subject}</p>
                  <p className="ob-f6-first">{d.first}</p>
                </article>
              </li>
            ))}
            <li className="ob-f6-fork">
              <span className="ob-f6-seg ob-f6-seg--stop" data-grow style={v({ '--d': 950 })} aria-hidden />
              <span className="ob-f6-bar" data-rise style={v({ '--d': 1150 })} aria-hidden />
              <span className="ob-f6-dlabel ob-mono" data-rise style={v({ '--d': 950 })}>
                {C.after}
              </span>
              <span className="ob-f6-branch" data-grow style={v({ '--d': 1200 })} aria-hidden />
              <div className="ob-f6-ends">
                <article className="ob-f6-stop" data-rise style={v({ '--d': 1250 })}>
                  <p className="ob-f6-subj">{C.stop}</p>
                  <p className="ob-f6-first">{C.stopSub}</p>
                </article>
                <article className="ob-f6-li" data-rise style={v({ '--d': 1400 })}>
                  <header>
                    <Icon name="users" size={14} />
                    <span className="ob-mono">{C.li}</span>
                  </header>
                  <p className="ob-f6-subj">{C.liSub}</p>
                  <p className="ob-f6-first">{C.liNote}</p>
                </article>
              </div>
            </li>
          </ol>
        </div>

        <div className="ob-f6-ab ob-card" data-rise style={v({ '--d': 1500 })}>
          <div className="ob-f6-ab-mail">
            <p className="ob-f6-ab-row">
              <span className="ob-fx-k">{C.subjectK}</span>
              <span>{C.emailSubject}</span>
            </p>
            <p className="ob-f6-ab-first">{C.emailFirst}</p>
            <div className="ob-f6-same" aria-hidden>
              <i style={{ width: '96%' }} />
              <i style={{ width: '84%' }} />
              <span className="ob-mono">{C.same}</span>
            </div>
            <p className="ob-f6-ask" data-flip={flips ? '' : undefined}>
              <span className="ob-f6-ask-k ob-mono">{C.change}</span>
              <span key={ver} className={`ob-f6-ask-v${flips ? ' ob-swap' : ''}`}>
                {ask}
              </span>
            </p>
          </div>
          <div className="ob-f6-ab-side">
            <span className="ob-fx-k">{C.abTitle}</span>
            <Choices
              className="ob-seg"
              legend={C.toggle}
              legendHidden
              options={OPTIONS}
              value={ver}
              onChange={k => {
                setVer(k);
                setFlips(f => f + 1);
                const o = C.versions.find(x => x.key === k);
                if (o) setLive(C.announce(o.label, k === 'a' ? C.askA : C.askB));
              }}
            />
            <p className="ob-f6-rule">{C.rule}</p>
            <div className="ob-f6-sends">
              <span className="ob-fx-k">{C.sendsLabel}</span>
              {C.sends.map(s => (
                <div key={s.key} className="ob-f6-meter" data-on={s.key === ver ? '' : undefined}>
                  <span className="ob-mono ob-f6-meter-k">{s.label}</span>
                  <span className="ob-f6-meter-bar" aria-hidden>
                    <i style={v({ '--w': s.n / 200 })} />
                  </span>
                  <span className="ob-mono ob-f6-meter-n">
                    {s.n} <span>{C.of}</span>
                  </span>
                </div>
              ))}
              <p className="ob-f6-hint ob-mono">{C.hint}</p>
            </div>
          </div>
        </div>
      </div>
    </Fig>
  );
}
