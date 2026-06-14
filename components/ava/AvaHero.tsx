'use client';

import { useEffect, useRef, useState } from 'react';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

/* ────────────────────────────────────────────────
 * Demo script — a full service-booking lifecycle.
 * Each event either shows a chat message, toggles the
 * typing indicator, or advances the live action log.
 * ──────────────────────────────────────────────── */
interface Msg { from: 'user' | 'ava' | 'system'; text: string; time: string; }

type Event =
  | { t: number; type: 'msg'; msg: Msg }
  | { t: number; type: 'typing'; on: boolean }
  | { t: number; type: 'step'; step: number };

const TIMELINE: Event[] = [
  { t: 500,  type: 'msg', msg: { from: 'user', text: 'Hi! Any slots this evening for a haircut?', time: '6:02 PM' } },
  { t: 600,  type: 'step', step: 0 },
  { t: 1300, type: 'typing', on: true },
  { t: 2300, type: 'typing', on: false },
  { t: 2300, type: 'msg', msg: { from: 'ava', text: 'Hi 👋 Yes — for how many, and any preferred time?', time: '6:02 PM' } },
  { t: 2400, type: 'step', step: 1 },
  { t: 3100, type: 'msg', msg: { from: 'user', text: 'Just me, around 6:30', time: '6:03 PM' } },
  { t: 3900, type: 'typing', on: true },
  { t: 4100, type: 'step', step: 2 },
  { t: 5000, type: 'typing', on: false },
  { t: 5000, type: 'msg', msg: { from: 'ava', text: '6:30 works. Senior stylist — ₹600, about 45 min. Shall I lock it in?', time: '6:03 PM' } },
  { t: 5100, type: 'step', step: 3 },
  { t: 5900, type: 'msg', msg: { from: 'user', text: 'Yes please', time: '6:04 PM' } },
  { t: 6500, type: 'typing', on: true },
  { t: 7400, type: 'typing', on: false },
  { t: 7400, type: 'msg', msg: { from: 'ava', text: "Done ✅ Here's your payment link to confirm — held for 15 min.", time: '6:04 PM' } },
  { t: 7500, type: 'step', step: 4 },
  { t: 8500, type: 'msg', msg: { from: 'system', text: '💳 Payment received · ₹600', time: '6:05 PM' } },
  { t: 8600, type: 'step', step: 5 },
  { t: 9300, type: 'typing', on: true },
  { t: 9900, type: 'typing', on: false },
  { t: 9900, type: 'msg', msg: { from: 'ava', text: "You're booked for 6:30 PM today. See you soon! 🌊", time: '6:05 PM' } },
  { t: 10000, type: 'step', step: 6 },
];
const LOOP_AT = 13000;

const STEPS: { icon: IconName; label: string; sub: string }[] = [
  { icon: 'person-add',     label: 'Lead captured',     sub: 'WhatsApp inbound' },
  { icon: 'brain',          label: 'Intent understood', sub: 'NLP + context' },
  { icon: 'calendar-check', label: 'Availability check', sub: 'Google Calendar' },
  { icon: 'insights',       label: 'Quote sent',        sub: 'Pricing from config' },
  { icon: 'link',           label: 'Payment link',      sub: 'Razorpay' },
  { icon: 'card',           label: 'Payment received',  sub: 'Webhook verified' },
  { icon: 'check-circle',   label: 'Booked & synced',   sub: 'CRM + calendar' },
];

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#202C33', borderRadius: '0 14px 14px 14px', padding: '12px 16px', alignSelf: 'flex-start', maxWidth: '72px' }}>
      {[0, 1, 2].map(i => <span key={i} style={{ display: 'block', width: '6px', height: '6px', borderRadius: '50%', background: '#8696A0', animation: 'typingBounce 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />)}
    </div>
  );
}

function ChatBubble({ msg }: { msg: Msg }) {
  if (msg.from === 'system') {
    return (
      <div style={{ alignSelf: 'center', fontSize: '11px', fontFamily: 'var(--sans)', color: '#25D366', background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)', padding: '5px 12px', borderRadius: '8px', margin: '2px 0' }}>
        {msg.text}
      </div>
    );
  }
  const u = msg.from === 'user';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignSelf: u ? 'flex-end' : 'flex-start', maxWidth: u ? '82%' : '88%', gap: '3px', animation: 'bubbleIn 0.34s cubic-bezier(0.34,1.56,0.64,1) both' }}>
      <div style={{ background: u ? '#005C4B' : '#202C33', color: '#E9EDEF', borderRadius: u ? '14px 14px 0 14px' : '0 14px 14px 14px', padding: '9px 13px', fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: 1.55 }}>{msg.text}</div>
      <span style={{ fontSize: '10px', color: '#8696A0', alignSelf: u ? 'flex-end' : 'flex-start', fontFamily: 'var(--sans)' }}>{msg.time}{u ? '' : ' · AVA'}</span>
    </div>
  );
}

