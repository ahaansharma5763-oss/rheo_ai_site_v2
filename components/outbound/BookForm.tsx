'use client';

/* §13 Book. A five-field form posts to /api/outbound (validated there and
 * forwarded to n8n). Only on a real success does Calendly load, inline, with
 * the name and email already filled. On any failure the form says so and
 * gives the Calendly link as plain text: it never claims success it didn't get. */

import { useEffect, useRef, useState } from 'react';
import { track } from './track';
import { CALENDLY_URL, type OutboundContent } from './types';

type Book = OutboundContent['book'];
type Status = 'idle' | 'sending' | 'error' | 'booked';
type FieldKey = keyof Book['fields'];

type CalendlyApi = {
  initInlineWidget: (o: {
    url: string;
    parentElement: HTMLElement;
    prefill?: { name?: string; email?: string };
  }) => void;
};

declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

const WIDGET_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const CAL_TEXT = CALENDLY_URL.replace(/^https:\/\//, '');
// Brand colours for the embed; Calendly ignores them on plans without custom colours
const CAL_EMBED = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=091b3a&text_color=f4eddf&primary_color=3faede`;

let widgetPromise: Promise<void> | null = null;
function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  if (widgetPromise) return widgetPromise;
  widgetPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = WIDGET_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      widgetPromise = null;
      reject(new Error('calendly widget failed'));
    };
    document.head.appendChild(s);
  });
  return widgetPromise;
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

/* The error line names the Calendly address; make that part a real link. */
function ErrorLine({ text }: { text: string }) {
  const at = text.indexOf(CAL_TEXT);
  const link = (
    <a className="ob-link" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
      {CAL_TEXT}
    </a>
  );
  if (at < 0) {
    return (
      <>
        {text} {link}
      </>
    );
  }
  return (
    <>
      {text.slice(0, at)}
      {link}
      {text.slice(at + CAL_TEXT.length)}
    </>
  );
}

const LIMITS: Record<FieldKey, number> = { name: 100, email: 254, website: 200, sells: 500, capacity: 60 };

export default function BookForm({ book }: { book: Book }) {
  const [status, setStatus] = useState<Status>('idle');
  const [bad, setBad] = useState<string[]>([]);
  const [calFailed, setCalFailed] = useState(false);
  const started = useRef(false);
  const who = useRef({ name: '', email: '' });
  const calRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLParagraphElement>(null);
  const errRef = useRef<HTMLDivElement>(null);

  /* Calendly's own confirmation, posted from its iframe */
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (!/^https:\/\/([a-z0-9-]+\.)?calendly\.com$/.test(e.origin)) return;
      const ev = (e.data as { event?: unknown } | null)?.event;
      if (ev === 'calendly.event_scheduled') track('calendly_booked');
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  /* After a real success: load widget.js now, and only now */
  useEffect(() => {
    if (status !== 'booked') return;
    afterRef.current?.focus({ preventScroll: true });
    let dead = false;
    loadCalendly()
      .then(() => {
        const el = calRef.current;
        if (dead || !el || !window.Calendly) return;
        el.innerHTML = '';
        window.Calendly.initInlineWidget({
          url: CAL_EMBED,
          parentElement: el,
          prefill: { name: who.current.name, email: who.current.email },
        });
      })
      .catch(() => !dead && setCalFailed(true));
    return () => {
      dead = true;
    };
  }, [status]);

  useEffect(() => {
    if (status === 'error') errRef.current?.focus({ preventScroll: false });
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    const fd = new FormData(e.currentTarget);
    const val = (k: string) => String(fd.get(k) ?? '').trim();
    const payload = {
      name: val('name'),
      email: val('email'),
      website: val('website'),
      sells: val('sells'),
      capacity: val('capacity'),
      company_url: val('company_url'),
      utm: utm(),
    };
    setBad([]);
    setStatus('sending');
    track('form_submit');
    try {
      const res = await fetch('/api/outbound', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; fields?: string[] };
      if (!res.ok || json.ok !== true) {
        setBad(Array.isArray(json.fields) ? json.fields : []);
        setStatus('error');
        track('form_error', { status: res.status });
        return;
      }
      who.current = { name: payload.name, email: payload.email };
      setStatus('booked');
    } catch {
      setStatus('error');
      track('form_error', { status: 0 });
    }
  }

  const field = (k: FieldKey, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="ob-field">
      <label htmlFor={`ob-f-${k}`}>{book.fields[k]}</label>
      <input
        id={`ob-f-${k}`}
        name={k}
        required
        maxLength={LIMITS[k]}
        aria-invalid={bad.includes(k) || undefined}
        {...props}
      />
    </div>
  );

  return (
    <div className={`ob-book-grid${status === 'booked' ? ' is-booked' : ''}`}>
      <div className="ob-head">
        <p className="eyebrow eyebrow--quiet">{book.eyebrow}</p>
        <h2 id="book-h" className="ob-h2">
          {book.heading}
        </h2>
        <p className="ob-lede">{book.sub}</p>
      </div>

      {status === 'booked' ? (
        <div>
          <p ref={afterRef} tabIndex={-1} className="ob-after">
            {book.after}
          </p>
          {!calFailed && <div ref={calRef} className="ob-calendly" />}
          <p className="ob-mono" style={{ marginTop: 12 }}>
            <a className="ob-link" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              {CAL_TEXT}
            </a>
          </p>
        </div>
      ) : (
        <form
          className="ob-form"
          onSubmit={onSubmit}
          onFocus={() => {
            if (started.current) return;
            started.current = true;
            track('form_start');
          }}
        >
          {field('name', { autoComplete: 'name', type: 'text' })}
          {field('email', { autoComplete: 'email', type: 'email', inputMode: 'email', spellCheck: false })}
          {field('website', { autoComplete: 'url', type: 'text', inputMode: 'url', spellCheck: false })}
          <div className="ob-field">
            <label htmlFor="ob-f-sells">{book.fields.sells}</label>
            <textarea
              id="ob-f-sells"
              name="sells"
              required
              rows={3}
              maxLength={LIMITS.sells}
              aria-invalid={bad.includes('sells') || undefined}
            />
          </div>
          {field('capacity', { type: 'text', autoComplete: 'off' })}

          {/* Honeypot: invisible to people, irresistible to bots */}
          <div className="ob-hp" aria-hidden>
            <label htmlFor="ob-f-cu">Company URL</label>
            <input id="ob-f-cu" name="company_url" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {status === 'error' && (
            <div ref={errRef} tabIndex={-1} className="ob-form-error" role="alert">
              <ErrorLine text={book.error} />
            </div>
          )}

          <button type="submit" className="ob-btn ob-btn--primary" disabled={status === 'sending'} aria-busy={status === 'sending'}>
            {status === 'sending' ? book.sending : book.submit}
          </button>
          <p className="ob-privacy">{book.privacy}</p>
        </form>
      )}
    </div>
  );
}
