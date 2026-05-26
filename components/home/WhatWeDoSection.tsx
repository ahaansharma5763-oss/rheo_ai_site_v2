'use client';

import { useEffect, useRef } from 'react';

interface Service {
  num: string;
  name: string;
  desc: string;
}

interface Category {
  label: string;
  services: Service[];
}

const categories: Category[] = [
  {
    label: 'Customer & Lead',
    services: [
      {
        num: '01',
        name: 'Speed-to-Lead Engine',
        desc: 'AI agent that replies to every WhatsApp and Instagram enquiry in under 60 seconds — day or night.',
      },
      {
        num: '02',
        name: 'Enquiry Pipeline & CRM',
        desc: 'Every lead captured, scored, and tracked from first message to closed deal — automatically.',
      },
      {
        num: '03',
        name: 'Quote Estimator Agent',
        desc: 'Guided WhatsApp conversation that collects variables and delivers an accurate quote in under 2 minutes.',
      },
    ],
  },
  {
    label: 'Bookings & Revenue',
    services: [
      {
        num: '04',
        name: 'Booking & Scheduling',
        desc: 'Full slot-booking on WhatsApp — calendar sync, confirmations, reminders, rescheduling, and advance collection.',
      },
      {
        num: '05',
        name: 'Waitlist & Slot Recovery',
        desc: 'When a customer cancels, the system instantly offers the slot to your waitlist — and fills it before you notice.',
      },
      {
        num: '06',
        name: 'Payment Follow-Up',
        desc: 'Polite, escalating payment reminders that stop automatically the moment payment is confirmed.',
      },
    ],
  },
  {
    label: 'Retention & Reputation',
    services: [
      {
        num: '07',
        name: 'Customer Re-Engagement',
        desc: 'Identifies lapsed customers at 30, 60, and 90 days — sends personalised messages in your brand voice.',
      },
      {
        num: '08',
        name: 'Post-Service Follow-Up',
        desc: 'Aftercare messages, rebooking nudges, and upsell prompts — timed precisely to your service cycle.',
      },
      {
        num: '09',
        name: 'Review & Reputation',
        desc: 'Auto-requests reviews post-visit. Unhappy customers are routed privately — your public rating is protected.',
      },
    ],
  },
  {
    label: 'Internal Operations',
    services: [
      {
        num: '10',
        name: 'Daily Ops Dashboard',
        desc: 'Morning brief and evening close delivered to your WhatsApp — bookings, revenue, no-shows, tomorrow\'s schedule.',
      },
      {
        num: '11',
        name: 'Staff Comms & Ops Bot',
        desc: 'Shift reminders, attendance tracking, daily task briefings, and internal broadcasts — all on WhatsApp.',
      },
      {
        num: '12',
        name: 'Staff Onboarding Bot',
        desc: 'SOPs and training modules delivered to new hires on WhatsApp over their first two weeks.',
      },
    ],
  },
];

function ServiceCard({ svc, delay }: { svc: Service; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.disconnect();
        }
      });
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="svc-card"
      style={{
        padding: '28px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(196,162,90,0.08)',
        borderRight: '1px solid rgba(196,162,90,0.06)',
        cursor: 'default',
      }}
    >
      <div className="svc-bar" />
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '10px',
        color: 'var(--gold)',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        margin: '0 0 16px 0',
      }}>
        {svc.num}
      </p>
      <h3 style={{
        fontFamily: 'Georgia, serif',
        fontSize: '17px',
        color: 'var(--warm-foam)',
        letterSpacing: '0.06em',
        margin: '0 0 12px 0',
        lineHeight: 1.3,
      }}>
        {svc.name}
      </h3>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        color: 'rgba(245,240,232,0.45)',
        lineHeight: 1.7,
        margin: 0,
      }}>
        {svc.desc}
      </p>
    </div>
  );
}

