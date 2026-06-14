'use client';

import Reveal from '@/components/home/Reveal';

export default function WhatWeBuildToward() {
  return (
    <section style={{
      padding: 'clamp(160px, 24vh, 260px) var(--rail-pad)',
      borderTop: '1px solid rgba(242,240,236,0.06)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '40px' }}>What We Are Building Toward</p>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            fontWeight: 400,
            maxWidth: '22ch',
            marginBottom: '64px',
          }}>
            A version of every business where the operator is not the bottleneck<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(17px, 1.5vw, 21px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '62ch',
            marginBottom: '32px',
          }}>
            Most modern businesses run on a dozen disconnected tools, a few sheets, and the operator&apos;s
            memory. Data sits in silos. Decisions wait for someone to pull a report. Customers slip away
            in the gaps between systems. Partners and suppliers send PDFs that nobody opens.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(17px, 1.5vw, 21px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '62ch',
            marginBottom: '32px',
          }}>
            We do not believe these businesses need another dashboard to ignore. They need
            infrastructure. A nervous system. Agentic workflows that let customers, operations,
            partners, suppliers, and manufacturers all share a single stream of intent. Custom-built.
            Owned by the business. Designed to compound.
          </p>
        </Reveal>

        <Reveal delay={600}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(17px, 1.5vw, 21px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '62ch',
            marginBottom: '32px',
          }}>
            That is what we are building, one business at a time. A quiet operating fabric for
            companies that intend to compound for decades. We are at the start of that work. There is
            a long way to go.
          </p>
        </Reveal>

        <Reveal delay={750}>
          <p style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(18px, 1.6vw, 22px)',
            lineHeight: 1.6,
            color: 'var(--warm-foam)',
            fontWeight: 400,
            maxWidth: '56ch',
            fontStyle: 'italic',
          }}>
            Every engagement begins the same way — with an honest look at where the business is and
            what it&apos;s missing. That&apos;s the audit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
