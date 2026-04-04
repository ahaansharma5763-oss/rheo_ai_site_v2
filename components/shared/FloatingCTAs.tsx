'use client'
import { useEffect, useState } from 'react'

const WHATSAPP_NUMBER = '919503995633'
const CALENDLY_URL    = 'https://calendly.com/ahaan-rheoai/30min'

export default function FloatingCTAs() {
  const [visible, setVisible] = useState(false)
  const [hoverWa, setHoverWa]   = useState(false)
  const [hoverCal, setHoverCal] = useState(false)

  useEffect(() => {
    // Load Calendly widget script
    const link = document.createElement('link')
    link.rel  = 'stylesheet'
    link.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(link)

    const script = document.createElement('script')
    script.src   = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)

    // Show after slight delay
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const openCalendly = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } else {
      window.open(CALENDLY_URL, '_blank')
    }
  }

  const btnBase: React.CSSProperties = {
    width: '58px',
    height: '58px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: 'none',
    position: 'relative',
    transition: 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease',
    outline: 'none',
  }

  return (
    <>
      {/* Floating container */}
      <div style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        alignItems: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>

        {/* Calendly button */}
        <div style={{ position: 'relative' }}>
          {/* Tooltip */}
          <div style={{
            position: 'absolute',
            right: '70px',
            top: '50%',
            background: 'var(--navy)',
            border: '1px solid rgba(196,162,90,0.25)',
            color: 'var(--warm-foam)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            padding: '7px 12px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            opacity: hoverCal ? 1 : 0,
            transform: hoverCal ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(6px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            pointerEvents: 'none',
          }}>
            Book a call
            <div style={{
              position:'absolute', right:'-5px', top:'50%', transform:'translateY(-50%)',
              borderLeft:'5px solid var(--navy)', borderTop:'5px solid transparent',
              borderBottom:'5px solid transparent', width:0, height:0,
            }}/>
          </div>

          <button
            onClick={openCalendly}
            onMouseEnter={() => setHoverCal(true)}
            onMouseLeave={() => setHoverCal(false)}
            style={{
              ...btnBase,
              background: hoverCal ? 'var(--gold)' : 'var(--navy)',
              border: '1px solid rgba(196,162,90,0.45)',
              boxShadow: hoverCal
                ? '0 8px 32px rgba(196,162,90,0.35), 0 0 0 4px rgba(196,162,90,0.1)'
                : '0 4px 20px rgba(0,0,0,0.5)',
              transform: hoverCal ? 'scale(1.12)' : 'scale(1)',
            }}
            aria-label="Book a call on Calendly"
          >
            {/* Calendar icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="17" rx="2" stroke={hoverCal ? '#07101E' : '#C4A25A'} strokeWidth="1.5"/>
              <path d="M3 9h18" stroke={hoverCal ? '#07101E' : '#C4A25A'} strokeWidth="1.5"/>
              <path d="M8 2v4M16 2v4" stroke={hoverCal ? '#07101E' : '#C4A25A'} strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="8"  cy="14" r="1" fill={hoverCal ? '#07101E' : '#C4A25A'}/>
              <circle cx="12" cy="14" r="1" fill={hoverCal ? '#07101E' : '#C4A25A'}/>
              <circle cx="16" cy="14" r="1" fill={hoverCal ? '#07101E' : '#C4A25A'}/>
            </svg>

            {/* Pulse ring */}
            {!hoverCal && (
              <span style={{
                position:'absolute', inset:'-4px', borderRadius:'50%',
                border:'1px solid rgba(196,162,90,0.3)',
                animation:'calPulse 2.5s ease-out infinite',
                pointerEvents:'none',
              }}/>
            )}
          </button>
        </div>

        {/* WhatsApp button */}
        <div style={{ position: 'relative' }}>
          {/* Tooltip */}
          <div style={{
            position: 'absolute',
            right: '70px',
            top: '50%',
            transform: hoverWa ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(6px)',
            background: 'var(--navy)',
            border: '1px solid rgba(196,162,90,0.25)',
            color: 'var(--warm-foam)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            padding: '7px 12px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            opacity: hoverWa ? 1 : 0,
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            pointerEvents: 'none',
          }}>
            Chat on WhatsApp
            <div style={{
              position:'absolute', right:'-5px', top:'50%', transform:'translateY(-50%)',
              borderLeft:'5px solid var(--navy)', borderTop:'5px solid transparent',
              borderBottom:'5px solid transparent', width:0, height:0,
            }}/>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Rheo%20AI%2C%20I%27d%20like%20to%20know%20more%20about%20AVA.`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoverWa(true)}
            onMouseLeave={() => setHoverWa(false)}
            style={{
              ...btnBase,
              background: hoverWa ? '#25D366' : '#128C7E',
              boxShadow: hoverWa
                ? '0 8px 32px rgba(37,211,102,0.45), 0 0 0 4px rgba(37,211,102,0.12)'
                : '0 4px 20px rgba(0,0,0,0.5)',
              transform: hoverWa ? 'scale(1.12)' : 'scale(1)',
              textDecoration: 'none',
            }}
            aria-label="Contact on WhatsApp"
          >
            {/* WhatsApp icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.918-1.418A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" strokeWidth="0" fill="white"/>
            </svg>

            {/* Pulse ring */}
            {!hoverWa && (
              <span style={{
                position:'absolute', inset:'-4px', borderRadius:'50%',
                border:'1px solid rgba(37,211,102,0.35)',
                animation:'waPulse 2.2s ease-out infinite',
                pointerEvents:'none',
              }}/>
            )}
          </a>
        </div>
      </div>

      <style>{`
        @keyframes waPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes calPulse {
          0%   { transform: scale(1);   opacity: 0.5; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </>
  )
}
