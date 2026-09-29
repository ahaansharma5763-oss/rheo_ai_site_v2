'use client';

/* Shared parts for the nine step figures: the figure frame, the
 * Illustrative tag, radio choices, the range slider and the product-UI icons
 * (1.5px stroke line icons, square ends, never filled). */

import { forwardRef, useId } from 'react';
import type { Stage } from './hooks';
import { COPY } from './copy';

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;
export const v = (o: CSSVars) => o as React.CSSProperties;

/* ─── The frame every figure sits in ─── */
export const Fig = forwardRef<
  HTMLElement,
  {
    n: number;
    name: string;
    desc: string;
    stage: Stage;
    tag?: boolean;
    live?: string;
    tools?: React.ReactNode;
    controls?: React.ReactNode;
    children: React.ReactNode;
    minH?: number;
  }
>(function Fig({ n, name, desc, stage, tag = true, live, tools, controls, children, minH }, ref) {
  const id = useId();
  return (
    <figure
      ref={ref}
      className={`ob-fx ob-f${n}`}
      data-stage={stage}
      aria-labelledby={`${id}-n`}
      aria-describedby={`${id}-d`}
      style={minH ? v({ '--fx-min': `${minH}px` }) : undefined}
    >
      <figcaption className="ob-sr" id={`${id}-d`}>
        {desc}
      </figcaption>
      <div className="ob-fx-bar">
        <span className="ob-fx-name" id={`${id}-n`}>
          {name}
        </span>
        <span className="ob-fx-tools">
          {tools}
          {tag && <Tag />}
        </span>
      </div>
      <div className="ob-fx-body">{children}</div>
      {controls && <div className="ob-fx-ctl">{controls}</div>}
      <p className="ob-sr" aria-live="polite" aria-atomic="true">
        {live}
      </p>
    </figure>
  );
});

export function Tag({ children = COPY.illustrative }: { children?: React.ReactNode }) {
  return <span className="ob-fx-tag">{children}</span>;
}

/* ─── Radio choices: real radios, arrow keys for free ─── */
export function Choices<T extends string>({
  legend,
  legendHidden,
  options,
  value,
  onChange,
  className,
  render,
  describedBy,
  disabled,
}: {
  disabled?: boolean;
  legend: string;
  legendHidden?: boolean;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
  render?: (o: { value: T; label: string }, i: number, on: boolean) => React.ReactNode;
  describedBy?: string;
}) {
  const name = useId();
  return (
    <fieldset className={`ob-choices ${className ?? ''}`} aria-describedby={describedBy} disabled={disabled}>
      <legend className={legendHidden ? 'ob-sr' : 'ob-fx-k'}>{legend}</legend>
      <div className="ob-choices-in">
        {options.map((o, i) => {
          const on = o.value === value;
          return (
            <label key={o.value} className="ob-choice" data-on={on ? '' : undefined}>
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} />
              <span className="ob-choice-in">{render ? render(o, i, on) : o.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ─── Range slider with a foam bar thumb ─── */
export function Range({
  label,
  min,
  max,
  step,
  value,
  onChange,
  valueText,
  className,
  children,
  labelHidden,
}: {
  labelHidden?: boolean;
  label: React.ReactNode;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
  valueText: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const id = useId();
  const p = (value - min) / (max - min);
  return (
    <div className={`ob-range ${className ?? ''}`} style={v({ '--p': p })}>
      <label htmlFor={id} className={labelHidden ? 'ob-sr' : 'ob-fx-k'}>
        {label}
      </label>
      <div className="ob-range-track">
        {children}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={valueText}
          onChange={e => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

/* ─── Icons: product UI only ─── */
const P = {
  check: <path d="m4.5 12.5 5 5 10-11" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
  mail: (
    <>
      <path d="M3 5.5h18v13H3z" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  users: (
    <>
      <path d="M9 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
      <path d="M2.5 19.5c.9-3.3 3.3-5 6.5-5s5.6 1.7 6.5 5" />
      <path d="M15.5 4.8a3.4 3.4 0 0 1 0 6.4M18 14.8c1.8.6 3 2.1 3.5 4.7" />
    </>
  ),
  user: (
    <>
      <path d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
      <path d="M4.5 20.5c1.2-3.8 4-5.5 7.5-5.5s6.3 1.7 7.5 5.5" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 2.5h11v19h-11z" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  chat: <path d="M3.5 4.5h17v12h-9l-5 4v-4h-3z" />,
  clock: (
    <>
      <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  lock: (
    <>
      <path d="M5 10.5h14v10H5z" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </>
  ),
  search: (
    <>
      <path d="M10.5 3.5a7 7 0 1 1 0 14 7 7 0 0 1 0-14z" />
      <path d="m15.5 15.5 5 5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" />
      <path d="M12 7.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
    </>
  ),
  list: <path d="M8.5 6h12M8.5 12h12M8.5 18h12M3.5 6h1M3.5 12h1M3.5 18h1" />,
  calendar: (
    <>
      <path d="M3.5 5.5h17v15h-17z" />
      <path d="M3.5 10h17M8 3v5M16 3v5" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 4v5h-5" />
    </>
  ),
  pause: <path d="M8.5 5v14M15.5 5v14" />,
  play: <path d="M7 4.5v15l12-7.5z" />,
  arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15z" />
      <path d="M10 21h4" />
    </>
  ),
  doc: (
    <>
      <path d="M5.5 2.5h9l4 4v15h-13z" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" />
    </>
  ),
} as const;

export type IconName = keyof typeof P;

export function Icon({ name, size = 16, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={`ob-ico ${className ?? ''}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5 * (24 / size)}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      focusable="false"
    >
      {P[name]}
    </svg>
  );
}
