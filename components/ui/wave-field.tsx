'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroDithering } from './hero-dithering-card';

type Variant = 'full' | 'bottom' | 'top' | 'corner-right' | 'corner-left';

/**
 * Site-wide Hokusai-wave motif. Wraps the dithering shader and gives each
 * section a different treatment of the SAME component (same Rheo design system).
 *
 * Performance: the WebGL shader is only mounted while the field is near the
 * viewport (IntersectionObserver). Scrolled away, it unmounts and frees the GPU,
 * so many waves can live across the page without running simultaneously.
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
}

export default function WaveField({
  variant = 'full',
  shape = 'wave',
  colorFront = '#4599B5',
  colorBack = '#0D1F3C',
  opacity = 0.5,
  speed = 0.3,
}: WaveFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { rootMargin: '300px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const mask = MASKS[variant];

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
            type="4x4"
            speed={speed}
          />
        )}
      </div>
    </div>
  );
}
