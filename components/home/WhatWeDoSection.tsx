'use client';

import { useEffect, useRef } from 'react';

interface Service {
  num: string;
  name: string;
  desc: string;
  setup: string;
  monthly: string;
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
        setup: '₹6K–10K',
        monthly: '₹4K–6K/mo',
      },
      {
        num: '02',
        name: 'Enquiry Pipeline & CRM',
        desc: 'Every lead captured, scored, and tracked from first message to closed deal — automatically.',
        setup: '₹5K–8K',
        monthly: '₹3K–4K/mo',
      },
      {
        num: '03',
        name: 'Quote Estimator Agent',
        desc: 'AI-powered WhatsApp bot that collects variables and delivers an accurate quote in under 2 minutes.',
        setup: '₹7K–12K',
        monthly: '₹3.5K–5K/mo',
      },
    ],
  },
  {
    label: 'Bookings & Revenue',
    services: [
      {
        num: '04',
        name: 'Booking & Scheduling',
        desc: 'Full slot-booking on WhatsApp — calendar sync, confirmations, reminders, rescheduling, and Razorpay advances.',
        setup: '₹7K–12K',
        monthly: '₹4K–6K/mo',
      },
      {
        num: '05',
        name: 'Waitlist & Slot Recovery',
        desc: 'When a customer cancels, the system instantly offers the slot to your waitlist — and fills it before you notice.',
        setup: '₹3K–4.5K',
        monthly: '₹2K/mo',
      },
      {
        num: '06',
        name: 'Payment Follow-Up',
        desc: 'Polite, escalating payment reminders on WhatsApp — stops automatically the moment payment is confirmed.',
        setup: '₹3K–4.5K',
        monthly: '₹2K/mo',
      },
    ],
  },
  {
    label: 'Retention & Reputation',
    services: [
      {
        num: '07',
        name: 'Customer Re-Engagement',
        desc: 'Identifies lapsed customers (30/60/90 days) and sends personalised re-engagement messages in your brand voice.',
        setup: '₹5K–7K',
        monthly: '₹3K/mo',
      },
      {
        num: '08',
        name: 'Post-Service Follow-Up',
        desc: 'Aftercare messages, rebooking nudges, and upsell prompts — timed precisely to your service cycle.',
        setup: '₹3.5K–5K',
        monthly: '₹2.5K/mo',
      },
      {
        num: '09',
        name: 'Review & Reputation',
        desc: 'Auto-requests reviews post-visit. Unhappy customers are routed privately — your Google rating is protected.',
        setup: '₹3K–4K',
        monthly: '₹2K/mo',
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
        setup: '₹3.5K–5K',
        monthly: '₹2.5K/mo',
      },
      {
        num: '11',
        name: 'Staff Comms & Ops Bot',
        desc: 'Shift reminders, attendance tracking, daily task briefings, and internal broadcasts — all on WhatsApp.',
        setup: '₹4K–6K',
        monthly: '₹2.5K/mo',
      },
      {
        num: '12',
        name: 'Staff Onboarding Bot',
        desc: 'SOPs, training modules, and on-demand FAQs delivered to new hires on WhatsApp over their first two weeks.',
        setup: '₹5K–8K',
        monthly: '₹1.5K/mo',
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
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="svc-card"
      style={{
        background: 'rgba(13,31,60,0.6)',
        borderTop: '1px solid rgba(196,162,90,0.15)',
        padding: '24px 20px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      <div className="svc-bar" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          {svc.num}
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', color: 'rgba(69,153,181,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'right', lineHeight: 1.5 }}>
          {svc.setup}<br />{svc.monthly}
        </span>
      </div>
      <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: 'var(--warm-foam)', letterSpacing: '0.08em', margin: '0 0 10px 0', lineHeight: 1.25 }}>
        {svc.name}
      </h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--ocean)', lineHeight: 1.65, margin: 0 }}>
        {svc.desc}
      </p>
    </div>
  );
}

function CategoryGroup({ cat, baseDelay }: { cat: Category; baseDelay: number }) {
  const labelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    el.style.opacity = '0';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.transition = 'opacity 0.5s ease';
          el.style.opacity = '1';
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ marginBottom: '4px' }}>
      <div ref={labelRef} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '0', padding: '0 0 12px 0', borderBottom: '1px solid rgba(69,153,181,0.12)' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'var(--crest)', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.7 }}>
          {cat.label}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(69,153,181,0.08)' }} />
      </div>
      <div className="svc-grid">
        {cat.services.map((svc, i) => (
          <ServiceCard key={svc.num} svc={svc} delay={baseDelay + i * 80} />
        ))}
      </div>
    </div>
  );
}

