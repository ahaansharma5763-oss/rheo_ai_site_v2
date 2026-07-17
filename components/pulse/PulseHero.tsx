'use client';

import { useEffect, useRef, useState } from 'react';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

/* ────────────────────────────────────────────────
 * Live "pipeline revival" demo. A column of dormant
 * leads. Okeanos reads each one, reaches out, and the
 * lead comes back to life — booked, recovered, or
 * re-engaged. A revenue counter ticks up alongside.
 * ──────────────────────────────────────────────── */

type Phase = 'dormant' | 'reading' | 'reaching' | 'live';

interface Lead {
  name: string;
  context: string;     // why they went cold
  outcome: string;     // what Okeanos turned it into
  value: number;       // revenue recovered
}

const LEADS: Lead[] = [
  { name: 'Priya M.',   context: 'Asked about pricing · went quiet 3 weeks ago', outcome: 'Booked a call',        value: 18000 },
  { name: 'Rahul S.',   context: '“Let me think about it” · never followed up',   outcome: 'Re-engaged',          value: 9000  },
  { name: 'Aisha K.',   context: 'Past client · last seen 5 months ago',          outcome: 'Rebooked',            value: 24000 },
  { name: 'Dev P.',     context: 'Messaged at 11pm · seen next morning',           outcome: 'Closed',              value: 15000 },
  { name: 'Neha R.',    context: 'Abandoned booking halfway',                      outcome: 'Recovered',           value: 12000 },
];

/* Each lead advances through phases on its own offset so the column
 * feels alive — several leads in flight at once, like a real pipeline. */
const STEP_MS = 1100;
const STAGGER = 900;
const HOLD_MS = 2600;
const CYCLE = LEADS.length * STAGGER + 4 * STEP_MS + HOLD_MS;

const PHASE_META: Record<Phase, { label: string; icon: IconName; color: string }> = {
  dormant:  { label: 'Dormant',       icon: 'clock',       color: 'var(--fg-dim)' },
  reading:  { label: 'Reading',       icon: 'eye',         color: 'var(--crest)' },
  reaching: { label: 'Reaching out',  icon: 'chat',        color: 'var(--ocean)' },
  live:     { label: 'Live again',    icon: 'check-circle', color: 'var(--gold)' },
};

function useRevivalClock() {
  const ref = useRef<HTMLDivElement>(null);
  const [phases, setPhases] = useState<Phase[]>(LEADS.map(() => 'dormant'));
  const [recovered, setRecovered] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let loop: ReturnType<typeof setTimeout> | undefined;
    let running = false;

    const set = (i: number, p: Phase) =>
      setPhases(prev => { const n = [...prev]; n[i] = p; return n; });

    const run = () => {
      timers.forEach(clearTimeout); timers = [];
      setPhases(LEADS.map(() => 'dormant'));
      setRecovered(0);
      LEADS.forEach((lead, i) => {
        const base = i * STAGGER;
        timers.push(setTimeout(() => set(i, 'reading'),  base + STEP_MS));
        timers.push(setTimeout(() => set(i, 'reaching'), base + STEP_MS * 2));
        timers.push(setTimeout(() => {
          set(i, 'live');
          setRecovered(r => r + lead.value);
        }, base + STEP_MS * 3));
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

  return { ref, phases, recovered };
}

/* Smoothly animate the rupee counter toward its target. */
function useCountTo(target: number, ms = 600) {
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

function LeadCard({ lead, phase }: { lead: Lead; phase: Phase }) {
  const meta = PHASE_META[phase];
  const active = phase !== 'dormant';
  const live = phase === 'live';
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: '13px',
        padding: '13px 15px', borderRadius: '12px',
        background: live ? 'rgba(196,162,90,0.09)' : 'rgba(11,23,41,0.7)',
        border: `1px solid ${live ? 'rgba(196,162,90,0.45)' : active ? 'rgba(63,174,222,0.3)' : 'rgba(46,116,172,0.18)'}`,
        boxShadow: live ? '0 0 26px rgba(196,162,90,0.18)' : 'none',
        opacity: active ? 1 : 0.55,
        transition: 'all 0.55s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <div style={{
        width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: live ? 'linear-gradient(135deg,#FFDF8F,#C4A25A)' : 'linear-gradient(135deg,#2E74AC,#1E4080)',
        color: live ? 'var(--bg)' : 'var(--warm-foam)',
        fontFamily: 'var(--serif)', fontSize: '15px',
        boxShadow: phase === 'reading' ? '0 0 0 0 rgba(63,174,222,0.5)' : 'none',
        animation: phase === 'reading' ? 'pulseRing 1.1s ease-out infinite' : 'none',
        transition: 'background 0.55s ease',
      }}>
        {lead.name.charAt(0)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', color: 'var(--warm-foam)', fontWeight: 500 }}>{lead.name}</div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--fg-mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {live ? lead.outcome : lead.context}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <Icon name={meta.icon} size={14} color={meta.color} />
        <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: meta.color, fontWeight: 500, minWidth: '64px', textAlign: 'right' }}>
          {meta.label}
        </span>
      </div>
    </div>
  );
}

