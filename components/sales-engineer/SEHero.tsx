'use client';

import { useEffect, useRef, useState } from 'react';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

/* ────────────────────────────────────────────────
 * Live "spec to quote" demo. A technical enquiry
 * arrives, the AI Sales Engineer qualifies it, looks
 * up the exact spec, and sends a cited quote in
 * minutes. An engine tracker lights up alongside so
 * the visitor sees exactly what is happening under
 * the hood.
 * ──────────────────────────────────────────────── */

interface Msg {
  from: 'buyer' | 'agent' | 'system';
  text: string;
  cite?: string;
}

const SCRIPT: { t: number; msg?: Msg; action?: number }[] = [
  { t: 700,   msg: { from: 'buyer', text: 'Need a hydraulic power pack for a 60 ton press. 415V supply. What fits?' }, action: 0 },
  { t: 2400,  msg: { from: 'agent', text: 'Two questions. Continuous or intermittent duty? And what flow rate does the press need?' }, action: 1 },
  { t: 4100,  msg: { from: 'buyer', text: 'Continuous. Around 40 LPM.' } },
  { t: 5600,  msg: { from: 'agent', text: 'The KP-7 series fits. 45 LPM continuous at 210 bar, 415V three phase.', cite: 'Verified · Catalogue v2.3, p.34' }, action: 2 },
  { t: 7600,  msg: { from: 'agent', text: 'Quote: ₹1,84,500 ex-works, 3 week delivery, GST extra. PDF sent. Your regional dealer has been copied.' }, action: 3 },
  { t: 9300,  msg: { from: 'system', text: 'Lead captured · Quote logged · Dealer notified' }, action: 4 },
];

const HOLD_MS = 3600;
const CYCLE = SCRIPT[SCRIPT.length - 1].t + HOLD_MS;

const ACTIONS: { icon: IconName; label: string }[] = [
  { icon: 'eye',      label: 'Reads the requirement' },
  { icon: 'filter',   label: 'Qualifies duty and flow' },
  { icon: 'database', label: 'Spec lookup, exact numbers' },
  { icon: 'doc',      label: 'Cited quote generated' },
  { icon: 'users',    label: 'Dealer and CRM updated' },
];

function useQuoteClock() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(0);      // how many messages are shown
  const [actionIdx, setActionIdx] = useState(-1); // highest lit action

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let loop: ReturnType<typeof setTimeout> | undefined;
    let running = false;

    const run = () => {
      timers.forEach(clearTimeout); timers = [];
      setVisible(0);
      setActionIdx(-1);
      SCRIPT.forEach((step, i) => {
        timers.push(setTimeout(() => {
          setVisible(i + 1);
          if (step.action !== undefined) setActionIdx(step.action);
        }, step.t));
      });
      loop = setTimeout(run, CYCLE);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; run(); }
      else if (!e.isIntersecting) {
        running = false;
        timers.forEach(clearTimeout);
        if (loop) clearTimeout(loop);
      }
    }, { threshold: 0.25 });
    io.observe(el);

    return () => { io.disconnect(); timers.forEach(clearTimeout); if (loop) clearTimeout(loop); };
  }, []);

  return { ref, visible, actionIdx };
}

