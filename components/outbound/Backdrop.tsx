'use client';

/* The homepage's dithering wave, retuned for /outbound as "the current".
 *
 * Same shader, same palette, same Bayer dither as the homepage, so it reads as
 * one family. What changes: an Ink Night ground instead of Deep Navy, the warp
 * shape (a slow diagonal current) instead of the sine band, a finer 8x8 grain,
 * a larger scale and half the speed. It runs in four places:
 *   hero   the current wraps the portrait frame; the text column stays on ink
 *   film   the same current carries over the rule into the film band
 *   proof  one quiet corner beside "Our own numbers"
 *   book   the ripple rises behind the closing wave and its one gold crest
 * The nine steps and the Warm Foam "Your part" section carry no shader.
 *
 * Accessibility and cost:
 *   - aria-hidden, pointer-events none, absolutely placed: never the LCP
 *     element and never a layout shift. Content sits above it at z 1.
 *   - WaveField only runs the shader near the viewport, and HeroDithering
 *     holds a still frame under prefers-reduced-motion.
 *   - Every text block keeps WCAG AA against the worst case (every dither
 *     cell lit); the masks in backdrop.css keep the field off the text.
 *   - No pause control: this is slow, low-contrast decoration that carries no
 *     information, it stops when scrolled away or when the tab is hidden, and
 *     it stops entirely for anyone who asks their OS for reduced motion.
 *   - Phones below 600px run two fields (hero, book), never four.
 *   - The hero field waits for the browser to go idle, so the shader chunk
 *     never competes with the headline for the first paint. */

import { useEffect, useState } from 'react';
import WaveField from '@/components/ui/wave-field';

type Place = 'hero' | 'film' | 'proof' | 'book';

type Field = {
  shape: 'warp' | 'ripple';
  front: string;
  back: string;
  opacity: number;
  speed: number;
  scale: number;
  offsetY?: number;
  frame?: number;
};

const INK = '#050E1D';
const NAVY = '#0B2147';
const OCEAN = '#2E74AC';
const FOAM = '#8FDCF8';

const FIELDS: Record<Place, Field> = {
  hero: { shape: 'warp', front: OCEAN, back: INK, opacity: 0.8, speed: 0.12, scale: 1.7, frame: 4000 },
  film: { shape: 'warp', front: OCEAN, back: NAVY, opacity: 0.6, speed: 0.12, scale: 1.7, frame: 4000 },
  proof: { shape: 'warp', front: OCEAN, back: INK, opacity: 0.75, speed: 0.1, scale: 1.7, frame: 30000 },
  // the rings' centre sits below the section, so only their upper arcs rise
  book: { shape: 'ripple', front: FOAM, back: INK, opacity: 0.38, speed: 0.1, scale: 0.8, offsetY: 0.9 },
};

/* Mount once the browser is idle (Safari has no requestIdleCallback) */
function useIdle(enabled: boolean) {
  const [idle, setIdle] = useState(!enabled);
  useEffect(() => {
    if (!enabled) return;
    const done = () => setIdle(true);
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(done, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(done, 400);
    return () => window.clearTimeout(t);
  }, [enabled]);
  return idle;
}

export default function Backdrop({ place }: { place: Place }) {
  const f = FIELDS[place];
  const ready = useIdle(place === 'hero');

  return (
    <div className={`ob-bd ob-bd--${place}`} aria-hidden>
      {ready && (
        <WaveField
          variant="full"
          mask="none"
          fallback={null}
          type="8x8"
          shape={f.shape}
          colorFront={f.front}
          colorBack={f.back}
          opacity={f.opacity}
          speed={f.speed}
          scale={f.scale}
          offsetY={f.offsetY}
          frame={f.frame}
        />
      )}
    </div>
  );
}
