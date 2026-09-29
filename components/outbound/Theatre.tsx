'use client';

/* The film theatre. A full-screen Ink Night overlay: the portrait film at
 * full height, the sixteen chapters beside it on desktop and below it on
 * phones. The active chapter follows playback, clicking a chapter seeks,
 * captions are burned into the film itself, and a transcript sits one tab away.
 *
 * Player: Mux, imported only when the theatre first opens, when
 * NEXT_PUBLIC_MUX_PLAYBACK_ID is set. Otherwise a native <video> of the local
 * film with the same caption track, and chapters parsed from chapters.vtt.
 * The chapter UI is identical for both.
 *
 * Closing it lands the page on the section of the last chapter watched. */

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import type MuxPlayerElement from '@mux/mux-player';
import { FILM_EVENT, openFilm, type FilmRequest } from './FilmButton';
import { track } from './track';
import { MEDIA, clockToSeconds, normaliseTranscript, secondsToClock, type Chapter, type TranscriptLine } from './types';
import { UI } from './ui';
import { MUX_PLAYBACK_ID } from './media';

const MuxPlayer = dynamic(() => import('@mux/mux-player-react'), {
  ssr: false,
  loading: () => <div className="ob-th-loading" aria-hidden />,
});

const PLAYBACK_ID = MUX_PLAYBACK_ID;

type Media = HTMLVideoElement | MuxPlayerElement;
type Line = TranscriptLine;
type ChapterRow = { t: string; seconds: number; title: string; section: string };

const subscribe = () => () => {};

/* WebVTT timestamp: "00:01:05.000" or "01:05.000" */
function vttTime(s: string): number {
  const m = s.trim().match(/^(?:(\d+):)?(\d{1,2}):(\d{2})(?:[.,](\d{1,3}))?/);
  if (!m) return NaN;
  const [, h, mm, ss, ms] = m;
  return (Number(h || 0) * 3600) + Number(mm) * 60 + Number(ss) + Number((ms || '0').padEnd(3, '0')) / 1000;
}

function parseChaptersVtt(text: string): { start: number; title: string }[] {
  if (!text || !/^WEBVTT/.test(text.trim())) return [];
  const out: { start: number; title: string }[] = [];
  for (const block of text.replace(/\r/g, '').split(/\n{2,}/)) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    const i = lines.findIndex(l => l.includes('-->'));
    if (i < 0) continue;
    const start = vttTime(lines[i].split('-->')[0]);
    const title = lines.slice(i + 1).join(' ').replace(/<[^>]+>/g, '').trim();
    if (!Number.isNaN(start) && title) out.push({ start, title });
  }
  return out.sort((a, b) => a.start - b.start);
}

