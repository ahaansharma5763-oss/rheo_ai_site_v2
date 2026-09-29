/* Shared types, media paths and small helpers for /outbound.
 * The content types come from content.ts (Copy owns that file). */

import type { Outbound, Chapter } from './content';

export type { Chapter };
export type OutboundContent = Outbound;
export type Step = Outbound['steps'][number];

export const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';

/* Public media paths, fixed by the contract (Film writes them). */
export const MEDIA = {
  heroLoopWebm: '/outbound/hero-loop.webm',
  heroLoopMp4: '/outbound/hero-loop.mp4',
  heroPoster: '/outbound/hero-poster.jpg',
  step: (n: number) => `/outbound/steps/step-${n}.webp`,
  still: (name: 'problem' | 'report' | 'proof' | 'part') => `/outbound/steps/${name}.webp`,
  film: '/outbound/film/film.mp4',
  filmPoster: '/outbound/film/poster.jpg',
  captions: '/outbound/film/captions.vtt',
  chapters: '/outbound/film/chapters.vtt',
  transcript: '/outbound/film/transcript.json',
} as const;

/* "5:23" or "1:02:03" to seconds. */
export function clockToSeconds(t: string): number {
  const parts = t.trim().split(':').map(Number);
  if (parts.some(Number.isNaN)) return 0;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

export function secondsToClock(s: number): string {
  const total = Math.max(0, Math.floor(s));
  const m = Math.floor(total / 60);
  const sec = total % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

/* "5:23" to ISO 8601 "PT5M23S" for VideoObject.duration. */
export function clockToIso(t: string): string {
  const s = clockToSeconds(t);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${sec || (!h && !m) ? `${sec}S` : ''}`;
}

export type TranscriptLine = { t: number; text: string };

/* transcript.json is [{ t, text }], t in seconds or "m:ss". */
export function normaliseTranscript(raw: unknown): TranscriptLine[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(r => {
      const o = (r ?? {}) as { t?: unknown; text?: unknown };
      const t = typeof o.t === 'number' ? o.t : clockToSeconds(String(o.t ?? '0'));
      return { t: Number.isFinite(t) ? t : 0, text: String(o.text ?? '').trim() };
    })
    .filter(l => l.text);
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
