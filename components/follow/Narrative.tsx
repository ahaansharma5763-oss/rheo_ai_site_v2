'use client';

import Reveal from '@/components/home/Reveal';

/* Shared primitives for the narrative sections. All copy is lifted verbatim
 * from the master marketing copy page — do not edit words here without
 * updating wiki/concepts/rheo-master-marketing-copy.md first. */

export function GoldRule({ width = 48 }: { width?: number }) {
  return <div aria-hidden style={{ width: `${width}px`, height: '1px', background: 'var(--gold-line)' }} />;
}

const H2: React.CSSProperties = {
  fontFamily: 'var(--serif)',
  fontWeight: 400,
  fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
  lineHeight: 1.15,
  letterSpacing: '-0.01em',
  color: 'var(--fg)',
};

const BODY: React.CSSProperties = {
  fontFamily: 'var(--sans)',
  fontSize: 'clamp(15px, 1.3vw, 17px)',
  lineHeight: 1.75,
  color: 'var(--text-2)',
};

/* §2 — Who is actually doing your follow-ups right now? */
const BEATS = [
  'The first reply goes out, eventually. The second one does not.',
  'A customer asks something specific about price and has to wait until someone can ask you.',
  'Somebody says “let me think about it” and is never contacted again, because there is no list of people who said “let me think about it.”',
  'The same fifteen questions get answered by hand, every single day, by people who are being paid to do something else.',
  'And a customer who came in eight months ago, who is due to come back, never hears from you, because nobody knows they are due.',
];

