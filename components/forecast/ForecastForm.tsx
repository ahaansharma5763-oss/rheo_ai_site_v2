'use client';

/* Three-step Pipeline Forecast form. Posts once, at the end, to /api/forecast (validated there and
 * forwarded to the Reply Desk intake on n8n). The thank-you screen shows only on a real ok:true; any
 * failure says so and gives the fallback address. It never claims success it did not get. */

import { useEffect, useRef, useState } from 'react';
import { forecast, MARKETS, DEALS, SOURCES, OWNERS } from './content';

const F = forecast.form;
type Status = 'idle' | 'sending' | 'error' | 'done';

type Data = {
  website: string;
  sells: string;
  buyers: string;
  markets: string[];
  deal: string;
  sources: string[];
  owner: string;
  name: string;
  role: string;
  email: string;
  phone: string;
};

const EMPTY: Data = {
  website: '', sells: '', buyers: '', markets: [], deal: '', sources: [], owner: '',
  name: '', role: '', email: '', phone: '',
};

const LIMITS = { website: 200, sells: 400, buyers: 400, name: 100, role: 100, email: 254, phone: 30 } as const;
const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]{2,}$/;
const SITE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;
const PHONE = /^\+?[0-9 ()-]{7,24}$/;

const STEP_FIELDS: (keyof Data)[][] = [
  ['website', 'sells', 'buyers'],
  ['markets', 'deal', 'sources', 'owner'],
  ['name', 'email', 'phone'],
];

function problems(d: Data, step: number): (keyof Data)[] {
  const bad: (keyof Data)[] = [];
  for (const k of STEP_FIELDS[step]) {
    const v = d[k];
    if (Array.isArray(v) ? v.length === 0 : !String(v).trim()) bad.push(k);
  }
  if (step === 0 && d.website.trim() && !SITE.test(d.website.trim())) bad.push('website');
  if (step === 2 && d.email.trim() && !EMAIL.test(d.email.trim())) bad.push('email');
  if (step === 2 && d.phone.trim() && !PHONE.test(d.phone.trim())) bad.push('phone');
  return [...new Set(bad)];
}

function utm(): Record<string, string> {
  const out: Record<string, string> = {};
  const q = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(k => {
    const v = q.get(k);
    if (v) out[k] = v.slice(0, 120);
  });
  return out;
}

