'use client';

/* Step 7 · Sorted in under a minute: reply triage.
 * Pick a sample reply: it arrives, a ring timer runs and stops under a
 * minute, and the reply flies into one of seven lanes. The mode changes the
 * drafted answer, which always says a person approves it first. */

import { useEffect, useRef, useState } from 'react';
import { COPY } from './copy';
import { useClock, usePhases, useReducedMotion, useStage } from './hooks';
import { Choices, Fig, Icon, v } from './ui';

const C = COPY.s7;
type RKey = (typeof C.replies)[number]['key'];
type Mode = (typeof C.modes)[number]['key'];
const REPLIES = C.replies.map(r => ({ value: r.key as RKey, label: r.pick }));
const MODES = C.modes.map(m => ({ value: m.key as Mode, label: m.label }));
const TIMES = [1350, 2000] as const; // timer stops and the reply flies · it lands
const R = 26;
const CIRC = 2 * Math.PI * R;

const clock = (s: number) => `0:${String(Math.floor(s)).padStart(2, '0')}`;

function draftFor(k: RKey, mode: Mode): { text: string; note?: string; modal: boolean } {
  if (k === 'later') return { text: C.drafts.later.all, note: C.drafts.later.note, modal: false };
  if (k === 'auto') return { text: C.drafts.auto.all, note: C.drafts.auto.note, modal: false };
  return { text: C.drafts[k][mode], modal: true };
}

