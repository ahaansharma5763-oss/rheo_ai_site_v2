'use client';

import { useState, Suspense, lazy } from 'react';

const Dithering = lazy(() =>
  import('@paper-design/shaders-react').then((mod) => ({ default: mod.Dithering }))
);

interface HeroDitheringProps {
  colorFront?: string;
  colorBack?: string;
  speed?: number;
  type?: '2x2' | '4x4' | 'random' | '8x8';
  shape?: 'warp' | 'ripple' | 'wave' | 'simplex' | 'dots' | 'swirl' | 'sphere';
}

export function HeroDithering({
  colorFront = '#7EC8E3',  // --foam: brightest Hokusai ocean blue in the brand
  colorBack  = '#07101E',  // --ink: deep night
  speed      = 0.4,
  type       = '4x4',
  shape      = 'wave',
}: HeroDitheringProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      <Suspense
        fallback={
          // CSS wave animation fallback, always visible, no WebGL needed
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(160deg, #07101E 0%, #0D1F3C 40%, #1A3566 70%, #2E6B8E 100%)',
          }}>
            <style>{`
              @keyframes cssWave1 { 0%,100%{transform:translateX(0) scaleY(1)} 50%{transform:translateX(-5%) scaleY(1.05)} }
              @keyframes cssWave2 { 0%,100%{transform:translateX(0) scaleY(1)} 50%{transform:translateX(5%) scaleY(0.95)} }
            `}</style>
            {/* Wave layer 1 */}
            <svg style={{position:'absolute',bottom:0,left:0,width:'100%',height:'45%',animation:'cssWave1 8s ease-in-out infinite'}}
              viewBox="0 0 1440 260" preserveAspectRatio="none">
              <path d="M0,160 C180,80 360,220 540,140 C720,60 900,200 1080,120 C1260,40 1380,160 1440,100 L1440,260 L0,260 Z"
                fill="#1A3566" opacity="0.7"/>
            </svg>
            {/* Wave layer 2 */}
            <svg style={{position:'absolute',bottom:0,left:0,width:'100%',height:'35%',animation:'cssWave2 6s ease-in-out infinite'}}
              viewBox="0 0 1440 200" preserveAspectRatio="none">
              <path d="M0,130 C200,70 400,170 600,100 C800,30 1000,150 1200,80 C1320,40 1400,120 1440,80 L1440,200 L0,200 Z"
                fill="#2E6B8E" opacity="0.6"/>
              {/* Gold crest hairline */}
              <path d="M0,130 C200,70 400,170 600,100 C800,30 1000,150 1200,80 C1320,40 1400,120 1440,80"
                fill="none" stroke="#C4A25A" strokeWidth="1" opacity="0.5"/>
            </svg>
            {/* Wave layer 3, front */}
            <svg style={{position:'absolute',bottom:0,left:0,width:'100%',height:'28%'}}
              viewBox="0 0 1440 160" preserveAspectRatio="none">
              <path d="M0,100 C240,50 480,130 720,70 C960,10 1200,100 1440,55 L1440,160 L0,160 Z"
                fill="#4599B5" opacity="0.45"/>
            </svg>
            {/* Foam blue highlight */}
            <svg style={{position:'absolute',bottom:0,left:0,width:'100%',height:'22%'}}
              viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d="M0,80 C180,40 360,100 540,60 C720,20 900,80 1080,45 C1260,10 1380,70 1440,45 L1440,120 L0,120 Z"
                fill="#07101E" opacity="0.9"/>
              <path d="M0,80 C180,40 360,100 540,60 C720,20 900,80 1080,45 C1260,10 1380,70 1440,45"
                fill="none" stroke="#7EC8E3" strokeWidth="1.2" opacity="0.6"/>
            </svg>
          </div>
        }
      >
        <Dithering
          colorBack={colorBack}
          colorFront={colorFront}
          shape={shape}
          type={type}
          speed={hovered ? speed * 2.5 : speed}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          minPixelRatio={1}
        />
      </Suspense>
    </div>
  );
}