export default function ForecastForm() {
  const [d, setD] = useState<Data>(EMPTY);
  const [step, setStep] = useState(0);
  const [bad, setBad] = useState<(keyof Data)[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const hp = useRef<HTMLInputElement>(null);
  const headRef = useRef<HTMLParagraphElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const errRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (!moved.current) return;
    headRef.current?.focus({ preventScroll: true });
  }, [step]);
  useEffect(() => {
    if (status === 'done') doneRef.current?.focus({ preventScroll: false });
    if (status === 'error') errRef.current?.focus({ preventScroll: false });
  }, [status]);

  const set = (k: keyof Data, v: string) => setD(p => ({ ...p, [k]: v }));
  const toggle = (k: 'markets' | 'sources', v: string) =>
    setD(p => ({ ...p, [k]: p[k].includes(v) ? p[k].filter(x => x !== v) : [...p[k], v] }));

  function next() {
    const b = problems(d, step);
    setBad(b);
    if (b.length) return;
    moved.current = true;
    setStep(s => s + 1);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 2) return next();
    if (status === 'sending') return;
    const b = problems(d, 2);
    setBad(b);
    if (b.length) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...d, company_url: hp.current?.value ?? '', utm: utm() }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; fields?: string[] };
      if (!res.ok || json.ok !== true) {
        const f = (Array.isArray(json.fields) ? json.fields : []) as (keyof Data)[];
        setBad(f);
        const first = STEP_FIELDS.findIndex(s => s.some(k => f.includes(k)));
        if (first >= 0 && first !== step) setStep(first);
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div ref={doneRef} tabIndex={-1} className="pf-card pf-done" role="status">
        <p className="eyebrow eyebrow--quiet">{F.eyebrow}</p>
        <h2 className="pf-h3">{F.thanksTitle}</h2>
        <p className="pf-body">{F.thanksBody}</p>
        <p className="pf-body pf-mute">{F.thanksNext}</p>
      </div>
    );
  }

  const invalid = (k: keyof Data) => bad.includes(k) || undefined;
  const text = (k: 'website' | 'name' | 'role' | 'email' | 'phone', props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="pf-field">
      <label htmlFor={`pf-${k}`}>{F.fields[k]}</label>
      <input
        id={`pf-${k}`}
        name={k}
        value={d[k]}
        onChange={e => set(k, e.target.value)}
        maxLength={LIMITS[k]}
        aria-invalid={invalid(k)}
        {...props}
      />
    </div>
  );
  const area = (k: 'sells' | 'buyers', ph: string) => (
    <div className="pf-field">
      <label htmlFor={`pf-${k}`}>{F.fields[k]}</label>
      <textarea
        id={`pf-${k}`}
        name={k}
        rows={3}
        value={d[k]}
        placeholder={ph}
        onChange={e => set(k, e.target.value)}
        maxLength={LIMITS[k]}
        aria-invalid={invalid(k)}
      />
    </div>
  );
  const chips = (k: 'markets' | 'sources', label: string, opts: readonly string[]) => (
    <fieldset className="pf-field pf-set" aria-invalid={invalid(k)}>
      <legend>
        {label} <span className="pf-hint">{F.fields.pickAny}</span>
      </legend>
      <div className="pf-chips">
        {opts.map(o => (
          <button
            type="button"
            key={o}
            className="pf-chip"
            aria-pressed={d[k].includes(o)}
            onClick={() => toggle(k, o)}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
  const radios = (k: 'deal' | 'owner', label: string, opts: readonly string[]) => (
    <fieldset className="pf-field pf-set" aria-invalid={invalid(k)}>
      <legend>
        {label} <span className="pf-hint">{F.fields.pickOne}</span>
      </legend>
      <div className="pf-chips" role="radiogroup">
        {opts.map(o => (
          <button
            type="button"
            role="radio"
            key={o}
            className="pf-chip"
            aria-checked={d[k] === o}
            onClick={() => set(k, o)}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <form className="pf-card pf-form" onSubmit={submit} noValidate>
      <div className="pf-progress" aria-hidden>
        {F.steps.map((s, i) => (
          <span key={s} className={i <= step ? 'is-on' : ''} />
        ))}
      </div>
      <p ref={headRef} tabIndex={-1} className="pf-stephead">
        <span className="pf-mono">{step + 1} / 3</span> {F.steps[step]}
      </p>

      {step === 0 && (
        <>
          {text('website', { type: 'text', inputMode: 'url', autoComplete: 'url', spellCheck: false, placeholder: F.fields.websitePh })}
          {area('sells', F.fields.sellsPh)}
          {area('buyers', F.fields.buyersPh)}
        </>
      )}
      {step === 1 && (
        <>
          {chips('markets', F.fields.markets, MARKETS)}
          {radios('deal', F.fields.deal, DEALS)}
          {chips('sources', F.fields.sources, SOURCES)}
          {radios('owner', F.fields.owner, OWNERS)}
        </>
      )}
      {step === 2 && (
        <>
          {text('name', { type: 'text', autoComplete: 'name' })}
          {text('role', { type: 'text', autoComplete: 'organization-title' })}
          {text('email', { type: 'email', inputMode: 'email', autoComplete: 'email', spellCheck: false })}
          {text('phone', { type: 'tel', inputMode: 'tel', autoComplete: 'tel', placeholder: F.fields.phonePh })}
        </>
      )}

      {/* Honeypot: invisible to people, irresistible to bots */}
      <div className="pf-hp" aria-hidden>
        <label htmlFor="pf-cu">Company URL</label>
        <input id="pf-cu" ref={hp} name="company_url" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {bad.length > 0 && status !== 'error' && <p className="pf-missing" role="alert">{F.missing}</p>}
      {status === 'error' && (
        <div ref={errRef} tabIndex={-1} className="pf-error" role="alert">
          {F.error}
        </div>
      )}

      <div className="pf-actions">
        {step > 0 && (
          <button type="button" className="pf-btn" onClick={() => { setBad([]); setStatus('idle'); setStep(s => s - 1); }}>
            {F.back}
          </button>
        )}
        {/* One forward button for every step: the form's submit handler moves on, or sends on the last step.
            (Swapping a type="button" for a type="submit" under the cursor submitted the form as step 3 opened.) */}
        <button type="submit" className="pf-btn pf-btn--primary" disabled={status === 'sending'} aria-busy={status === 'sending'}>
          {step < 2 ? F.next : status === 'sending' ? F.sending : F.submit}
        </button>
      </div>
      {step === 2 && <p className="pf-privacy">{F.privacy}</p>}
    </form>
  );
}
