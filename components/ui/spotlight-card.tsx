'use client';

/* Adapted from Aceternity CardSpotlight (raw/kai-nami-build-assets/card-spotlight.tsx).
 * three.js canvas effect replaced with a light gold radial glow per brand budget.
 * Brand v1.1: zero radius, navy panel, hairline border, one gold accent (the glow). */

import { useMotionValue, motion, useMotionTemplate } from 'motion/react';
import React, { MouseEvent as ReactMouseEvent, useState } from 'react';

export const SpotlightCard = ({
  children,
  radius = 320,
  style,
}: {
  radius?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hover, setHover] = useState(false);

  function onMove({ currentTarget, clientX, clientY }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        border: `1px solid ${hover ? 'rgba(196,162,90,0.4)' : 'rgba(46,116,172,0.24)'}`,
        background: 'rgba(11,23,41,0.55)',
        padding: 'clamp(22px, 2.6vw, 30px)',
        height: '100%',
        transition: 'border-color 0.4s ease',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-1px',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.35s ease',
          background: 'rgba(196,162,90,0.09)',
          maskImage: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`,
          WebkitMaskImage: useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, ...style }}>{children}</div>
    </div>
  );
};
