'use client';

import Nav from '@/components/shared/Nav';
import Footer from '@/components/shared/Footer';
import { useEffect, useRef } from 'react';

function RevealDiv({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          obs.disconnect();
        }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} style={style}>{children}</div>;
}

const goldLine = { width: '40px', height: '1px', background: 'var(--gold)', margin: '28px 0' };

export default function CaseStudiesPage() {
  return (
    <main style={{ background: 'var(--ink)', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section className="hero-section" style={{
        position: 'relative', paddingTop: '160px', paddingBottom: '80px',
        textAlign: 'center', overflow: 'hidden', background: 'transparent',
      }}>
        <div style={{ position: 'relative', zIndex: 2, padding: '0 32px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
            color: 'var(--gold)', textTransform: 'uppercase',
            letterSpacing: '0.44em', margin: '0 0 16px 0',
          }}>CASE STUDIES</p>
          <h1 style={{
            fontFamily: 'Georgia, serif', fontSize: 'clamp(40px, 6vw, 72px)',
            color: 'var(--warm-foam)', letterSpacing: '0.12em',
            margin: '0 0 20px 0', lineHeight: 1.15,
          }}>Results that speak.</h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '16px',
            color: 'rgba(238,232,224,0.65)', maxWidth: '560px',
            margin: '0 auto', lineHeight: 1.8, letterSpacing: '0.04em',
          }}>
            Real businesses. Real numbers. We don&apos;t guess — we measure every outcome we deploy.
          </p>
        </div>
      </section>

      {/* ── ASCEND ARENA ── */}
      <CaseStudyDetail
        index="01"
        client="Ascend Arena"
        type="Gaming Arena"
        location="India"
        owner="Ishaan Dey"
        tagline="From manual chaos to fully automated operations in 14 days."
        color="var(--crest)"
        problem={`Ascend Arena was handling every booking manually — staff answered WhatsApp messages, manually confirmed time slots, chased customers for payments, and sent promotional messages one-by-one. With peak demand on weekends, missed messages meant missed revenue. A single missed booking during peak hours cost ₹1,400–₹2,800. With no follow-up system, leads went cold in minutes.`}
        solution={`Rheo AI deployed AVA — a multi-agent WhatsApp automation system — integrated directly with Ascend Arena's slot management and Razorpay. AVA handles the entire booking journey from first inquiry to post-game review request. A parallel marketing agent runs broadcast campaigns and nurtures existing customers with personalised offers. All systems sync to a live CRM dashboard.`}
        timeline={[
          { day: 'Day 1–2',   action: 'Operations audit, workflow mapping, Razorpay + WhatsApp API setup' },
          { day: 'Day 3–6',   action: 'AVA booking agent deployed, slot management integration, test cycle' },
          { day: 'Day 7–10',  action: 'Marketing automation, lead capture flow, re-engagement sequences live' },
          { day: 'Day 11–14', action: 'Full handover, staff training, monitoring dashboard activated' },
        ]}
        metrics={[
          { value: '0',      label: 'Manual bookings handled since launch', detail: 'Every single booking flows through AVA — no human intervention required.' },
          { value: '94%',    label: 'Reduction in missed bookings', detail: 'Response time dropped from 15–30 minutes to under 2 seconds.' },
          { value: '18 hrs', label: 'Staff hours saved per week', detail: 'Equates to freeing up ~2 full working days every week.' },
          { value: '3×',     label: 'Marketing reach via WhatsApp', detail: 'Broadcast campaigns reach 3× more customers with 0 additional staff effort.' },
          { value: '₹1,400+', label: 'Average booking value protected', detail: 'Each automated booking prevents a potential revenue loss.' },
          { value: '100%',   label: 'Payment collection rate post-booking', detail: 'Razorpay link sent automatically; slot held only on payment receipt.' },
        ]}
        quote="AVA has completely changed the way Ascend Arena operates. Before Rheo, our team was manually handling every booking call, chasing payments on WhatsApp, and sending out promotions one by one. Now all of it runs automatically."
        quoteAuthor="Ishaan Dey, Owner — Ascend Arena"
        built={[
          'AVA WhatsApp booking agent — natural language slot confirmation, hold, and cancellation',
          'Razorpay payment link generation triggered automatically on booking confirmation',
          'Automated 15-minute slot-hold with payment reminder (×3 follow-up)',
          'WhatsApp broadcast marketing campaigns — weekly promos, flash offers, milestone rewards',
          'Lead re-engagement sequence for users who enquired but didn\'t book',
          'Real-time CRM dashboard — bookings, revenue, and customer lifetime tracking',
          'Post-game review request via WhatsApp (Google + Instagram)',
        ]}
      />

      {/* ── IMENS GAMING ── */}
      <CaseStudyDetail
        index="02"
        client="iMens Gaming"
        type="Gaming Centre"
        location="India"
        owner="Gauransh Kumar"
        tagline="Zero missed bookings. Entire client journey automated. Done."
        color="var(--gold)"
        dark
        problem={`iMens Gaming was losing bookings due to delayed WhatsApp responses. In a competitive local market, customers would message multiple arenas simultaneously — and book with whoever responded first. Staff were occupied during peak hours, leaving messages unread for 20–40 minutes. Roughly ₹38,000 in booking revenue was estimated lost monthly due to slow follow-up. CRM was a spreadsheet. Reminders were manual. Cancellations created gaps that were never filled.`}
        solution={`Rheo AI built a full end-to-end automation pipeline covering every touchpoint from first contact to post-visit review. AVA responds instantly, qualifies the lead, checks availability, confirms the slot, sends a payment link, and fires reminder messages 1 hour and 15 minutes before the booking. Cancellation flows rebook available slots automatically. All activity is logged and synced to a live operations dashboard.`}
        timeline={[
          { day: 'Day 1–3',   action: 'Full audit: booking gaps identified, revenue leakage quantified, WhatsApp API configured' },
          { day: 'Day 4–7',   action: 'AVA deployed with slot availability integration, payment automation, confirmation flows' },
          { day: 'Day 8–11',  action: 'Reminder sequences, cancellation handling, re-booking automation live' },
          { day: 'Day 12–14', action: 'CRM sync, dashboard, review collection, handover completed' },
        ]}
        metrics={[
          { value: '100%',   label: 'Automated client journey', detail: 'Inquiry → Booking → Payment → Confirmation → Reminder → Review — zero manual steps.' },
          { value: '0',      label: 'Missed bookings post-launch', detail: 'AVA responds in under 2 seconds, capturing every lead before competitors can.' },
          { value: '₹38K+',  label: 'Monthly revenue recovered', detail: 'Based on pre-launch revenue leakage audit; now fully protected by automation.' },
          { value: '< 2s',   label: 'Average AVA response time', detail: '24/7, 365 days a year — no off days, no delay.' },
          { value: '40 min', label: 'Avg. response delay eliminated', detail: 'Staff were taking 20–40 mins during peak hours; now response is instant.' },
          { value: '4.6★',   label: 'Google rating after review automation', detail: 'Automated post-visit review requests increased ratings within 6 weeks.' },
        ]}
        quote="We were losing bookings simply because someone didn't reply on WhatsApp in time. AVA fixed that overnight. Now the entire flow happens on its own."
        quoteAuthor="Gauransh Kumar, Owner — iMens Gaming"
        built={[
          'AVA end-to-end client journey: inquiry → slot check → booking → Razorpay payment → confirmation',
          'Pre-booking reminders: automated WhatsApp message 1 hour and 15 minutes before slot',
          'Cancellation flow with automatic slot re-opening and re-booking offer',
          'Real-time slot availability pushed to AVA — no double-bookings possible',
          'CRM auto-population: every customer contact, booking history, and spend logged',
          'Post-visit review request via WhatsApp (Google Maps link, 2-tap flow)',
          'Weekly revenue + occupancy dashboard for owner visibility',
        ]}
      />

      {/* CTA */}
      <section style={{
        textAlign: 'center', padding: '120px 32px',
        borderTop: '1px solid rgba(69,153,181,0.12)',
      }}>
        <RevealDiv>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
            color: 'var(--gold)', textTransform: 'uppercase',
            letterSpacing: '0.44em', margin: '0 0 20px 0',
          }}>READY?</p>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontSize: 'clamp(32px, 4vw, 56px)',
            color: 'var(--warm-foam)', letterSpacing: '0.12em',
            margin: '0 0 16px 0', lineHeight: 1.2,
          }}>Your business is next.</h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '15px',
            color: 'rgba(238,232,224,0.6)', margin: '0 0 40px 0',
            lineHeight: 1.8, maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto',
          }}>
            We audit your operations, quantify the revenue leakage, and deploy in 14 days.
          </p>
          <a
            href="https://calendly.com/ahaan-rheoai/30min"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
              color: 'var(--ink)', background: 'var(--gold)',
              textTransform: 'uppercase', letterSpacing: '0.3em',
              padding: '16px 40px', borderRadius: '2px',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.opacity = '0.85'; (e.target as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Book a Free Audit
          </a>
        </RevealDiv>
      </section>

      <Footer />
    </main>
  );
}

