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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        background: '#202C33',
        borderRadius: '0 12px 12px 12px',
        padding: '10px 14px',
        alignSelf: 'flex-start',
        maxWidth: '60px',
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: 'block',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#8696A0',
            animation: `typingBounce 1.2s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

function ChatBubble({ msg }: { msg: Message }) {
  const isUser = msg.from === 'user';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: isUser ? '80%' : '85%',
        opacity: 1,
        transform: 'translateY(0)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        gap: '2px',
      }}
    >
      <div
        style={{
          background: isUser ? '#005C4B' : '#202C33',
          color: '#E9EDEF',
          borderRadius: isUser ? '12px 12px 0 12px' : '0 12px 12px 12px',
          padding: '7px 10px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          lineHeight: 1.5,
        }}
      >
        {msg.text}
      </div>
      <span
        style={{
          fontSize: '9px',
          color: '#8696A0',
          alignSelf: isUser ? 'flex-end' : 'flex-start',
          fontFamily: "'DM Sans', sans-serif",
          paddingRight: isUser ? '2px' : 0,
          paddingLeft: isUser ? 0 : '2px',
        }}
      >
        {msg.time}
      </span>
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
      // typing indicator start
      const tShow = TYPING_SHOW[i];
      if (tShow !== null) {
        timers.push(setTimeout(() => setTypingActive(true), tShow));
      }
      // typing indicator hide + message appear
      const tHide = TYPING_HIDE[i];
      if (tHide !== null) {
        timers.push(setTimeout(() => setTypingActive(false), tHide));
      }
      // message appear
      timers.push(
        setTimeout(() => {
          setVisibleMsgs((prev) => [...prev, i]);
        }, MSG_SCHEDULE[i]),
      );
    });

    // confirmed badge
    timers.push(setTimeout(() => setConfirmed(true), 5200));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        width: '280px',
        height: '540px',
        background: '#0B141A',
        borderRadius: '32px',
        border: '2px solid #1F2C34',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* WhatsApp header */}
      <div
        style={{
          background: '#1F2C34',
          padding: '10px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C4A25A, #2E6B8E)',
            flexShrink: 0,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: '#E9EDEF',
              fontWeight: 500,
              lineHeight: 1.2,
            }}
          >
            AVA
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              color: '#8696A0',
              lineHeight: 1.2,
            }}
          >
            online
          </span>
        </div>
      </div>

      {/* Chat area */}
      <div
        style={{
          flex: 1,
          background: '#0B141A',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px',
          gap: '6px',
          overflowY: 'hidden',
          justifyContent: 'flex-end',
        }}
      >
        {visibleMsgs.map((i) => (
          <ChatBubble key={MESSAGES[i].id} msg={MESSAGES[i]} />
        ))}

        {typingActive && <TypingIndicator />}

        {confirmed && (
          <div
            style={{
              alignSelf: 'center',
              fontSize: '10px',
              fontFamily: "'DM Sans', sans-serif",
              color: '#25D366',
              letterSpacing: '0.05em',
              marginTop: '4px',
            }}
          >
            ✓ Booking confirmed
          </div>
        )}
      </div>

      {/* Input bar */}
      <div
        style={{
          background: '#1F2C34',
          padding: '8px 12px',
          flexShrink: 0,
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            flex: 1,
            height: '30px',
            background: '#2A3942',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '12px',
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              color: '#8696A0',
            }}
          >
            Message
          </span>
        </div>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C4A25A40, #2E6B8E40)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#8696A0' }}>🎤</span>
        </div>
      </div>
    </div>
  );
}

export default function AvaHero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        background: 'var(--ink)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        @media (max-width: 767px) {
          .ava-hero-phone { display: none !important; }
          .ava-hero-left  { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>

      {/* LEFT content */}
      <div
        className="ava-hero-left"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingLeft: '64px',
          paddingTop: '180px',
          maxWidth: '50%',
        }}
      >
        {/* Gold label */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.44em',
            margin: 0,
          }}
        >
          INTRODUCING
        </p>

        {/* AVA */}
        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(72px, 10vw, 112px)',
            color: 'var(--gold)',
            letterSpacing: '0.15em',
            lineHeight: 1,
            marginTop: '12px',
            marginBottom: 0,
          }}
        >
          AVA
        </h1>

        {/* Gold hairline */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'var(--gold)',
            margin: '20px 0',
          }}
          aria-hidden="true"
        />

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '16px',
            color: 'var(--crest)',
            letterSpacing: '0.12em',
            margin: 0,
          }}
        >
          Your AI operations agent.
        </p>

        {/* Sub-tagline */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            color: 'var(--ocean)',
            fontStyle: 'italic',
            letterSpacing: '0.08em',
            marginTop: '6px',
            marginBottom: 0,
          }}
        >
          A Rheo AI Product.
        </p>
      </div>

      {/* RIGHT — phone mockup (desktop only) */}
      <div
        className="ava-hero-phone"
        style={{
          position: 'absolute',
          right: '64px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}
      >
        <PhoneMockup />
      </div>

      {/* Wave system — bottom 40% */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        {/* Layer 1 — deep back, muted */}
        <svg
          viewBox="0 0 1440 160"
          width="100%"
          height="160"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,100 C240,50 480,130 720,70 C960,10 1200,100 1440,55 L1440,160 L0,160 Z"
            fill="#1A3566"
            fillOpacity="0.25"
          />
        </svg>

        {/* Layer 2 */}
        <svg
          viewBox="0 0 1440 160"
          width="100%"
          height="160"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          <path
            d="M0,110 C200,60 440,130 720,80 C1000,30 1240,110 1440,65 L1440,160 L0,160 Z"
            fill="#1A3566"
            fillOpacity="0.4"
          />
        </svg>

        {/* Layer 3 — front, slight crest hint */}
        <svg
          viewBox="0 0 1440 160"
          width="100%"
          height="160"
          preserveAspectRatio="none"
          style={{ position: 'absolute', bottom: 0, left: 0 }}
        >
          {/* Gold hairline crest */}
          <path
            d="M0,130 C200,90 440,150 720,110 C1000,70 1240,130 1440,95"
            fill="none"
            stroke="#C4A25A"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          {/* Fill body */}
          <path
            d="M0,130 C200,90 440,150 720,110 C1000,70 1240,130 1440,95 L1440,160 L0,160 Z"
            fill="#0D1F3C"
            fillOpacity="0.7"
          />
        </svg>
      </div>
    </section>
  );
}
