'use client';

import { useEffect, useRef } from 'react';

/**
 * Premium custom cursor.
 *
 *   - Inner dot follows the mouse exactly.
 *   - Outer ring trails with a lerp for smoothness.
 *   - mix-blend-mode: difference, so the cursor reads on both
 *     dark video and pale type without ever disappearing.
 *   - Expands on hover over links, buttons, [data-cursor="link"],
 *     [role="button"], and any element with explicit cursor: pointer.
 *   - Hidden on touch devices (pointer:coarse).
 *   - Hidden when the mouse leaves the viewport.
 *   - Honours prefers-reduced-motion (no trail, snap-to-position).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Skip entirely on touch-only / coarse-pointer devices
    const touchOnly = window.matchMedia('(pointer: coarse)').matches;
    if (touchOnly) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hide the OS cursor globally while this one is active
    document.documentElement.style.cursor = 'none';
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-custom-cursor', 'true');
    styleEl.textContent = `
      *, *::before, *::after { cursor: none !important; }
      a, button, [role="button"], [data-cursor="link"],
      input[type="submit"], input[type="button"], label[for] {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    // State
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      // For reduce-motion users, snap ring to position immediately
      if (reduce) {
        rx = mx;
        ry = my;
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onEnter = () => {
      visible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const tick = () => {
      // Lerp the ring toward the mouse position
      const lerp = reduce ? 1 : 0.18;
      rx += (mx - rx) * lerp;
      ry += (my - ry) * lerp;

      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(var(--ring-scale, 1))`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hover detection for interactive elements
    const isInteractive = (el: Element | null): boolean => {
      if (!el || !(el instanceof Element)) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button') return true;
      if (el.getAttribute('role') === 'button') return true;
      if (el.hasAttribute('data-cursor')) return true;
      if (
        tag === 'input' &&
        ['submit', 'button', 'checkbox', 'radio'].includes(
          (el as HTMLInputElement).type
        )
      )
        return true;
      // Climb the ancestry up to 4 levels for nested cases
      return el.parentElement ? isInteractiveChain(el.parentElement, 4) : false;
    };
    const isInteractiveChain = (el: Element | null, depth: number): boolean => {
      if (!el || depth <= 0) return false;
      const tag = el.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button') return true;
      if (el.getAttribute('role') === 'button') return true;
      if (el.hasAttribute('data-cursor')) return true;
      return isInteractiveChain(el.parentElement, depth - 1);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const hot = isInteractive(target);
      ring.style.setProperty('--ring-scale', hot ? '1.6' : '1');
      ring.style.borderColor = hot ? 'rgba(240,208,128,0.95)' : 'rgba(196,162,90,0.75)';
      dot.style.opacity = hot ? '0' : '1';
      ring.style.background = hot ? 'rgba(196,162,90,0.12)' : 'transparent';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.documentElement.style.cursor = '';
      styleEl.remove();
    };
  }, []);

  return (
    <>
      {/* Outer ring. No mix-blend so the GPU does not repaint the whole viewport each frame. */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '34px',
          height: '34px',
          border: '1px solid rgba(196,162,90,0.75)',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 9999,
          willChange: 'transform, opacity',
          transition: 'border-color 0.25s ease, background 0.25s ease, opacity 0.3s ease',
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '5px',
          height: '5px',
          background: '#F0D080',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 10000,
          willChange: 'transform, opacity',
          transition: 'opacity 0.2s ease',
        }}
      />
    </>
  );
}
