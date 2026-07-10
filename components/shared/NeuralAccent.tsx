'use client';

import { useEffect, useRef } from 'react';

/**
 * Subtle neural accents scattered on both left and right edges of the
 * viewport. Stays well out of the central reading column so it never
 * fights the typography.
 *
 *   - ~22 nodes split across the two edges, irregular vertical spacing
 *   - Connecting hairlines only between nodes within ~95px of each
 *     other, so connections stay within an edge and never bridge the
 *     reading area
 *   - Cursor within ~150px brightens the nearest nodes and lines
 *   - Pure canvas, single requestAnimationFrame loop
 *   - Hidden on coarse pointers (touch)
 *   - Honours prefers-reduced-motion
 *
 * Lives at zIndex 2 globally: above the gradient, below the nav.
 */
export default function NeuralAccent() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const touchOnly = window.matchMedia('(pointer: coarse)').matches;
    if (touchOnly) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      // Cap at 1.25: the dots and hairlines are low-alpha and 1px anyway,
      // and a full-viewport canvas at 2x DPR doubles paint cost for nothing.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      r: number;
      side: 'L' | 'R';
    };

    const buildNodes = (): Node[] => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const edgeFraction = 0.13;          // each edge uses 13% of width
      const edgeWidth = w * edgeFraction;
      const inset = 16;                   // keep a little padding from the absolute edge
      const perSide = 11;                 // 22 total

      const nodes: Node[] = [];

      const place = (side: 'L' | 'R', i: number) => {
        const yT = (i + Math.random() * 0.6) / perSide;
        const y = h * Math.min(0.98, Math.max(0.02, yT));
        const x =
          side === 'L'
            ? inset + Math.random() * (edgeWidth - inset)
            : w - inset - Math.random() * (edgeWidth - inset);
        nodes.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.04,
          vy: (Math.random() - 0.5) * 0.04,
          r: 0.9 + Math.random() * 1.0,
          side,
        });
      };

      for (let i = 0; i < perSide; i++) {
        place('L', i);
        place('R', i);
      }

      return nodes;
    };

    let nodes = buildNodes();
    const rebuildOnResize = () => { nodes = buildNodes(); };
    window.addEventListener('resize', rebuildOnResize);

    let mx = -10000;
    let my = -10000;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onLeave = () => { mx = -10000; my = -10000; };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    const PROXIMITY = 150;
    const LINK_DIST = 95;
    const GOLD = [196, 162, 90];
    const FOAM = [126, 200, 227];
    let raf = 0;

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          n.x += (n.baseX - n.x) * 0.012;
          n.y += (n.baseY - n.y) * 0.012;
        }

        const dx = mx - n.x;
        const dy = my - n.y;
        const d = Math.hypot(dx, dy);
        if (d < PROXIMITY) {
          const f = (1 - d / PROXIMITY) * 0.6;
          n.x += dx / d * f;
          n.y += dy / d * f;
        }
      }

      // Connecting lines (only between same-side nodes via LINK_DIST cap)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          // Skip cross-page connections explicitly so a stray left+right pair
          // can never bridge the centre column even if both drift inward
          if (a.side !== b.side) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > LINK_DIST) continue;
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const cd = Math.hypot(mx - midX, my - midY);
          const hot = Math.max(0, 1 - cd / PROXIMITY);
          const baseAlpha = 0.10 * (1 - d / LINK_DIST);
          const alpha = baseAlpha + hot * 0.28;
          ctx.strokeStyle = `rgba(${FOAM[0]},${FOAM[1]},${FOAM[2]},${alpha})`;
          ctx.lineWidth = 0.5 + hot * 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const cd = Math.hypot(mx - n.x, my - n.y);
        const hot = Math.max(0, 1 - cd / PROXIMITY);
        const baseAlpha = 0.22;
        const alpha = baseAlpha + hot * 0.55;
        const r = n.r + hot * 1.6;

        if (hot > 0.05) {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
          grad.addColorStop(0, `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${0.22 * hot})`);
          grad.addColorStop(1, `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${GOLD[0]},${GOLD[1]},${GOLD[2]},${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('resize', rebuildOnResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
