'use client';

import { useEffect, useRef } from 'react';

interface Capability {
  num: string;
  name: string;
  spec: string;
}

const capabilities: Capability[] = [
  {
    num: '01',
    name: 'Workflow Orchestration',
    spec: 'n8n-native multi-agent pipelines with conditional branching and error recovery.',
  },
  {
    num: '02',
    name: 'Lead Intelligence',
    spec: 'Real-time lead scoring, enrichment, and omnichannel follow-up sequencing.',
  },
  {
    num: '03',
    name: 'Booking & Scheduling',
    spec: 'Calendar sync, conflict detection, and automated confirmation flows.',
  },
  {
    num: '04',
    name: 'Payment Automation',
    spec: 'Razorpay-integrated payment link generation, reconciliation, and reminder drips.',
  },
  {
    num: '05',
    name: 'Analytics & Reporting',
    spec: 'Consolidated dashboards aggregating cross-platform event data into actionable signals.',
  },
  {
    num: '06',
    name: 'Compliance Documentation',
    spec: 'Automated audit trails, status tracking, and SLA-adherent notification pipelines.',
  },
];

function CapabilityBlock({ cap, delay }: { cap: Capability; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="capability-block card-hover"
      style={{
        background: 'var(--prussian)',
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Hover underline bar */}
      <div className="capability-bar" />

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          color: 'var(--gold)',
          letterSpacing: '0.24em',
          margin: '0 0 14px 0',
          textTransform: 'uppercase',
        }}
      >
        {cap.num}
      </p>
      <h3
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '16px',
          color: 'var(--warm-foam)',
          letterSpacing: '0.1em',
          margin: '0 0 8px 0',
        }}
      >
        {cap.name}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          color: 'var(--ocean)',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {cap.spec}
      </p>
    </div>
  );
}

export default function WhatWeDoSection() {
  return (
    <section style={{ background: 'var(--navy)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .capability-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 0%;
          background: var(--gold);
          transition: width 300ms ease;
        }
        .capability-block:hover .capability-bar {
          width: 100%;
        }
        .whatwedo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 48px;
        }
        @media (max-width: 767px) {
          .whatwedo-grid {
            grid-template-columns: 1fr;
          }
          .whatwedo-inner {
            padding: 0 24px !important;
          }
        }
      `}</style>

      <div
        className="whatwedo-inner"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 64px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
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
            WHAT WE DO
          </p>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '42px',
              color: 'var(--warm-foam)',
              letterSpacing: '0.12em',
              marginTop: '16px',
              marginBottom: 0,
              textAlign: 'center',
            }}
          >
            We automate the space between data and decision.
          </h2>
        </div>

        {/* Grid */}
        <div className="whatwedo-grid">
          {capabilities.map((cap, i) => (
            <CapabilityBlock key={cap.num} cap={cap} delay={i * 80} />
          ))}
        </div>

        {/* Wave hairline */}
        <svg
          viewBox="0 0 1440 48"
          width="100%"
          height="48"
          style={{ display: 'block', marginTop: '0', overflow: 'visible' }}
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <path
            d="M0,24 C180,8 360,40 540,24 C720,8 900,40 1080,24 C1260,8 1380,36 1440,24"
            fill="none"
            stroke="#2E6B8E"
            strokeOpacity="0.2"
            strokeWidth="0.5"
          />
          <path
            d="M0,30 C200,14 380,46 600,28 C820,10 1020,44 1200,28 C1320,16 1400,36 1440,30"
            fill="none"
            stroke="#2E6B8E"
            strokeOpacity="0.2"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </section>
  );
}
