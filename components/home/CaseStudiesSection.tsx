'use client';

import { useEffect, useRef } from 'react';

interface Metric {
  value: string;
  label: string;
}

interface CaseStudy {
  client: string;
  type: string;
  location: string;
  owner: string;
  metrics: Metric[];
  quote: string;
  quoteAuthor: string;
  built: string[];
}

const caseStudies: CaseStudy[] = [
  {
    client: 'Ascend Arena',
    type: 'Gaming Arena',
    location: 'Baner, Pune',
    owner: 'Ishaan Dey',
    metrics: [
      { value: '0', label: 'Manual Bookings Since Launch' },
      { value: '3×', label: 'Marketing Reach via WhatsApp' },
      { value: '18 hrs', label: 'Staff Time Saved / Week' },
      { value: '94%', label: 'Reduction in Missed Bookings' },
    ],
    quote:
      'AVA has completely changed the way Ascend Arena operates. Before Rheo, our team was manually handling every booking call, chasing payments on WhatsApp, and sending out promotions one by one. Now all of it runs automatically.',
    quoteAuthor: 'Ishaan Dey, Owner',
    built: [
      'Full booking automation via WhatsApp (AVA)',
      'Automated payment collection via Razorpay',
      'WhatsApp marketing campaigns',
      'Lead follow-up sequences',
    ],
  },
  {
    client: 'iMens Gaming',
    type: 'Gaming Centre',
    location: 'Hadapsar, Pune',
    owner: 'Gauransh Kumar',
    metrics: [
      { value: '100%', label: 'Automated Client Journey' },
      { value: '0', label: 'Missed Bookings' },
      { value: '₹38K+', label: 'Monthly Recovered Bookings' },
      { value: '< 2s', label: 'Average Response Time' },
    ],
    quote:
      'We were losing bookings simply because someone didn\'t reply on WhatsApp in time. AVA fixed that overnight. Now the entire flow happens on its own.',
    quoteAuthor: 'Gauransh Kumar, Owner',
    built: [
      'End-to-end client journey automation (inquiry → booking → payment → confirmation → reminder)',
      'Real-time slot availability updates via WhatsApp',
      'Automated CRM',
    ],
  },
];

function CaseStudyCard({ study, delay }: { study: CaseStudy; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
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
      ref={cardRef}
      className="case-card"
      style={{
        background: 'var(--ink)',
        borderRadius: '0px',
        padding: '40px 36px',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Client header */}
        <div style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              color: 'var(--warm-foam)',
              letterSpacing: '0.1em',
              margin: '0 0 4px 0',
              lineHeight: 1.2,
            }}
          >
            {study.client}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              color: 'rgba(245,240,232,0.48)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            {study.type} · {study.location}
          </p>
        </div>

        {/* Metrics chips */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          {study.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                background: 'rgba(26,53,102,0.5)',
                border: '1px solid rgba(196,162,90,0.2)',
                borderRadius: '0px',
                padding: '14px 16px',
              }}
            >
              <span
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '26px',
                  color: 'var(--gold)',
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {m.value}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px',
                  color: 'rgba(245,240,232,0.48)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  display: 'block',
                  lineHeight: 1.3,
                }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Quote block */}
        <blockquote
          style={{
            margin: '0 0 28px 0',
            padding: '20px 20px 20px 24px',
            borderLeft: '2px solid rgba(196,162,90,0.5)',
            background: 'rgba(14,31,60,0.4)',
            borderRadius: '0',
          }}
        >
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: '15px',
              color: 'var(--warm-foam)',
              lineHeight: 1.8,
              margin: '0 0 10px 0',
            }}
          >
            &ldquo;{study.quote}&rdquo;
          </p>
          <cite
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              color: 'var(--gold)',
              letterSpacing: '0.1em',
              fontStyle: 'normal',
              textTransform: 'uppercase',
            }}
          >
            — {study.quoteAuthor}
          </cite>
        </blockquote>

        {/* What we built */}
        <div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              margin: '0 0 12px 0',
            }}
          >
            WHAT WE BUILT
          </p>
          <ul style={{ listStyle: 'none', margin: '0 0 28px 0', padding: 0 }}>
            {study.built.map((item) => (
              <li
                key={item}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '13px',
                  color: 'rgba(238,232,224,0.7)',
                  lineHeight: 1.7,
                  paddingLeft: '16px',
                  position: 'relative',
                  marginBottom: '4px',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '8px',
                    width: '4px',
                    height: '4px',
                    background: 'var(--gold)',
                    borderRadius: '50%',
                  }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="/case-studies"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
              color: 'var(--crest)', textTransform: 'uppercase',
              letterSpacing: '0.25em', textDecoration: 'none',
              transition: 'color 0.2s ease, gap 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
              (e.currentTarget as HTMLElement).style.gap = '12px';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--crest)';
              (e.currentTarget as HTMLElement).style.gap = '8px';
            }}
          >
            View Full Case Study <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="case-studies"
      style={{
        background: 'var(--navy)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="casestudies-inner"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 64px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div ref={headingRef} style={{ marginBottom: '56px' }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              margin: '0 0 16px 0',
            }}
          >
            CASE STUDIES
          </p>
          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '48px',
              color: 'var(--gold)',
              letterSpacing: '0.1em',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Results that speak.
          </h2>
        </div>

        {/* Cards */}
        <div
          className="casestudies-grid"
          style={{
            display: 'flex',
            gap: '28px',
            alignItems: 'stretch',
          }}
        >
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.client} study={study} delay={i * 150} />
          ))}
        </div>
      </div>

      <style>{`
        .case-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .case-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 48px rgba(196,162,90,0.12), 0 4px 16px rgba(0,0,0,0.4);
        }
        @media (max-width: 767px) {
          .casestudies-inner {
            padding: 0 24px !important;
          }
          .casestudies-grid {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
