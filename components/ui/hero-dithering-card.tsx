'use client';

import { useState, Suspense, lazy } from 'react';

// Lazy-load the WebGL shader (browser-only)
const Dithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({ default: mod.Dithering }))
);

interface HeroDitheringProps {
  /** Wave highlight color. Default: Crest #4599B5 */
  colorFront?: string;
  /** Background color. Default: Ink Night #07101E */
  colorBack?: string;
  /** Idle animation speed */
  speed?: number;
  /** Dither matrix. '4x4' gives finest grain. */
  type?: '2x2' | '4x4' | 'random' | '8x8';
  /** Distortion shape. 'wave' looks most like ocean waves. */
  shape?: 'warp' | 'ripple' | 'wave' | 'simplex' | 'dots' | 'swirl' | 'sphere';
}

export function HeroDithering({
  colorFront = '#4599B5',  // --crest
  colorBack  = '#07101E',  // --ink
  speed      = 0.25,
  type       = '4x4',
  shape      = 'wave',
}: HeroDitheringProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      <Suspense
        fallback={
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(160deg, #07101E 0%, #0D1F3C 55%, #1A3566 100%)',
            }}
          />
        }
      >
        <Dithering
          colorBack={colorBack}
          colorFront={colorFront}
          shape={shape}
          type={type}
          speed={hovered ? speed * 3 : speed}
          className="size-full"
          minPixelRatio={1}
        />
      </Suspense>
    </div>
  );
}