export default function Step7Triage() {
  const { ref, stage, started } = useStage<HTMLElement>(3200);
  const reduced = useReducedMotion();
  const [sel, setSel] = useState<RKey>('int');
  const [mode, setMode] = useState<Mode>('book');
  const [picks, setPicks] = useState(0);
  const [modeFlips, setModeFlips] = useState(0);
  const [sorted, setSorted] = useState<RKey[]>(['int']);
  const [live, setLive] = useState('');
  const boardRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLSpanElement>(null);

  const reply = C.replies.find(r => r.key === sel) ?? C.replies[0];
  const run = reduced ? 0 : (started ? 1 : 0) + picks;
  const phase = usePhases(run, TIMES);
  const { v: secs } = useClock(reply.secs, run, TIMES[0] - 150);
  const landed = phase >= 2;
  const draft = draftFor(sel, mode);

  // The flight: from the reply card to its lane, measured at take-off
  useEffect(() => {
    if (!run || phase !== 1) return;
    const box = boardRef.current;
    const from = cardRef.current;
    const fly = flyRef.current;
    const to = box?.querySelector<HTMLElement>(`[data-lane="${reply.lane}"] .ob-f7-slot`);
    if (!box || !from || !fly || !to) return;
    const rb = box.getBoundingClientRect();
    const a = from.getBoundingClientRect();
    const b = to.getBoundingClientRect();
    fly.style.transition = 'none';
    fly.style.transform = `translate(${a.left - rb.left + 14}px, ${a.top - rb.top + 12}px)`;
    fly.style.opacity = '1';
    void fly.offsetWidth;
    fly.style.transition = 'transform 0.62s cubic-bezier(0.2, 0.6, 0.2, 1)';
    fly.style.transform = `translate(${b.left - rb.left + 6}px, ${b.top - rb.top + (b.height - fly.offsetHeight) / 2}px)`;
  }, [run, phase, reply.lane]);

  useEffect(() => {
    if (phase !== 2) return;
    const fly = flyRef.current;
    if (fly) {
      fly.style.transition = 'opacity 0.16s cubic-bezier(0.2, 0.6, 0.2, 1)';
      fly.style.opacity = '0';
    }
  }, [phase, run]);

  const lanesWith = (lane: number) =>
    sorted
      .map(k => C.replies.find(r => r.key === k))
      .filter((r): r is (typeof C.replies)[number] => !!r && r.lane === lane)
      .filter(r => r.key !== sel || landed || !run);

  return (
    <Fig ref={ref} n={7} name={C.name} desc={C.desc} stage={stage} live={live}>
      <div className="ob-f7" ref={boardRef}>
        <span className="ob-f7-fly" ref={flyRef} aria-hidden>
          {reply.from}
        </span>

        <div className="ob-f7-top">
          <div className="ob-f7-left">
            <Choices
              className="ob-f7-pick"
              legend={C.pickLabel}
              options={REPLIES}
              value={sel}
              onChange={k => {
                setSel(k);
                setPicks(p => p + 1);
                setSorted(s => (s.includes(k) ? s : [...s, k]));
                const r = C.replies.find(x => x.key === k);
                if (r) setLive(C.announce(C.lanes[r.lane], clock(r.secs)));
              }}
              render={(o, i) => (
                <span className="ob-f7-pick-row" data-rise style={v({ '--d': i * 80 })}>
                  <Icon name="mail" size={14} />
                  <span>{o.label}</span>
                </span>
              )}
            />

            <div className="ob-f7-arrive" data-rise style={v({ '--d': 450 })}>
              <div ref={cardRef} key={`${sel}-${run}`} className={`ob-f7-card ob-card${run ? ' ob-swap' : ''}`}>
                <p className="ob-f7-from">
                  <b>{reply.from}</b>
                  <span>{reply.company}</span>
                </p>
                <p className="ob-f7-text">{reply.text}</p>
              </div>
              <div className="ob-f7-timer" data-done={phase >= 1 ? '' : undefined}>
                <svg viewBox="0 0 64 64" width={64} height={64} aria-hidden>
                  <circle cx={32} cy={32} r={R} className="ob-f7-ring-bg" />
                  <circle
                    cx={32}
                    cy={32}
                    r={R}
                    className="ob-f7-ring"
                    strokeDasharray={`${(CIRC * secs) / 60} ${CIRC}`}
                    transform="rotate(-90 32 32)"
                  />
                </svg>
                <span className="ob-f7-clock ob-mono">{clock(secs)}</span>
                <span className="ob-f7-timer-l">{C.timerLabel}</span>
              </div>
            </div>
          </div>

          <div className="ob-f7-lanes" data-rise style={v({ '--d': 200 })}>
            <span className="ob-fx-k">{C.lanesLabel}</span>
            <ol>
              {C.lanes.map((l, i) => {
                const chips = lanesWith(i);
                const on = reply.lane === i && (landed || !run);
                return (
                  <li key={l} data-lane={i} data-on={on ? '' : undefined}>
                    <span className="ob-f7-lane">{l}</span>
                    <span className="ob-f7-slot">
                      {chips.map(r => (
                        <span
                          key={r.key}
                          className={`ob-f7-chip${r.key === sel && run ? ' ob-pop' : ''}`}
                          data-cur={r.key === sel ? '' : undefined}
                        >
                          {r.from}
                        </span>
                      ))}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="ob-f7-draft ob-card" data-rise style={v({ '--d': 700 })}>
          <div className="ob-f7-draft-h">
            <span className="ob-fx-k">{C.draftLabel}</span>
            <span className="ob-f7-badge">
              <Icon name="user" size={14} />
              {C.approve}
            </span>
          </div>
          <Choices
            className="ob-seg ob-f7-modes"
            legend={C.modeLabel}
            legendHidden
            disabled={!draft.modal}
            options={MODES}
            value={mode}
            onChange={k => {
              setMode(k);
              setModeFlips(f => f + 1);
            }}
          />
          <div className="ob-f7-draft-body" aria-live="polite">
            {run && !landed ? (
              <span className="ob-f7-wait" aria-hidden>
                <i style={{ width: '92%' }} />
                <i style={{ width: '70%' }} />
              </span>
            ) : (
              <div key={`${sel}-${mode}-${run}`} className={run || modeFlips ? 'ob-swap' : undefined}>
                <p className="ob-f7-draft-t" data-muted={draft.modal ? undefined : ''}>
                  {draft.text}
                </p>
                {draft.note && <p className="ob-f7-note">{draft.note}</p>}
              </div>
            )}
          </div>
          <p className="ob-f7-always">{C.always}</p>
        </div>
      </div>
    </Fig>
  );
}