export default function PulseHero() {
  const { ref, phases, recovered } = useRevivalClock();
  const count = useCountTo(recovered);
  const liveCount = phases.filter(p => p === 'live').length;

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <style>{`
        @keyframes pulseRing { 0%{box-shadow:0 0 0 0 rgba(63,174,222,0.45)} 100%{box-shadow:0 0 0 12px rgba(63,174,222,0)} }
        @keyframes pulseGlow { 0%,100%{text-shadow:0 0 60px rgba(196,162,90,.22)} 50%{text-shadow:0 0 100px rgba(196,162,90,.4)} }
        @keyframes pulseRise { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }

        .pulse-inner { position:relative; z-index:2; display:flex; align-items:center; width:100%; max-width:1240px; margin:0 auto; padding:128px var(--rail-pad) 80px; gap:56px; }
        .pulse-copy   { flex:1 1 0; min-width:0; animation:pulseRise 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .pulse-demo   { flex:0 0 440px; animation:pulseRise 1s cubic-bezier(0.16,1,0.3,1) 0.15s both; }

        @media(max-width:960px) {
          .pulse-inner { flex-direction:column !important; padding:120px 24px 64px !important; gap:44px !important; }
          .pulse-demo  { flex:0 0 auto !important; width:100%; max-width:480px; }
          .pulse-copy  { text-align:center; }
          .pulse-pills { justify-content:center !important; }
        }
      `}</style>

      <WaveField variant="full" shape="wave" colorBack="#050E1D" colorFront="#3FAEDE" opacity={0.38} speed={0.22} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 75% 70% at 60% 50%, rgba(5,14,29,0.55) 0%, transparent 78%)' }} />

      <div className="pulse-inner">
        <div className="pulse-copy">
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.44em', margin: '0 0 22px 0', opacity: 0.85 }}>
            Okeanos · Customer Journey Orchestration · Rheo AI
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,5.4vw,72px)', color: 'var(--fg)', letterSpacing: '-0.022em', lineHeight: 1.04, margin: '0 0 26px 0', fontWeight: 600 }}>
            Your next 50 customers are{' '}
            <span className="gold-text" style={{ animation: 'pulseGlow 4s ease-in-out infinite' }}>already in your phone</span>.
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px,1.4vw,18px)', color: 'var(--fg-mute)', fontWeight: 300, lineHeight: 1.7, maxWidth: '54ch', margin: '0 0 26px 0' }}>
            Okeanos is your Customer Journey Orchestration layer. It reads every lead, understands exactly what each
            person needs, and reaches out at the moment they are ready to buy. It runs the full journey for you,
            from the first hello to the day they refer their friends. Not broadcasts. Not generic check-in templates.
            Real conversations that bring people back and turn them into paying customers.
          </p>

          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '14.5px', color: 'var(--muted-cream)', lineHeight: 1.65, maxWidth: '52ch', margin: '0 0 26px 0' }}>
            Rheo is Greek for flow. Okeanos is the river that circles the world without beginning or end.
            That is what this system is: a current your customers never drift out of.
          </p>

          <div className="pulse-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {['Revive', 'Nurture', 'Convert', 'Win back', 'Retain'].map(s => (
              <span key={s} style={{ fontFamily: 'var(--sans)', fontSize: '9.5px', color: 'var(--crest)', letterSpacing: '.16em', textTransform: 'uppercase', border: '1px solid rgba(63,174,222,.24)', borderRadius: '20px', padding: '6px 14px', background: 'rgba(63,174,222,.05)' }}>{s}</span>
            ))}
          </div>

          <div className="cta-row" style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <a
              href="https://calendly.com/ahaan-rheoai-xnxc/30min"
              target="_blank"
              rel="noreferrer"
              className="pulse-hero-btn"
            >
              See what&apos;s in your pipeline →
            </a>
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--fg-dim)', letterSpacing: '0.02em', margin: 0 }}>
            Built by Rheo AI · The same team behind Athena · Backed by a 60-day money-back promise.
          </p>

          <style>{`
            .pulse-hero-btn { display:inline-block; padding:16px 38px; background:linear-gradient(135deg,#FFDF8F 0%,#C4A25A 60%,#C6BCA3 100%); color:var(--bg); font-family:var(--sans); font-size:12px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition:box-shadow 0.4s ease, transform 0.2s ease; }
            .pulse-hero-btn:hover { box-shadow:0 0 50px rgba(255,223,143,0.35); transform:translateY(-2px); }
          `}</style>
        </div>

        <div className="pulse-demo">
          <div style={{
            background: 'rgba(5,14,29,0.72)',
            border: '1px solid rgba(46,116,172,0.32)',
            borderRadius: '20px',
            padding: '20px',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 50px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,162,90,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)', animation: 'pulseRing 1.6s ease-out infinite' }} />
                <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 500 }}>
                  Okeanos · reviving your pipeline
                </span>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--fg-dim)' }}>{liveCount}/{LEADS.length}</span>
            </div>

            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              padding: '14px 16px', marginBottom: '16px', borderRadius: '12px',
              background: 'rgba(196,162,90,0.07)', border: '1px solid rgba(196,162,90,0.22)',
            }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-cream)' }}>
                Revenue recovered
              </span>
              <span className="gold-text" style={{ fontFamily: 'var(--mono)', fontSize: '26px', fontWeight: 600, letterSpacing: '-0.01em' }}>
                ₹{count.toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {LEADS.map((lead, i) => <LeadCard key={lead.name} lead={lead} phase={phases[i]} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
