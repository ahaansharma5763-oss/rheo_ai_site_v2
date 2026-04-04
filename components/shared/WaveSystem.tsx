'use client'
import React from 'react'

interface WaveSystemProps {
  intensity?: 'hero' | 'medium' | 'subtle'
  className?: string
  style?: React.CSSProperties
}

export default function WaveSystem({ intensity = 'hero', className = '', style }: WaveSystemProps) {
  const containerHeight = intensity === 'hero' ? 420 : intensity === 'medium' ? 260 : 140

  const layers = intensity === 'hero' ? [
    // Back layers — deep, slow
    { color: '#1A3566', opacity: 0.5,  duration: 38, path: 'M0,180 C120,100 240,260 360,150 C480,40 600,220 720,130 C840,40 960,200 1080,110 C1200,20 1320,160 1440,90 L1440,420 L0,420 Z' },
    { color: '#1A3566', opacity: 0.65, duration: 30, path: 'M0,200 C150,110 300,280 450,160 C600,40 750,240 900,140 C1050,40 1200,210 1440,120 L1440,420 L0,420 Z' },
    { color: '#2E6B8E', opacity: 0.45, duration: 24, path: 'M0,230 C180,130 360,300 540,180 C720,60 900,260 1080,160 C1260,60 1380,230 1440,150 L1440,420 L0,420 Z' },
    { color: '#0D1F3C', opacity: 0.8,  duration: 17, path: 'M0,260 C200,150 400,330 600,210 C800,90 1000,290 1200,180 C1360,100 1420,250 1440,190 L1440,420 L0,420 Z' },
    { color: '#07101E', opacity: 1,    duration: 12, path: 'M0,300 C160,190 320,360 480,250 C640,140 800,330 960,220 C1120,110 1300,300 1440,230 L1440,420 L0,420 Z' },
  ] : intensity === 'medium' ? [
    { color: '#1A3566', opacity: 0.5,  duration: 32, path: 'M0,100 C120,50 240,160 360,90 C480,20 600,130 720,70 C840,10 960,120 1080,60 C1200,10 1320,90 1440,50 L1440,260 L0,260 Z' },
    { color: '#2E6B8E', opacity: 0.45, duration: 22, path: 'M0,120 C180,65 360,175 540,100 C720,25 900,150 1080,85 C1260,20 1380,125 1440,75 L1440,260 L0,260 Z' },
    { color: '#0D1F3C', opacity: 0.8,  duration: 16, path: 'M0,145 C200,80 400,190 600,120 C800,50 1000,170 1200,105 C1360,55 1420,145 1440,110 L1440,260 L0,260 Z' },
    { color: '#07101E', opacity: 1,    duration: 11, path: 'M0,170 C160,100 320,200 480,145 C640,90 800,190 960,135 C1120,80 1300,175 1440,140 L1440,260 L0,260 Z' },
  ] : [
    { color: '#1A3566', opacity: 0.55, duration: 28, path: 'M0,50 C120,20 240,80 360,45 C480,10 600,65 720,35 C840,5 960,60 1080,30 C1200,5 1320,50 1440,25 L1440,140 L0,140 Z' },
    { color: '#0D1F3C', opacity: 0.8,  duration: 18, path: 'M0,65 C180,30 360,90 540,55 C720,20 900,80 1080,45 C1260,15 1380,70 1440,45 L1440,140 L0,140 Z' },
    { color: '#07101E', opacity: 1,    duration: 12, path: 'M0,80 C160,45 320,100 480,70 C640,40 800,95 960,65 C1120,35 1300,85 1440,65 L1440,140 L0,140 Z' },
  ]

  const frontLayer = layers[layers.length - 1]
  const secondLayer = layers[layers.length - 2]

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: containerHeight,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Fuji silhouette */}
      <svg viewBox="0 0 1440 420" style={{ position:'absolute',bottom:0,left:0,width:'100%',height:'100%' }} preserveAspectRatio="xMidYMax slice">
        <polygon points="560,420 720,100 880,420" fill="#1A3566" opacity="0.07"/>
        <polygon points="540,420 720,75 900,420"  fill="#1A3566" opacity="0.04"/>
        {/* Snow cap */}
        <polygon points="680,105 720,75 760,105" fill="#EEE8E0" opacity="0.05"/>
      </svg>

      {/* Animated wave layers */}
      {layers.map((layer, i) => {
        const isFront   = i === layers.length - 1
        const isSecond  = i === layers.length - 2
        const pathOnly  = layer.path.split(' L')[0]
        return (
          <div key={i} style={{
            position:'absolute', bottom:0, left:0,
            width:'200%', height:'100%',
            animation:`waveFlow${i} ${layer.duration}s linear infinite`,
            willChange:'transform',
          }}>
            {[0,1].map(copy => (
              <svg key={copy}
                viewBox={`0 0 1440 ${containerHeight}`}
                style={{ width:'50%', height:'100%', display:'inline-block', verticalAlign:'bottom' }}
                preserveAspectRatio="none"
              >
                {/* Wave body */}
                <path d={layer.path} fill={layer.color} opacity={layer.opacity}/>

                {/* Wave hairline — slightly lighter */}
                <path d={pathOnly} fill="none" stroke="#4599B5" strokeWidth="0.6" opacity={isFront ? 0.3 : 0.15}/>

                {/* Crest highlight — white foam on second-from-front */}
                {isSecond && (
                  <path d={pathOnly} fill="none" stroke="#BDB5A5" strokeWidth="1.2" opacity="0.18"/>
                )}

                {/* Gold hairline on front crest only */}
                {isFront && (
                  <path d={pathOnly} fill="none" stroke="#C4A25A" strokeWidth="0.9" opacity="0.55"/>
                )}

                {/* Foam dots on front wave */}
                {isFront && copy === 0 && [
                  [160,250],[320,310],[500,260],[680,330],[860,275],[1040,340],[1220,280],[1380,320]
                ].map(([cx,cy],fi) => (
                  <g key={fi}>
                    <circle cx={cx}   cy={cy}   r="2.5" fill="#BDB5A5" opacity="0.3"/>
                    <circle cx={cx+8} cy={cy-4} r="1.5" fill="#BDB5A5" opacity="0.2"/>
                    <circle cx={cx-6} cy={cy+3} r="1"   fill="#BDB5A5" opacity="0.15"/>
                  </g>
                ))}

                {/* Hatch lines on front wave body */}
                {isFront && copy === 0 && (
                  <g opacity="0.08" clipPath={`url(#waveClip${copy})`}>
                    <clipPath id={`waveClip${copy}`}>
                      <path d={layer.path}/>
                    </clipPath>
                    {Array.from({length:90},(_,j)=>(
                      <line key={j} x1={j*16} y1={0} x2={j*16} y2={containerHeight}
                        stroke="#7EC8E3" strokeWidth="0.5"/>
                    ))}
                  </g>
                )}
              </svg>
            ))}
          </div>
        )
      })}

      <style>{`
        ${layers.map((_,i) => `
          @keyframes waveFlow${i} {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `).join('')}
      `}</style>
    </div>
  )
}
