'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'gold' | 'ghost' | 'outline'
  style?: React.CSSProperties
  className?: string
}

export default function MagneticButton({
  children, href, onClick, variant = 'ghost', style, className
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.28
    const dy = (e.clientY - cy) * 0.28
    setPos({ x: dx, y: dy })
  }

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 })
    setHovered(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    // Ripple
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ripple = document.createElement('span')
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      border:1.5px solid rgba(196,162,90,0.8);
      left:${x}px; top:${y}px;
      width:8px; height:8px;
      margin-left:-4px; margin-top:-4px;
      animation: btnRipple 0.65s ease-out forwards;
      z-index:10;
    `
    ref.current.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
    onClick?.()
  }

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '13px 32px',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    borderRadius: '2px',
    cursor: 'none',
    transform: `translate(${pos.x}px, ${pos.y}px) ${hovered ? 'scale(1.03)' : 'scale(1)'}`,
    transition: 'transform 0.35s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.3s ease, background 0.25s ease, color 0.25s ease',
    ...(variant === 'gold' ? {
      background: '#C4A25A',
      color: '#050E1D',
      border: 'none',
      boxShadow: hovered ? '0 12px 40px rgba(196,162,90,0.45)' : '0 4px 16px rgba(196,162,90,0.2)',
    } : variant === 'ghost' ? {
      background: hovered ? 'rgba(196,162,90,0.08)' : 'transparent',
      color: '#C4A25A',
      border: '1px solid rgba(196,162,90,0.5)',
      boxShadow: hovered ? '0 8px 32px rgba(196,162,90,0.2), inset 0 0 20px rgba(196,162,90,0.04)' : 'none',
    } : {
      background: hovered ? '#C4A25A' : 'transparent',
      color: hovered ? '#050E1D' : '#C4A25A',
      border: '1px solid rgba(196,162,90,0.6)',
    }),
    ...style
  }

  // Shimmer overlay
  const shimmer = (
    <span style={{
      position:'absolute', inset:0,
      background:'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)',
      backgroundSize:'200% 100%',
      backgroundPosition: hovered ? '-100% 0' : '200% 0',
      transition:'background-position 0.55s ease',
      pointerEvents:'none',
    }}/>
  )

  const content = (
    <div
      ref={ref}
      style={baseStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={className}
    >
      {shimmer}
      <span style={{ position:'relative', zIndex:1 }}>{children}</span>
    </div>
  )

  if (href) return <Link href={href} style={{ textDecoration:'none' }}>{content}</Link>
  return content
}
