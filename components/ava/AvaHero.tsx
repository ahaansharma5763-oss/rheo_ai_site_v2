'use client';

import { useEffect, useRef, useState } from 'react';

interface Message {
  id: number;
  from: 'user' | 'ava';
  text: string;
  time: string;
}

const MESSAGES: Message[] = [
  { id: 1, from: 'user', text: 'I want to book a 5v5 slot for Saturday evening', time: '9:41 AM' },
  { id: 2, from: 'ava',  text: 'Saturday 6pm is available! That\'s ₹1,400/hr for 5v5. Want me to send you a payment link to confirm? 🌊', time: '9:41 AM' },
  { id: 3, from: 'user', text: 'Yes please', time: '9:42 AM' },
  { id: 4, from: 'ava',  text: 'Done! Payment link sent to your WhatsApp. Your slot is held for 15 minutes. See you Saturday! ⚡', time: '9:42 AM' },
];

const MSG_SCHEDULE = [800, 2000, 3200, 4500];
const TYPING_SHOW  = [null, 1200, null, 3600] as (number | null)[];
const TYPING_HIDE  = [null, 2000, null, 4500] as (number | null)[];

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
      maxWidth: isUser ? '82%' : '88%',
      gap: '3px',
      animation: 'bubbleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
    }}>
      <div style={{
        background: isUser ? '#005C4B' : '#202C33',
        color: '#E9EDEF',
        borderRadius: isUser ? '14px 14px 0 14px' : '0 14px 14px 14px',
        padding: '9px 13px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        lineHeight: 1.55,
        boxShadow: isUser ? '0 2px 8px rgba(0,92,75,0.3)' : '0 2px 8px rgba(0,0,0,0.3)',
      }}>{msg.text}</div>
      <span style={{
        fontSize: '10px', color: '#8696A0',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        fontFamily: "'DM Sans', sans-serif",
        paddingRight: isUser ? '3px' : 0,
        paddingLeft: isUser ? 0 : '3px',
      }}>{msg.time} {isUser ? '' : '·  AVA'}</span>
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
      width: '360px',
      height: '680px',
      background: '#0B141A',
      borderRadius: '40px',
      border: '2.5px solid #1F2C34',
      overflow: 'hidden',
      boxShadow: '0 60px 140px rgba(0,0,0,0.85), 0 0 0 1px rgba(196,162,90,0.12), 0 0 80px rgba(196,162,90,0.04)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute', top: '14px', left: '50%',
        transform: 'translateX(-50%)',
        width: '96px', height: '28px',
        background: '#0D1118',
        borderRadius: '20px',
        zIndex: 10,
      }} />

      {/* WhatsApp header */}
      <div style={{
        background: '#1F2C34',
        padding: '14px 16px 14px 16px',
        display: 'flex', alignItems: 'center', gap: '10px',
        flexShrink: 0, paddingTop: '52px',
      }}>
        {/* Back arrow */}
        <span style={{ color: '#00A884', fontSize: '16px', marginRight: '2px' }}>‹</span>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #C4A25A, #2E6B8E)',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 12px rgba(196,162,90,0.3)',
        }}>
          <span style={{ fontSize: '16px', color: 'white', fontFamily: 'Georgia, serif' }}>A</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '15px',
            color: '#E9EDEF', fontWeight: 600, lineHeight: 1.2,
          }}>AVA</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
            color: '#00A884', lineHeight: 1.2,
          }}>● online</span>
        </div>
        {/* Video / call icons */}
        <span style={{ color: '#8696A0', fontSize: '18px', marginLeft: 'auto' }}>📹</span>
        <span style={{ color: '#8696A0', fontSize: '18px' }}>📞</span>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1, background: '#0B141A',
        display: 'flex', flexDirection: 'column',
        padding: '14px', gap: '8px',
        overflowY: 'hidden', justifyContent: 'flex-end',
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(196,162,90,0.02) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(46,107,142,0.03) 0%, transparent 60%)',
      }}>
        {/* Date stamp */}
        <div style={{
          alignSelf: 'center', fontSize: '11px',
          fontFamily: "'DM Sans', sans-serif",
          color: '#8696A0', background: 'rgba(11,20,26,0.8)',
          padding: '3px 10px', borderRadius: '8px',
          marginBottom: '4px',
        }}>Today</div>

        {visibleMsgs.map((i) => <ChatBubble key={MESSAGES[i].id} msg={MESSAGES[i]} />)}
        {typingActive && <TypingIndicator />}
        {confirmed && (
          <div style={{
            alignSelf: 'center', fontSize: '11px',
            fontFamily: "'DM Sans', sans-serif",
            color: '#25D366', letterSpacing: '0.05em',
            marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <span>✓✓</span> Booking confirmed — Sat 6pm
          </div>
        )}
      </div>

      {/* Input bar */}
      <div style={{
        background: '#1F2C34', padding: '10px 14px',
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ fontSize: '18px' }}>😊</span>
        <div style={{
          flex: 1, height: '38px', background: '#2A3942',
          borderRadius: '20px', display: 'flex', alignItems: 'center',
          paddingLeft: '14px',
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#8696A0',
          }}>Message</span>
        </div>
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #C4A25A, #2E6B8E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(196,162,90,0.3)',
        }}>
          <span style={{ fontSize: '16px' }}>🎤</span>
        </div>
      </div>
    </div>
  );
}

