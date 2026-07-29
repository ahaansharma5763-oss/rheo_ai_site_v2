import type { Metadata } from 'next'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'
import Reveal from '@/components/home/Reveal'
import { BrandButton } from '@/components/follow/HeroClose'

export const metadata: Metadata = {
  title: 'What we build · Rheo AI',
  description:
    'The full extent of what we build, under three verbs: Convert, Remember, Understand. Plain descriptions, no packages.',
}

/* Capability list from the Convert · Remember · Understand framework,
 * written as plain-language jobs. This is a capability list, not a menu:
 * no pricing, no packages, no product names, no "choose your plan". */

const GROUPS = [
  {
    verb: 'Convert',
    intro: 'Turn people who already raised their hand into paying customers.',
    items: [
      'Answers every enquiry in under a minute, any hour, on any channel.',
      'Answers questions from your real prices, services and policies. Never invents.',
      'Sorts every lead hot, warm or cold, and records what stage of the decision they are at.',
      'Locks bookings straight into the calendar and sends reminders.',
      'Puts a quotation in their hands while they still care.',
      'Follows up five times with the people who go quiet, and stops the moment they reply.',
      'Shows every lead, every stage and every conversation on one screen, with controls.',
      'Hands over to a person, with full context, when it should not answer.',
      'Refills the slots that cancel.',
      'Collects the payments that were agreed.',
      'Follows up after the job is done, and turns it into the next one.',
      'Asks for the review at the moment they are happiest.',
      'Brings back dormant, seasonal and renewal-cycle customers.',
    ],
  },
  {
    verb: 'Remember',
    intro: 'The business stops forgetting the people it has already served.',
    items: [
      'A complete record of every customer, filling itself from the channels you already use.',
      'One customer, one file, across every phone and every channel.',
      'What they bought, what they were quoted, and what they said no to.',
      'Who you are allowed to contact, and how.',
    ],
  },
  {
    verb: 'Understand',
    intro: 'The owner stops guessing about their own business.',
    items: [
      'The weekly number, on one screen.',
      'What is happening right now, today.',
      'What a customer is actually worth, and which channel brings the good ones.',
      'Which work actually makes money.',
      'Why you lose the ones you lose.',
    ],
  },
]

export default function WhatWeBuildPage() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />

        <header style={{ padding: 'clamp(150px, 20vh, 220px) var(--rail-pad) clamp(40px, 6vh, 64px)' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <Reveal>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
                What we build
              </span>
              <h1
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(2rem, 4.6vw, 3.2rem)',
                  lineHeight: 1.12,
                  color: 'var(--fg)',
                }}
              >
                Convert. Remember. Understand.
              </h1>
            </Reveal>
          </div>
        </header>

        {GROUPS.map(g => (
          <section key={g.verb} style={{ padding: 'clamp(40px, 7vh, 64px) var(--rail-pad)' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <Reveal>
                <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', color: 'var(--fg)', marginBottom: '10px' }}>
                  {g.verb}
                </h2>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '15.5px', lineHeight: 1.7, color: 'var(--text-2)', marginBottom: '28px' }}>
                  {g.intro}
                </p>
              </Reveal>
              <div style={{ borderTop: '1px solid var(--line-soft)' }}>
                {g.items.map((it, i) => (
                  <Reveal key={i} delay={Math.min(i * 60, 360)}>
                    <p
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '15px',
                        lineHeight: 1.7,
                        color: 'var(--text-2)',
                        padding: '14px 0',
                        borderBottom: '1px solid var(--line-soft)',
                      }}
                    >
                      {it}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section style={{ padding: 'clamp(48px, 8vh, 80px) var(--rail-pad) clamp(80px, 12vh, 120px)' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <Reveal>
              <p
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)',
                  lineHeight: 1.5,
                  color: 'var(--fg)',
                  marginBottom: '32px',
                }}
              >
                Which of these you need depends on what your numbers say. That is what the first call is for.
              </p>
              <BrandButton href="https://calendly.com/ahaan-rheoai-xnxc/30min" newTab>
                Book a call
              </BrandButton>
            </Reveal>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
