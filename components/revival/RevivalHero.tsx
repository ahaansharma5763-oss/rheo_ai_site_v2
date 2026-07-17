'use client';

import { useEffect, useRef, useState } from 'react';
import WaveField from '@/components/ui/wave-field';

const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';
const AUDIT_URL = 'https://audit.rheoai.co.in';

/* ────────────────────────────────────────────────
 * Live campaign console. A Sprint runs before your
 * eyes: a wave goes out, dormant contacts reply,
 * the system answers in seconds, bookings land,
 * one contact opts out and is suppressed, and the
 * recovered counter climbs. Loops while in view.
 * ──────────────────────────────────────────────── */

type Ev =
  | { t: 'wave'; label: string; detail: string }
  | { t: 'reply'; who: string; msg: string }
  | { t: 'ai'; detail: string }
  | { t: 'booked'; detail: string; value: number }
  | { t: 'optout'; detail: string };

const EVENTS: Ev[] = [
  { t: 'wave', label: 'WAVE 1 · RECALL', detail: '412 sent · 389 delivered' },
  { t: 'reply', who: 'Meera · facial package, lapsed 5 months', msg: 'Is my glow package still valid?' },
  { t: 'ai', detail: 'Answered in 8 seconds · slot offered' },
  { t: 'booked', detail: 'Booked · Saturday 11:30 · tag RS-07', value: 4500 },
  { t: 'reply', who: 'Arjun · ceramic coating, Feb 2026', msg: 'Is the maintenance wash due?' },
  { t: 'ai', detail: 'Answered in 6 seconds · inspection offered' },
  { t: 'booked', detail: 'Booked · Sunday 9:00 · tag RS-07', value: 12000 },
  { t: 'optout', detail: 'One contact opted out · suppressed permanently' },
  { t: 'wave', label: 'WAVE 2 · NON-RESPONDERS', detail: '348 queued · day 7' },
];

const STEP_MS = 1500;
const HOLD_MS = 4200;

function useConsoleClock() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let running = false;

    const run = () => {
      timers.forEach(clearTimeout); timers = [];
      setShown(0);
      EVENTS.forEach((_, i) => {
        timers.push(setTimeout(() => setShown(i + 1), (i + 1) * STEP_MS));
      });
      timers.push(setTimeout(run, EVENTS.length * STEP_MS + HOLD_MS));
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; run(); }
      else if (!e.isIntersecting) { running = false; timers.forEach(clearTimeout); }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return { ref, shown };
}

function useCountTo(target: number, ms = 700) {
  const [val, setVal] = useState(0);
  const fromRef = useRef(0);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return val;
}

function EventRow({ ev, on }: { ev: Ev; on: boolean }) {
  const base: React.CSSProperties = {
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(10px)',
    transition: 'opacity 0.5s cubic-bezier(0.2,0.6,0.2,1), transform 0.5s cubic-bezier(0.2,0.6,0.2,1)',
    fontFamily: 'var(--sans)',
  };
  if (ev.t === 'wave') return (
    <div style={{ ...base, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', padding: '10px 14px', border: '1px solid rgba(63,174,222,0.3)', background: 'rgba(63,174,222,0.06)' }}>
      <span style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'var(--crest)', fontWeight: 500 }}>{ev.label}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--fg-mute)' }}>{ev.detail}</span>
    </div>
  );
  if (ev.t === 'reply') return (
    <div style={{ ...base, padding: '11px 14px', border: '1px solid rgba(46,116,172,0.26)', background: 'rgba(11,23,41,0.72)' }}>
      <div style={{ fontSize: '10.5px', color: 'var(--fg-dim)', letterSpacing: '0.04em', marginBottom: '5px' }}>{ev.who}</div>
      <div style={{ fontSize: '13.5px', color: 'var(--warm-foam)', lineHeight: 1.45 }}>&ldquo;{ev.msg}&rdquo;</div>
    </div>
  );
  if (ev.t === 'ai') return (
    <div style={{ ...base, display: 'flex', alignItems: 'center', gap: '10px', padding: '0 14px' }}>
      <span style={{ width: '5px', height: '5px', background: 'var(--crest)', flexShrink: 0 }} />
      <span style={{ fontSize: '11.5px', color: 'var(--fg-mute)', letterSpacing: '0.04em' }}>{ev.detail}</span>
    </div>
  );
  if (ev.t === 'booked') return (
    <div style={{ ...base, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', padding: '11px 14px', border: '1px solid rgba(196,162,90,0.45)', background: 'rgba(196,162,90,0.08)' }}>
      <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold-end)', fontWeight: 500 }}>{ev.detail}</span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: '14px', color: 'var(--gold-end)', fontVariantNumeric: 'tabular-nums' }}>+₹{ev.value.toLocaleString('en-IN')}</span>
    </div>
  );
  return (
    <div style={{ ...base, display: 'flex', alignItems: 'center', gap: '10px', padding: '0 14px' }}>
      <span style={{ width: '5px', height: '5px', background: 'var(--fg-dim)', flexShrink: 0 }} />
      <span style={{ fontSize: '11.5px', color: 'var(--fg-dim)', letterSpacing: '0.04em' }}>{ev.detail}</span>
    </div>
  );
}

