'use client'

/**
 * Leak-number capture popup (copy rewritten 2026-07-29; the retired pilot
 * offer, slots, deposits and guarantees are gone).
 *
 * Triggers: desktop = 13s after landing (11-15s is the measured optimum);
 * mobile = 25-30% scroll depth (timed popups underperform on touch).
 * Once per visitor per 7 days (localStorage).
 *
 * The capture chain is untouched: posts to the same-origin /api/pilot route,
 * which forwards to n8n workflow rheo-pilot-register → "Pilot Registrations"
 * tab. The route already accepts `enquiries` and `ticket`.
 */

import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'rheo_leak_popup_v1'
const SHOW_AFTER_MS = 13000
const SCROLL_DEPTH = 0.27
const SUPPRESS_DAYS = 7

export default function PilotPopup() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const ts = parseInt(raw, 10)
        if (!Number.isNaN(ts) && Date.now() - ts < SUPPRESS_DAYS * 86400000) return
      }
    } catch {}

    // Suppression starts the moment the popup is SHOWN, not only on explicit
    // close: a visitor who bounces should not be re-popped on every visit.
    const show = () => {
      setOpen(true)
      remember()
    }

    const isTouch = window.matchMedia('(pointer: coarse), (max-width: 700px)').matches

    if (isTouch) {
      const onScroll = () => {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        if (max <= 0) return
        if (window.scrollY / max >= SCROLL_DEPTH) {
          show()
          window.removeEventListener('scroll', onScroll)
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const t = setTimeout(show, SHOW_AFTER_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    // Lock the page behind the overlay and move focus into the dialog
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panelRef.current?.querySelector<HTMLElement>('input, button')
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key === 'Tab' && panelRef.current) {
        // Minimal focus trap: wrap between the dialog's focusable elements
        const els = [...panelRef.current.querySelectorAll<HTMLElement>('input, button')].filter(
          el => !el.hasAttribute('disabled')
        )
        if (els.length === 0) return
        const firstEl = els[0]
        const lastEl = els[els.length - 1]
        const active = document.activeElement as HTMLElement | null
        if (e.shiftKey && (active === firstEl || !panelRef.current.contains(active))) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && (active === lastEl || !panelRef.current.contains(active))) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function remember() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()))
    } catch {}
  }

  function close() {
    setOpen(false)
    remember()
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload = {
      name: (fd.get('name') as string)?.trim(),
      business: (fd.get('business') as string)?.trim(),
      whatsapp: (fd.get('whatsapp') as string)?.trim(),
      enquiries: (fd.get('enquiries') as string)?.trim(),
      ticket: (fd.get('ticket') as string)?.trim(),
      source: 'homepage_popup',
    }
    if (!payload.name || !payload.whatsapp) {
      setError('Please add your name and WhatsApp number.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('failed')
      remember()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  const input: React.CSSProperties = {
    width: '100%',
    background: '#0A1830',
    border: '1px solid var(--line)',
    borderRadius: 0,
    color: 'var(--fg)',
    fontFamily: 'var(--sans)',
    fontSize: '15px',
    padding: '13px 14px',
    outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Find out what you are losing"
      onClick={e => {
        if (e.target === e.currentTarget) close()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(5,14,29,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        ref={panelRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          background: 'var(--panel)',
          border: '1px solid rgba(196,162,90,0.3)',
          padding: '34px 32px 26px',
          fontFamily: 'var(--sans)',
          maxHeight: '90svh',
          overflowY: 'auto',
        }}
      >
        <button
          onClick={close}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '14px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-3)',
            fontSize: '22px',
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        {done ? (
          <div style={{ paddingTop: '6px' }}>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: '24px', color: 'var(--fg)', lineHeight: 1.25 }}>
              Done.
            </div>
            <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--text-2)', marginTop: '12px' }}>
              We will work out your number and message you on WhatsApp.
            </p>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: '25px',
                lineHeight: 1.2,
                color: 'var(--fg)',
                margin: 0,
              }}
            >
              Want to know what you are losing?
            </h2>

            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-2)', margin: '12px 0 0' }}>
              Tell us where to send it. We will work out roughly how much of your monthly enquiry volume is
              going cold, using your own numbers.
            </p>

            <form onSubmit={onSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input name="name" placeholder="Your name" style={input} required />
              <input name="business" placeholder="Business name" style={input} />
              <input name="whatsapp" placeholder="WhatsApp number" inputMode="tel" style={input} required />
              <input name="enquiries" placeholder="Enquiries per month, roughly" inputMode="numeric" style={input} />
              <input name="ticket" placeholder="Average sale, in rupees" inputMode="numeric" style={input} />

              {error && <div style={{ color: 'var(--crit)', fontSize: '13px' }}>{error}</div>}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: '4px',
                  background: 'transparent',
                  color: 'var(--fg)',
                  border: '1px solid rgba(196,162,90,0.65)',
                  borderRadius: 0,
                  padding: '14px',
                  fontSize: '13px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontFamily: 'var(--sans)',
                  cursor: submitting ? 'default' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'Sending…' : 'Send me the number'}
              </button>
            </form>

            <button
              onClick={close}
              style={{
                display: 'block',
                margin: '14px auto 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                color: 'var(--text-3)',
                fontFamily: 'var(--sans)',
              }}
            >
              Not right now
            </button>
          </>
        )}
      </div>
    </div>
  )
}
