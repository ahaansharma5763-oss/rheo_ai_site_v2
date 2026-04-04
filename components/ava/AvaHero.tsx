'use client';

import { useEffect, useState, Suspense, lazy } from 'react';

const DotOrbit = lazy(() =>
  import('@paper-design/shaders-react').then((m) => ({ default: m.DotOrbit }))
);

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
        background: isUser ? '#005C4B' : '#202C33',
        color: '#E9EDEF',
        borderRadius: isUser ? '14px 14px 0 14px' : '0 14px 14px 14px',
        padding: '9px 13px',
        fontFamily: "'DM Sans', sans-serif",
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
      width: '420px', height: '800px',
      background: '#0B141A',
      borderRadius: '48px',
      border: '2.5px solid #1F2C34',
      overflow: 'hidden',
      boxShadow: '0 80px 160px rgba(0,0,0,0.9), 0 0 0 1px rgba(196,162,90,0.15), 0 0 120px rgba(196,162,90,0.06)',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0, position: 'relative',
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute', top: '16px', left: '50%',
        transform: 'translateX(-50%)',
        width: '110px', height: '32px',
        background: '#0D1118', borderRadius: '24px', zIndex: 10,
      }} />

      {/* Header */}
      <div style={{
        background: '#1F2C34', padding: '14px 18px',
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
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#E9EDEF', fontWeight: 600, lineHeight: 1.2 }}>AVA</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#00A884', lineHeight: 1.2 }}>● online</span>
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
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(196,162,90,0.02) 0%, transparent 60%)',
      }}>
        <div style={{
          alignSelf: 'center', fontSize: '12px',
          fontFamily: "'DM Sans', sans-serif",
          color: '#8696A0', background: 'rgba(11,20,26,0.8)',
          padding: '4px 12px', borderRadius: '8px', marginBottom: '4px',
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
          borderRadius: '24px', display: 'flex', alignItems: 'center', paddingLeft: '16px',
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

/* ─── Floral motifs: Japanese kiku (chrysanthemum) + Greek meander accents ─── */
function Kiku({
  cx, cy, r, delayBase = 0, gold = '#C4A25A', blue = '#4599B5',
}: {
  cx: number; cy: number; r: number; delayBase?: number;
  gold?: string; blue?: string;
}) {
  const outerCount = 16;
  const innerCount = 16;

  // Petal Bézier path centred on origin pointing upward
  const op = (len: number, w: number) => {
    const base = len * 0.18;
    const mid  = len * 0.54;
    return `M 0 ${-base} C ${w} ${-mid}, ${w} ${-len * 0.9}, 0 ${-len} C ${-w} ${-len * 0.9}, ${-w} ${-mid}, 0 ${-base} Z`;
  };

  const outerPath = op(r, r * 0.085);
  const innerPath = op(r * 0.65, r * 0.09);

  // Greek-key tick marks around outer ring
  const tickCount = 48;
  const tickR = r * 1.18;
  const tickInner = r * 1.08;

  return (
    <g transform={`translate(${cx},${cy})`}>
      {/* Outer meander ring */}
      <circle r={r * 1.22} fill="none" stroke={blue} strokeWidth="0.12" opacity="0.18" />

      {/* Greek-key tick marks */}
      {Array.from({ length: tickCount }, (_, i) => {
        const a = (i * Math.PI * 2) / tickCount;
        const long = i % 4 === 0;
        return (
          <line key={`tk-${i}`}
            x1={Math.cos(a) * tickR} y1={Math.sin(a) * tickR}
            x2={Math.cos(a) * (long ? tickInner - r * 0.06 : tickInner)}
            y2={Math.sin(a) * (long ? tickInner - r * 0.06 : tickInner)}
            stroke={long ? gold : blue}
            strokeWidth={long ? '0.22' : '0.12'}
            opacity={long ? '0.35' : '0.15'}
          />
        );
      })}

      {/* Greek cardinal squares (meander accent at N/E/S/W) */}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const qx = Math.cos(rad - Math.PI / 2) * r * 1.38;
        const qy = Math.sin(rad - Math.PI / 2) * r * 1.38;
        const s = r * 0.08;
        return (
          <g key={`gk-${deg}`}>
            <rect x={qx - s} y={qy - s} width={s * 2} height={s * 2}
              fill="none" stroke={gold} strokeWidth="0.18" opacity="0.28"
            />
            <rect x={qx - s * 0.5} y={qy - s * 0.5} width={s} height={s}
              fill={gold} fillOpacity="0.06"
            />
          </g>
        );
      })}

      {/* Outer petals — gold, 16 */}
      {Array.from({ length: outerCount }, (_, i) => (
        <path key={`op-${i}`}
          d={outerPath}
          fill={gold} fillOpacity="0.05"
          stroke={gold} strokeWidth="0.28"
          transform={`rotate(${(i * 360) / outerCount})`}
          style={{
            animation: `kikuGold ${3.0 + (i % 5) * 0.22}s ease-in-out ${delayBase + i * 0.14}s infinite`,
          }}
        />
      ))}

      {/* Inner petals — blue, 16, offset 11.25° */}
      {Array.from({ length: innerCount }, (_, i) => (
        <path key={`ip-${i}`}
          d={innerPath}
          fill={blue} fillOpacity="0.04"
          stroke={blue} strokeWidth="0.22"
          transform={`rotate(${(i * 360) / innerCount + 11.25})`}
          style={{
            animation: `kikuBlue ${2.7 + (i % 4) * 0.18}s ease-in-out ${delayBase + i * 0.12 + 0.4}s infinite`,
          }}
        />
      ))}

      {/* Light-sweep overlay on 4 evenly spaced outer petals */}
      {[0, 4, 8, 12].map((i) => (
        <path key={`ls-${i}`}
          d={outerPath}
          fill="none"
          stroke={gold} strokeWidth="0.55"
          strokeDasharray={`${r * 3.8}`}
          transform={`rotate(${(i * 360) / outerCount})`}
          style={{
            animation: `lightSweep ${5 + i * 0.7}s ease-in-out ${delayBase + i * 0.9}s infinite`,
          }}
        />
      ))}

      {/* Centre rings */}
      <circle r={r * 0.22} fill="none" stroke={gold} strokeWidth="0.28"
        style={{ animation: `kikuCenter 3s ease-in-out ${delayBase}s infinite` }}
      />
      <circle r={r * 0.12} fill={gold} fillOpacity="0.1"
        style={{ animation: `kikuCenter 3s ease-in-out ${delayBase + 0.6}s infinite` }}
      />
      {/* Tiny centre dot */}
      <circle r={r * 0.04} fill={gold} opacity="0.4" />
    </g>
  );
}