export default function WhatWeDoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [headerRef.current, stackRef.current].forEach((el, idx) => {
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
            }, idx * 100);
            obs.disconnect();
          }
        });
      }, { threshold: 0.1 });
      obs.observe(el);
      return () => obs.disconnect();
    });
  }, []);

  return (
    <section id="services" style={{ background: 'var(--navy)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        .svc-bar {
          position: absolute;
          bottom: 0; left: 0;
          height: 1px; width: 0%;
          background: var(--gold);
          transition: width 280ms ease;
        }
        .svc-card:hover .svc-bar { width: 100%; }
        .svc-card:hover { background: rgba(26,53,102,0.5) !important; }
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-left: 1px solid rgba(69,153,181,0.1);
          border-right: 1px solid rgba(69,153,181,0.1);
          margin-bottom: 0;
        }
        .svc-card { border-right: 1px solid rgba(69,153,181,0.08); }
        .svc-card:last-child { border-right: none; }
        .svc-note-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin-top: 4px;
          border: 1px solid rgba(196,162,90,0.2);
        }
        @media (max-width: 767px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .svc-card { border-right: none !important; border-bottom: 1px solid rgba(69,153,181,0.08); }
          .svc-note-grid { grid-template-columns: 1fr !important; }
          .whatwedo-inner { padding: 0 24px !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <div className="whatwedo-inner" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '56px' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.44em', margin: '0 0 16px 0' }}>
            WHAT WE DO
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', color: 'var(--warm-foam)', letterSpacing: '0.12em', margin: '0 0 20px 0', lineHeight: 1.2, maxWidth: '700px' }}>
            We automate the space between data and decision.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--ocean)', lineHeight: 1.85, maxWidth: '560px', margin: 0 }}>
            Twelve production-ready automation systems — each one custom-built to your business after a structured Ops Audit. No templates. No guesswork. Every system is scoped to how you actually operate.
          </p>
        </div>

        {/* Category groups */}
        {categories.map((cat, i) => (
          <CategoryGroup key={cat.label} cat={cat} baseDelay={i * 40} />
        ))}

        {/* Stack + Audit callout */}
        <div ref={stackRef} className="svc-note-grid" style={{ marginTop: '32px' }}>
          {/* Full Ops Stack */}
          <div style={{ padding: '32px 28px', borderRight: '1px solid rgba(196,162,90,0.2)', background: 'rgba(196,162,90,0.04)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gold)' }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              13. Full Ops Stack
            </p>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: 'var(--warm-foam)', letterSpacing: '0.08em', margin: '0 0 12px 0' }}>
              Everything, integrated.
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--ocean)', lineHeight: 1.7, margin: '0 0 20px 0' }}>
              All twelve systems connected into a single unified infrastructure — customer data flows from booking to CRM to re-engagement to reviews. Nothing siloed. Nothing manually entered. Built over 4–6 weeks with a 30-day hypercare period.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(196,162,90,0.6)', letterSpacing: '0.2em' }}>
              ₹20K–40K setup · ₹10K–18K/month
            </p>
          </div>

          {/* Ops Audit */}
          <div style={{ padding: '32px 28px', background: 'rgba(7,16,30,0.4)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(196,162,90,0.3)' }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'var(--crest)', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
              14. Ops Audit — Start here
            </p>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', color: 'var(--warm-foam)', letterSpacing: '0.08em', margin: '0 0 12px 0' }}>
              We understand your business before we touch it.
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'var(--ocean)', lineHeight: 1.7, margin: '0 0 20px 0' }}>
              A 45-minute structured discovery call, a walkthrough of your current tools and workflows, and a written report identifying your top 3–5 highest-ROI automation opportunities with estimated monthly impact. Every custom engagement starts here.
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(196,162,90,0.6)', letterSpacing: '0.2em', margin: 0 }}>
                ₹1,500 standalone · Free for retainer clients
              </p>
              <a
                href="https://calendly.com/ahaan-rheoai/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px',
                  color: 'var(--ink)',
                  background: 'var(--gold)',
                  padding: '7px 18px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'background 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gold)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--ink)'; }}
              >
                Book the Audit →
              </a>
            </div>
          </div>
        </div>

        {/* Custom work note */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(126,200,227,0.35)', letterSpacing: '0.2em', textAlign: 'center', marginTop: '28px', textTransform: 'uppercase' }}>
          Don't see your use case? Every system we build is custom. Tell us the problem — we'll design the solution.
        </p>
      </div>
    </section>
  );
}