export function FYProblem() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ ...H2, marginBottom: '28px' }}>Who is actually doing your follow-ups right now?</h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ ...BODY, marginBottom: '20px' }}>Be honest about this one.</p>
        </Reveal>
        <Reveal delay={180}>
          <p style={{ ...BODY, marginBottom: '28px' }}>
            It is probably your receptionist, who is also managing the front desk, the phone, and the
            walk-ins. Or the person at the counter, who is also handling billing. Or your manager, who is
            also doing four other things. Or, most likely, it is you, at 11pm, going through messages you
            did not get to during the day.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p style={{ ...BODY, marginBottom: '10px' }}>None of these people are bad at their job.</p>
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontWeight: 500,
              fontSize: 'clamp(19px, 2vw, 24px)',
              lineHeight: 1.4,
              color: 'var(--fg)',
              marginBottom: '10px',
            }}
          >
            Following up is just nobody’s actual job.
          </p>
          <p style={{ ...BODY, marginBottom: '44px' }}>
            It is the thing everyone does when they have a spare minute, and nobody has a spare minute.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <p style={{ ...BODY, fontWeight: 500, color: 'var(--fg)', marginBottom: '4px' }}>So this is what happens:</p>
        </Reveal>
        <div>
          {BEATS.map((b, i) => (
            <Reveal key={i} delay={i * 120}>
              <p style={{ ...BODY, padding: '26px 0', borderBottom: i < BEATS.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                {b}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* §3 — The emotional turn. Ink Night plate, one reveal, stillness. */
export function FYInvisible() {
  return (
    <section
      style={{
        background: 'var(--bg-low)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        padding: 'clamp(96px, 16vh, 150px) var(--rail-pad)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Reveal>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ marginBottom: '28px' }}>
            <GoldRule />
          </div>
          <h2 style={{ ...H2, marginBottom: '32px' }}>
            The part that makes this so expensive is that you never find out.
          </h2>
          <p style={{ ...BODY, marginBottom: '20px' }}>
            A customer who has a bad experience complains. You hear about it, and you fix it.
          </p>
          <p style={{ ...BODY, marginBottom: '20px' }}>
            A customer who never got a reply does not complain. They were never your customer. They
            messaged, they waited, they booked with somebody else, and you never knew they existed.
          </p>
          <p style={{ ...BODY, marginBottom: '36px' }}>
            So this loss does not show up anywhere. Not in your accounts. Not in your reviews. Not in any
            report your team gives you. It shows up only as a feeling that the leads are not as good as
            they used to be.
          </p>
          <p style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(1.4rem, 2.4vw, 1.7rem)', lineHeight: 1.35, color: 'var(--fg)' }}>
            The leads are fine. Nobody is catching them.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* §5 — Why it comes down to who replied first. Narrative prose, no stagger. */
export function FYSpeed() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ ...H2, marginBottom: '32px' }}>And here is why it comes down to who replied first.</h2>
        </Reveal>
        <Reveal delay={150}>
          <div>
            <p style={{ ...BODY, marginBottom: '20px' }}>
              Think about the last time you bought something that mattered. A dental treatment, a car
              service, a caterer for a function at home.
            </p>
            <p style={{ ...BODY, marginBottom: '20px' }}>You messaged three or four places.</p>
            <p style={{ ...BODY, marginBottom: '20px' }}>
              One replied the next morning. One told you to call back during working hours. One answered
              everything within ten minutes, told you exactly what it would cost, and offered you a slot on
              Thursday.
            </p>
            <p style={{ ...BODY, fontWeight: 500, color: 'var(--fg)', marginBottom: '20px' }}>You booked the third one.</p>
            <p style={{ ...BODY, marginBottom: '20px' }}>
              One of the others may well have been better. You will never know, because by the time they got
              back to you, it was already done.
            </p>
            <p style={{ ...BODY, marginBottom: '20px' }}>
              That is not a story about quality. Before a customer pays you, they have no way of judging
              your work. They cannot inspect a treatment they have not had or see a finish on a car you have
              not touched. Your twenty years of doing this properly are invisible to them.
            </p>
            <p style={{ ...BODY }}>
              So they judge the only thing they can see:{' '}
              <span style={{ fontWeight: 500, color: 'var(--fg)' }}>how you handled them while they were deciding.</span>{' '}
              Fast, clear and complete feels like a business that has its act together. Slow and vague feels
              like one that does not.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* §6 — What it is. Six capability lines as a stacked ledger, no icons. */
const CAPABILITIES = [
  'It replies to every enquiry in under a minute, at any hour of any day.',
  'It answers their questions using your real prices and your real information.',
  'It works out who is serious and who is just looking.',
  'It follows up five times with the people who go quiet, on its own.',
  'It books them into your calendar.',
  'And it keeps a record of every single customer and every single conversation, permanently.',
];

export function FYWhatItIs() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ ...H2, maxWidth: '26ch', marginBottom: '28px' }}>
            It is a system that handles your leads for you, from the first message to the booking
            <span style={{ color: 'var(--gold-text)' }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ ...BODY, marginBottom: '16px' }}>
            Not software you have to log into and learn. Not a person on your payroll.
          </p>
          <p style={{ ...BODY, marginBottom: '40px' }}>
            It sits on the channels your enquiries already come through, and it does the work that your
            receptionist, your counter staff and you are currently doing in between everything else.
          </p>
        </Reveal>
        <div style={{ borderTop: '1px solid var(--line-soft)' }}>
          {CAPABILITIES.map((c, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                style={{
                  display: 'flex',
                  gap: '22px',
                  alignItems: 'baseline',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--line-soft)',
                }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.08em' }}>
                  0{i + 1}
                </span>
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.55, color: 'var(--fg)' }}>
                  {c}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p style={{ ...BODY, marginTop: '36px' }}>
            You do not manage it. You do not have to check on it. It runs whether you are at the shop, in a
            meeting, or asleep.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* §11 — It is not a robot reading from a script. */
export function FYNotABot() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ ...H2, marginBottom: '28px' }}>It is not a robot reading from a script.</h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ ...BODY, marginBottom: '16px' }}>The automated replies you have seen before were templates.</p>
          <p style={{ ...BODY, marginBottom: '36px' }}>
            Someone wrote ten answers, and the system fired whichever one roughly matched. The moment a
            customer asked something slightly different, it broke, and everyone could tell.
          </p>
          <p style={{ ...BODY, marginBottom: '36px' }}>This is different in two ways.</p>
        </Reveal>

        <Reveal delay={160}>
          <div style={{ paddingBottom: '36px', borderBottom: '1px solid var(--line-soft)', marginBottom: '36px' }}>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'clamp(17px, 1.7vw, 20px)', color: 'var(--fg)', marginBottom: '16px' }}>
              First, it only knows your business.
            </p>
            <p style={{ ...BODY, marginBottom: '16px' }}>
              Your prices, your services, what is included, your policies, your timings. It answers from
              that and nothing else. It cannot invent a price it has never seen or promise something you do
              not offer. And if a question comes in that it does not have an answer for, it says so and
              brings in your team, rather than making something up.
            </p>
            <p style={{ ...BODY }}>
              You have probably used ChatGPT once or twice. The difference is that ChatGPT will happily
              answer a question about your business it knows nothing about. This will not. That restriction
              is the whole point.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'clamp(17px, 1.7vw, 20px)', color: 'var(--fg)', marginBottom: '16px' }}>
              Second, it makes decisions.
            </p>
            <p style={{ ...BODY, marginBottom: '16px' }}>
              That the person asking about price is comparing you with two others, and needs a reason before
              a number. That this one is ready and should be offered a slot right now. That this one has
              gone quiet twice and should be left alone for a week instead of chased into annoyance. That
              this one should be handed to a human immediately.
            </p>
            <p style={{ ...BODY, marginBottom: '28px' }}>
              That judgement is exactly what you are paying a good front-desk person for, and it is the
              difference between a good one and an average one.
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'clamp(16px, 1.5vw, 19px)', lineHeight: 1.55, color: 'var(--fg)' }}>
              It makes those calls on its own, on every conversation, all day, without anybody telling it
              what to do.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* §14 — What this is not. Five denials, calm vertical rhythm. */
