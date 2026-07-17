'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const STEPS = [
  {
    title: 'We clean and sort your list.',
    body: 'Every contact is checked, de-duplicated, and grouped by what they bought, how much they spend, and how long they have been quiet. A patient overdue for a follow-up gets a very different message than an enquiry that never booked.',
  },
  {
    title: 'We write the campaign in your voice.',
    body: 'Three carefully spaced waves over three weeks. No desperate discounts. The message is a genuine reason to come back: something due, something new, something they asked about once and never got.',
  },
  {
    title: 'Every reply is answered in seconds.',
    body: 'This is where broadcasts die and the Sprint wins. When someone replies at 11pm asking for the full package price, they get a real answer immediately, a booking offer, and your calendar. You get an alert the moment anyone is hot.',
  },
  {
    title: 'You get the number.',
    body: 'At the end of 21 days: how many people we reached, how many replied, how many booked, and exactly how much revenue came back. One page. No vanity metrics.',
  },
];

export default function RevivalWhatIs() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="wave" colorFront="#3FAEDE" opacity={0.26} speed={0.22} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            What the Sprint is
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: '18px' }}>
            One campaign. Three weeks. Real conversations, not blasts.
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '64ch', marginBottom: 'clamp(48px, 7vh, 72px)' }}>
            The Revival Sprint is a done-for-you reactivation campaign that runs for 21 days.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <article style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(11,23,41,0.5)', padding: 'clamp(26px, 3vw, 36px)', height: '100%' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--crest)', display: 'block', marginBottom: '16px' }}>
                  STEP 0{i + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 1.9vw, 22px)', color: 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.3, marginBottom: '14px' }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300 }}>
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div style={{ marginTop: 'clamp(48px, 7vh, 72px)', border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(15,30,54,0.4)', padding: 'clamp(26px, 3vw, 36px)', maxWidth: '820px' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(19px, 2vw, 24px)', color: 'var(--gold-end)', fontWeight: 500, lineHeight: 1.3, marginBottom: '14px' }}>
              Blasting your list burns it. The Sprint protects it.
            </h3>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '15px', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300 }}>
              You have received those messages. Dear customer, we miss you, twenty percent off. You deleted it,
              and so does everyone else. The Sprint works because it does the opposite. Different segments get
              different reasons to return. Replies get real conversations, not autoresponders. Anyone who is not
              interested gets a graceful goodbye and is never messaged again. Your name stays premium, your list
              stays healthy, and the people who come back do it because the message was actually relevant to them.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
