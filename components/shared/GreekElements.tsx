import React from 'react'

/** Greek meander (key) border, horizontal strip */
export function GreekMeander({ width = 200, color = '#C4A25A', opacity = 0.25, className = '', style = {} }: {
  width?: number; color?: string; opacity?: number; className?: string; style?: React.CSSProperties
}) {
  // One meander unit is 16px wide, 16px tall
  const units = Math.ceil(width / 16)
  return (
    <svg width={width} height={16} viewBox={`0 0 ${width} 16`} className={className}
      style={{ display:'block', opacity, overflow:'visible', ...style }}>
      {Array.from({length: units}, (_,i) => (
        <g key={i} transform={`translate(${i*16},0)`}>
          {/* Meander key pattern */}
          <path d="M0,14 L0,6 L6,6 L6,2 L14,2 L14,6 L10,6 L10,10 L14,10 L14,14"
            stroke={color} strokeWidth="1" fill="none"/>
        </g>
      ))}
    </svg>
  )
}

/** Large watermark Greek letter ρ (rho) */
export function RhoWatermark({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{
      position:'absolute', pointerEvents:'none', userSelect:'none',
      fontFamily:'Georgia,serif', fontSize:'320px', fontWeight:400,
      color:'#1E4080', opacity:0.06, lineHeight:1,
      letterSpacing:'-0.05em', zIndex:0, ...style
    }}>
      ρ
    </div>
  )
}

/** Greek column pair, decorative vertical elements */
export function GreekColumns({ height = 200, color = '#1E4080', opacity = 0.12, className = '' }: {
  height?: number; color?: string; opacity?: number; className?: string
}) {
  return (
    <svg width="80" height={height} viewBox={`0 0 80 ${height}`} className={className}
      style={{ opacity, display:'block' }}>
      {/* Left column */}
      <rect x="4"  y="20" width="16" height={height-40} fill={color}/>
      <rect x="2"  y="14" width="20" height="8"  fill={color}/>
      <rect x="0"  y="8"  width="24" height="8"  fill={color}/>
      <rect x="2"  y={height-22} width="20" height="8"  fill={color}/>
      <rect x="0"  y={height-14} width="24" height="14" fill={color}/>
      {/* Fluting lines */}
      {[8,12].map(x=>(
        <line key={x} x1={x} y1="22" x2={x} y2={height-24} stroke="#3FAEDE" strokeWidth="0.5" opacity="0.4"/>
      ))}
      {/* Right column */}
      <rect x="60" y="20" width="16" height={height-40} fill={color}/>
      <rect x="58" y="14" width="20" height="8"  fill={color}/>
      <rect x="56" y="8"  width="24" height="8"  fill={color}/>
      <rect x="58" y={height-22} width="20" height="8"  fill={color}/>
      <rect x="56" y={height-14} width="24" height="14" fill={color}/>
      {[68,72].map(x=>(
        <line key={x} x1={x} y1="22" x2={x} y2={height-24} stroke="#3FAEDE" strokeWidth="0.5" opacity="0.4"/>
      ))}
    </svg>
  )
}

/** Thin wave hairline divider, Greek-inspired undulating line */
export function WaveHairline({ color = '#C4A25A', opacity = 0.2, className = '' }: {
  color?: string; opacity?: number; className?: string
}) {
  return (
    <svg width="100%" height="20" viewBox="0 0 1200 20" preserveAspectRatio="none"
      className={className} style={{ display:'block', opacity }}>
      <path d="M0,10 C100,3 200,17 300,10 C400,3 500,17 600,10 C700,3 800,17 900,10 C1000,3 1100,17 1200,10"
        stroke={color} strokeWidth="0.7" fill="none"/>
      <path d="M0,13 C100,6 200,20 300,13 C400,6 500,20 600,13 C700,6 800,20 900,13 C1000,6 1100,20 1200,13"
        stroke={color} strokeWidth="0.4" fill="none" opacity="0.5"/>
    </svg>
  )
}

/** Gold diamond divider */
export function GoldDiamond({ className = '' }: { className?: string }) {
  return (
    <div className={className} style={{ display:'flex', alignItems:'center', gap:'12px', justifyContent:'center' }}>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(to right, transparent, rgba(196,162,90,0.4))' }}/>
      <span style={{ color:'#C4A25A', fontSize:'10px', opacity:0.8 }}>◆</span>
      <div style={{ flex:1, height:'1px', background:'linear-gradient(to left, transparent, rgba(196,162,90,0.4))' }}/>
    </div>
  )
}
