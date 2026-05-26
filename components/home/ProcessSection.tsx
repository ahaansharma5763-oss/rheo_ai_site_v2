'use client';

import { useEffect, useRef } from 'react';

const steps = [
  {
    num: '01',
    phase: 'Ops Audit',
    headline: 'We understand your business before we touch it.',
    body: 'A structured 45-minute discovery across five operational domains — Lead & Enquiry, Booking & Scheduling, Staff & Internal Ops, Customer Retention, and Reporting. We map every flow, identify every breakpoint, and estimate the monthly cost of each problem you have normalised.',
    output: 'Written Ops Audit Report: 5-domain scorecard, top 3 problems found, automation recommendations, quick wins you can act on this week.',
  },
  {
    num: '02',
    phase: 'Custom Design',
    headline: 'We design systems that fit how you actually operate.',
    body: 'No templates. No off-the-shelf bundles forced onto your workflow. We take what the audit reveals and design automation architecture specific to your business — your services, your customers, your team structure, your tools. You approve the blueprint before a single line is written.',
    output: 'Architecture diagram, workflow map, integration plan, and timeline before build begins.',
  },
  {
    num: '03',
    phase: 'Build & Test',
    headline: 'We build, test, and refine until it runs reliably.',
    body: 'Every system goes through a one-week live testing period in your real environment — real customers, real data, real edge cases. We stay on until it is stable. We do not hand over a system and disappear.',
    output: 'Live system, owner training session, and documentation of every workflow we built.',
  },
  {
    num: '04',
    phase: 'Maintain & Improve',
    headline: 'We are your operations partner — not a one-time vendor.',
    body: 'Monthly retainer covers ongoing maintenance, monitoring, and iterative improvements. As your business changes — new services, new staff, new verticals — the system evolves with it. You get a monthly performance report showing exactly what the automation is doing for your revenue.',
    output: 'Monthly performance report, ongoing refinements, priority support, and quarterly review.',
  },
];

function StepCard({ step, idx }: { step: typeof steps[0]; idx: number }) {
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
          }, idx * 120);
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [idx]);

  return (
    <div ref={ref} style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', position: 'relative' }}>
      {/* Left — number + connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '40px', height: '40px',
          border: '1px solid rgba(196,162,90,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: 'var(--gold)', letterSpacing: '0.1em' }}>
            {step.num}
          </span>
        </div>
        {idx < steps.length - 1 && (
          <div style={{ width: '1px', flex: 1, minHeight: '60px', background: 'linear-gradient(to bottom, rgba(196,162,90,0.3), rgba(69,153,181,0.1))', marginTop: '8px' }} />
        )}
      </div>

      {/* Right — content */}
      <div style={{ flex: 1, paddingBottom: idx < steps.length - 1 ? '48px' : '0' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'var(--crest)', letterSpacing: '0.4em', textTransform: 'uppercase', margin: '0 0 10px 0', paddingTop: '10px' }}>
          {step.phase}
        </p>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(16px, 2vw, 22px)', color: 'var(--warm-foam)', letterSpacing: '0.08em', margin: '0 0 14px 0', lineHeight: 1.25 }}>
          {step.headline}
        </h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'var(--ocean)', lineHeight: 1.8, margin: '0 0 16px 0', maxWidth: '560px' }}>
          {step.body}
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <div style={{ width: '3px', height: '3px', background: 'var(--gold)', marginTop: '7px', flexShrink: 0 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(238,232,224,0.5)', lineHeight: 1.65, margin: 0 }}>
            {step.output}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: 'var(--ink)', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 767px) {
          .process-inner { padding: 0 24px !important; }
          .process-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      {/* Corner brackets — brand detail */}
      <svg width="32" height="32" style={{ position: 'absolute', top: '4px', right: '4px' }} aria-hidden="true">
        <path d="M32,32 L32,0 L0,0" stroke="#C4A25A" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>
      <svg width="32" height="32" style={{ position: 'absolute', bottom: '4px', left: '4px' }} aria-hidden="true">
        <path d="M0,0 L0,32 L32,32" stroke="#C4A25A" strokeWidth="1" fill="none" opacity="0.4" />
      </svg>

      <div className="process-inner" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 1 }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }} className="process-grid">

          {/* Left — header + philosophy */}
          <div ref={headerRef}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.44em', margin: '0 0 16px 0' }}>
              HOW WE WORK
            </p>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 3vw, 38px)', color: 'var(--warm-foam)', letterSpacing: '0.12em', margin: '0 0 24px 0', lineHeight: 1.2 }}>
              Every system we build is custom. No templates. No assumptions.
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'var(--ocean)', lineHeight: 1.85, margin: '0 0 32px 0' }}>
              We start by understanding how your business actually operates — not how you think it operates. Most business owners are surprised by what the audit surfaces. Revenue leakage is rarely where you expect it.
            </p>

            {/* Key differentiators */}
            {[
              'We scope before we build. You know exactly what gets built and why, before any work begins.',
              'We build to your stack — Google Sheets, WhatsApp, Razorpay, Notion, Google Calendar. No new software to learn.',
              'We stay on after go-live. Monthly retainer means the system evolves as your business does.',
              'We work with SMBs across Pune and India. We understand the operational reality of running a business here.',
            ].map((point, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '1px', height: '100%', minHeight: '36px', background: 'rgba(196,162,90,0.4)', flexShrink: 0, marginTop: '3px' }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(238,232,224,0.65)', lineHeight: 1.7, margin: 0 }}>
                  {point}
                </p>
              </div>
            ))}

            <div style={{ marginTop: '36px', padding: '20px 24px', borderTop: '1px solid rgba(196,162,90,0.2)', borderBottom: '1px solid rgba(196,162,90,0.2)' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '15px', color: 'var(--warm-foam)', lineHeight: 1.75, margin: '0 0 10px 0' }}>
                &ldquo;We do not advise. We implement. And we stay until it works.&rdquo;
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', margin: 0 }}>
                — Ahaan Sharma, Founder
              </p>
            </div>
          </div>

          {/* Right — 4-step process */}
          <div>
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} idx={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
