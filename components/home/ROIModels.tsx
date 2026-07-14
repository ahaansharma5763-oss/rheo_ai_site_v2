'use client';

import Reveal from './Reveal';

type Story = {
  sector: string;
  premise: string;
  before: string;
  after: string;
  roi: { label: string; value: string }[];
  quote: string;
  author: string;
};

const STORIES: Story[] = [
  {
    sector: 'Aesthetics clinic',
    premise: 'They thought their Instagram leads were low quality. The leads were fine — a third arrived after 6pm and were only answered the next morning, by which point most had booked elsewhere.',
    before: '85 leads / month · 14% close · ₹42,000 new-lead revenue',
    after: 'After-hours capture + 5-touch nurture · 30% close · ₹91,000 revenue',
    roi: [
      { label: 'Same lead volume', value: '85' },
      { label: 'Added revenue / mo', value: '+₹49K' },
      { label: 'Return on retainer', value: '4.9×' },
    ],
    quote: 'We were blaming the leads. Turns out we just weren’t answering them. Now nothing comes in after hours and gets lost.',
    author: 'Founder · Aesthetics clinic, Pune',
  },
  {
    sector: 'Business consultant',
    premise: 'They believed the market couldn’t afford their pricing. In reality, follow-up after the discovery call averaged 1.4 touches where five were needed to close their kind of buyer.',
    before: '28 leads / month · 9% close · ₹87,500 new revenue',
    after: 'Pre-call prep + 5-touch close sequence · 21% close · ₹1,92,500',
    roi: [
      { label: 'Same lead volume', value: '28' },
      { label: 'Added revenue / mo', value: '+₹1.05L' },
      { label: 'Return on retainer', value: '8.75×' },
    ],
    quote: 'I was giving up after one message. The system follows up the way I never had time to — and the close rate more than doubled.',
    author: 'Independent strategy consultant',
  },
  {
    sector: 'Boutique fitness studio',
    premise: 'They believed people wouldn’t commit to memberships. But trials converted at 44% whenever every prospect actually got proper follow-up — the rest were lost to silence.',
    before: '60 leads / month · 24% trial no-shows · 2–5 net new members',
    after: 'DM-to-WhatsApp + no-show recovery + renewals · 19–20 net new members',
    roi: [
      { label: 'Same lead volume', value: '60' },
      { label: 'Net membership / mo', value: '+₹93K' },
      { label: 'Return on retainer', value: '9.3×' },
    ],
    quote: 'No-shows used to kill us and lapsed members just vanished. Now both get caught automatically. Our floor is fuller than it has ever been.',
    author: 'Owner · Boutique fitness studio, Pune',
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
            Proof
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
            Proof that the same business, run better, makes more money<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={250}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(16px, 1.4vw, 19px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '60ch',
            marginBottom: 'clamp(48px, 7vh, 80px)',
          }}>
            Same lead volume. Same market. The only thing that changed was that every lead started
            getting the same attention — automatically.
          </p>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {STORIES.map((m, i) => (
            <Reveal key={m.sector} delay={i * 80}>
              <article className="card-lift" style={{
                background: 'rgba(15,30,54,0.45)',
                border: '1px solid rgba(46,116,172,0.28)',
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
                  <span style={{ color: 'rgba(244,237,223,0.4)' }}>Before · </span>{m.before}
                </div>
                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11.5px',
                  lineHeight: 1.6,
                  color: 'var(--crest)',
                  marginBottom: '28px',
                }}>
                  <span style={{ color: 'rgba(244,237,223,0.4)' }}>After · </span>{m.after}
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(46,116,172,0.2)',
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

                <div style={{
                  marginTop: 'auto',
                  paddingTop: '28px',
                }}>
                  <p style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '16px',
                    fontStyle: 'italic',
                    lineHeight: 1.55,
                    color: 'var(--warm-foam)',
                    fontWeight: 400,
                    marginBottom: '14px',
                  }}>
                    &ldquo;{m.quote}&rdquo;
                  </p>
                  <div style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '10px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    fontWeight: 600,
                  }}>
                    {m.author}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