/* Shared demo state lives in the parent so the phone and the action log stay in sync. */
function useDemoClock() {
  const [visible, setVisible] = useState<number[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timers: ReturnType<typeof setTimeout>[] = [];
    let loop: ReturnType<typeof setTimeout> | undefined;
    let running = false;

    const run = () => {
      setVisible([]); setTyping(false); setStep(-1);
      timers.forEach(clearTimeout); timers = [];
      let mi = 0;
      TIMELINE.forEach(ev => {
        if (ev.type === 'msg') { const idx = mi++; timers.push(setTimeout(() => setVisible(p => [...p, idx]), ev.t)); }
        else if (ev.type === 'typing') timers.push(setTimeout(() => setTyping(ev.on), ev.t));
        else if (ev.type === 'step') timers.push(setTimeout(() => setStep(ev.step), ev.t));
      });
      loop = setTimeout(run, LOOP_AT);
    };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) { running = true; run(); }
      else if (!e.isIntersecting) { running = false; timers.forEach(clearTimeout); if (loop) clearTimeout(loop); }
    }, { threshold: 0.25 });
    io.observe(el);

    return () => { io.disconnect(); timers.forEach(clearTimeout); if (loop) clearTimeout(loop); };
  }, []);

  const msgs = TIMELINE.filter(e => e.type === 'msg').map(e => (e as Extract<Event, { type: 'msg' }>).msg);
  return { ref, visible, typing, step, msgs };
}

function PhoneMockup({ visible, typing, msgs }: { visible: number[]; typing: boolean; msgs: Msg[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = scrollRef.current; if (el) el.scrollTop = el.scrollHeight; }, [visible, typing]);

  return (
    <div style={{ width: '340px', height: '700px', background: '#0B141A', borderRadius: '44px', border: '2.5px solid #1F2C34', overflow: 'hidden', boxShadow: '0 60px 140px rgba(0,0,0,.9),0 0 0 1px rgba(196,162,90,.15),0 0 100px rgba(196,162,90,.08)', display: 'flex', flexDirection: 'column', position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)', width: '100px', height: '28px', background: '#0D1118', borderRadius: '20px', zIndex: 10 }} />
      <div style={{ background: '#1F2C34', padding: '12px 16px', paddingTop: '52px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span style={{ color: '#00A884', fontSize: '16px' }}>‹</span>
        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg,#C4A25A,#2E6B8E)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(196,162,90,.35)' }}>
          <span style={{ fontSize: '16px', color: 'white', fontFamily: 'var(--serif)' }}>A</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '15px', color: '#E9EDEF', fontWeight: 600 }}>AVA</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: '#00A884' }}>● online</div>
        </div>
      </div>
      <div ref={scrollRef} style={{ flex: 1, background: '#0B141A', display: 'flex', flexDirection: 'column', padding: '14px', gap: '8px', overflowY: 'hidden', justifyContent: 'flex-end' }}>
        <div style={{ alignSelf: 'center', fontSize: '11px', fontFamily: 'var(--sans)', color: '#8696A0', background: 'rgba(11,20,26,.8)', padding: '3px 10px', borderRadius: '8px', marginBottom: '4px' }}>Today</div>
        {visible.map(i => <ChatBubble key={i} msg={msgs[i]} />)}
        {typing && <TypingIndicator />}
      </div>
      <div style={{ background: '#1F2C34', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1, height: '38px', background: '#2A3942', borderRadius: '20px', display: 'flex', alignItems: 'center', paddingLeft: '14px' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: '#8696A0' }}>Message</span>
        </div>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,#C4A25A,#2E6B8E)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '15px' }}>🎤</span>
        </div>
      </div>
    </div>
  );
}

