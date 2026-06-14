'use client';

import Reveal from './Reveal';
import WaveField from '@/components/ui/wave-field';

type CapabilityArea = {
  num: string;
  outcome: string;
  realm: string;
  pain: string;
  body: string;
  examples: string[];
  emerging?: boolean;
};

const AREAS: CapabilityArea[] = [
  {
    num: '01',
    outcome: 'Revenue Recovery',
    realm: 'Customer Intelligence · the client-facing layer',
    pain: 'Leads and bookings you have already paid to acquire are falling through the cracks.',
    body:
      'The agentic layer that meets every prospect and customer. It listens, qualifies, quotes, books, and follows up — always on, always in your tone, never the bottleneck.',
    examples: [
      'Instant lead response, day or night',
      'Quoting and booking, end to end',
      'Multi-touch nurture for leads not ready today',
      'Enquiry pipeline that updates itself',
    ],
  },
  {
    num: '02',
    outcome: 'Operations Freedom',
    realm: 'Operations Intelligence · the internal layer',
    pain: 'Owner and staff spending hours on tasks intelligence should handle.',
    body:
      'The intelligent workflows that coordinate your team without group chats or guesswork. Staff briefed and tracked, invoices that collect themselves, the business running whether you are in the room or not.',
    examples: [
      'Staff briefing and shift handover',
      'Payment follow-up and collections',
      'New-hire onboarding that remembers everything',
      'Internal ops bot for the whole team',
    ],
  },
  {
    num: '03',
    outcome: 'Revenue Protection',
    realm: 'Network Intelligence · partners, suppliers, manufacturers',
    pain: 'Revenue already earned is leaking through lapsed customers and missed handoffs.',
    body:
      'Most businesses are nodes in a wider network. Partners refer, suppliers ship, customers lapse. We keep those relationships in sync and catch revenue before it walks out the door.',
    examples: [
      'Referral engine, tracked end to end',
      'Re-engagement before customers churn',
      'Supplier and partner sync pipelines',
      'Reviews and reputation, automated',
    ],
    emerging: true,
  },
  {
    num: '04',
    outcome: 'Intelligence Advantage',
    realm: 'Decision Intelligence · the layer that knows',
    pain: 'Decisions made without real-time visibility into what is actually happening.',
    body:
      'The diagnostic and reporting layer that turns the operating fabric into clarity. A morning brief on what matters, a close-of-day on what moved, an audit that shows where the next leverage point lives.',
    examples: [
      'Daily owner briefing',
      'Close-of-day performance summary',
      'Lead scoring and priority routing',
      'Ops Audit — where the leverage is',
    ],
  },
];

export default function Capabilities() {
  return (
    <section id="work" style={{
      padding: 'var(--section-gap) var(--rail-pad)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <WaveField variant="corner-left" shape="ripple" colorFront="#4599B5" opacity={0.34} speed={0.26} />
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            What We Solve
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(34px, 5vw, 64px)',
            lineHeight: 1.08,
            letterSpacing: '-0.022em',
            color: 'var(--fg)',
            fontWeight: 600,
            maxWidth: '20ch',
            marginBottom: '32px',
          }}>
            Clients do not buy systems. They buy outcomes.
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(16px, 1.4vw, 19px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '64ch',
            marginBottom: 'clamp(72px, 10vh, 120px)',
          }}>
            Four outcomes, one operating fabric. Most engagements start with one and expand outward as
            the fabric matures. The Ops Audit tells you exactly which one to start with.
          </p>
        </Reveal>

        {AREAS.map((area, i) => (
          <div key={area.num} style={{
            paddingTop: 'clamp(56px, 8vh, 88px)',
            borderTop: '1px solid rgba(242,240,236,0.08)',
            marginBottom: 'clamp(48px, 7vh, 72px)',
          }}>
            <Reveal delay={i * 60}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.6fr)',
                gap: 'clamp(28px, 5vw, 72px)',
                alignItems: 'baseline',
              }}
              className="cap-head">
                <div>
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '12px',
                    color: 'var(--gold)',
                    letterSpacing: '0.4em',
                    marginBottom: '18px',
                    fontWeight: 500,
                  }}>
                    {area.num}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(26px, 3.4vw, 42px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.018em',
                    color: 'var(--fg)',
                    fontWeight: 600,
                    marginBottom: '14px',
                  }}>
                    {area.outcome}<span style={{ color: 'var(--gold)' }}>.</span>
                  </h3>
                  <div style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '11px',
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'var(--crest)',
                    fontWeight: 500,
                    lineHeight: 1.6,
                  }}>
                    {area.realm}
                    {area.emerging && (
                      <span style={{ color: 'var(--foam)', opacity: 0.7 }}> &nbsp;· emerging</span>
                    )}
                  </div>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(18px, 1.7vw, 22px)',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    color: 'var(--warm-foam)',
                    fontWeight: 400,
                    marginBottom: '20px',
                    maxWidth: '52ch',
                  }}>
                    {area.pain}
                  </p>
                  <p style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 'clamp(15px, 1.3vw, 17px)',
                    lineHeight: 1.75,
                    color: 'var(--fg-mute)',
                    fontWeight: 300,
                    maxWidth: '60ch',
                    marginBottom: '28px',
                  }}>
                    {area.body}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}>
                    {area.examples.map(ex => (
                      <span key={ex} style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '12.5px',
                        color: 'var(--muted-cream)',
                        fontWeight: 300,
                        padding: '8px 16px',
                        border: '1px solid rgba(46,107,142,0.3)',
                        borderRadius: '999px',
                        background: 'rgba(11,23,41,0.4)',
                      }}>
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div style={{
            marginTop: 'clamp(64px, 10vh, 96px)',
            padding: '40px 48px',
            background: 'rgba(15,30,54,0.45)',
            border: '1px solid rgba(196,162,90,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 600,
                marginBottom: '12px',
              }}>
                Not sure which outcome to start with?
              </p>
              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(20px, 2vw, 26px)',
                color: 'var(--warm-foam)',
                fontWeight: 400,
                lineHeight: 1.3,
                maxWidth: '44ch',
              }}>
                The Ops Audit scores your business across all four and tells you exactly where the leverage is.
              </p>
            </div>
            <a
              href="https://audit.rheoai.co.in"
              target="_blank"
              rel="noreferrer"
              className="gold-bg"
              style={{
                color: 'var(--bg)',
                padding: '16px 36px',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                display: 'inline-block',
                transition: 'box-shadow 0.4s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(240,208,128,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start with an Ops Audit →
            </a>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cap-head { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
