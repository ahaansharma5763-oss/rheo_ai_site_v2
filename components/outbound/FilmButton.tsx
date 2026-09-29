'use client';

/* Anything on the page that opens the film theatre. A plain link to the film
 * band when scripts have not run; with scripts, it asks the theatre to open
 * at a chapter (by index) and hands over itself so focus can come back. */

export const FILM_EVENT = 'ob:film-open';

export type FilmRequest = {
  chapter?: number;
  seconds?: number;
  source: string;
  opener?: HTMLElement | null;
};

export function openFilm(req: FilmRequest) {
  window.dispatchEvent(new CustomEvent<FilmRequest>(FILM_EVENT, { detail: req }));
}

export default function FilmButton({
  chapter,
  source,
  className,
  children,
  ariaLabel,
}: {
  chapter?: number;
  source: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href="#film"
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        openFilm({ chapter, source, opener: e.currentTarget });
      }}
    >
      {children}
    </a>
  );
}
