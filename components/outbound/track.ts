/* Analytics hook for /outbound. The provider is decided later, so this only
 * pushes to window.dataLayer when a tag manager has put one there, and does
 * nothing otherwise. Never pass personal data (names, emails, free text)
 * as props: event names and small enums only. */

export type OutboundEvent =
  | 'film_open'
  | 'chapter_jump'
  | 'step_view'
  | 'form_start'
  | 'form_submit'
  | 'form_error'
  | 'calendly_booked';

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: OutboundEvent, props?: Props): void {
  if (typeof window === 'undefined') return;
  const layer = window.dataLayer;
  if (!Array.isArray(layer)) return;
  try {
    layer.push({ event, ...(props ?? {}) });
  } catch {
    /* analytics must never break the page */
  }
}
