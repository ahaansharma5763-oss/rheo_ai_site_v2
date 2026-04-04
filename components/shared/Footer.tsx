import React from 'react';

// Sine-wave hairline divider — full width, 24px tall, no fill
function WaveHairline() {
  // Path: a smooth sine wave across 1440px, y centred at 12
  const wavePath =
    'M0,12 C60,4 120,20 180,12 C240,4 300,20 360,12 C420,4 480,20 540,12 ' +
    'C600,4 660,20 720,12 C780,4 840,20 900,12 C960,4 1020,20 1080,12 ' +
    'C1140,4 1200,20 1260,12 C1320,4 1380,20 1440,12';

  return (
    <svg
      viewBox="0 0 1440 24"
      preserveAspectRatio="none"
      width="100%"
      height="24"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <path
        d={wavePath}
        stroke="#1A3566"
        strokeWidth="0.5"
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--ink)',
        width: '100%',
      }}
    >
      <WaveHairline />

      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px 32px',
        }}
      >
        {/* Brand name */}
        <p
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '20px',
            color: 'var(--gold)',
            letterSpacing: '0.3em',
            margin: 0,
            fontWeight: 400,
          }}
        >
          RHEO AI
        </p>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '14px',
            color: 'var(--prussian)',
            letterSpacing: '0.2em',
            margin: '6px 0 0',
            fontWeight: 400,
          }}
        >
          ρέω · 流れ
        </p>

        {/* Contact */}
        <p
          style={{
            fontSize: '11px',
            color: 'var(--ocean)',
            letterSpacing: '0.12em',
            margin: '12px 0 0',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          rheoai.co.in · ahaan@rheoai.co.in
        </p>
      </div>
    </footer>
  );
}
