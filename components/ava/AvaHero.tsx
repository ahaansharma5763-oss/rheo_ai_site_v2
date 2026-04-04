'use client';

import { useEffect, useRef, useState, Suspense, lazy } from 'react';

const DotOrbit = lazy(() =>
  import('@paper-design/shaders-react').then((m) => ({ default: m.DotOrbit }))
);

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
      width: '420px',
      height: '800px',
      background: '#0B141A',
      borderRadius: '48px',
      border: '2.5px solid #1F2C34',
      overflow: 'hidden',
      boxShadow: '0 80px 160px rgba(0,0,0,0.9), 0 0 0 1px rgba(196,162,90,0.15), 0 0 120px rgba(196,162,90,0.06)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'relative',
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute', top: '16px', left: '50%',
        transform: 'translateX(-50%)',
        width: '110px', height: '32px',
        background: '#0D1118',
        borderRadius: '24px',
        zIndex: 10,
      }} />

      {/* WhatsApp header */}
      <div style={{
        background: '#1F2C34',
        padding: '14px 18px 14px 18px',
        display: 'flex', alignItems: 'center', gap: '12px',
        flexShrink: 0, paddingTop: '60px',
      }}>
        <span style={{ color: '#00A884', fontSize: '18px', marginRight: '2px' }}>‹</span>
        <div style={{
          width: '46px', height: '46px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #C4A25A, #2E6B8E)',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 16px rgba(196,162,90,0.35)',
        }}>
          <span style={{ fontSize: '18px', color: 'white', fontFamily: 'Georgia, serif' }}>A</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '16px',
            color: '#E9EDEF', fontWeight: 600, lineHeight: 1.2,
          }}>AVA</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
            color: '#00A884', lineHeight: 1.2,
          }}>● online</span>
        </div>
        <span style={{ color: '#8696A0', fontSize: '20px', marginLeft: 'auto' }}>📹</span>
        <span style={{ color: '#8696A0', fontSize: '20px' }}>📞</span>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1, background: '#0B141A',
        display: 'flex', flexDirection: 'column',
        padding: '16px', gap: '10px',
        overflowY: 'hidden', justifyContent: 'flex-end',
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(196,162,90,0.02) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(46,107,142,0.03) 0%, transparent 60%)',
      }}>
        <div style={{
          alignSelf: 'center', fontSize: '12px',
          fontFamily: "'DM Sans', sans-serif",
          color: '#8696A0', background: 'rgba(11,20,26,0.8)',
          padding: '4px 12px', borderRadius: '8px',
          marginBottom: '4px',
        }}>Today</div>

        {visibleMsgs.map((i) => <ChatBubble key={MESSAGES[i].id} msg={MESSAGES[i]} />)}
        {typingActive && <TypingIndicator />}
        {confirmed && (
          <div style={{
            alignSelf: 'center', fontSize: '12px',
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
        background: '#1F2C34', padding: '12px 16px',
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: '10px',
      }}>
        <span style={{ fontSize: '20px' }}>😊</span>
        <div style={{
          flex: 1, height: '42px', background: '#2A3942',
          borderRadius: '24px', display: 'flex', alignItems: 'center',
          paddingLeft: '16px',
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#8696A0',
          }}>Message</span>
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

// Subtle neural network — left edge only, away from phone
function NeuralEdge() {
  const nodes: [number, number][] = [
    [4, 12], [9, 32], [5, 54], [11, 72], [7, 88],
    [18, 22], [15, 48], [20, 68],
  ];
  const conns: [number, number][] = [
    [0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[1,5],[2,6],[3,7],
  ];
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', left: 0, top: 0,
        width: '28%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.55,
      }}
      viewBox="0 0 28 100"
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <style>{`
          @keyframes nLine2 { 0%,100%{opacity:0.04} 50%{opacity:0.18} }
          @keyframes nNode2 { 0%,100%{opacity:0.15} 50%{opacity:0.5} }
        `}</style>
      </defs>
      {conns.map(([f, t], i) => (
        <line key={i}
          x1={nodes[f][0]} y1={nodes[f][1]}
          x2={nodes[t][0]} y2={nodes[t][1]}
          stroke="#4599B5" strokeWidth="0.2"
          style={{ animation: `nLine2 ${2.8 + i * 0.4}s ease-in-out ${i * 0.3}s infinite` }}
        />
      ))}
      {conns.map(([f, t], i) => (
        <circle key={`dp-${i}`} r="0.5" fill={i % 2 === 0 ? '#C4A25A' : '#4599B5'} opacity="0.6">
          <animateMotion
            dur={`${4 + i * 0.6}s`}
            repeatCount="indefinite"
            path={`M ${nodes[f][0]} ${nodes[f][1]} L ${nodes[t][0]} ${nodes[t][1]}`}
          />
        </circle>
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={`n-${i}`} cx={x} cy={y} fill="#4599B5"
          style={{ animation: `nNode2 ${2.2 + i * 0.22}s ease-in-out ${i * 0.15}s infinite` }}
        >
          <animate attributeName="r" values="0.4;0.9;0.4" dur={`${2.2 + i * 0.2}s`} repeatCount="indefinite"/>
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
      minHeight: '700px',
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
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(-50%) rotate(-0.8deg); }
          50%       { transform: translateY(-51.5%) rotate(0.5deg); }
        }
        @media (max-width: 960px) {
          .ava-hero-phone { display: none !important; }
          .ava-hero-left  { padding-left: 24px !important; padding-right: 24px !important; max-width: 100% !important; }
        }
      `}</style>

      {/* DotOrbit shader — full section background */}
      <Suspense fallback={null}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0,
          width: '100%', height: '100%',
        }}>
          <DotOrbit
            style={{ width: '100%', height: '100%', display: 'block' }}
            colorBack="#07101E"
            colors={['#0D1F3C', '#1A3566', '#2E6B8E', '#4599B5', '#7EC8E3', '#C4A25A']}
            size={0.22}
            sizeRange={0.3}
            spreading={0.65}
            stepsPerColor={2}
            speed={0.45}
          />
        </div>
      </Suspense>

      {/* Neural network — left edge only */}
      <NeuralEdge />

      {/* Dark vignette to keep text readable */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(7,16,30,0.5) 0%, transparent 100%)',
      }} />

      {/* LEFT content */}
      <div
        className="ava-hero-left"
        style={{
          position: 'relative', zIndex: 10,
          paddingLeft: '80px', paddingTop: '0',
          maxWidth: '48%',
          height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
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
          margin: '0 0 0 0',
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

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['WhatsApp Native', 'Instant Booking', 'Payment Links', 'CRM Sync'].map((f) => (
            <span key={f} style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
              color: 'var(--crest)', letterSpacing: '0.18em',
              textTransform: 'uppercase',
              border: '1px solid rgba(69,153,181,0.25)',
              borderRadius: '20px', padding: '5px 14px',
              background: 'rgba(69,153,181,0.06)',
            }}>{f}</span>
          ))}
        </div>
      </div>

      {/* RIGHT — phone mockup, bigger, less movement */}
      <div
        className="ava-hero-phone"
        style={{
          position: 'absolute',
          right: '60px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-0.8deg)',
          zIndex: 10,
          animation: 'phoneFloat 8s ease-in-out infinite',
          filter: 'drop-shadow(0 60px 120px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(196,162,90,0.06))',
        }}
      >
        <PhoneMockup />
      </div>
    </section>
  );
}
