'use client';

import Reveal from './Reveal';

const STAGES: { num: string; title: string; body: string }[] = [
  { num: '01', title: 'First touch', body: 'Every enquiry answered in under sixty seconds. Day or night. The same quality of reply, whether it lands at 11am or 11pm.' },
  { num: '02', title: 'Qualify', body: 'A real conversation, not a form. It understands what they need, what they will spend, and when they want to move. Each lead scored — hot, warm, cold.' },
  { num: '03', title: 'Nurture', body: 'Not ready today is not dead. A structured multi-touch sequence carries the lead across days, each message contextual, none of them feeling automated.' },
  { num: '04', title: 'Convert', body: 'Booking confirmed, advance collected, slot locked. The owner gets a clean notification. The CRM updates itself.' },
  { num: '05', title: 'Retain', body: 'Reminders cut no-shows. Feedback is collected, reviews requested, lapsing customers caught before they churn.' },
  { num: '06', title: 'Advocate', body: 'A referral ask fires at the peak satisfaction moment. When the referred contact books, the loop closes and new leads enter the top.' },
];

export default function CustomerJourney() {
  return (
    <section style={{
      padding: 'var(--section-gap) var(--rail-pad)',
      position: 'relative',
      borderTop: '1px solid rgba(46,107,142,0.12)',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '24px', color: 'var(--gold-end)' }}>
            Customer Journey Orchestration
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(30px, 4.4vw, 56px)',
            lineHeight: 1.14,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            fontWeight: 500,
            maxWidth: '22ch',
            marginBottom: '32px',
          }}>
            One customer&apos;s entire lifecycle, with no gaps and no manual handoffs<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(16px, 1.4vw, 19px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '62ch',
            marginBottom: 'clamp(56px, 8vh, 96px)',
          }}>
            Most businesses do not have a lead quality problem. They have a lead attention problem.
            From the first message to a confirmed booking to a re-engagement nudge thirty days later —
            one system, running the whole relationship.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'rgba(46,107,142,0.16)',
          border: '1px solid rgba(46,107,142,0.16)',
        }}>
          {STAGES.map((s, i) => (
            <Reveal key={s.num} delay={i * 60}>
              <div style={{
                background: 'rgba(11,23,41,0.55)',
                padding: 'clamp(28px, 3.5vw, 40px)',
                height: '100%',
              }}>
                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '12px',
                  letterSpacing: '0.4em',
                  color: 'var(--gold)',
                  fontWeight: 500,
                  marginBottom: '20px',
                }}>
                  {s.num}
                </div>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(20px, 2vw, 26px)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.015em',
                  color: 'var(--warm-foam)',
                  fontWeight: 600,
                  marginBottom: '14px',
                }}>
                  {s.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: 'var(--muted-cream)',
                  fontWeight: 300,
                }}>
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
