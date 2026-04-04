'use client';

import { useEffect, useRef } from 'react';

interface Capability {
  verb: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    verb: 'Responds.',
    description: 'Instantly engages every inbound lead across WhatsApp, 24 hours a day.',
  },
  {
    verb: 'Qualifies.',
    description: 'Scores and segments leads in real time using configurable intent signals.',
  },
  {
    verb: 'Books.',
    description: 'Syncs with Google Calendar, detects conflicts, confirms appointments autonomously.',
  },
  {
    verb: 'Collects.',
    description: 'Generates Razorpay payment links, sends reminders, reconciles transactions.',
  },
  {
    verb: 'Follows up.',
    description: 'Executes multi-step drip sequences — Hinglish-native, human-sounding.',
  },
  {
    verb: 'Reports.',
    description: 'Delivers consolidated daily briefings to your Telegram or dashboard. Zero noise.',
  },
];

function CapabilityItem({ cap, index }: { cap: Capability; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, index * 80);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="ava-does-item"
      style={{
        padding: '32px 0',
        borderBottom:
          index < CAPABILITIES.length - 1
            ? '0.5px solid rgba(196,162,90,0.2)'
            : 'none',
        display: 'flex',
        alignItems: 'baseline',
        gap: '20px',
      }}
    >
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '28px',
          color: 'var(--warm-foam)',
          letterSpacing: '0.1em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          minWidth: '180px',
        }}
      >
        {cap.verb}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: 'var(--ocean)',
          lineHeight: 1.7,
        }}
      >
        {cap.description}
      </span>
    </div>
  );
}

export default function AvaDoesSection() {
  return (
    <section style={{ background: 'var(--navy)', padding: '120px 0' }}>
      <style>{`
        @media (max-width: 767px) {
          .ava-does-inner { padding: 0 24px !important; }
          .ava-does-item  { flex-direction: column !important; gap: 8px !important; }
          .ava-does-item span:first-child { min-width: unset !important; }
        }
      `}</style>

      <div
        className="ava-does-inner"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 64px',
        }}
      >
        {/* Label */}
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
          AVA DOES EVERYTHING
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '32px',
            color: 'var(--warm-foam)',
            letterSpacing: '0.15em',
            marginTop: '16px',
            marginBottom: 0,
          }}
        >
          Six capabilities. One agent. Zero manual steps.
        </h2>

        {/* Capability list */}
        <div
          style={{
            marginTop: '48px',
            borderTop: '0.5px solid rgba(196,162,90,0.2)',
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <CapabilityItem key={cap.verb} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
