'use client';

import React from 'react';

type Intensity = 'hero' | 'medium' | 'subtle';

interface WaveSystemProps {
  intensity?: Intensity;
  className?: string;
}

interface WaveLayer {
  path: string;
  fill: string;
  stroke: string;
  opacity: number;
  dataSpeed: string;
  isFront?: boolean;
}

// --- Wave path definitions (cubic bezier, 1440px wide) ---

const WAVE_PATHS = [
  // Back layer 1 — slow, low amplitude
  'M0,100 C180,60 360,140 540,90 C720,40 900,120 1080,70 C1260,20 1380,80 1440,60 L1440,200 L0,200 Z',
  // Back layer 2
  'M0,90 C200,130 400,50 600,100 C800,150 1000,60 1200,95 C1320,115 1400,75 1440,80 L1440,200 L0,200 Z',
  // Mid layer
  'M0,80 C150,40 300,120 450,60 C600,0 750,100 900,50 C1050,0 1200,80 1440,40 L1440,200 L0,200 Z',
  // Near layer
  'M0,110 C100,70 250,130 400,80 C550,30 700,110 900,65 C1100,20 1300,90 1440,55 L1440,200 L0,200 Z',
  // Front layer
  'M0,120 C120,85 280,145 460,100 C640,55 800,125 1000,80 C1150,45 1320,105 1440,70 L1440,200 L0,200 Z',
];

// Layer configurations (back → front order)
const ALL_LAYERS: WaveLayer[] = [
  {
    path: WAVE_PATHS[0],
    fill: '#1A3566',       // --prussian
    stroke: '#2E6B8E',     // one shade lighter → --ocean
    opacity: 0.65,
    dataSpeed: '0.1',
  },
  {
    path: WAVE_PATHS[1],
    fill: '#1A3566',
    stroke: '#2E6B8E',
    opacity: 0.5,
    dataSpeed: '0.15',
  },
  {
    path: WAVE_PATHS[2],
    fill: '#2E6B8E',       // --ocean
    stroke: '#4599B5',     // --crest
    opacity: 0.35,
    dataSpeed: '0.25',
  },
  {
    path: WAVE_PATHS[3],
    fill: '#0D1F3C',       // --navy
    stroke: '#2E6B8E',
    opacity: 0.25,
    dataSpeed: '0.4',
  },
  {
    path: WAVE_PATHS[4],
    fill: '#0D1F3C',
    stroke: '#4599B5',
    opacity: 0.15,
    dataSpeed: '0.6',
    isFront: true,
  },
];

const INTENSITY_CONFIG: Record<Intensity, { layerCount: number; height: number }> = {
  hero:   { layerCount: 5, height: 200 },
  medium: { layerCount: 4, height: 140 },
  subtle: { layerCount: 3, height: 80  },
};

// Fuji silhouette — small, centred, behind all waves
function FujiSilhouette({ height }: { height: number }) {
  // Simple triangular mountain silhouette with a gentle snow cap
  const base = height;
  const peak = height * 0.15;
  const cx = 720; // centre of 1440px viewport

  const silhouettePath = `
    M${cx - 180},${base}
    C${cx - 140},${base * 0.9} ${cx - 100},${base * 0.7} ${cx - 60},${base * 0.55}
    C${cx - 30},${base * 0.42} ${cx - 10},${peak * 1.4} ${cx},${peak}
    C${cx + 10},${peak * 1.4} ${cx + 30},${base * 0.42} ${cx + 60},${base * 0.55}
    C${cx + 100},${base * 0.7} ${cx + 140},${base * 0.9} ${cx + 180},${base}
    Z
  `;

  return (
    <path
      d={silhouettePath}
      fill="#1A3566"
      opacity="0.08"
    />
  );
}

// Hatch lines for the front wave's fill area
function FrontWaveHatch({ height }: { height: number }) {
  const lines: React.ReactNode[] = [];
  const interval = 16;
  const count = Math.ceil(1440 / interval);

  for (let i = 0; i <= count; i++) {
    const x = i * interval;
    lines.push(
      <line
        key={i}
        x1={x}
        y1="0"
        x2={x}
        y2={height}
        stroke="#1A3566"
        strokeWidth="0.5"
        opacity="0.4"
      />
    );
  }

  return <>{lines}</>;
}

// Foam dots along the front crest
function WaveFoam() {
  const foamPositions = [80, 220, 380, 520, 660, 810, 960, 1100, 1250, 1400];

  return (
    <>
      {foamPositions.map((x, i) => {
        // Approximate y along the front wave path
        const yOffset = 70 + Math.sin(x / 140) * 30;
        return (
          <g key={i}>
            <circle cx={x} cy={yOffset} r="2.5" fill="#BDB5A5" opacity="0.5" />
            <circle cx={x + 8} cy={yOffset - 3} r="1.5" fill="#BDB5A5" opacity="0.35" />
            <circle cx={x - 6} cy={yOffset + 2} r="1" fill="#BDB5A5" opacity="0.25" />
          </g>
        );
      })}
    </>
  );
}

// Gold hairline along the front crest tip
function GoldCrestLine() {
  // Mirrors the front wave path but offset slightly upward
  const goldPath =
    'M0,118 C120,83 280,143 460,98 C640,53 800,123 1000,78 C1150,43 1320,103 1440,68';

  return (
    <path
      d={goldPath}
      stroke="#C4A25A"
      strokeWidth="0.6"
      fill="none"
      opacity="0.85"
    />
  );
}

export default function WaveSystem({ intensity = 'hero', className = '' }: WaveSystemProps) {
  const { layerCount, height } = INTENSITY_CONFIG[intensity];

  // Select layers from the back, limited to layerCount
  const layers = ALL_LAYERS.slice(ALL_LAYERS.length - layerCount);

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: `${height}px`,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Base SVG containing Fuji + all wave layers */}
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ position: 'absolute', bottom: 0, left: 0 }}
        aria-hidden="true"
      >
        {/* Fuji silhouette — behind everything */}
        <FujiSilhouette height={height} />

        {/* Hatch clip — applied only to front wave fill area */}
        <defs>
          <clipPath id={`front-wave-clip-${intensity}`}>
            <path d={WAVE_PATHS[4]} />
          </clipPath>
        </defs>

        {/* Wave layers */}
        {layers.map((layer, i) => {
          const isFront = layer.isFront && layerCount >= 2;

          return (
            <g key={i} data-speed={layer.dataSpeed} opacity={layer.opacity}>
              {/* Wave fill */}
              <path d={layer.path} fill={layer.fill} />

              {/* Hairline stroke on wave top */}
              <path
                d={layer.path.split(' L')[0]} // top curve only (before the close)
                stroke={layer.stroke}
                strokeWidth="0.6"
                fill="none"
              />

              {/* Front wave extras */}
              {isFront && (
                <>
                  {/* Vertical hatch lines clipped to front wave */}
                  <g clipPath={`url(#front-wave-clip-${intensity})`}>
                    <FrontWaveHatch height={height} />
                  </g>

                  {/* Foam */}
                  <WaveFoam />

                  {/* Single gold hairline on the crest */}
                  <GoldCrestLine />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
