import type { Metadata } from 'next'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'
import Reveal from '@/components/home/Reveal'
import { BrandButton } from '@/components/follow/HeroClose'

export const metadata: Metadata = {
  title: 'Results · Rheo AI',
  description:
    'Same leads, same spend. Three deployments: a Pune aesthetics clinic, an independent strategy consultant, and a boutique fitness studio.',
}

/* Numbers are frozen — exactly the figures already published. Anonymized
 * exactly as published: sector + city, no names. */

const CASES = [
  {
    kicker: 'AESTHETICS CLINIC · PUNE · ~85 ENQUIRIES A MONTH',
    stat: '14% → 30% close rate',
    window: 'First 90 days',
    blocks: [
      {
        k: 'The before',
        t: 'Healthy enquiry volume from Instagram and Google, converting about 14% of it. The owner’s read was that the leads were weak. The real pattern was simpler: enquiries came in through the day while the team was with clients, and by the time anyone replied, the person had already booked with whoever answered first.',
      },
      {
        k: 'The diagnosis',
        t: 'Not a lead-quality problem, a response and follow-up gap. Roughly two out of three enquiries either waited hours for a first reply or never got a second touch after the first message.',
      },
      {
        k: 'The build',
        t: 'A system that answers every enquiry in under a minute, any hour, works out what treatment the person is asking about, shares the relevant information, and moves them toward a booking. Enquiries that go quiet get a short follow-up sequence instead of being forgotten.',
      },
      {
        k: 'What happened',
        t: 'Close rate moved from 14% to 30% on the same enquiry volume. Monthly revenue attributed to captured enquiries went from about ₹42,000 to ₹91,000, roughly ₹49,000 more a month, on the same ad spend and the same traffic.',
      },
    ],
    quote: '“We were blaming the leads. Turns out we just weren’t answering them.”',
    who: 'Founder, aesthetics clinic, Pune',
  },
  {
    kicker: 'INDEPENDENT STRATEGY CONSULTANT · ~28 ENQUIRIES A MONTH, HIGH TICKET',
    stat: '9% → 21% close rate',
    window: 'First 90 days',
    blocks: [
      {
        k: 'The before',
        t: 'Strong inbound interest and a high average engagement value. The bottleneck was human: after one message, if the prospect went quiet, there was no follow-up, because there was no time to follow up. Good-fit prospects were being lost to silence, not to a competitor.',
      },
      {
        k: 'The diagnosis',
        t: 'With a small number of high-value enquiries, every lost conversation is expensive. Close rate sat at about 9%, almost entirely because follow-up depended on the consultant personally remembering, mid-delivery, to chase a warm lead.',
      },
      {
        k: 'The build',
        t: 'A multi-touch follow-up system that keeps a warm, personal-sounding sequence running on every enquiry, references what the prospect actually asked about, and stops the moment they reply. The consultant only steps in once a lead is genuinely engaged.',
      },
      {
        k: 'What happened',
        t: 'Close rate moved from 9% to 21% on the same enquiry volume. Monthly revenue from these enquiries went from about ₹87,500 to ₹1,92,500, roughly ₹1.05 lakh more a month.',
      },
    ],
    quote: '“I was giving up after one message. The system follows up the way I never had time to.”',
    who: 'Independent strategy consultant',
  },
  {
    kicker: 'BOUTIQUE FITNESS STUDIO · PUNE · ~60 ENQUIRIES A MONTH',
    stat: '24% fewer no-shows',
    window: 'First quarter · no-show recovery + reactivation',
    blocks: [
      {
        k: 'The before',
        t: 'Two leaks running at once. New trial and class bookings were being lost to no-shows, and members who quietly lapsed were never reached out to again. Both were treated as normal churn the studio had accepted.',
      },
      {
        k: 'The diagnosis',
        t: 'No-shows were a reminder and rebooking gap, and lapsed members were a reactivation gap. Neither needed more marketing. Both needed a system that caught people the studio already had.',
      },
      {
        k: 'The build',
        t: 'A booking and reminder layer that confirms and reminds automatically and offers a rebook when someone cancels, plus a reactivation flow that reaches out to members who have gone quiet with a specific reason to return.',
      },
      {
        k: 'What happened',
        t: 'No-shows dropped by about 24%, and lapsed members started coming back. The combined effect of no-show recovery and reactivation together, over the first quarter, was worth roughly ₹93,000 a month.',
      },
    ],
    quote: '“No-shows used to kill us and lapsed members just vanished. Now both get caught automatically.”',
    who: 'Owner, boutique fitness studio, Pune',
  },
]

export default function WorkPage() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />

        <header style={{ padding: 'clamp(150px, 20vh, 220px) var(--rail-pad) clamp(48px, 7vh, 72px)' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <Reveal>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
                Results
              </span>
              <h1
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(2rem, 4.6vw, 3.2rem)',
                  lineHeight: 1.12,
                  color: 'var(--fg)',
                  marginBottom: '20px',
                }}
              >
                Same leads. Same spend. They just stop leaking.
              </h1>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-3)' }}>
                REPRESENTATIVE RESULTS FROM REAL DEPLOYMENTS, ANONYMISED. YOUR NUMBERS WILL DIFFER.
              </p>
            </Reveal>
          </div>
        </header>

        {CASES.map((c, ci) => (
          <section
            key={c.who}
            style={{
              padding: 'clamp(56px, 9vh, 88px) var(--rail-pad)',
              borderTop: '1px solid var(--line-soft)',
            }}
          >
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <Reveal>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.14em', color: 'var(--text-3)', marginBottom: '16px' }}>
                  {c.kicker}
                </p>
                <h2
                  style={{
                    fontFamily: 'var(--serif)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.7rem, 3.2vw, 2.4rem)',
                    color: 'var(--fg)',
                    marginBottom: '8px',
                  }}
                >
                  {c.stat}
                </h2>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '36px' }}>
                  {c.window}
                </p>
              </Reveal>

              {c.blocks.map((b, i) => (
                <Reveal key={b.k} delay={i * 90}>
                  <div style={{ marginBottom: '26px' }}>
                    <p style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '8px' }}>
                      {b.k}
                    </p>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 16.5px)', lineHeight: 1.75, color: 'var(--text-2)' }}>{b.t}</p>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={150}>
                <div style={{ borderLeft: '1px solid var(--line)', paddingLeft: '22px', marginTop: '36px' }}>
                  <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)', lineHeight: 1.5, color: 'var(--fg)', marginBottom: '10px' }}>
                    {c.quote}
                  </p>
                  <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                    {c.who}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        <section style={{ padding: 'clamp(64px, 10vh, 100px) var(--rail-pad)', borderTop: '1px solid var(--line-soft)', textAlign: 'center' }}>
          <Reveal>
            <div className="cta-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <BrandButton href="https://audit.rheoai.co.in">Show me what I&rsquo;m losing</BrandButton>
              <BrandButton href="https://calendly.com/ahaan-rheoai-xnxc/30min" variant="secondary" newTab>
                Book a call
              </BrandButton>
            </div>
          </Reveal>
        </section>

        <Footer />
      </div>
    </main>
  )
}
