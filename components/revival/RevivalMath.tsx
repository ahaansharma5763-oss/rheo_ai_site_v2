'use client';

import { useState } from 'react';
import Reveal from '@/components/home/Reveal';

/* The page's light beat: an interactive calculator.
 * The visitor runs their own list against conservative,
 * typical, and strong booking rates and watches the
 * number silence is costing them. */

const NAVY = '#0B2147';
const NAVY_SOFT = 'rgba(11,33,71,0.68)';
const LINE = 'rgba(11,33,71,0.24)';
const GOLD_LIGHT = '#7A6128';
const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';
const AUDIT_URL = 'https://audit.rheoai.co.in';

const RATES = [
  { label: 'Conservative', pct: 3 },
  { label: 'Typical', pct: 6 },
  { label: 'Strong', pct: 10 },
];

function fmt(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} crore`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)} lakh`;
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function RevivalMath() {
  const [list, setList] = useState(800);
  const [ticket, setTicket] = useState(2500);
  const [rateIdx, setRateIdx] = useState(0);

  const bookings = Math.round(list * (RATES[rateIdx].pct / 100));
  const recovered = bookings * ticket;

  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', background: '#F4EDDF' }}>
      <style>{`
        .rev-range { -webkit-appearance:none; appearance:none; width:100%; height:1px; background:rgba(11,33,71,0.3); outline:none; }
        .rev-range::-webkit-slider-thumb { -webkit-appearance:none; appearance:none; width:18px; height:18px; background:#0B2147; border:1px solid #B8933F; cursor:pointer; }
        .rev-range::-moz-range-thumb { width:18px; height:18px; background:#0B2147; border:1px solid #B8933F; cursor:pointer; border-radius:0; }
        .rev-rate-btn { font-family:var(--sans); font-size:11px; letter-spacing:0.14em; text-transform:uppercase; font-weight:500; padding:10px 18px; cursor:pointer; background:transparent; transition: all 0.25s cubic-bezier(0.2,0.6,0.2,1); }
        .rev-light-btn { display:inline-block; padding:16px 38px; border:1px solid #B8933F; background:transparent; color:#0B2147; font-family:var(--sans); font-size:12.5px; letter-spacing:0.18em; text-transform:uppercase; font-weight:500; text-decoration:none; transition: background 0.3s cubic-bezier(0.2,0.6,0.2,1), transform 0.3s cubic-bezier(0.2,0.6,0.2,1); }
        .rev-light-btn:hover { background: rgba(184,147,63,0.12); transform: translateY(-2px); }
      `}</style>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: GOLD_LIGHT }}>
            The math
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: NAVY, fontWeight: 500, maxWidth: '24ch', marginBottom: '28px' }}>
            Run your own numbers right here.
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: NAVY_SOFT, fontWeight: 400, maxWidth: '64ch', marginBottom: 'clamp(44px, 6vh, 60px)' }}>
            Industry data is consistent: dormant lists re-engage at several times the rate of cold audiences,
            winning back a past customer costs a fraction of finding a new one, and the top reason clients never
            return is that no one followed up. So put your own list in:
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', alignItems: 'stretch' }}>
            {/* Controls */}
            <div style={{ border: `1px solid ${LINE}`, background: '#FBF6EB', padding: 'clamp(26px, 3vw, 36px)', display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <label htmlFor="rev-list" style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: NAVY_SOFT, fontWeight: 500 }}>
                    Contacts on your list
                  </label>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '17px', color: NAVY, fontVariantNumeric: 'tabular-nums' }}>{list.toLocaleString('en-IN')}</span>
                </div>
                <input id="rev-list" className="rev-range" type="range" min={100} max={5000} step={50} value={list} onChange={e => setList(Number(e.target.value))} />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <label htmlFor="rev-ticket" style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: NAVY_SOFT, fontWeight: 500 }}>
                    Average sale value
                  </label>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '17px', color: NAVY, fontVariantNumeric: 'tabular-nums' }}>₹{ticket.toLocaleString('en-IN')}</span>
                </div>
                <input id="rev-ticket" className="rev-range" type="range" min={500} max={50000} step={500} value={ticket} onChange={e => setTicket(Number(e.target.value))} />
              </div>

              <div>
                <span style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: NAVY_SOFT, fontWeight: 500, marginBottom: '14px' }}>
                  How many book
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {RATES.map((r, i) => (
                    <button
                      key={r.label}
                      className="rev-rate-btn"
                      onClick={() => setRateIdx(i)}
                      style={{
                        border: `1px solid ${i === rateIdx ? '#B8933F' : LINE}`,
                        color: i === rateIdx ? GOLD_LIGHT : NAVY_SOFT,
                        background: i === rateIdx ? 'rgba(184,147,63,0.1)' : 'transparent',
                      }}
                    >
                      {r.label} · {r.pct}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div style={{ border: `1px solid ${LINE}`, background: NAVY, padding: 'clamp(26px, 3vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '22px' }}>
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,237,223,0.55)', marginBottom: '10px' }}>
                  Sitting in your list right now
                </span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px, 4.6vw, 56px)', color: '#FFDF8F', letterSpacing: '-0.02em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                  {fmt(recovered)}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.7, color: 'rgba(244,237,223,0.62)', fontWeight: 300, margin: 0 }}>
                {bookings.toLocaleString('en-IN')} bookings from {list.toLocaleString('en-IN')} contacts at the{' '}
                {RATES[rateIdx].label.toLowerCase()} rate of {RATES[rateIdx].pct} in 100, at ₹{ticket.toLocaleString('en-IN')} each.
                That is what silence is costing you, and the conservative setting is the honest default.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '26px', flexWrap: 'wrap', marginTop: 'clamp(40px, 6vh, 56px)' }}>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="rev-light-btn">
              Check my real number on a call →
            </a>
            <a href={AUDIT_URL} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--sans)', fontSize: '13px', letterSpacing: '0.06em', color: '#176F9E', textDecoration: 'none', borderBottom: '1px solid rgba(23,111,158,0.4)', paddingBottom: '3px' }}>
              Or run the full 3-minute leak audit
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