const DENIALS = [
  {
    t: 'Not a chatbot.',
    b: 'Chatbots read from a script and get stuck on the first real question. This answers from your own information and hands over to a human rather than guessing.',
  },
  {
    t: 'Not software you rent.',
    b: 'It is built around how your business runs, and it belongs to your business.',
  },
  {
    t: 'Not something your team has to learn.',
    b: 'Nobody opens a new app or changes how they work.',
  },
  {
    t: 'Not a call centre.',
    b: 'No salaries, no leave, no off days, and it does not resign in six months and take everything it knew with it.',
  },
  {
    t: 'Not more marketing.',
    b: 'We do not get you more enquiries. We make sure the ones you already pay for turn into customers.',
  },
];

export function FYNot() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ ...H2, marginBottom: '20px' }}>What this is not.</h2>
        </Reveal>
        <div>
          {DENIALS.map((d, i) => (
            <Reveal key={d.t} delay={i * 100}>
              <div style={{ padding: '28px 0', borderBottom: i < DENIALS.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                <p style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(1.15rem, 1.9vw, 1.3rem)', color: 'var(--fg)', marginBottom: '10px' }}>
                  {d.t}
                </p>
                <p style={{ ...BODY }}>{d.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* §15 — Who this is for, plus the disqualifier. */
export function FYWho() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            Who this is for
          </span>
          <h2 style={{ ...H2, marginBottom: '28px' }}>
            Businesses where customers enquire before they buy, where one sale is worth enough to be worth
            catching, and where a customer can come back again.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ ...BODY, marginBottom: '36px' }}>
            Clinics and dental practices. Aesthetics and skin. Salons and spas. Car detailing and service.
            Fitness studios. Caterers. Preschools. Anyone whose enquiries arrive faster than a human can
            answer them.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div style={{ border: '1px solid var(--line)', padding: '26px 28px' }}>
            <p style={{ ...BODY }}>
              <span style={{ fontWeight: 500, color: 'var(--fg)' }}>Not for</span> businesses getting under
              thirty enquiries a month, businesses that spend nothing on getting enquiries in, or anyone
              looking for something to try for a month rather than a system to run their business on.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Founder block — approved by Ahaan 2026-07-29. Ships only while Rheo's own
 * inbound genuinely answers within a minute at night. */
export function FounderBlock() {
  return (
    <section style={{ padding: '0 var(--rail-pad) var(--section-gap)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '44px' }}>
            <p
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)',
                lineHeight: 1.4,
                color: 'var(--fg)',
                marginBottom: '18px',
              }}
            >
              We run on the same system we sell. Message us at 11pm tonight and see how fast the reply comes
              back.
            </p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
              Ahaan Sharma, Founder · Rheo AI, Pune
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
