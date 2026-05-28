'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fixed full-viewport video background.
 *
 *   bg-loop.mp4         10s · 1280x720 · ~3.9MB · H.264
 *   bg-loop-poster.jpg  used as the instant-load still
 *
 * The video sits at the very back, with brand-tinted overlays and a top
 * vignette layered on top so headlines stay crisp. Honours prefers-reduced-motion
 * by pausing the loop and falling back to the poster image.
 */
export default function BackgroundWaves() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const reduce = mq.matches;
      setPaused(reduce);
      const v = videoRef.current;
      if (!v) return;
      if (reduce) v.pause();
      else v.play().catch(() => { /* autoplay blocked, poster shows */ });
    };
    apply();
    mq.addEventListener('change', apply);

    // Pause when tab hidden to save CPU
    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) v.pause();
      else if (!paused) v.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      mq.removeEventListener('change', apply);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [paused]);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        contain: 'strict',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/bg-scroll-poster.jpg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.55,
          filter: 'saturate(1.05) contrast(1.05)',
          willChange: 'transform',
        }}
      >
        <source src="/bg-scroll.mp4" type="video/mp4" />
      </video>

      {/* Brand-tinted overlay so the video reads in the Rheo palette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 50% 60% at 92% 30%, rgba(46,107,142,0.28) 0%, transparent 65%),
          radial-gradient(ellipse 60% 50% at 5% 95%, rgba(26,53,102,0.36) 0%, transparent 70%),
          linear-gradient(180deg, rgba(7,16,30,0.45) 0%, rgba(7,16,30,0.55) 100%)
        `,
      }} />

      {/* Top vignette so the hero headline stays crisp */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 90% 70% at 50% 25%, rgba(7,16,30,0.6) 0%, transparent 70%)',
      }} />

    </div>
  );
}
