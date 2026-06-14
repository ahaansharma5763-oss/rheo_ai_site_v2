'use client';

import Reveal from './Reveal';

type Model = {
  sector: string;
  premise: string;
  before: string;
  after: string;
  roi: { label: string; value: string }[];
  takeaway: string;
};

const MODELS: Model[] = [
  {
    sector: 'Aesthetics clinic',
    premise: 'Believed Instagram leads were low quality. The leads were fine — a third arrived after 6pm and were answered the next morning.',
    before: '85 leads / month · 14% close · ₹42,000 new-lead revenue',
    after: 'After-hours capture + 5-touch nurture · 30% close · ₹91,000 revenue',
    roi: [
      { label: 'Same lead volume', value: '85' },
      { label: 'Added revenue / mo', value: '+₹49K' },
      { label: 'Return on retainer', value: '4.9×' },
    ],
    takeaway: 'The leads were never poor. They were unattended after hours.',
  },
  {
    sector: 'Independent consultant',
    premise: 'Believed the market could not afford the pricing. Follow-up after the discovery call averaged 1.4 touches where five were needed.',
    before: '28 leads / month · 9% close · ₹87,500 new revenue',
    after: 'Pre-call prep + 5-touch close sequence · 21% close · ₹1,92,500',
    roi: [
      { label: 'Same lead volume', value: '28' },
      { label: 'Added revenue / mo', value: '+₹1.05L' },
      { label: 'Return on retainer', value: '8.75×' },
    ],
    takeaway: 'Pricing was not the problem. Follow-up depth was.',
  },
  {
    sector: 'Boutique fitness studio',
    premise: 'Believed people would not commit to memberships. Trials converted at 44% whenever every prospect got proper follow-up.',
    before: '60 leads / month · 24% trial no-shows · 2–5 net new members',
    after: 'DM-to-WhatsApp + no-show recovery + renewals · 19–20 net new members',
    roi: [
      { label: 'Same lead volume', value: '60' },
      { label: 'Net membership / mo', value: '+₹93K' },
      { label: 'Return on retainer', value: '9.3×' },
    ],
    takeaway: 'Not price sensitivity. Trials lost to silence.',
  },
];

export default function ROIModels() {
  return (
    <section style={{
      padding: 'var(--section-gap) var(--rail-pad)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '24px', color: 'var(--crest)' }}>
            Representative ROI models
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
            maxWidth: '24ch',
            marginBottom: '24px',
          }}>
            The same close rate, doubled — from leads you already have<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={250}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '14px',
            lineHeight: 1.7,
            color: 'var(--fg-dim)',
            fontWeight: 300,
            maxWidth: '60ch',
            marginBottom: 'clamp(48px, 7vh, 80px)',
            fontStyle: 'italic',
          }}>
            Illustrative models built on typical sector economics, not named client results. Your
            numbers are quantified in the Ops Audit.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {MODELS.map((m, i) => (
            <Reveal key={m.sector} delay={i * 80}>
              <article style={{
                background: 'rgba(15,30,54,0.45)',
                border: '1px solid rgba(46,107,142,0.28)',
                padding: 'clamp(28px, 3.2vw, 36px)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '23px',
                  color: 'var(--warm-foam)',
                  fontWeight: 600,
                  letterSpacing: '-0.012em',
                  marginBottom: '16px',
                }}>
                  {m.sector}<span style={{ color: 'var(--gold)' }}>.</span>
                </h3>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '13.5px',
                  lineHeight: 1.65,
                  color: 'var(--muted-cream)',
                  fontWeight: 300,
                  marginBottom: '24px',
                }}>
                  {m.premise}
                </p>

                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11.5px',
                  lineHeight: 1.6,
                  color: 'var(--fg-dim)',
                  marginBottom: '8px',
                }}>
                  <span style={{ color: 'rgba(238,232,224,0.4)' }}>Before · </span>{m.before}
                </div>
                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11.5px',
                  lineHeight: 1.6,
                  color: 'var(--crest)',
                  marginBottom: '28px',
                }}>
                  <span style={{ color: 'rgba(238,232,224,0.4)' }}>After · </span>{m.after}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginTop: 'auto',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(46,107,142,0.2)',
                }}>
                  {m.roi.map(r => (
                    <div key={r.label}>
                      <div className="gold-text" style={{
                        fontFamily: 'var(--mono)',
                        fontSize: 'clamp(16px, 1.6vw, 20px)',
                        fontWeight: 500,
                        letterSpacing: '-0.01em',
                        marginBottom: '8px',
                        lineHeight: 1,
                      }}>
                        {r.value}
                      </div>
                      <div style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '9px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--muted-cream)',
                        opacity: 0.7,
                        lineHeight: 1.4,
                      }}>
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>

                <p style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '15px',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  color: 'var(--warm-foam)',
                  fontWeight: 400,
                  marginTop: '24px',
                }}>
                  {m.takeaway}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
