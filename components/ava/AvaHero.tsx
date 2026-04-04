'use client';

import { useEffect, useState } from 'react';

/* ─── Types ─── */
interface Message {
  id: number;
  from: 'user' | 'ava';
  text: string;
  time: string;
}

const MESSAGES: Message[] = [
  { id: 1, from: 'user', text: 'I want to book a 5v5 slot for Saturday evening', time: '9:41 AM' },
  { id: 2, from: 'ava',  text: 'Saturday 6pm is available! That\'s ₹1,400/hr for 5v5. Want me to send a payment link to confirm? 🌊', time: '9:41 AM' },
  { id: 3, from: 'user', text: 'Yes please', time: '9:42 AM' },
  { id: 4, from: 'ava',  text: 'Done! Payment link sent to your WhatsApp. Slot held for 15 mins. See you Saturday! ⚡', time: '9:42 AM' },
];

const MSG_SCHEDULE = [800, 2000, 3200, 4500];
const TYPING_SHOW  = [null, 1200, null, 3600] as (number | null)[];
const TYPING_HIDE  = [null, 2000, null, 4500] as (number | null)[];

/* ─── Chat sub-components ─── */
function TypingIndicator() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '4px',
      background: '#202C33', borderRadius: '0 14px 14px 14px',
      padding: '12px 16px', alignSelf: 'flex-start', maxWidth: '72px',
    }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          display: 'block', width: '6px', height: '6px', borderRadius: '50%',
          background: '#8696A0',
          animation: 'typingBounce 1.2s ease-in-out infinite',
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

function ChatBubble({ msg }: { msg: Message }) {
  const isUser = msg.from === 'user';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      maxWidth: isUser ? '82%' : '88%', gap: '3px',
      animation: 'bubbleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
    }}>
      <div style={{
        background: isUser ? '#005C4B' : '#202C33', color: '#E9EDEF',
        borderRadius: isUser ? '14px 14px 0 14px' : '0 14px 14px 14px',
        padding: '9px 13px', fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px', lineHeight: 1.55,
        boxShadow: isUser ? '0 2px 8px rgba(0,92,75,0.3)' : '0 2px 8px rgba(0,0,0,0.3)',
      }}>{msg.text}</div>
      <span style={{
        fontSize: '10px', color: '#8696A0',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        fontFamily: "'DM Sans', sans-serif",
        paddingRight: isUser ? '3px' : 0,
        paddingLeft: isUser ? 0 : '3px',
      }}>{msg.time}{isUser ? '' : ' · AVA'}</span>
    </div>
  );
}

