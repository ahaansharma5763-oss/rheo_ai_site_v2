'use client';

/* Step 2 · Your own sending setup: the architecture.
 * The main web address sits apart, inside a dashed boundary, and is never
 * used for outreach. A sending account used only for this client fans out to
 * five lookalike addresses with four inboxes each, every one signed, verified
 * and protected. Type a company name and every address updates in the
 * browser. Below, the 21-day warm-up and an illustrative sizing slider. */

import { useId, useState } from 'react';
import { COPY } from './copy';
import { useStage } from './hooks';
import { Fig, Icon, Range, Tag, v } from './ui';

const C = COPY.s2;
const MIN = 18000;
const MAX = 80000;
const HEAD = 28; // table header row, px
const ROW = 34; // domain row, px
const FAN_W = 44;
const FAN_H = HEAD + ROW * 5;

type CheckKey = (typeof C.checks)[number]['key'];

function cleanName(raw: string) {
  const s = raw
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\.(com|in|co\.in|co|net|org|io|ai)$/, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '')
    .slice(0, 20);
  return s || C.namePlaceholder;
}

const lookalikes = (n: string) => [
  { pre: 'get', post: '.com', n },
  { pre: '', post: 'hq.com', n },
  { pre: 'try', post: '.com', n },
  { pre: 'meet', post: '.com', n },
  { pre: '', post: '.co', n },
];

const fmt = (n: number) => n.toLocaleString('en-IN');

/* Warm-up: emails a day per inbox, day 1 to 21 (a smooth climb from 5 to 10 up to 20) */
const WARM = [
  [1, 7], [3, 8], [5, 9.5], [7, 11], [9, 12.5], [11, 14], [13, 15.5], [15, 17], [17, 18.2], [19, 19.3], [21, 20],
] as const;
const CW = 300, CH = 124, PL = 26, PR = 10, PT = 16, PB = 24;
const cx = (d: number) => PL + ((d - 1) / 20) * (CW - PL - PR);
const cy = (n: number) => CH - PB - (n / 25) * (CH - PT - PB);
const WARM_D = WARM.map(([d, n], i) => `${i ? 'L' : 'M'}${cx(d).toFixed(1)} ${cy(n).toFixed(1)}`).join(' ');
const pct = (x: number, of: number) => `${((x / of) * 100).toFixed(2)}%`;

