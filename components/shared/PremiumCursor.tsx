'use client'
import { useEffect, useRef } from 'react'

export default function PremiumCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let raf: number

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px,${mouseY}px)`
      }
      // Ring lags behind (lerp)
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px,${ringY}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    const onEnterLink = () => {
      dotRef.current?.classList.add('cur-expand')
      ringRef.current?.classList.add('ring-expand')
    }
    const onLeaveLink = () => {
      dotRef.current?.classList.remove('cur-expand')
      ringRef.current?.classList.remove('ring-expand')
    }

    document.addEventListener('mousemove', moveCursor)
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position:'fixed', top:0, left:0,
        width:'7px', height:'7px',
        background:'#C4A25A',
        borderRadius:'50%',
        pointerEvents:'none', zIndex:99999,
        transform:'translate(-50%,-50%)',
        willChange:'transform',
        marginLeft:'-3.5px', marginTop:'-3.5px',
        boxShadow:'0 0 10px rgba(196,162,90,0.6)',
        transition:'width 0.2s, height 0.2s, background 0.2s',
      }}/>
      {/* Ring */}
      <div ref={ringRef} style={{
        position:'fixed', top:0, left:0,
        width:'32px', height:'32px',
        border:'1px solid rgba(196,162,90,0.5)',
        borderRadius:'50%',
        pointerEvents:'none', zIndex:99998,
        willChange:'transform',
        marginLeft:'-16px', marginTop:'-16px',
        transition:'width 0.3s, height 0.3s, border-color 0.3s',
      }}/>
      <style>{`
        body { cursor: none !important; }
        a, button, [data-cursor] { cursor: none !important; }
        .cur-expand  { width:12px !important; height:12px !important; margin-left:-6px !important; margin-top:-6px !important; background:#D4B478 !important; }
        .ring-expand { width:48px !important; height:48px !important; margin-left:-24px !important; margin-top:-24px !important; border-color:rgba(196,162,90,0.8) !important; }
      `}</style>
    </>
  )
}