/* "?t=52", "?t=0:52" or "?t=52s" */
function parseStart(v: string | null): number | null {
  if (!v) return null;
  const s = v.trim().replace(/s$/, '');
  const n = s.includes(':') ? clockToSeconds(s) : Number(s);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function indexAt(rows: ChapterRow[], t: number): number {
  let idx = 0;
  for (let i = 0; i < rows.length; i++) if (rows[i].seconds <= t + 0.25) idx = i;
  return idx;
}

/* Show or hide the caption tracks of a <video> or <mux-player> */
function setCaptionMode(el: Media | null, on: boolean) {
  const tracks = el?.textTracks;
  if (!tracks) return;
  for (let i = 0; i < tracks.length; i++) {
    const tr = tracks[i];
    if (tr.kind === 'captions' || tr.kind === 'subtitles') tr.mode = on ? 'showing' : 'hidden';
  }
}

/* Scroll `item` into view inside `box` only, never the overlay or the page. */
function keepInView(box: HTMLElement | null, item: HTMLElement | null) {
  if (!box || !item || box.scrollHeight <= box.clientHeight + 1) return;
  const top = item.offsetTop - box.offsetTop;
  const bottom = top + item.offsetHeight;
  if (top < box.scrollTop + 16) box.scrollTop = Math.max(0, top - 16);
  else if (bottom > box.scrollTop + box.clientHeight - 16) box.scrollTop = bottom - box.clientHeight + 16;
}

export default function Theatre({
  chapters,
  label,
  captionsLabel,
  transcriptHeading,
}: {
  chapters: Chapter[];
  label: string;
  captionsLabel: string;
  transcriptHeading: string;
}) {
  const isClient = useSyncExternalStore(subscribe, () => true, () => false);

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [start, setStart] = useState(0);
  const [active, setActive] = useState(0);
  const [now, setNow] = useState(0);
  const [tab, setTab] = useState<'chapters' | 'transcript'>('chapters');
  // The web film has its captions burned into the picture, so the caption track stays hidden.
  // It still feeds the transcript and search engines.
  const [captions] = useState(false);
  const [lines, setLines] = useState<Line[] | null>(null);
  const [vtt, setVtt] = useState<{ start: number; title: string }[] | null>(null);
  const [everOpened, setEverOpened] = useState(false);

  const mediaRef = useRef<Media | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const chapListRef = useRef<HTMLOListElement>(null);
  const lineListRef = useRef<HTMLOListElement>(null);
  const activeRef = useRef(0);
  const rowsRef = useRef<ChapterRow[]>([]);
  const loadedRef = useRef({ vtt: false, transcript: false });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingChapter = useRef<number | null>(null);

  /* The chapter list: content's chapters, or chapters.vtt for the local file */
  const rows: ChapterRow[] = useMemo(() => {
    const base = chapters.map(c => ({ t: c.t, seconds: c.seconds, title: c.title, section: c.section }));
    if (PLAYBACK_ID || !vtt || vtt.length === 0) return base;
    return vtt.map((v, i) => {
      const near =
        (vtt.length === base.length ? base[i] : null) ??
        [...base].reverse().find(c => c.seconds <= v.start + 0.5) ??
        base[0];
      return { t: secondsToClock(v.start), seconds: v.start, title: v.title || near.title, section: near.section };
    });
  }, [chapters, vtt]);

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  /* Open requests from the hero button, the film band and every step chip */
  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<FilmRequest>).detail ?? { source: 'unknown' };
      const list = rowsRef.current.length ? rowsRef.current : chapters;
      const el = mediaRef.current ?? videoRef.current;
      const resume = d.chapter == null && d.seconds == null && el && el.currentTime > 0 && !el.ended;
      const s = resume
        ? el.currentTime
        : d.seconds ?? (d.chapter != null ? (list[d.chapter]?.seconds ?? 0) + (d.chapter > 0 ? 0.05 : 0) : 0);

      openerRef.current = d.opener ?? (document.activeElement as HTMLElement | null);
      pendingChapter.current = d.chapter ?? null;
      if (closeTimer.current) clearTimeout(closeTimer.current);

      // Still inside the click: start the local film now, so phones that only
      // allow sound from a tap still play it.
      const v = videoRef.current;
      if (!PLAYBACK_ID && v) {
        try {
          v.currentTime = s;
        } catch {}
        v.play()?.catch(() => {});
      }

      const idx = indexAt(list as ChapterRow[], s);
      activeRef.current = idx;
      setStart(s);
      setNow(s);
      setActive(idx);
      setClosing(false);
      setEverOpened(true);
      setOpen(true);
      track('film_open', { source: d.source, chapter: d.chapter ?? idx });
    };
    window.addEventListener(FILM_EVENT, onOpen);
    return () => window.removeEventListener(FILM_EVENT, onOpen);
  }, [chapters]);

  /* Deep links: /outbound#watch opens the film, ?t=52 opens it at 0:52
   * (the VideoObject key-moment URLs), on load or on a same-page #watch link */
  useEffect(() => {
    const t = parseStart(new URLSearchParams(window.location.search).get('t'));
    if (t != null || window.location.hash === '#watch') {
      openFilm({ seconds: t ?? 0, source: t != null ? 'link_t' : 'link_watch' });
    }
    const onHash = () => {
      if (window.location.hash === '#watch') openFilm({ seconds: 0, source: 'link_watch' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  /* chapters.vtt (local film only) is under 1KB: fetch it when the page is
   * idle, so a chip opens the film on the exact chapter start, not the
   * whole-second time in content.ts. */
  useEffect(() => {
    if (PLAYBACK_ID || loadedRef.current.vtt) return;
    let dead = false;
    const load = () => {
      if (loadedRef.current.vtt) return;
      loadedRef.current.vtt = true;
      fetch(MEDIA.chapters)
        .then(r => (r.ok ? r.text() : ''))
        .then(txt => !dead && setVtt(parseChaptersVtt(txt)))
        .catch(() => !dead && setVtt([]));
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(load) : window.setTimeout(load, 1500);
    return () => {
      dead = true;
      if (!w.requestIdleCallback) clearTimeout(id);
    };
  }, []);

  /* The transcript, once, the first time the theatre opens */
  useEffect(() => {
    if (!open || loadedRef.current.transcript) return;
    let dead = false;
    loadedRef.current.transcript = true;
    fetch(MEDIA.transcript)
      .then(r => (r.ok ? r.json() : []))
      .then(j => !dead && setLines(normaliseTranscript(j)))
      .catch(() => !dead && setLines([]));
    return () => {
      dead = true;
    };
  }, [open]);

  /* If a chapter was asked for before chapters.vtt arrived, land on its exact start */
  useEffect(() => {
    const p = pendingChapter.current;
    if (p == null || !vtt || vtt.length === 0) return;
    pendingChapter.current = null;
    const row = rows[p];
    const el = mediaRef.current ?? videoRef.current;
    if (!row || !el) return;
    if (el.currentTime < row.seconds) {
      try {
        el.currentTime = row.seconds + 0.05;
      } catch {}
    }
    activeRef.current = p;
    requestAnimationFrame(() => setActive(p));
  }, [rows, vtt]);

  const requestClose = useCallback(() => {
    if (!open || closing) return;
    const el = mediaRef.current ?? videoRef.current;
    try {
      el?.pause();
    } catch {}
    const row = rowsRef.current[activeRef.current];
    const target = row ? document.getElementById(row.section) : null;
    const opener = openerRef.current;

    // Drop #watch / ?t= from the address so a refresh doesn't reopen the film
    const url = new URL(window.location.href);
    if (url.hash === '#watch' || url.searchParams.has('t')) {
      url.searchParams.delete('t');
      if (url.hash === '#watch') url.hash = '';
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    }

    // Land the page under the overlay first, instantly, then fade the overlay.
    if (target) target.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' });
    setClosing(true);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    closeTimer.current = setTimeout(
      () => {
        setOpen(false);
        setClosing(false);
        requestAnimationFrame(() => {
          if (opener && target && target.contains(opener) && document.contains(opener)) {
            opener.focus({ preventScroll: true });
          } else if (target) {
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
          } else {
            opener?.focus({ preventScroll: true });
          }
        });
      },
      reduce ? 0 : 240
    );
  }, [open, closing]);

  const closeRef = useRef(requestClose);
  useEffect(() => {
    closeRef.current = requestClose;
  }, [requestClose]);

  /* While open: lock the page, make it inert, trap focus, Esc closes */
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const prev = [html.style.overflow, body.style.overflow];
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    const page = document.querySelector<HTMLElement>('.ob-page');
    page?.setAttribute('inert', '');

    const focusTimer = setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus({ preventScroll: true });
    }, 20);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prev[0];
      body.style.overflow = prev[1];
      page?.removeAttribute('inert');
    };
  }, [open]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  /* Keep the active chapter and the current transcript line in view */
  useEffect(() => {
    if (!open || tab !== 'chapters') return;
    const box = chapListRef.current?.parentElement ?? null;
    keepInView(box, chapListRef.current?.querySelector<HTMLElement>('[aria-current="true"]') ?? null);
  }, [active, open, tab]);

  const currentLine = useMemo(() => {
    if (!lines?.length) return -1;
    let idx = -1;
    for (let i = 0; i < lines.length; i++) if (lines[i].t <= now + 0.2) idx = i;
    return idx;
  }, [lines, now]);

  useEffect(() => {
    if (!open || tab !== 'transcript') return;
    const box = lineListRef.current?.parentElement ?? null;
    keepInView(box, lineListRef.current?.querySelector<HTMLElement>('[aria-current="true"]') ?? null);
  }, [currentLine, open, tab]);

  /* Captions on or off, for whichever player is live */
  const applyCaptions = useCallback((on: boolean) => {
    setCaptionMode(mediaRef.current ?? videoRef.current, on);
  }, []);

  const onTime = useCallback((el: Media) => {
    mediaRef.current = el;
    const t = el.currentTime || 0;
    setNow(t);
    const idx = indexAt(rowsRef.current, t);
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  }, []);

  const onReady = useCallback(
    (el: Media) => {
      mediaRef.current = el;
      applyCaptions(captions);
      if (PLAYBACK_ID) {
        const mux = el as MuxPlayerElement;
        try {
          mux.addChapters?.(rowsRef.current.map(c => ({ startTime: c.seconds, value: c.title })));
        } catch {}
      }
    },
    [applyCaptions, captions]
  );

  const seek = (seconds: number, idx: number | null, from: 'chapter' | 'transcript') => {
    const el = mediaRef.current ?? videoRef.current;
    if (el) {
      try {
        el.currentTime = idx != null && seconds > 0 ? seconds + 0.05 : seconds;
        el.play()?.catch(() => {});
      } catch {}
    }
    setNow(seconds);
    const i = idx ?? indexAt(rowsRef.current, seconds);
    activeRef.current = i;
    setActive(i);
    track('chapter_jump', { chapter: i, from });
  };

  /* Focus sentinels: wrap Tab inside the dialog, player shadow DOM included */
  const focusables = () =>
    Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"]):not([data-sentinel]), video[controls], mux-player'
      ) ?? []
    ).filter(el => el.getClientRects().length > 0);

  if (!isClient) return null;

  const activeRow = rows[active] ?? rows[0];
  const showMux = Boolean(PLAYBACK_ID) && everOpened;

  return createPortal(
    <div
      ref={dialogRef}
      className={`ob-th${closing ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      hidden={!open}
    >
      <span
        tabIndex={0}
        data-sentinel
        className="ob-sr"
        onFocus={() => {
          const f = focusables();
          f[f.length - 1]?.focus();
        }}
      />

      <button type="button" className="ob-th-close" onClick={requestClose} aria-label={UI.closeFilm} data-autofocus>
        <span aria-hidden className="ob-th-x" />
      </button>

      <div className="ob-th-stage">
        <div className="ob-th-screen">
          {showMux ? (
            <MuxPlayer
              playbackId={PLAYBACK_ID}
              streamType="on-demand"
              startTime={start}
              autoPlay
              defaultHiddenCaptions={!captions}
              metadataVideoTitle={label}
              poster={MEDIA.filmPoster}
              primaryColor="#F4EDDF"
              secondaryColor="#050E1D"
              accentColor="#3FAEDE"
              disableCookies
              className="ob-th-mux"
              onLoadedMetadata={e => onReady(e.target as MuxPlayerElement)}
              onTimeUpdate={e => onTime(e.target as MuxPlayerElement)}
              onSeeked={e => onTime(e.target as MuxPlayerElement)}
            />
          ) : !PLAYBACK_ID ? (
            <video
              ref={videoRef}
              className="ob-th-video"
              src={MEDIA.film}
              poster={MEDIA.filmPoster}
              controls
              playsInline
              preload="none"
              aria-label={label}
              onLoadedMetadata={e => onReady(e.currentTarget)}
              onTimeUpdate={e => onTime(e.currentTarget)}
              onSeeked={e => onTime(e.currentTarget)}
            >
              <track kind="captions" src={MEDIA.captions} srcLang="en" label={captionsLabel} />
            </video>
          ) : null}
        </div>
      </div>

      <aside className="ob-th-panel">
        <div className="ob-th-now" aria-live="polite">
          <span className="ob-mono">
            {UI.nowPlaying} · {activeRow?.t}
          </span>
          <p className="ob-th-now-title">{activeRow?.title}</p>
        </div>

        <div className="ob-th-bar">
          <div role="tablist" aria-label={label} className="ob-th-tabs">
            <button
              type="button"
              role="tab"
              id="ob-th-tab-ch"
              aria-selected={tab === 'chapters'}
              aria-controls="ob-th-pane-ch"
              tabIndex={tab === 'chapters' ? 0 : -1}
              onClick={() => setTab('chapters')}
              onKeyDown={e => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  setTab('transcript');
                  document.getElementById('ob-th-tab-tr')?.focus();
                }
              }}
            >
              {UI.chapters}
              <span className="ob-mono"> {rows.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              id="ob-th-tab-tr"
              aria-selected={tab === 'transcript'}
              aria-controls="ob-th-pane-tr"
              tabIndex={tab === 'transcript' ? 0 : -1}
              onClick={() => setTab('transcript')}
              onKeyDown={e => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  setTab('chapters');
                  document.getElementById('ob-th-tab-ch')?.focus();
                }
              }}
            >
              {transcriptHeading}
            </button>
          </div>
        </div>

        <div className="ob-th-scroll" id="ob-th-pane-ch" role="tabpanel" aria-labelledby="ob-th-tab-ch" hidden={tab !== 'chapters'}>
          <ol ref={chapListRef} className="ob-th-chapters">
            {rows.map((c, i) => (
              <li key={`${c.t}-${i}`}>
                <button
                  type="button"
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => seek(c.seconds, i, 'chapter')}
                >
                  <span className="ob-mono">{c.t}</span>
                  <span>{c.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="ob-th-scroll" id="ob-th-pane-tr" role="tabpanel" aria-labelledby="ob-th-tab-tr" hidden={tab !== 'transcript'}>
          <ol ref={lineListRef} className="ob-th-lines">
            {(lines ?? []).map((l, i) => (
              <li key={i}>
                <button
                  type="button"
                  aria-current={i === currentLine ? 'true' : undefined}
                  onClick={() => seek(l.t, null, 'transcript')}
                >
                  <span className="ob-mono">{secondsToClock(l.t)}</span>
                  <span>{l.text}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </aside>

      <span
        tabIndex={0}
        data-sentinel
        className="ob-sr"
        onFocus={() => focusables()[0]?.focus()}
      />
    </div>,
    document.body
  );
}