export default function RevivalHero() {
  const { ref, shown } = useConsoleClock();
  const recovered = EVENTS.slice(0, shown).reduce((s, e) => s + (e.t === 'booked' ? e.value : 0), 0);
  const count = useCountTo(recovered);

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <style>{`
        @keyframes revRise { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes revPing { 0%{box-shadow:0 0 0 0 rgba(196,162,90,0.4)} 100%{box-shadow:0 0 0 11px rgba(196,162,90,0)} }
        @keyframes revGlow { 0%,100%{text-shadow:0 0 60px rgba(196,162,90,.22)} 50%{text-shadow:0 0 100px rgba(196,162,90,.4)} }
        .rev-inner { position:relative; z-index:2; display:flex; align-items:center; width:100%; max-width:1240px; margin:0 auto; padding:128px var(--rail-pad) 80px; gap:56px; }
        .rev-copy  { flex:1 1 0; min-width:0; animation:revRise 0.9s cubic-bezier(0.2,0.6,0.2,1) both; }
        .rev-demo  { flex:0 0 430px; animation:revRise 1s cubic-bezier(0.2,0.6,0.2,1) 0.15s both; }
        .rev-btn { display:inline-block; padding:17px 42px; background:linear-gradient(135deg,#FFDF8F 0%,#C4A25A 60%,#C6BCA3 100%); color:var(--bg); font-family:var(--sans); font-size:13px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition: box-shadow 0.4s ease, transform 0.2s ease; }
        .rev-btn:hover { box-shadow:0 0 50px rgba(255,223,143,0.35); transform: translateY(-2px); }
        .rev-audit-link { font-family:var(--sans); font-size:12.5px; letter-spacing:0.06em; color:var(--crest); text-decoration:none; border-bottom:1px solid rgba(63,174,222,0.4); padding-bottom:3px; }
        @media(max-width:960px) {
          .rev-inner { flex-direction:column !important; padding:120px 24px 64px !important; gap:44px !important; }
          .rev-demo  { flex:0 0 auto !important; width:100%; max-width:480px; }
        }
      `}</style>

      {/* Backplate: nami-hero (aerial foam filigree, brass thread right) */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src="/images/sea/nami-hero.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '75% center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,14,29,0.92) 0%, rgba(5,14,29,0.7) 45%, rgba(5,14,29,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,14,29,0.5) 0%, transparent 30%, transparent 70%, #050E1D 100%)' }} />
      </div>
      <WaveField variant="full" shape="wave" colorBack="#050E1D" colorFront="#3FAEDE" opacity={0.16} speed={0.2} />

      <div className="rev-inner">
        <div className="rev-copy">
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.44em', margin: '0 0 22px 0', opacity: 0.85 }}>
            Nami · The 21-Day Win-Back · Rheo AI
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px, 5.4vw, 70px)', color: 'var(--fg)', letterSpacing: '-0.022em', lineHeight: 1.06, margin: '0 0 26px 0', fontWeight: 500 }}>
            We turn your dead leads into{' '}
            <span className="gold-text" style={{ animation: 'revGlow 4s ease-in-out infinite' }}>booked revenue</span>. In 21 days.
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-mute)', fontWeight: 300, lineHeight: 1.7, maxWidth: '54ch', margin: '0 0 34px 0' }}>
            Nami is a done-for-you win-back campaign. We take the list of people who enquired and went quiet,
            and the customers who never came back, and we send one carefully built wave of real conversations
            through it. Twenty-one days later you get a report with one number on it: the revenue that came back.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="rev-btn">
              Find out what your list is worth →
            </a>
            <a href={AUDIT_URL} target="_blank" rel="noreferrer" className="rev-audit-link">
              Or measure the leak first: run the 3-minute audit
            </a>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', letterSpacing: '0.02em', color: 'var(--fg-dim)', lineHeight: 1.65, maxWidth: '52ch', margin: 0 }}>
              Built by Rheo AI, the team behind Kai. If Nami does not recover more than twice what it costs,
              you only cover the small holding deposit. We run two campaigns a month, never more.
            </p>
          </div>
        </div>

        <div className="rev-demo">
          <div style={{ background: 'rgba(5,14,29,0.74)', border: '1px solid rgba(46,116,172,0.32)', padding: '20px', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--gold)', animation: 'revPing 1.8s ease-out infinite' }} />
                <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 500 }}>
                  Nami console · live
                </span>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--fg-dim)' }}>DAY 08 / 21</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '13px 15px', marginBottom: '14px', background: 'rgba(196,162,90,0.07)', border: '1px solid rgba(196,162,90,0.22)' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-cream)' }}>
                Recovered so far
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '24px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--gold-end)', fontVariantNumeric: 'tabular-nums' }}>
                ₹{count.toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '372px' }}>
              {EVENTS.map((ev, i) => <EventRow key={i} ev={ev} on={i < shown} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
