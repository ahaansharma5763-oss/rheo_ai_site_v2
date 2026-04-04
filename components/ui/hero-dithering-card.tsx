'use client';

import { useState, Suspense, lazy } from 'react';

const Dithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({ default: mod.Dithering }))
);

interface HeroDitheringProps {
  /** Wave color — defaults to Rheo AI Ocean #2E6B8E */
  colorFront?: string;
  /** Background color — defaults to Ink Night #07101E */
  colorBack?: string;
  /** Animation speed when idle */
  speed?: number;
  /** Dither pattern */
  type?: '2x2' | '4x4' | 'random' | '8x8';
  /** Shape of distortion */
  shape?: 'warp' | 'ripple' | 'wave' | 'simplex' | 'dots' | 'swirl' | 'sphere';
}

export function HeroDithering({
  colorFront = '#2E6B8E',   // --ocean
  colorBack  = '#07101E',   // --ink
  speed      = 0.35,
  type       = '4x4',
  shape      = 'warp',
}: HeroDitheringProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      <Suspense fallback={<div className="absolute inset-0" style={{ background: '#07101E' }} />}>
        <Dithering
          colorBack={colorBack}
          colorFront={colorFront}
          shape={shape}
          type={type}
          speed={hovered ? speed * 2.5 : speed}
          className="size-full"
          minPixelRatio={1}
        />
      </Suspense>
    </div>
  );
}