export default function WhatWeDoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [headerRef.current, footerRef.current].forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setTimeout(() => {
              el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, i * 80);
            obs.disconnect();
          }
        });
      }, { threshold: 0.1 });
      obs.observe(el);
      return () => obs.disconnect();
    });
  }, []);

  return (
    <section id="services" style={{ background: 'var(--navy)', padding: '120px 0', position: 'relative' }}>
      <style>{`
        .svc-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0%;
          background: var(--gold);
          transition: width 300ms ease;
        }
        .svc-card:hover .svc-bar { width: 100%; }
        .svc-card:last-child { border-right: none; }
        @media (max-width: 767px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .svc-card { border-right: none !important; }
          .whatwedo-inner { padding: 0 24px !important; }
          .svc-callout-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="whatwedo-inner" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 64px' }}>

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px', color: 'var(--gold)',
            textTransform: 'uppercase', letterSpacing: '0.44em',
            margin: '0 0 20px 0',
          }}>
            What We Do
          </p>
          <h2 style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            color: 'var(--warm-foam)',
            letterSpacing: '0.1em',
            margin: '0 0 20px 0',
            lineHeight: 1.15,
            maxWidth: '680px',
          }}>
            We automate the space between data and decision.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px',
            color: 'rgba(245,240,232,0.45)',
            lineHeight: 1.85,
            maxWidth: '520px',
            margin: 0,
          }}>
            Twelve production-ready automation systems — each one custom-built to your business after a structured Ops Audit. No templates. Every system is scoped to how you actually operate.
          </p>
        </div>

        {/* Category groups */}
        {categories.map((cat, ci) => (
          <div key={cat.label} style={{ marginBottom: '2px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '10px 0 14px',
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '9px', color: 'rgba(196,162,90,0.40)',
                letterSpacing: '0.45em', textTransform: 'uppercase',
              }}>
                {cat.label}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(196,162,90,0.08)' }} />
            </div>
            <div className="svc-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0',
            }}>
              {cat.services.map((svc, si) => (
                <ServiceCard key={svc.num} svc={svc} delay={ci * 30 + si * 60} />
              ))}
            </div>
          </div>
        ))}

        {/* Full Ops Stack + Ops Audit */}
        <div ref={footerRef} className="svc-callout-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          marginTop: '40px',
          borderTop: '1px solid rgba(196,162,90,0.2)',
        }}>
          {/* Full Ops Stack */}
          <div style={{
            padding: '40px 36px',
            borderRight: '1px solid rgba(196,162,90,0.1)',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gold)' }} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px', color: 'var(--gold)',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              margin: '0 0 14px 0',
            }}>
              13 · Full Ops Stack
            </p>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '22px', color: 'var(--warm-foam)',
              letterSpacing: '0.08em', margin: '0 0 14px 0',
            }}>
              Everything, integrated.
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px', color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.75, margin: 0,
            }}>
              All twelve systems connected into a unified infrastructure. Customer data flows from booking to CRM to re-engagement to reviews. Nothing siloed. Nothing manually entered. Built over 4–6 weeks with a 30-day hypercare period included.
            </p>
          </div>

          {/* Ops Audit */}
          <div style={{ padding: '40px 36px', position: 'relative' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px', color: 'var(--crest)',
              letterSpacing: '0.4em', textTransform: 'uppercase',
              margin: '0 0 14px 0',
            }}>
              14 · Ops Audit — Start here
            </p>
            <h3 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '22px', color: 'var(--warm-foam)',
              letterSpacing: '0.08em', margin: '0 0 14px 0',
            }}>
              We understand your business before we touch it.
            </h3>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px', color: 'rgba(245,240,232,0.45)',
              lineHeight: 1.75, margin: '0 0 24px 0',
            }}>
              A structured 45-minute discovery call. A written report identifying your top automation opportunities with estimated monthly impact. Every custom engagement starts here.
            </p>
            <a
              href="https://calendly.com/ahaan-rheoai/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px', letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                background: 'var(--gold)',
                padding: '10px 22px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
            >
              Book the Audit →
            </a>
          </div>
        </div>

        {/* Custom work note */}
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          color: 'rgba(245,240,232,0.20)',
          letterSpacing: '0.25em',
          textAlign: 'center',
          marginTop: '32px',
          textTransform: 'uppercase',
        }}>
          Don't see your use case? Every system we build is custom.
        </p>
      </div>
    </section>
  );
}
