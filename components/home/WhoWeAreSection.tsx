'use client';

import { useEffect, useRef } from 'react';
import { GoldDiamond, GreekColumns } from '@/components/shared/GreekElements';

const nodes: { cx: number; cy: number; label: string }[] = [
  { cx: 60, cy: 60, label: 'n8n' },
  { cx: 200, cy: 40, label: 'API' },
  { cx: 340, cy: 80, label: 'CRM' },
  { cx: 100, cy: 180, label: 'WA' },
  { cx: 240, cy: 160, label: 'DB' },
  { cx: 350, cy: 220, label: 'AI' },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
];

function linePath(a: { cx: number; cy: number }, b: { cx: number; cy: number }) {
  const mx = (a.cx + b.cx) / 2;
  const my = (a.cy + b.cy) / 2 - 20;
  return `M${a.cx},${a.cy} Q${mx},${my} ${b.cx},${b.cy}`;
}

const statData = [
  { num: 38, suffix: '+', label: 'ACTIVE WORKFLOWS DEPLOYED' },
  { num: 2,  prefix: '< ', suffix: 's', label: 'AVERAGE AGENT RESPONSE TIME' },
  { num: 100, suffix: '%', label: 'CUSTOM-BUILT. NEVER TEMPLATED.' },
];

export default function WhoWeAreSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hasCountedRef = useRef(false);

  useEffect(() => {
    const targets = [leftRef.current, rightRef.current].filter(Boolean) as HTMLElement[];
    targets.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));

    // Stat counter animation
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCountedRef.current) {
            hasCountedRef.current = true;
            statData.forEach((stat, idx) => {
              const el = statRefs.current[idx];
              if (!el) return;
              const duration = 1400;
              const start = performance.now();
              const elRef = el;
              function tick(now: number) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * stat.num);
                elRef.textContent = (stat.prefix ?? '') + current + stat.suffix;
                if (progress < 1) requestAnimationFrame(tick);
              }
              requestAnimationFrame(tick);
            });
            statObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (leftRef.current) statObserver.observe(leftRef.current);

    return () => {
      observer.disconnect();
      statObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--ink)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Greek columns — far right decorative */}
      <div style={{
        position: 'absolute',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <GreekColumns height={180} opacity={0.06}/>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 64px',
          display: 'grid',
          gridTemplateColumns: '55% 45%',
          gap: 0,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="who-inner"
      >
        {/* LEFT */}
        <div ref={leftRef} style={{ paddingRight: '48px' }} className="who-left">
          <p
            className="label"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              margin: '0 0 16px 0',
            }}
          >
            WHO WE ARE
          </p>

          <h2
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '44px',
              color: 'var(--warm-foam)',
              lineHeight: 1.25,
              letterSpacing: '0.12em',
              margin: '0 0 24px 0',
              maxWidth: '560px',
            }}
          >
            We are an agentic AI consultancy. We don&apos;t advise — we implement.
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              color: 'rgba(238,232,224,0.75)',
              lineHeight: 1.85,
              margin: '0 0 20px 0',
              maxWidth: '520px',
            }}
          >
            Rheo AI designs and deploys end-to-end automation systems for businesses. We audit your
            operational workflows, identify systemic inefficiencies, and engineer AI-driven
            infrastructure that runs without manual intervention.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              color: 'rgba(238,232,224,0.75)',
              lineHeight: 1.85,
              margin: 0,
              maxWidth: '520px',
            }}
          >
            Our stack: multi-agent orchestration via n8n, LLM inference through the Anthropic API,
            real-time event pipelines, webhook-based integrations, and CRM-agnostic data
            synchronisation. We don&apos;t sell tools — we build the operating system your business
            runs on.
          </p>

          {/* Gold diamond divider above stat blocks */}
          <div style={{ maxWidth: '520px', marginTop: '32px', marginBottom: '8px' }}>
            <GoldDiamond/>
          </div>

          {/* Stat blocks */}
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '8px',
              flexWrap: 'wrap',
            }}
          >
            {statData.map((stat, idx) => (
              <div key={stat.label}>
                <span
                  ref={(el) => { statRefs.current[idx] = el; }}
                  className="stat-number"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '56px',
                    color: 'var(--gold)',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  {(stat.prefix ?? '') + stat.num + stat.suffix}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '11px',
                    color: 'rgba(245,240,232,0.48)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    display: 'block',
                    marginTop: '6px',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — diagram */}
        <div
          ref={rightRef}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
          className="who-right"
        >
          <svg
            viewBox="0 0 400 300"
            width="100%"
            style={{ maxWidth: '320px', display: 'block' }}
            aria-hidden="true"
          >
            <defs>
              <style>{`
                /* @keyframes flow {
                  to { stroke-dashoffset: -16; }
                }
                .flow-path {
                  stroke-dasharray: 4 4;
                  
                }
              `}</style>
            </defs>

            {/* Edges */}
            {edges.map(([a, b], i) => (
              <path
                key={i}
                style={{ strokeDasharray: "4 4", opacity: 0.4 }}
                d={linePath(nodes[a], nodes[b])}
                stroke="var(--crest)"
                strokeWidth="1"
                fill="none"
              />
            ))}

            {/* Nodes */}
            {nodes.map((n) => (
              <g key={n.label}>
                <circle
                  cx={n.cx}
                  cy={n.cy}
                  r="20"
                  fill="rgba(26,53,102,0.3)"
                  stroke="var(--prussian)"
                  strokeWidth="1"
                />
                <text
                  x={n.cx}
                  y={n.cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="var(--crest)"
                  fontSize="8"
                  fontFamily="'DM Sans', sans-serif"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .who-inner {
            grid-template-columns: 1fr !important;
            padding: 0 24px !important;
          }
          .who-left {
            padding-right: 0 !important;
          }
          .who-right {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
