'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { HeroDithering } from './hero-dithering-card';

type Variant = 'full' | 'bottom' | 'top' | 'corner-right' | 'corner-left';

/**
 * Site-wide Hokusai-wave motif. Wraps the dithering shader and gives each
 * section a different treatment of the SAME component (same Rheo design system).
 *
 * Performance: the WebGL shader is only mounted while the field is near the
 * viewport (IntersectionObserver). Scrolled away, it unmounts and frees the GPU,
 * so many waves can live across the page without running simultaneously.
 *
 * Reduced motion: HeroDithering holds one still frame (speed 0) for visitors
 * who ask their OS for less motion.
 *
 * Every prop below `speed` is optional and defaults to the shader's own
 * framing, so existing call sites render exactly as they always have.
 */

const MASKS: Record<Variant, string> = {
  full:
    'linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.6) 78%, transparent 100%)',
  bottom:
    'linear-gradient(to top, black 0%, rgba(0,0,0,0.7) 35%, transparent 70%)',
  top:
    'linear-gradient(to bottom, black 0%, rgba(0,0,0,0.7) 35%, transparent 72%)',
  'corner-right':
    'radial-gradient(ellipse 70% 80% at 100% 50%, black 0%, rgba(0,0,0,0.5) 45%, transparent 75%)',
  'corner-left':
    'radial-gradient(ellipse 70% 80% at 0% 50%, black 0%, rgba(0,0,0,0.5) 45%, transparent 75%)',
};

interface WaveFieldProps {
  variant?: Variant;
  shape?: 'warp' | 'ripple' | 'wave' | 'simplex' | 'dots' | 'swirl' | 'sphere';
  colorFront?: string;
  colorBack?: string;
  opacity?: number;
  speed?: number;
  type?: '2x2' | '4x4' | 'random' | '8x8';
  scale?: number;
  rotation?: number;
  size?: number;
  offsetX?: number;
  offsetY?: number;
  /* Start frame in ms; also the reduced-motion still */
  frame?: number;
  /* A CSS mask-image that replaces the variant's mask */
  mask?: string;
  /* What shows while the shader chunk loads (see HeroDithering) */
  fallback?: ReactNode;
}

export default function WaveField({
  variant = 'full',
  shape = 'wave',
  colorFront = '#3FAEDE',
  colorBack = '#0B2147',
  opacity = 0.5,
  speed = 0.3,
  type = '4x4',
  scale,
  rotation,
  size,
  offsetX,
  offsetY,
  frame,
  mask: maskOverride,
  fallback,
}: WaveFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      // Tight margin: fewer shaders alive at once. 300px kept 3-4 WebGL
      // contexts animating simultaneously and made scrolling laggy.
      { rootMargin: '80px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mask = maskOverride ?? MASKS[variant];

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}>
        {show && (
          <HeroDithering
            colorBack={colorBack}
            colorFront={colorFront}
            shape={shape}
            type={type}
            speed={speed}
            scale={scale}
            rotation={rotation}
            size={size}
            offsetX={offsetX}
            offsetY={offsetY}
            frame={frame}
            fallback={fallback}
          />
        )}
      </div>
    </div>
  );
}