function FloralDeco() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <style>{`
          @keyframes kikuGold {
            0%,100% { opacity: 0.08; }
            50%      { opacity: 0.30; }
          }
          @keyframes kikuBlue {
            0%,100% { opacity: 0.05; }
            50%      { opacity: 0.20; }
          }
          @keyframes kikuCenter {
            0%,100% { opacity: 0.15; }
            50%      { opacity: 0.50; }
          }
          @keyframes lightSweep {
            0%   { stroke-dashoffset: 999; opacity: 0; }
            15%  { opacity: 0.55; }
            85%  { opacity: 0.20; }
            100% { stroke-dashoffset: 0;   opacity: 0; }
          }
        `}</style>
      </defs>

      {/* Large kiku — left side, vertically centred */}
      <Kiku cx={10} cy={50} r={14} delayBase={0} />

      {/* Medium kiku — top right, partially cropped */}
      <Kiku cx={93} cy={14} r={10} delayBase={1.2} />

      {/* Small accent kiku — bottom right */}
      <Kiku cx={88} cy={88} r={6.5} delayBase={2.1} />
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

        /* ── Layout ── */
        .ava-inner {
          position: relative; z-index: 10;
          display: flex; align-items: center;
          min-height: 100vh;
          padding: 80px 72px 80px 80px;
          gap: 64px;
        }
        .ava-left  { flex: 1; max-width: 480px; }
        .ava-phone { flex-shrink: 0; }

        /* ── Mobile ── */
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
          .ava-left .ava-pills { justify-content: center !important; }
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

      {/* DotOrbit — full background */}
      <Suspense fallback={null}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
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

      {/* Floral motifs */}
      <FloralDeco />

      {/* Vignette */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 80% at 40% 50%, rgba(7,16,30,0.55) 0%, transparent 100%)',
      }} />

      {/* Content row */}
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
            color: 'var(--gold)',
            letterSpacing: '0.12em', lineHeight: 1,
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

          <div className="ava-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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

        {/* RIGHT — phone, no tilt, no animation */}
        <div className="ava-phone">
          <PhoneMockup />
        </div>

      </div>
    </section>
  );
}