interface MetricDetail {
  value: string;
  label: string;
  detail: string;
}
interface TimelineStep {
  day: string;
  action: string;
}

function CaseStudyDetail({
  index, client, type, location, tagline, color, dark = false,
  problem, solution, timeline, metrics, quote, quoteAuthor, built,
}: {
  index: string; client: string; type: string; location: string; tagline: string;
  color: string; dark?: boolean; owner: string;
  problem: string; solution: string;
  timeline: TimelineStep[]; metrics: MetricDetail[];
  quote: string; quoteAuthor: string; built: string[];
}) {
  const bg = dark ? 'rgba(13,31,60,0.6)' : 'transparent';

  return (
    <article style={{ padding: '100px 0', borderTop: `1px solid ${color === 'var(--gold)' ? 'rgba(196,162,90,0.15)' : 'rgba(69,153,181,0.12)'}`, background: bg }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 64px' }} className="cs-inner">

        {/* Header */}
        <RevealDiv style={{ marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p style={{
                fontFamily: 'Georgia, serif', fontSize: '80px', color,
                opacity: 0.12, lineHeight: 1, margin: '0 0 -20px 0', letterSpacing: '0.05em',
              }}>{index}</p>
              <h2 style={{
                fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 4vw, 56px)',
                color: 'var(--warm-foam)', letterSpacing: '0.1em',
                margin: '0 0 8px 0', lineHeight: 1.1, position: 'relative',
              }}>{client}</h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                color, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 20px 0',
              }}>{type} · {location}</p>
              <p style={{
                fontFamily: 'Georgia, serif', fontStyle: 'italic',
                fontSize: '20px', color: 'rgba(238,232,224,0.65)',
                lineHeight: 1.5, margin: 0, maxWidth: '480px',
              }}>{tagline}</p>
            </div>

            {/* Quick stats — top 3 */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px',
              background: 'rgba(69,153,181,0.15)', border: '1px solid rgba(69,153,181,0.15)',
              borderRadius: '8px', overflow: 'hidden', flexShrink: 0,
            }} className="cs-topstats">
              {metrics.slice(0, 3).map(m => (
                <div key={m.label} style={{
                  padding: '24px 20px', background: 'rgba(7,16,30,0.6)', textAlign: 'center',
                }}>
                  <span style={{
                    fontFamily: 'Georgia, serif', fontSize: '32px',
                    color, display: 'block', lineHeight: 1, marginBottom: '6px',
                  }}>{m.value}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
                    color: 'rgba(245,240,232,0.48)', textTransform: 'uppercase',
                    letterSpacing: '0.15em', display: 'block', lineHeight: 1.4,
                  }}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealDiv>

        {/* Problem / Solution */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '64px' }} className="cs-grid">
          <RevealDiv delay={100}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
              color: 'rgba(126,200,227,0.6)', textTransform: 'uppercase',
              letterSpacing: '0.35em', margin: '0 0 14px 0',
            }}>THE PROBLEM</p>
            <div style={goldLine} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
              color: 'rgba(238,232,224,0.72)', lineHeight: 1.9, margin: 0,
            }}>{problem}</p>
          </RevealDiv>
          <RevealDiv delay={200}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
              color: 'rgba(126,200,227,0.6)', textTransform: 'uppercase',
              letterSpacing: '0.35em', margin: '0 0 14px 0',
            }}>OUR SOLUTION</p>
            <div style={goldLine} />
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
              color: 'rgba(238,232,224,0.72)', lineHeight: 1.9, margin: 0,
            }}>{solution}</p>
          </RevealDiv>
        </div>

        {/* Deployment Timeline */}
        <RevealDiv delay={150} style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
            color: 'rgba(126,200,227,0.6)', textTransform: 'uppercase',
            letterSpacing: '0.35em', margin: '0 0 28px 0',
          }}>DEPLOYMENT TIMELINE — 14 DAYS</p>
          <div style={{ display: 'flex', gap: 0, position: 'relative' }} className="cs-timeline">
            {timeline.map((step, i) => (
              <div key={i} style={{ flex: 1, paddingRight: '16px', position: 'relative' }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: color, marginBottom: '12px',
                  boxShadow: `0 0 12px ${color === 'var(--gold)' ? 'rgba(196,162,90,0.5)' : 'rgba(196,162,90,0.40)'}`,
                }} />
                {i < timeline.length - 1 && (
                  <div style={{
                    position: 'absolute', top: '4px', left: '10px',
                    right: 0, height: '1px',
                    background: 'rgba(69,153,181,0.2)',
                  }} />
                )}
                <p style={{
                  fontFamily: 'Georgia, serif', fontSize: '13px',
                  color, margin: '0 0 6px 0', letterSpacing: '0.1em',
                }}>{step.day}</p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                  color: 'rgba(238,232,224,0.6)', lineHeight: 1.6, margin: 0,
                }}>{step.action}</p>
              </div>
            ))}
          </div>
        </RevealDiv>

        {/* All metrics */}
        <RevealDiv delay={200} style={{ marginBottom: '64px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
            color: 'rgba(126,200,227,0.6)', textTransform: 'uppercase',
            letterSpacing: '0.35em', margin: '0 0 24px 0',
          }}>MEASURED OUTCOMES</p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            background: 'rgba(69,153,181,0.12)',
          }} className="cs-metrics">
            {metrics.map((m, i) => (
              <div key={i} style={{
                background: 'rgba(7,16,30,0.7)', padding: '28px 24px',
                transition: 'background 0.2s ease',
              }}
                className="cs-metric-cell"
              >
                <span style={{
                  fontFamily: 'Georgia, serif', fontSize: '40px',
                  color, display: 'block', lineHeight: 1, marginBottom: '8px',
                }}>{m.value}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '11px',
                  color: 'rgba(245,240,232,0.48)', textTransform: 'uppercase',
                  letterSpacing: '0.15em', display: 'block', marginBottom: '8px',
                }}>{m.label}</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
                  color: 'rgba(238,232,224,0.5)', lineHeight: 1.6, display: 'block',
                }}>{m.detail}</span>
              </div>
            ))}
          </div>
        </RevealDiv>

        {/* Quote */}
        <RevealDiv delay={100} style={{ marginBottom: '64px' }}>
          <blockquote style={{
            margin: 0, padding: '32px 36px',
            borderLeft: `3px solid ${color}`,
            background: 'rgba(14,31,60,0.5)',
            borderRadius: '0 12px 12px 0',
          }}>
            <p style={{
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: '20px', color: 'var(--warm-foam)',
              lineHeight: 1.8, margin: '0 0 16px 0',
            }}>&ldquo;{quote}&rdquo;</p>
            <cite style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '12px',
              color, letterSpacing: '0.12em', fontStyle: 'normal', textTransform: 'uppercase',
            }}>— {quoteAuthor}</cite>
          </blockquote>
        </RevealDiv>

        {/* What we built */}
        <RevealDiv delay={150}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: '10px',
            color: 'rgba(126,200,227,0.6)', textTransform: 'uppercase',
            letterSpacing: '0.35em', margin: '0 0 20px 0',
          }}>WHAT WE BUILT</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="cs-built">
            {built.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                padding: '14px 16px',
                background: 'rgba(26,53,102,0.25)',
                border: '1px solid rgba(69,153,181,0.12)',
                borderRadius: '6px',
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: color, flexShrink: 0, marginTop: '6px',
                }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: '13px',
                  color: 'rgba(238,232,224,0.72)', lineHeight: 1.6,
                }}>{item}</span>
              </div>
            ))}
          </div>
        </RevealDiv>
      </div>

      <style>{`
        .cs-metric-cell:hover { background: rgba(26,53,102,0.5) !important; }
        @media (max-width: 768px) {
          .cs-inner { padding: 0 24px !important; }
          .cs-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .cs-metrics { grid-template-columns: 1fr !important; }
          .cs-built { grid-template-columns: 1fr !important; }
          .cs-topstats { grid-template-columns: 1fr !important; }
          .cs-timeline { flex-direction: column !important; gap: 24px !important; }
        }
      `}</style>
    </article>
  );
}