function ActionLog({ step }: { step: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      <div style={{ fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--crest)', marginBottom: '18px', fontWeight: 500 }}>
        What Ava is doing
      </div>
      {STEPS.map((s, i) => {
        const active = i <= step;
        const current = i === step;
        return (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '11px 0', opacity: active ? 1 : 0.28, transition: 'opacity 0.5s ease' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: active ? 'rgba(196,162,90,0.12)' : 'rgba(46,107,142,0.08)',
              border: `1px solid ${active ? 'rgba(196,162,90,0.5)' : 'rgba(46,107,142,0.25)'}`,
              boxShadow: current ? '0 0 22px rgba(196,162,90,0.35)' : 'none',
              transition: 'all 0.5s ease',
            }}>
              <Icon name={s.icon} size={20} color={active ? 'var(--gold)' : 'var(--ocean)'} style={{ transition: 'color 0.5s ease' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: active ? 'var(--warm-foam)' : 'var(--fg-dim)', fontWeight: 500, letterSpacing: '0.01em', transition: 'color 0.5s ease' }}>{s.label}</div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '10.5px', color: 'var(--ocean)', letterSpacing: '0.04em' }}>{s.sub}</div>
            </div>
            <span style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease', display: 'inline-flex' }}><Icon name="check" size={16} color="var(--gold)" /></span>
          </div>
        );
      })}
    </div>
  );
}

export default function AvaHero() {
  const { ref, visible, typing, step, msgs } = useDemoClock();

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <style>{`
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes bubbleIn { from{opacity:0;transform:scale(.92) translateY(6px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes avaGlow { 0%,100%{text-shadow:0 0 80px rgba(196,162,90,.3),0 0 30px rgba(196,162,90,.15)} 50%{text-shadow:0 0 120px rgba(196,162,90,.5),0 0 60px rgba(196,162,90,.22)} }
        @keyframes avaRise { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .ava-inner { position:relative; z-index:2; display:flex; align-items:center; width:100%; max-width:1240px; margin:0 auto; padding:120px var(--rail-pad) 80px; gap:48px; }
        .ava-left     { flex:0 0 250px; animation:avaRise 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .ava-center   { flex:1; display:flex; align-items:center; justify-content:center; animation:avaRise 1s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .ava-actions  { flex:0 0 290px; animation:avaRise 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }

        @media(max-width:1100px) { .ava-actions { display:none !important; } .ava-left { flex:0 0 280px; } }
        @media(max-width:860px) {
          .ava-inner { flex-direction:column !important; padding:120px 24px 64px !important; gap:40px !important; text-align:center; }
          .ava-left  { flex:0 0 auto !important; }
          .ava-pills { justify-content:center !important; }
          .ava-center { transform:scale(.86); transform-origin:top center; margin-bottom:-70px; }
        }
        @media(max-width:480px) { .ava-center { transform:scale(.72) !important; margin-bottom:-130px !important; } }
      `}</style>

      <WaveField variant="full" shape="wave" colorBack="#0D1F3C" colorFront="#4599B5" opacity={0.6} speed={0.3} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 70% at 40% 50%, rgba(7,16,30,0.5) 0%, transparent 75%)' }} />

      <div className="ava-inner">
        <div className="ava-left">
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.44em', margin: '0 0 16px 0', opacity: 0.85 }}>Introducing</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(82px,8vw,116px)', color: 'var(--gold)', letterSpacing: '.08em', lineHeight: 0.95, margin: '0 0 4px 0', animation: 'avaGlow 4s ease-in-out infinite' }}>AVA</h1>
          <div style={{ width: '44px', height: '1px', background: 'linear-gradient(to right,var(--gold),transparent)', margin: '22px 0' }} />
          <p style={{ fontFamily: 'var(--sans)', fontSize: '17px', color: 'var(--warm-foam)', letterSpacing: '.04em', margin: '0 0 6px 0', fontWeight: 300, lineHeight: 1.5 }}>Your AI operations agent.</p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--ocean)', fontStyle: 'italic', letterSpacing: '.06em', margin: '0 0 30px 0' }}>A Rheo AI product.</p>
          <div className="ava-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {['WhatsApp', 'Booking', 'Payments', 'CRM'].map(f => (
              <span key={f} style={{ fontFamily: 'var(--sans)', fontSize: '9px', color: 'var(--crest)', letterSpacing: '.16em', textTransform: 'uppercase', border: '1px solid rgba(69,153,181,.22)', borderRadius: '20px', padding: '5px 12px', background: 'rgba(69,153,181,.05)' }}>{f}</span>
            ))}
          </div>
        </div>

        <div className="ava-center">
          <PhoneMockup visible={visible} typing={typing} msgs={msgs} />
        </div>

        <div className="ava-actions">
          <ActionLog step={step} />
        </div>
      </div>
    </section>
  );
}
