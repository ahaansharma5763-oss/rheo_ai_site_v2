'use client'
import React from 'react'

interface WaveSystemProps {
  intensity?: 'hero' | 'medium' | 'subtle'
  className?: string
  style?: React.CSSProperties
}

export default function WaveSystem({ intensity = 'hero', className = '', style }: WaveSystemProps) {
  const layerCount = intensity === 'hero' ? 5 : intensity === 'medium' ? 4 : 3
  const containerHeight = intensity === 'hero' ? 280 : intensity === 'medium' ? 180 : 100

  // Wave layer configs — back to front
  const layers = [
    { color: '#1A3566', opacity: 0.35, duration: 32, path: 'M0,80 C160,40 320,120 480,70 C640,20 800,100 960,55 C1120,10 1280,80 1440,45 L1440,200 L0,200 Z', height: 200 },
    { color: '#1A3566', opacity: 0.55, duration: 26, path: 'M0,100 C180,55 360,140 540,85 C720,30 900,110 1080,65 C1260,20 1380,90 1440,60 L1440,200 L0,200 Z', height: 200 },
    { color: '#2E6B8E', opacity: 0.4,  duration: 20, path: 'M0,120 C200,70 400,150 600,95 C800,40 1000,130 1200,75 C1360,35 1420,100 1440,80 L1440,200 L0,200 Z', height: 200 },
    { color: '#0D1F3C', opacity: 0.75, duration: 15, path: 'M0,140 C220,90 440,165 660,110 C880,55 1100,145 1320,90 C1400,65 1430,110 1440,95 L1440,200 L0,200 Z', height: 200 },
    { color: '#07101E', opacity: 1,    duration: 11, path: 'M0,155 C240,105 480,175 720,125 C960,75 1200,158 1440,115 L1440,200 L0,200 Z', height: 200 },
  ].slice(0, layerCount)

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
      {/* Fuji silhouette — behind all waves */}
      <svg
        viewBox="0 0 1440 280"
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMax slice"
      >
        <polygon points="580,280 720,80 860,280" fill="#1A3566" opacity="0.06" />
        <polygon points="560,280 720,60 880,280" fill="#1A3566" opacity="0.04" />
      </svg>

      {/* Animated wave layers */}
      {layers.map((layer, i) => {
        const isFront = i === layers.length - 1
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '200%',
              height: '100%',
              animation: `waveScroll${i} ${layer.duration}s linear infinite`,
            }}
          >
            {/* Two SVG copies side by side for seamless loop */}
            {[0, 1].map(copy => (
              <svg
                key={copy}
                viewBox={`0 0 1440 ${layer.height}`}
                style={{ width: '50%', height: '100%', display: 'inline-block', verticalAlign: 'bottom' }}
                preserveAspectRatio="none"
              >
                <path d={layer.path} fill={layer.color} opacity={layer.opacity} />
                {/* Hairline stroke on wave top */}
                <path
                  d={layer.path.split(' L')[0]}
                  fill="none"
                  stroke={layer.color}
                  strokeWidth="0.6"
                  opacity={layer.opacity + 0.15}
                />
                {/* Vertical hatch lines on front wave only */}
                {isFront && copy === 0 && (
                  <g opacity="0.12">
                    {Array.from({ length: 90 }, (_, j) => (
                      <line
                        key={j}
                        x1={j * 16}
                        y1={0}
                        x2={j * 16}
                        y2={layer.height}
                        stroke="#4599B5"
                        strokeWidth="0.5"
                      />
                    ))}
                  </g>
                )}
                {/* Gold hairline on front crest tip only */}
                {isFront && copy === 0 && (
                  <path
                    d={layer.path.split(' L')[0]}
                    fill="none"
                    stroke="#C4A25A"
                    strokeWidth="0.7"
                    opacity="0.5"
                  />
                )}
                {/* Foam dots on front wave */}
                {isFront && copy === 0 && [200, 500, 800, 1100, 1350].map((x, fi) => (
                  <circle key={fi} cx={x} cy={125 + Math.sin(x / 200) * 20} r="1.5" fill="#BDB5A5" opacity="0.35" />
                ))}
              </svg>
            ))}
          </div>
        )
      })}

      {/* CSS keyframe animations injected via style tag */}
      <style>{`
        ${layers.map((layer, i) => `
          @keyframes waveScroll${i} {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `).join('')}
      `}</style>
    </div>
  )
}