// Neural network pulsing in the background
function NeuralBackground() {
  // nodes: [x%, y%]
  const nodes: [number, number][] = [
    [4, 18], [10, 55], [6, 82], [16, 35], [14, 70],
    [88, 14], [94, 42], [90, 68], [84, 88], [96, 78],
    [50, 8], [50, 92],
  ];

  const conns: [number, number][] = [
    [0,3],[3,1],[1,4],[4,2],[0,1],[3,4],
    [5,6],[6,7],[7,8],[6,9],[5,9],[8,9],
    [10,5],[10,0],[11,2],[11,8],
  ];

  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <style>{`
          @keyframes nLinePulse { 0%,100%{opacity:0.06} 50%{opacity:0.22} }
          @keyframes nNodeGlow  { 0%,100%{opacity:0.25} 50%{opacity:0.65} }
        `}</style>
      </defs>

      {/* Connection lines */}
      {conns.map(([f, t], i) => (
        <line key={i}
          x1={nodes[f][0]} y1={nodes[f][1]}
          x2={nodes[t][0]} y2={nodes[t][1]}
          stroke="#C4A25A" strokeWidth="0.15"
          style={{ animation: `nLinePulse ${2.4 + i * 0.35}s ease-in-out ${i * 0.22}s infinite` }}
        />
      ))}

      {/* Moving data pulses along connections */}
      {conns.map(([f, t], i) => (
        <circle key={`dot-${i}`} r="0.55" fill={i % 3 === 0 ? '#C4A25A' : '#4599B5'} opacity="0.7">
          <animateMotion
            dur={`${3.5 + i * 0.55}s`}
            repeatCount="indefinite"
            calcMode="linear"
            path={`M ${nodes[f][0]} ${nodes[f][1]} L ${nodes[t][0]} ${nodes[t][1]}`}
          />
        </circle>
      ))}

      {/* Node circles */}
      {nodes.map(([x, y], i) => (
        <circle key={`node-${i}`} cx={x} cy={y} fill="#C4A25A"
          style={{ animation: `nNodeGlow ${1.8 + i * 0.18}s ease-in-out ${i * 0.12}s infinite` }}
        >
          <animate attributeName="r" values="0.5;1.1;0.5" dur={`${2 + i * 0.2}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${2 + i * 0.2}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

export default function AvaHero() {
  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: '640px',
      background: 'var(--ink)',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes bubbleIn {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes phoneTilt {
          0%,100% { transform: translateY(-50%) rotate(-1.5deg); }
          50%      { transform: translateY(-50%) rotate(1deg); }
        }
        @media (max-width: 900px) {
          .ava-hero-phone { display: none !important; }
          .ava-hero-left  { padding-left: 24px !important; padding-right: 24px !important; max-width: 100% !important; }
        }
      `}</style>

      {/* Neural network background */}
      <NeuralBackground />

      {/* LEFT content */}
      <div
        className="ava-hero-left"
        style={{
          position: 'relative', zIndex: 10,
          paddingLeft: '72px', paddingTop: '160px',
          maxWidth: '48%',
        }}
      >
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
          color: 'var(--gold)', textTransform: 'uppercase',
          letterSpacing: '0.44em', margin: '0 0 16px 0',
        }}>INTRODUCING</p>

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 'clamp(80px, 11vw, 128px)',
          color: 'var(--gold)',
          letterSpacing: '0.12em',
          lineHeight: 1,
          marginTop: '0', marginBottom: '0',
          textShadow: '0 0 100px rgba(196,162,90,0.2), 0 0 40px rgba(196,162,90,0.1)',
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

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['WhatsApp Native', 'Instant Booking', 'Payment Links', 'CRM Sync'].map((f) => (
            <span key={f} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
              color: 'var(--crest)', letterSpacing: '0.18em',
              textTransform: 'uppercase',
              border: '1px solid rgba(69,153,181,0.25)',
              borderRadius: '20px', padding: '5px 14px',
              background: 'rgba(69,153,181,0.05)',
            }}>{f}</span>
          ))}
        </div>
      </div>

      {/* RIGHT — phone mockup */}
      <div
        className="ava-hero-phone"
        style={{
          position: 'absolute',
          right: '72px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-1.5deg)',
          zIndex: 10,
          animation: 'phoneTilt 6s ease-in-out infinite',
          filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.6))',
        }}
      >
        <PhoneMockup />
      </div>

      {/* Wave system — bottom 35% */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '35%', zIndex: 1, pointerEvents: 'none',
      }} aria-hidden="true">
        <svg viewBox="0 0 1440 160" width="100%" height="160"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <path d="M0,100 C240,50 480,130 720,70 C960,10 1200,100 1440,55 L1440,160 L0,160 Z"
            fill="#1A3566" fillOpacity="0.25"/>
        </svg>
        <svg viewBox="0 0 1440 160" width="100%" height="160"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <path d="M0,110 C200,60 440,130 720,80 C1000,30 1240,110 1440,65 L1440,160 L0,160 Z"
            fill="#1A3566" fillOpacity="0.4"/>
        </svg>
        <svg viewBox="0 0 1440 160" width="100%" height="160"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}>
          <path d="M0,130 C200,90 440,150 720,110 C1000,70 1240,130 1440,95"
            fill="none" stroke="#C4A25A" strokeWidth="0.6" strokeOpacity="0.45"/>
          <path d="M0,130 C200,90 440,150 720,110 C1000,70 1240,130 1440,95 L1440,160 L0,160 Z"
            fill="#0D1F3C" fillOpacity="0.75"/>
        </svg>
      </div>
    </section>
  );
}