function Bubble({ msg }: { msg: Msg }) {
  if (msg.from === 'system') {
    return (
      <div style={{
        alignSelf: 'center', display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px', borderRadius: '999px',
        background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.45)',
        boxShadow: '0 0 24px rgba(196,162,90,0.15)',
        animation: 'seMsgIn 0.5s cubic-bezier(0.16,1,0.3,1) both',
      }}>
        <Icon name="check-circle" size={14} color="var(--gold)" />
        <span style={{ fontFamily: 'var(--sans)', fontSize: '10.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-end)', fontWeight: 600 }}>
          {msg.text}
        </span>
      </div>
    );
  }
  const buyer = msg.from === 'buyer';
  return (
    <div style={{
      alignSelf: buyer ? 'flex-end' : 'flex-start',
      maxWidth: '84%',
      display: 'flex', flexDirection: 'column', gap: '5px',
      animation: 'seMsgIn 0.5s cubic-bezier(0.16,1,0.3,1) both',
    }}>
      <div style={{
        padding: '11px 14px',
        borderRadius: buyer ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        background: buyer ? 'rgba(46,107,142,0.32)' : 'rgba(15,30,54,0.92)',
        border: `1px solid ${buyer ? 'rgba(69,153,181,0.4)' : 'rgba(196,162,90,0.28)'}`,
        fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: 1.55,
        color: 'var(--warm-foam)', fontWeight: 300,
      }}>
        {msg.text}
      </div>
      {msg.cite && (
        <span style={{
          alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '5px',
          padding: '3px 10px', borderRadius: '999px',
          background: 'rgba(196,162,90,0.08)', border: '1px solid rgba(196,162,90,0.35)',
          fontFamily: 'var(--mono)', fontSize: '9.5px', color: 'var(--gold-end)', letterSpacing: '0.04em',
        }}>
          <Icon name="doc" size={11} color="var(--gold)" />
          {msg.cite}
        </span>
      )}
      <span style={{ fontFamily: 'var(--sans)', fontSize: '9.5px', color: 'var(--fg-dim)', alignSelf: buyer ? 'flex-end' : 'flex-start', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {buyer ? 'Buyer' : 'Metis'}
      </span>
    </div>
  );
}

export default function SEHero() {
  const { ref, visible, actionIdx } = useQuoteClock();
  const done = visible >= SCRIPT.length;

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <style>{`
        @keyframes seMsgIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes seGlow { 0%,100%{text-shadow:0 0 60px rgba(196,162,90,.22)} 50%{text-shadow:0 0 100px rgba(196,162,90,.4)} }
        @keyframes seRise { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes seDot { 0%{box-shadow:0 0 0 0 rgba(196,162,90,0.45)} 100%{box-shadow:0 0 0 10px rgba(196,162,90,0)} }

        .se-inner { position:relative; z-index:2; display:flex; align-items:center; width:100%; max-width:1240px; margin:0 auto; padding:128px var(--rail-pad) 80px; gap:56px; }
        .se-copy   { flex:1 1 0; min-width:0; animation:seRise 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .se-demo   { flex:0 0 430px; animation:seRise 1s cubic-bezier(0.16,1,0.3,1) 0.15s both; }

        .se-hero-btn { display:inline-block; padding:16px 38px; background:linear-gradient(135deg,#F0D080 0%,#C4A25A 60%,#BDB5A5 100%); color:var(--bg); font-family:var(--sans); font-size:12px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition:box-shadow 0.4s ease, transform 0.2s ease; }
        .se-hero-btn:hover { box-shadow:0 0 50px rgba(240,208,128,0.35); transform:translateY(-2px); }
        .se-hero-ghost { display:inline-block; padding:16px 32px; border:1px solid rgba(196,162,90,0.5); color:var(--gold-end); font-family:var(--sans); font-size:12px; letter-spacing:0.2em; text-transform:uppercase; font-weight:600; text-decoration:none; transition:border-color 0.3s ease, background 0.3s ease, transform 0.2s ease; }
        .se-hero-ghost:hover { border-color:var(--gold-end); background:rgba(196,162,90,0.08); transform:translateY(-2px); }

        @media(max-width:960px) {
          .se-inner { flex-direction:column !important; padding:120px 24px 64px !important; gap:44px !important; }
          .se-demo  { flex:0 0 auto !important; width:100%; max-width:470px; }
          .se-copy  { text-align:center; }
          .se-pills { justify-content:center !important; }
        }
      `}</style>

      <WaveField variant="full" shape="wave" colorBack="#07101E" colorFront="#4599B5" opacity={0.38} speed={0.22} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 75% 70% at 60% 50%, rgba(7,16,30,0.55) 0%, transparent 78%)' }} />

      <div className="se-inner">
        <div className="se-copy">
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.44em', margin: '0 0 22px 0', opacity: 0.85 }}>
            Industrial Revenue Infrastructure · A Rheo AI Product
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px,5.2vw,68px)', color: 'var(--fg)', letterSpacing: '-0.022em', lineHeight: 1.06, margin: '0 0 26px 0', fontWeight: 600 }}>
            Meet <span className="gold-text" style={{ animation: 'seGlow 4s ease-in-out infinite' }}>Metis</span>. The AI Sales Engineer for industrial companies.
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px,1.4vw,18px)', color: 'var(--fg-mute)', fontWeight: 300, lineHeight: 1.7, maxWidth: '54ch', margin: '0 0 26px 0' }}>
            Built for manufacturers and distributors of technical products. Metis qualifies the buyer, recommends
            the right machine from your real catalogue, and sends an exact, cited quote in minutes. In your
            buyer&apos;s language, on the channels they already use, at 2 pm and at 2 am. Your best engineer&apos;s
            knowledge, answering every enquiry at once.
          </p>

          <div className="se-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {['Qualifies', 'Recommends', 'Quotes', 'Escalates', 'Never guesses'].map(s => (
              <span key={s} style={{ fontFamily: 'var(--sans)', fontSize: '9.5px', color: 'var(--crest)', letterSpacing: '.16em', textTransform: 'uppercase', border: '1px solid rgba(69,153,181,.24)', borderRadius: '20px', padding: '6px 14px', background: 'rgba(69,153,181,.05)' }}>{s}</span>
            ))}
          </div>

          <div className="cta-row" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <a href="https://calendly.com/ahaan-rheoai-xnxc/30min" target="_blank" rel="noreferrer" className="se-hero-btn">
              Book a Build Call →
            </a>
            <a href="https://t.me/KestrelSalesEngineer_bot" target="_blank" rel="noreferrer" className="se-hero-ghost">
              Try to break the live demo
            </a>
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--fg-dim)', letterSpacing: '0.02em', margin: 0 }}>
            Live in under 3 weeks · Backed by a 60-day pay-for-itself guarantee · Two deployments a month.
          </p>
        </div>

        <div className="se-demo">
          <div style={{
            background: 'rgba(7,16,30,0.74)',
            border: '1px solid rgba(46,107,142,0.32)',
            borderRadius: '20px',
            padding: '20px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,162,90,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)', animation: 'seDot 1.6s ease-out infinite' }} />
                <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 500 }}>
                  Live · answering an enquiry
                </span>
              </div>
              <span style={{
                fontFamily: 'var(--mono)', fontSize: '10.5px',
                color: done ? 'var(--gold-end)' : 'var(--fg-dim)',
                border: `1px solid ${done ? 'rgba(196,162,90,0.45)' : 'rgba(46,107,142,0.3)'}`,
                borderRadius: '999px', padding: '3px 10px',
                transition: 'all 0.5s ease',
              }}>
                {done ? 'Enquiry → quote · 4 min' : 'Your average · 2 to 3 days'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', minHeight: '318px' }}>
              {SCRIPT.slice(0, visible).map((s, i) => s.msg && <Bubble key={i} msg={s.msg} />)}
            </div>

            <div style={{ borderTop: '1px solid rgba(46,107,142,0.22)', marginTop: '16px', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
              {ACTIONS.map((a, i) => {
                const lit = i <= actionIdx;
                return (
                  <div key={a.label} title={a.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1, minWidth: 0 }}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '9px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: lit ? 'rgba(196,162,90,0.14)' : 'rgba(15,30,54,0.6)',
                      border: `1px solid ${lit ? 'rgba(196,162,90,0.5)' : 'rgba(46,107,142,0.25)'}`,
                      boxShadow: lit ? '0 0 16px rgba(196,162,90,0.2)' : 'none',
                      transition: 'all 0.5s ease',
                    }}>
                      <Icon name={a.icon} size={16} color={lit ? 'var(--gold)' : 'var(--fg-faint)'} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--sans)', fontSize: '8px', letterSpacing: '0.04em',
                      textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3,
                      color: lit ? 'var(--muted-cream)' : 'var(--fg-faint)',
                      transition: 'color 0.5s ease',
                    }}>
                      {a.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
