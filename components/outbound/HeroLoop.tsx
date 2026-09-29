'use client';

/* The hero's portrait frame: the film's first eight seconds as a silent loop.
 * Nothing downloads until the frame is on screen (preload none, then an
 * IntersectionObserver), it pauses when scrolled away, it never starts on its
 * own under reduced motion, and it always has a visible pause button. */

import { useEffect, useRef, useState } from 'react';
import { MEDIA } from './types';
import { UI } from './ui';

export default function HeroLoop({ label }: { label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) userPaused.current = true;

    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (v.preload === 'none') v.preload = 'auto';
          if (!userPaused.current) v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      if (v.preload === 'none') v.preload = 'auto';
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <figure className="ob-loop">
      <video
        ref={ref}
        className="ob-loop-video"
        muted
        loop
        playsInline
        preload="none"
        poster={MEDIA.heroPoster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={MEDIA.heroLoopWebm} type="video/webm" />
        <source src={MEDIA.heroLoopMp4} type="video/mp4" />
      </video>
      <figcaption className="ob-sr">{label}</figcaption>
      <button
        type="button"
        className="ob-loop-btn"
        onClick={toggle}
        aria-label={playing ? UI.pauseLoop : UI.playLoop}
      >
        {playing ? (
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
            <path d="M5.5 3.5v9M10.5 3.5v9" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden>
            <path d="M5 3.2v9.6L12.6 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" fill="none" />
          </svg>
        )}
      </button>
    </figure>
  );
}