function PhoneMockup() {
  const [visibleMsgs, setVisibleMsgs] = useState<number[]>([]);
  const [typingActive, setTypingActive] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    MESSAGES.forEach((_, i) => {
      const tShow = TYPING_SHOW[i];
      if (tShow !== null) timers.push(setTimeout(() => setTypingActive(true), tShow));
      const tHide = TYPING_HIDE[i];
      if (tHide !== null) timers.push(setTimeout(() => setTypingActive(false), tHide));
      timers.push(setTimeout(() => setVisibleMsgs((prev) => [...prev, i]), MSG_SCHEDULE[i]));
    });
    timers.push(setTimeout(() => setConfirmed(true), 5400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      width: '420px', height: '800px', background: '#0B141A',
      borderRadius: '48px', border: '2.5px solid #1F2C34', overflow: 'hidden',
      boxShadow: '0 80px 160px rgba(0,0,0,0.9), 0 0 0 1px rgba(196,162,90,0.15), 0 0 120px rgba(196,162,90,0.06)',
      display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'relative',
    }}>
      <div style={{
        position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)',
        width: '110px', height: '32px', background: '#0D1118', borderRadius: '24px', zIndex: 10,
      }} />
      <div style={{
        background: '#1F2C34', padding: '14px 18px', paddingTop: '60px',
        display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0,
      }}>
        <span style={{ color: '#00A884', fontSize: '18px', marginRight: '2px' }}>‹</span>
        <div style={{
          width: '46px', height: '46px', borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #C4A25A, #2E6B8E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 16px rgba(196,162,90,0.35)',
        }}>
          <span style={{ fontSize: '18px', color: 'white', fontFamily: 'Georgia, serif' }}>A</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#E9EDEF', fontWeight: 600, lineHeight: 1.2 }}>AVA</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#00A884', lineHeight: 1.2 }}>● online</span>
        </div>
        <span style={{ color: '#8696A0', fontSize: '20px', marginLeft: 'auto' }}>📹</span>
        <span style={{ color: '#8696A0', fontSize: '20px' }}>📞</span>
      </div>
      <div style={{
        flex: 1, background: '#0B141A', display: 'flex', flexDirection: 'column',
        padding: '16px', gap: '10px', overflowY: 'hidden', justifyContent: 'flex-end',
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(196,162,90,0.02) 0%, transparent 60%)',
      }}>
        <div style={{
          alignSelf: 'center', fontSize: '12px', fontFamily: "'DM Sans', sans-serif",
          color: '#8696A0', background: 'rgba(11,20,26,0.8)',
          padding: '4px 12px', borderRadius: '8px', marginBottom: '4px',
        }}>Today</div>
        {visibleMsgs.map((i) => <ChatBubble key={MESSAGES[i].id} msg={MESSAGES[i]} />)}
        {typingActive && <TypingIndicator />}
        {confirmed && (
          <div style={{
            alignSelf: 'center', fontSize: '12px', fontFamily: "'DM Sans', sans-serif",
            color: '#25D366', letterSpacing: '0.05em',
            marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span>✓✓</span> Booking confirmed — Sat 6pm
          </div>
        )}
      </div>
      <div style={{
        background: '#1F2C34', padding: '12px 16px', flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ fontSize: '20px' }}>😊</span>
        <div style={{
          flex: 1, height: '42px', background: '#2A3942', borderRadius: '24px',
          display: 'flex', alignItems: 'center', paddingLeft: '16px',
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#8696A0' }}>Message</span>
        </div>
        <div style={{
          width: '42px', height: '42px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #C4A25A, #2E6B8E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 14px rgba(196,162,90,0.3)',
        }}>
          <span style={{ fontSize: '18px' }}>🎤</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Orchid-branch motif
   A bare, curling branch rises from the bottom-left corner,
   splits into smaller boughs, ends in delicate orchid blossoms.
   Thin sketch lines; light pulses travel up each branch.
   Second smaller branch frames the right edge.
   ───────────────────────────────────────────────────────────── */

// One orchid blossom (5 petals + lip + stamen) at position (cx,cy), scaled by r
function Blossom({ cx, cy, r, gold, delay }: {
  cx: number; cy: number; r: number;
  gold?: boolean; delay: number;
}) {
  const c = gold ? '#C4A25A' : '#4599B5';
  // 5 asymmetric petals — top-heavy like an orchid
  const petals = [
    { rx: r * 0.38, ry: r * 0.82, rot: 0   },  // top
    { rx: r * 0.32, ry: r * 0.70, rot: 72  },
    { rx: r * 0.32, ry: r * 0.70, rot: 144 },
    { rx: r * 0.32, ry: r * 0.70, rot: 216 },
    { rx: r * 0.32, ry: r * 0.70, rot: 288 },
  ];
  return (
    <g transform={`translate(${cx},${cy})`}
       style={{ animation: `blossomPulse ${2.6 + delay * 0.4}s ease-in-out ${delay}s infinite` }}>
      {petals.map((p, i) => (
        <ellipse key={i}
          cx={0} cy={-r * 0.42}
          rx={p.rx} ry={p.ry}
          fill={c} fillOpacity="0.05"
          stroke={c} strokeWidth="0.28"
          transform={`rotate(${p.rot})`}
        />
      ))}
      {/* Lip petal (labellum) — wider, lower */}
      <path d={`M ${-r * 0.28} ${r * 0.1} Q 0 ${r * 0.72} ${r * 0.28} ${r * 0.1}`}
        fill={gold ? '#C4A25A' : '#7EC8E3'} fillOpacity="0.07"
        stroke={gold ? '#C4A25A' : '#7EC8E3'} strokeWidth="0.3"
      />
      {/* Stamen dot */}
      <circle r={r * 0.14} fill={c} fillOpacity="0.25"
        style={{ animation: `blossomPulse ${1.8 + delay * 0.3}s ease-in-out ${delay + 0.3}s infinite` }}
      />
    </g>
  );
}

// Branch line with a light-pulse overlay
function Branch({ d, sw, delay, gold }: {
  d: string; sw: number; delay: number; gold?: boolean;
}) {
  const c = gold ? '#C4A25A' : '#4599B5';
  return (
    <g>
      {/* Static skeleton */}
      <path d={d} fill="none" stroke={c} strokeWidth={sw} opacity="0.18"
        strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Traveling light pulse */}
      <path d={d} fill="none" stroke={gold ? '#D4B878' : '#7EC8E3'}
        strokeWidth={sw * 1.6} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="18 200"
        style={{
          animation: `branchLight ${4.5 + delay * 0.6}s ease-in-out ${delay}s infinite`,
        }}
      />
    </g>
  );
}

function BranchMotif() {
  // All paths in viewBox "0 0 100 100"
  // LEFT BRANCH — rises from bottom-left, curls right
  const leftBranches: { d: string; sw: number; delay: number; gold: boolean }[] = [
    // main trunk
    { d: 'M 0 102 C 2 92, 4 84, 5 74 C 6 64, 7 57, 8 50', sw: 0.55, delay: 0, gold: false },
    // left bough upward
    { d: 'M 8 50 C 6 41, 5 32, 6 23 C 7 14, 9 8, 11 2', sw: 0.42, delay: 0.3, gold: false },
    // right bough angled
    { d: 'M 8 50 C 12 45, 17 40, 21 35', sw: 0.40, delay: 0.5, gold: true },
    // right bough continues
    { d: 'M 21 35 C 26 29, 31 23, 33 17', sw: 0.34, delay: 0.7, gold: true },
    // tip splits: left
    { d: 'M 33 17 C 30 12, 27 8, 26 4', sw: 0.28, delay: 0.9, gold: true },
    // tip splits: right
    { d: 'M 33 17 C 35 12, 37 8, 38 4', sw: 0.28, delay: 1.0, gold: false },
    // mid-branch twig from left bough
    { d: 'M 6 23 C 3 18, 1 13, 2 8', sw: 0.26, delay: 0.4, gold: false },
    // small twig from left bough
    { d: 'M 9 36 C 13 32, 16 28, 17 23', sw: 0.26, delay: 0.6, gold: true },
    // twig from right bough mid
    { d: 'M 17 23 C 15 18, 14 13, 15 8', sw: 0.22, delay: 0.8, gold: false },
    // lowest side twig
    { d: 'M 5 60 C 1 56, -1 52, 0 47', sw: 0.24, delay: 0.2, gold: false },
  ];

  // Blossom positions on left branch
  const leftBlossoms: { cx: number; cy: number; r: number; delay: number; gold: boolean }[] = [
    { cx: 11, cy: 2,  r: 2.8, delay: 0.0, gold: true  },
    { cx: 26, cy: 4,  r: 2.4, delay: 0.4, gold: false },
    { cx: 38, cy: 4,  r: 2.4, delay: 0.6, gold: true  },
    { cx: 2,  cy: 8,  r: 1.9, delay: 0.3, gold: false },
    { cx: 15, cy: 8,  r: 1.9, delay: 0.7, gold: true  },
    { cx: 17, cy: 23, r: 1.7, delay: 0.5, gold: false },
    { cx: 0,  cy: 47, r: 1.5, delay: 0.2, gold: true  },
  ];

  // RIGHT BRANCH — frames the right edge, smaller
  const rightBranches: { d: string; sw: number; delay: number; gold: boolean }[] = [
    { d: 'M 102 100 C 98 90, 95 82, 94 72 C 93 62, 93 56, 91 48', sw: 0.44, delay: 1.4, gold: false },
    { d: 'M 91 48 C 88 42, 85 36, 83 28', sw: 0.36, delay: 1.6, gold: true  },
    { d: 'M 83 28 C 80 22, 78 15, 76 9',  sw: 0.30, delay: 1.8, gold: false },
    { d: 'M 83 28 C 87 22, 90 17, 92 11', sw: 0.30, delay: 1.7, gold: true  },
    { d: 'M 91 48 C 94 44, 97 40, 98 35', sw: 0.28, delay: 1.5, gold: false },
  ];

  const rightBlossoms: { cx: number; cy: number; r: number; delay: number; gold: boolean }[] = [
    { cx: 76, cy: 9,  r: 2.2, delay: 1.8, gold: true  },
    { cx: 92, cy: 11, r: 2.2, delay: 1.7, gold: false },
    { cx: 98, cy: 35, r: 1.8, delay: 1.5, gold: true  },
  ];

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
        opacity: 0.75,
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <style>{`
          @keyframes branchLight {
            0%   { stroke-dashoffset:  220; opacity: 0;    }
            8%   {                          opacity: 0.75; }
            85%  {                          opacity: 0.4;  }
            100% { stroke-dashoffset: -220; opacity: 0;    }
          }
          @keyframes blossomPulse {
            0%,100% { opacity: 0.12; }
            50%     { opacity: 0.45; }
          }
        `}</style>
      </defs>

      {/* Left branches */}
      {leftBranches.map((b, i) => (
        <Branch key={`lb-${i}`} {...b} />
      ))}
      {leftBlossoms.map((b, i) => (
        <Blossom key={`lf-${i}`} {...b} />
      ))}

      {/* Right branches */}
      {rightBranches.map((b, i) => (
        <Branch key={`rb-${i}`} {...b} />
      ))}
      {rightBlossoms.map((b, i) => (
        <Blossom key={`rf-${i}`} {...b} />
      ))}
    </svg>
  );
}

/* ─── Hero ─── */
export default function AvaHero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'transparent',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }

        .ava-inner {
          position: relative; z-index: 10;
          display: flex; align-items: center;
          min-height: 100vh;
          padding: 80px 72px 80px 80px;
          gap: 64px;
        }
        .ava-left  { flex: 1; max-width: 480px; }
        .ava-phone { flex-shrink: 0; }

        @media (max-width: 960px) {
          .ava-inner {
            flex-direction: column !important;
            align-items: center !important;
            padding: 120px 24px 64px !important;
            gap: 48px !important;
            min-height: 100svh !important;
          }
          .ava-left {
            max-width: 100% !important;
            text-align: center !important;
          }
          .ava-pills { justify-content: center !important; }
          .ava-phone {
            transform: scale(0.70) !important;
            transform-origin: top center !important;
            margin-bottom: -160px !important;
          }
        }
        @media (max-width: 480px) {
          .ava-phone {
            transform: scale(0.58) !important;
            margin-bottom: -220px !important;
          }
        }
      `}</style>

      {/* Orchid branch motif */}
      <BranchMotif />

      {/* Vignette — centre reads cleanly */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 70% at 40% 50%, rgba(7,16,30,0.5) 0%, transparent 100%)',
      }} />

      <div className="ava-inner">

        {/* LEFT */}
        <div className="ava-left">
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
            color: 'var(--gold)', textTransform: 'uppercase',
            letterSpacing: '0.44em', margin: '0 0 16px 0',
          }}>INTRODUCING</p>

          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(80px, 11vw, 128px)',
            color: 'var(--gold)', letterSpacing: '0.12em', lineHeight: 1,
            margin: 0,
            textShadow: '0 0 100px rgba(196,162,90,0.25), 0 0 40px rgba(196,162,90,0.12)',
          }}>AVA</h1>

          <div style={{
            width: '48px', height: '1px',
            background: 'linear-gradient(to right, var(--gold), transparent)',
            margin: '24px 0',
          }} />

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '18px',
            color: 'var(--warm-foam)', letterSpacing: '0.08em',
            margin: '0 0 8px 0', fontWeight: 300,
          }}>Your AI operations agent.</p>

          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
            color: 'var(--ocean)', fontStyle: 'italic',
            letterSpacing: '0.06em', margin: '0 0 40px 0',
          }}>A Rheo AI Product.</p>

          <div className="ava-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['WhatsApp Native', 'Instant Booking', 'Payment Links', 'CRM Sync'].map((f) => (
              <span key={f} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
                color: 'var(--crest)', letterSpacing: '0.18em', textTransform: 'uppercase',
                border: '1px solid rgba(69,153,181,0.25)',
                borderRadius: '20px', padding: '5px 14px',
                background: 'rgba(69,153,181,0.06)',
              }}>{f}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — phone, no tilt */}
        <div className="ava-phone">
          <PhoneMockup />
        </div>

      </div>
    </section>
  );
}
