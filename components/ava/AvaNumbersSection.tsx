'use client';

import { useEffect, useRef } from 'react';

interface Stat {
  number: string;
  label: string;
}

const STATS: Stat[] = [
  { number: '< 2s',  label: 'AVERAGE RESPONSE TIME' },
  { number: '24/7',  label: 'OPERATIONAL UPTIME' },
  { number: '0',     label: 'MANUAL FOLLOW-UPS REQUIRED' },
  { number: '₹38K+', label: 'AVG. REVENUE RECOVERED / MONTH' },
  { number: '94%',   label: 'REDUCTION IN MISSED BOOKINGS' },
  { number: '3×',    label: 'MARKETING REACH VIA WHATSAPP' },
  { number: '18 hrs', label: 'STAFF TIME SAVED PER WEEK' },
  { number: '15 min', label: 'INQUIRY TO CONFIRMED BOOKING' },
  { number: '100%',  label: 'CUSTOM-BUILT. NEVER TEMPLATED.' },
];

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, index * 120);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '40px 24px',
        borderRight: (index % 3 !== 2) ? '1px solid var(--prussian)' : 'none',
        borderBottom: (index < STATS.length - 3) ? '1px solid var(--prussian)' : 'none',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--serif)',
          fontSize: '64px',
          color: 'var(--gold)',
          lineHeight: 1,
          letterSpacing: '0.1em',
          margin: 0,
        }}
      >
        {stat.number}
      </p>
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '12px',
          color: 'var(--ocean)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginTop: '12px',
          marginBottom: 0,
        }}
      >
        {stat.label}
      </p>
    </div>
  );
}

export default function AvaNumbersSection() {
  return (
    <section style={{ padding: '120px 0' }}>
      <style>{`
        @media (max-width: 767px) {
          .ava-numbers-inner { padding: 0 24px !important; }
          .ava-numbers-row   { flex-direction: column !important; }
          .ava-numbers-row > div {
            border-right: none !important;
            border-bottom: 1px solid var(--prussian);
            padding: 32px 0 !important;
          }
          .ava-numbers-row > div:last-child { border-bottom: none !important; }
        }
      `}</style>

      <div
        className="ava-numbers-inner"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 64px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '11px',
            color: 'var(--gold)', textTransform: 'uppercase',
            letterSpacing: '0.44em', margin: '0 0 16px 0',
          }}>BY THE NUMBERS</p>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: '44px',
            color: 'var(--warm-foam)', letterSpacing: '0.12em',
            margin: 0, lineHeight: 1.15,
          }}>AVA delivers.</h2>
        </div>

        <div
          className="ava-numbers-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid var(--prussian)',
          }}
        >
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
