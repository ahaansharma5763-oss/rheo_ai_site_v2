'use client';

/**
 * Continuous monotonic-darker gradient.
 *
 * Top of the page sits at a deeper Prussian. As the user scrolls,
 * the colour shifts gradually through navy and Ink Night, getting
 * darker the whole way down. No reversal, no light middle band.
 *
 * Single linear gradient on an absolute-fill element that sits
 * inside a position:relative <main>. The browser paints this once
 * on first composite and never repaints it.
 */
export default function PageGradient() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `
          linear-gradient(180deg,
            #1A3D6B 0%,
            #173458 12%,
            #142B49 24%,
            #11233B 36%,
            #0E1C30 48%,
            #0B1727 60%,
            #08131F 72%,
            #060F19 84%,
            #040A12 100%
          )
        `,
      }}
    />
  );
}