export default function Step2Setup() {
  const { ref, stage } = useStage<HTMLElement>(2800);
  const id = useId();
  const [raw, setRaw] = useState('');
  const [vol, setVol] = useState(MIN);
  const [hover, setHover] = useState<CheckKey | null>(null);
  const [pinned, setPinned] = useState<CheckKey | null>(null);

  const name = cleanName(raw);
  const doms = lookalikes(name);
  const inboxes = Math.round(vol / 900);
  const domains = Math.ceil(inboxes / 4);
  const volText = vol >= MAX ? '80,000+' : fmt(vol);
  const shown = hover ?? pinned;
  const shownCheck = C.checks.find(c => c.key === shown);

  const ry = (i: number) => HEAD + ROW * i + ROW / 2;
  const oy = HEAD + (ROW * 5) / 2;

  return (
    <Fig ref={ref} n={2} name={C.name} desc={C.desc} stage={stage}>
      <div className="ob-f2">
        {/* Your main web address: typed here, kept out of outreach */}
        <div className="ob-f2-main" data-rise style={v({ '--d': 0 })}>
          <div className="ob-f2-main-l">
            <label htmlFor={`${id}-name`} className="ob-fx-k">
              {C.nameLabel}
            </label>
            <div className="ob-f2-field">
              <Icon name="mail" />
              <input
                id={`${id}-name`}
                className="ob-f2-input"
                type="text"
                inputMode="url"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                maxLength={40}
                placeholder={C.namePlaceholder}
                value={raw}
                onChange={e => setRaw(e.target.value)}
                aria-describedby={`${id}-hint`}
              />
              <span className="ob-f2-tld" aria-hidden>
                .com
              </span>
            </div>
            <p className="ob-f2-hint" id={`${id}-hint`}>
              {C.nameHint}
            </p>
          </div>
          <div className="ob-f2-main-r">
            <span className="ob-f2-main-sub">{C.mainSub}</span>
            <span className="ob-f2-main-note">{C.mainNote}</span>
          </div>
        </div>

        {/* The sending account fans out to five lookalike addresses */}
        <div className="ob-f2-arch" style={v({ '--head': `${HEAD}px`, '--row': `${ROW}px` })}>
          <div className="ob-f2-origin" data-rise style={v({ '--d': 250 })}>
            <span className="ob-f2-origin-box">
              <span>{C.origin}</span>
              <span className="ob-f2-origin-sub">{C.originSub}</span>
            </span>
          </div>
          <svg className="ob-f2-fan" width={FAN_W} height={FAN_H} viewBox={`0 0 ${FAN_W} ${FAN_H}`} aria-hidden>
            {doms.map((_, i) => (
              <path
                key={i}
                d={`M0 ${oy} C${FAN_W * 0.55} ${oy} ${FAN_W * 0.45} ${ry(i)} ${FAN_W} ${ry(i)}`}
                pathLength={1}
                data-draw
                style={v({ '--d': 450 + i * 70 })}
              />
            ))}
          </svg>

          <div className="ob-f2-tbl" data-hl={shown ? '' : undefined}>
            <div className="ob-f2-head" aria-hidden>
              <span className="ob-fx-k">{C.colDomainShort}</span>
              <span className="ob-fx-k">{C.colInboxes}</span>
              <span className="ob-fx-k">{C.colChecks}</span>
            </div>
            {doms.map((d, i) => (
              <div key={i} className="ob-f2-row" data-rise style={v({ '--d': 600 + i * 80 })}>
                <span className="ob-f2-dom ob-mono" title={`${d.pre}${d.n}${d.post}`}>
                  {d.pre}
                  <b>{d.n}</b>
                  {d.post}
                </span>
                <span className="ob-f2-inb" aria-label={`4 inboxes`} role="img">
                  {C.inboxNames.map(p => (
                    <i key={p} title={`${p}@${d.pre}${d.n}${d.post}`} />
                  ))}
                </span>
                <span className="ob-f2-ticks" aria-hidden>
                  {C.checks.map(c => (
                    <span key={c.key} className="ob-f2-tick" data-on={shown === c.key ? '' : undefined}>
                      <Icon name="check" size={14} />
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="ob-f2-checks" role="group" aria-label={C.checksLead} onMouseLeave={() => setHover(null)}>
          <span className="ob-f2-checks-lead ob-fx-k" aria-hidden>
            {C.checksLead}
          </span>
          {C.checks.map(c => (
            <button
              key={c.key}
              type="button"
              className="ob-f2-check"
              data-on={shown === c.key ? '' : undefined}
              aria-pressed={pinned === c.key}
              aria-describedby={`${id}-${c.key}`}
              onMouseEnter={() => setHover(c.key)}
              onFocus={() => setHover(c.key)}
              onBlur={() => setHover(null)}
              onClick={() => setPinned(p => (p === c.key ? null : c.key))}
            >
              <Icon name="check" size={14} />
              {c.name}
              <span className="ob-sr" id={`${id}-${c.key}`}>
                {c.what}
              </span>
            </button>
          ))}
        </div>

        <div className="ob-f2-notes">
          <p className="ob-f2-readout" aria-hidden>
            {shownCheck ? (
              <>
                <b>{shownCheck.name}.</b> {shownCheck.what}
              </>
            ) : (
              C.checksHint
            )}
          </p>
          <p className="ob-f2-more" aria-hidden>
            {domains > 5 ? C.more(domains - 5) : C.moreBase}
          </p>
        </div>

        <div className="ob-f2-lower">
          {/* 21-day warm-up */}
          <div className="ob-f2-warm ob-card" data-rise style={v({ '--d': 900 })}>
            <div className="ob-f2-panel-h">
              <span className="ob-fx-k">{C.warmTitle}</span>
              <span className="ob-f2-cap">{C.warmAxis}</span>
            </div>
            <div className="ob-f2-chart" style={v({ '--ar': `${CW} / ${CH}` })}>
              <svg viewBox={`0 0 ${CW} ${CH}`} aria-hidden>
                {[5, 10, 20].map(n => (
                  <line key={n} x1={PL} x2={CW - PR} y1={cy(n)} y2={cy(n)} className="ob-f2-grid" />
                ))}
                <line x1={PL} x2={CW - PR} y1={cy(0)} y2={cy(0)} className="ob-f2-axis" />
                <line x1={cx(21)} x2={cx(21)} y1={PT - 6} y2={cy(0)} className="ob-f2-ready" />
                <line x1={cx(1)} x2={cx(1)} y1={cy(5)} y2={cy(10)} className="ob-f2-band" />
                <line x1={cx(1) - 3} x2={cx(1) + 3} y1={cy(5)} y2={cy(5)} className="ob-f2-band" />
                <line x1={cx(1) - 3} x2={cx(1) + 3} y1={cy(10)} y2={cy(10)} className="ob-f2-band" />
                <path d={WARM_D} className="ob-f2-line" pathLength={1} data-draw style={v({ '--d': 1100, '--dur': '1400ms' })} />
                <rect x={cx(21) - 3} y={cy(20) - 3} width={6} height={6} className="ob-f2-end" data-rise style={v({ '--d': 2300 })} />
              </svg>
              {[5, 10, 20].map(n => (
                <span key={n} className="ob-f2-yl ob-mono" style={{ top: pct(cy(n), CH) }}>
                  {n}
                </span>
              ))}
              <span className="ob-f2-xl ob-mono" style={{ left: pct(cx(1), CW) }}>
                {C.warmStart}
              </span>
              <span className="ob-f2-xl ob-f2-xl--r ob-mono" style={{ left: pct(cx(21), CW) }}>
                {C.warmEnd}
              </span>
              <span className="ob-f2-readyl" style={v({ left: pct(cx(21), CW), '--d': 2300 })} data-rise>
                {C.warmReady}
              </span>
            </div>
          </div>

          {/* Illustrative sizing */}
          <div className="ob-f2-size ob-card" data-rise style={v({ '--d': 1050 })}>
            <div className="ob-f2-panel-h">
              <Tag>{C.sizeTitle}</Tag>
              <p className="ob-f2-vol">
                <b>{volText}</b> <span>{C.sizeLabel.toLowerCase()}</span>
              </p>
            </div>
            <Range
              label={C.sizeLabel}
              min={MIN}
              max={MAX}
              step={1000}
              value={vol}
              onChange={setVol}
              valueText={`${volText} ${C.sizeLabel.toLowerCase()}`}
              labelHidden
              className="ob-f2-range"
            />
            <output className="ob-f2-out" aria-live="polite">
              {C.sizeOut(inboxes, domains)}
            </output>
            <div className="ob-f2-grid-in" role="img" aria-label={C.grid(inboxes)}>
              {Array.from({ length: domains }, (_, g) => (
                <span key={g} className={`ob-f2-strip${g >= 5 ? ' is-new' : ''}`}>
                  {[0, 1, 2, 3].map(k => (
                    <i key={k} data-off={g * 4 + k >= inboxes ? '' : undefined} />
                  ))}
                </span>
              ))}
            </div>
            <p className="ob-f2-rule">{C.sizeRule}</p>
          </div>
        </div>
      </div>
    </Fig>
  );
}
