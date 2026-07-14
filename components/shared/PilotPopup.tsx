'use client'

/**
 * Performance Pilot registration popup.
 *
 * Fires 10 seconds after the visitor lands, once per visitor per 7 days
 * (localStorage). Captures name + business + WhatsApp and posts to the
 * same-origin /api/pilot route, which forwards to the CRM.
 *
 * Offer framing only — NO pricing and NO mention of the 3,000 deposit.
 * The deposit is introduced on the confirmation call, never on the site.
 */

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'rheo_pilot_popup_v1'
const SHOW_AFTER_MS = 10000
const SUPPRESS_DAYS = 7

export default function PilotPopup() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const ts = parseInt(raw, 10)
        if (!Number.isNaN(ts) && Date.now() - ts < SUPPRESS_DAYS * 86400000) return
      }
    } catch {}
    const t = setTimeout(() => setOpen(true), SHOW_AFTER_MS)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
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
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: (fd.get('name') as string)?.trim(),
      business: (fd.get('business') as string)?.trim(),
      whatsapp: (fd.get('whatsapp') as string)?.trim(),
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
    background: '#0a0d12',
    border: '1px solid rgba(196,162,90,0.18)',
    color: '#F4EDDF',
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
      aria-label="Claim a Performance Pilot build slot"
      onClick={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(5,5,7,0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          background: '#0b0e13',
          border: '1px solid rgba(196,162,90,0.28)',
          padding: '34px 32px 30px',
          fontFamily: 'var(--sans)',
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
            color: '#8a8f98',
            fontSize: '22px',
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        {done ? (
          <div style={{ paddingTop: '6px' }}>
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '24px',
                color: '#F4EDDF',
                lineHeight: 1.25,
              }}
            >
              You are on the list.
            </div>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.65,
                color: '#a9b0ba',
                marginTop: '12px',
              }}
            >
              We will message you on WhatsApp within a few hours to confirm your
              build slot.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#C4A25A',
                fontWeight: 500,
              }}
            >
              Limited · 2 build slots this month
            </div>

            <h2
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '25px',
                lineHeight: 1.2,
                color: '#F4EDDF',
                margin: '14px 0 0',
                fontWeight: 500,
              }}
            >
              We build it free. You pay only if it works.
            </h2>

            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#a9b0ba',
                margin: '12px 0 0',
              }}
            >
              We install your lead-recovery system on your real enquiries and run
              it for 14 days. If it does not recover more than it costs, you owe
              nothing.
            </p>

            <form
              onSubmit={onSubmit}
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <input name="name" placeholder="Your name" style={input} required />
              <input
                name="business"
                placeholder="Business name"
                style={input}
              />
              <input
                name="whatsapp"
                placeholder="WhatsApp number"
                inputMode="tel"
                style={input}
                required
              />

              {error && (
                <div style={{ color: '#e0785a', fontSize: '13px' }}>{error}</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  marginTop: '4px',
                  background: 'linear-gradient(90deg, #FFDF8F, #C4A25A)',
                  color: '#0b0e13',
                  border: 'none',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 600,
                  fontFamily: 'var(--sans)',
                  cursor: submitting ? 'default' : 'pointer',
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? 'Claiming…' : 'Claim a build slot'}
              </button>
            </form>

            <p
              style={{
                textAlign: 'center',
                fontSize: '12px',
                color: '#7c828c',
                marginTop: '12px',
              }}
            >
              No cost to apply. We take two builds a month.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
