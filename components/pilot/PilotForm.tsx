'use client';

import { useState } from 'react';
import Icon from '@/components/ui/icon';

/* ────────────────────────────────────────────────
 * Performance Pilot registration form.
 * Captures fit signals (monthly enquiries + average
 * ticket) alongside contact details, posts to the
 * same-origin /api/pilot route → CRM. No pricing and
 * no deposit are shown; both are handled on the call.
 * ──────────────────────────────────────────────── */

const ENQUIRY_OPTIONS = [
  'Under 50 a month',
  '50 to 150 a month',
  '150 to 400 a month',
  '400+ a month',
];

const TICKET_OPTIONS = [
  'Under ₹7,000',
  '₹7,000 to ₹25,000',
  '₹25,000 to ₹1 lakh',
  '₹1 lakh+',
];

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(11,23,41,0.6)',
  border: '1px solid rgba(46,116,172,0.3)',
  color: 'var(--fg)',
  fontFamily: 'var(--sans)',
  fontSize: '14px',
  padding: '13px 14px',
  borderRadius: '10px',
  outline: 'none',
  boxSizing: 'border-box',
  appearance: 'none',
  WebkitAppearance: 'none',
};

export default function PilotForm({ idPrefix = 'pilot' }: { idPrefix?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get('name') as string)?.trim(),
      business: (fd.get('business') as string)?.trim(),
      whatsapp: (fd.get('whatsapp') as string)?.trim(),
      enquiries: (fd.get('enquiries') as string) || '',
      ticket: (fd.get('ticket') as string) || '',
      source: idPrefix === 'pilot-cta' ? 'pilot_page_footer' : 'pilot_page_hero',
    };
    if (!payload.name || !payload.whatsapp) {
      setError('Please add your name and WhatsApp number.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/pilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        background: 'rgba(5,14,29,0.72)',
        border: '1px solid rgba(196,162,90,0.28)',
        borderRadius: '20px',
        padding: 'clamp(24px, 3vw, 32px)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 50px 120px rgba(0,0,0,0.55), 0 0 0 1px rgba(196,162,90,0.06)',
      }}
    >
      <style>{`
        #${idPrefix}-form select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23BDB5A5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 14px center; padding-right:36px; }
        #${idPrefix}-form input::placeholder { color: var(--fg-dim); }
        #${idPrefix}-form input:focus, #${idPrefix}-form select:focus { border-color: rgba(196,162,90,0.55); }
      `}</style>

      {done ? (
        <div style={{ textAlign: 'center', padding: '20px 4px' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.12)', border: '1px solid rgba(196,162,90,0.4)', margin: '0 auto 20px' }}>
            <Icon name="check-circle" size={28} color="var(--gold)" />
          </div>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '23px', color: 'var(--fg)', fontWeight: 600, marginBottom: '10px' }}>You are on the list.</h3>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300 }}>
            We will message you on WhatsApp within a few hours to confirm your build slot.
          </p>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '18px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }} />
            <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 500 }}>
              Limited · 2 build slots this month
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.2vw, 24px)', color: 'var(--fg)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: '18px' }}>
            Claim a build slot
          </h3>

          <form id={`${idPrefix}-form`} onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input name="name" placeholder="Your name" style={fieldStyle} required />
            <input name="business" placeholder="Business name" style={fieldStyle} />
            <input name="whatsapp" placeholder="WhatsApp number" inputMode="tel" style={fieldStyle} required />
            <select name="enquiries" defaultValue="" style={{ ...fieldStyle, color: 'var(--muted-cream)' }}>
              <option value="" disabled>Enquiries per month</option>
              {ENQUIRY_OPTIONS.map(o => <option key={o} value={o} style={{ background: '#050E1D' }}>{o}</option>)}
            </select>
            <select name="ticket" defaultValue="" style={{ ...fieldStyle, color: 'var(--muted-cream)' }}>
              <option value="" disabled>Average customer value</option>
              {TICKET_OPTIONS.map(o => <option key={o} value={o} style={{ background: '#050E1D' }}>{o}</option>)}
            </select>

            {error && <div style={{ color: '#E0785A', fontFamily: 'var(--sans)', fontSize: '13px' }}>{error}</div>}

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: '4px',
                background: 'linear-gradient(135deg,#FFDF8F 0%,#C4A25A 60%,#C6BCA3 100%)',
                color: 'var(--bg)',
                border: 'none',
                borderRadius: '10px',
                padding: '15px',
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: submitting ? 'default' : 'pointer',
                opacity: submitting ? 0.7 : 1,
                transition: 'box-shadow 0.4s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => { if (!submitting) { e.currentTarget.style.boxShadow = '0 0 40px rgba(255,223,143,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {submitting ? 'Claiming…' : 'Claim a build slot →'}
            </button>
          </form>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '11.5px', color: 'var(--fg-dim)', textAlign: 'center', marginTop: '14px', lineHeight: 1.5 }}>
            No cost to apply. We confirm your slot on WhatsApp.
          </p>
        </>
      )}
    </div>
  );
}
