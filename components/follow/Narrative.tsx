'use client';

import Reveal from '@/components/home/Reveal';

/* Narrative sections. Copy is condensed from the master marketing copy page
 * (v2, 2026-07-29): same argument, fewer words. Every block opens with a bold
 * lead-in so the whole page is readable from the bolds alone. */

export function GoldRule({ width = 48 }: { width?: number }) {
  return <div aria-hidden style={{ width: `${width}px`, height: '1px', background: 'var(--gold-line)' }} />;
}

const H2: React.CSSProperties = {
  fontFamily: 'var(--serif)',
  fontWeight: 400,
  fontSize: 'var(--fs-h2)',
  lineHeight: 1.14,
  letterSpacing: '-0.012em',
  color: 'var(--fg)',
};

const BODY: React.CSSProperties = {
  fontFamily: 'var(--sans)',
  fontSize: 'var(--fs-body)',
  lineHeight: 'var(--lh-body)',
  color: 'var(--text-2)',
};

/* The scannable layer: one bold sentence per block. */
const LEAD: React.CSSProperties = {
  fontFamily: 'var(--sans)',
  fontWeight: 500,
  fontSize: 'var(--fs-lead)',
  lineHeight: 1.45,
  color: 'var(--fg)',
};

const WRAP = { maxWidth: '700px', margin: '0 auto' } as const;

/* §2 — Who is doing your follow-ups. Five beats cut to three. */
const BEATS = [
  ['The second message never goes out.', 'The first reply happens eventually. The follow-up does not.'],
  ['“Let me think about it” disappears.', 'Because nobody keeps a list of the people who said it.'],
  ['A customer due back never hears from you.', 'Nobody knows they are due.'],
];

export function FYProblem() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={WRAP}>
        <Reveal>
          <h2 style={{ ...H2, marginBottom: '28px' }}>Who is actually doing your follow-ups right now?</h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ ...LEAD, marginBottom: '18px' }}>Following up is nobody’s actual job.</p>
          <p style={{ ...BODY, marginBottom: '48px' }}>
            It is your receptionist, who is also on the front desk and the phone. Or the person at the
            counter, who is also billing. Or you, at 11pm, going through what you missed. Everyone does it
            when they get a spare minute, and nobody gets a spare minute.
          </p>
        </Reveal>
        <div>
          {BEATS.map(([lead, body], i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ padding: '26px 0', borderTop: '1px solid var(--line-soft)' }}>
                <p style={{ ...BODY, fontWeight: 500, color: 'var(--fg)', marginBottom: '6px' }}>{lead}</p>
                <p style={{ ...BODY }}>{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* §3 — The emotional turn. Ink Night, one reveal, stillness. */
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
        <div style={{ maxWidth: '580px', margin: '0 auto' }}>
          <div style={{ marginBottom: '28px' }}>
            <GoldRule />
          </div>
          <h2 style={{ ...H2, marginBottom: '28px' }}>
            The part that makes this so expensive is that you never find out.
          </h2>
          <p style={{ ...BODY, marginBottom: '20px' }}>
            A customer who has a bad experience complains. You hear about it, and you fix it.
          </p>
          <p style={{ ...BODY, marginBottom: '36px' }}>
            A customer who never got a reply does not complain. They booked with somebody else, and you
            never knew they existed. So the loss shows up nowhere. Not in your accounts, not in your
            reviews. Only as a feeling that the leads are not as good as they used to be.
          </p>
          <p style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(1.5rem, 2.6vw, 1.9rem)', lineHeight: 1.3, color: 'var(--fg)' }}>
            The leads are fine. Nobody is catching them.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

/* §5 — Why speed decides it. The eight-paragraph buyer story becomes a
 * three-quote comparison the reader recognises instantly. */
const QUOTES = [
  { who: 'The first place', when: 'Replied next morning', note: 'You had already stopped waiting.', win: false },
  { who: 'The second place', when: 'Said call back in working hours', note: 'You did not call back.', win: false },
  { who: 'The third place', when: 'Answered in ten minutes', note: 'Told you the price. Offered Thursday.', win: true },
];

export function FYSpeed() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={WRAP}>
        <Reveal>
          <h2 style={{ ...H2, marginBottom: '20px' }}>And here is why it comes down to who replied first.</h2>
          <p style={{ ...BODY, marginBottom: '44px' }}>
            Think about the last thing you bought that mattered. A dental treatment, a car service, a
            caterer. You messaged three places.
          </p>
        </Reveal>

        <div className="fy-quotes" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '40px' }}>
          {QUOTES.map((q, i) => (
            <Reveal key={q.who} delay={i * 140}>
              <div
                style={{
                  height: '100%',
                  padding: '24px 20px',
                  background: q.win ? 'var(--panel)' : 'transparent',
                  border: `1px solid ${q.win ? 'rgba(196,162,90,0.5)' : 'var(--line)'}`,
                  opacity: q.win ? 1 : 0.62,
                }}
              >
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: '14px' }}>
                  {q.who}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--serif)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.15rem, 1.9vw, 1.35rem)',
                    lineHeight: 1.3,
                    color: q.win ? 'var(--gold-text)' : 'var(--fg)',
                    marginBottom: '10px',
                  }}
                >
                  {q.when}
                </p>
                <p style={{ ...BODY, fontSize: 'var(--fs-body-sm)' }}>{q.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p style={{ ...LEAD, marginBottom: '18px' }}>You booked the third one.</p>
          <p style={{ ...BODY }}>
            One of the others may well have been better. You never found out. Before a customer pays you,
            they cannot judge your work, so they judge the only thing they can see:{' '}
            <span style={{ fontWeight: 500, color: 'var(--fg)' }}>how you handled them while they were deciding.</span>
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .fy-quotes { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* §6 — What it is. Six capability lines as a ledger. */
const CAPABILITIES = [
  'Replies to every enquiry in under a minute, at any hour.',
  'Answers questions using your real prices and information.',
  'Works out who is serious and who is just looking.',
  'Follows up five times with the people who go quiet.',
  'Books them into your calendar.',
  'Keeps a permanent record of every customer and conversation.',
];

export function FYWhatItIs() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={WRAP}>
        <Reveal>
          <h2 style={{ ...H2, maxWidth: '24ch', marginBottom: '24px' }}>
            It is a system that handles your leads for you, from the first message to the booking
            <span style={{ color: 'var(--gold-text)' }}>.</span>
          </h2>
          <p style={{ ...BODY, marginBottom: '40px' }}>
            Not software you log into and learn. Not a person on your payroll. It sits on the channels your
            enquiries already arrive on.
          </p>
        </Reveal>
        <div style={{ borderTop: '1px solid var(--line-soft)' }}>
          {CAPABILITIES.map((c, i) => (
            <Reveal key={i} delay={i * 100}>
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
                <span style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'var(--fs-body)', lineHeight: 1.55, color: 'var(--fg)' }}>
                  {c}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p style={{ ...BODY, marginTop: '32px' }}>
            You do not manage it. It runs whether you are at the shop, in a meeting, or asleep.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* §11 — Not a bot. Two halves, each with a bold lead. */
export function FYNotABot() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={WRAP}>
        <Reveal>
          <h2 style={{ ...H2, marginBottom: '28px' }}>It is not a robot reading from a script.</h2>
          <p style={{ ...BODY, marginBottom: '40px' }}>
            The automated replies you have seen were templates. Someone wrote ten answers and the system
            fired whichever roughly matched. This is different in two ways.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ paddingBottom: '34px', borderBottom: '1px solid var(--line-soft)', marginBottom: '34px' }}>
            <p style={{ ...LEAD, marginBottom: '14px' }}>First, it only knows your business.</p>
            <p style={{ ...BODY, marginBottom: '16px' }}>
              Your prices, services, policies, timings. It cannot invent a price it has never seen. If a
              question comes in it has no answer for, it says so and brings in your team.
            </p>
            <p style={{ ...BODY }}>
              You have probably used ChatGPT once or twice. ChatGPT will happily answer a question about
              your business it knows nothing about. This will not. That restriction is the whole point.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div>
            <p style={{ ...LEAD, marginBottom: '14px' }}>Second, it makes decisions.</p>
            <p style={{ ...BODY, marginBottom: '16px' }}>
              That this person is comparing you with two others and needs a reason before a number. That
              this one is ready and should be offered a slot now. That this one has gone quiet twice and
              should be left alone for a week rather than chased into annoyance.
            </p>
            <p style={{ ...BODY }}>
              That judgement is what you pay a good front-desk person for. It makes those calls on every
              conversation, all day, without anybody telling it what to do.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* §14 — What this is not. Five denials cut to the three that carry weight. */
const DENIALS = [
  ['Not a chatbot.', 'Chatbots read from a script and stall on the first real question. This answers from your own information, and hands over rather than guessing.'],
  ['Not a call centre.', 'No salaries, no leave, no off days, and it does not resign in six months and take everything it knew with it.'],
  ['Not more marketing.', 'We do not get you more enquiries. We make sure the ones you already pay for turn into customers.'],
];

export function FYNot() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)' }}>
      <div style={WRAP}>
        <Reveal>
          <h2 style={{ ...H2, marginBottom: '16px' }}>What this is not.</h2>
        </Reveal>
        <div>
          {DENIALS.map(([t, b], i) => (
            <Reveal key={t} delay={i * 110}>
              <div style={{ padding: '28px 0', borderBottom: i < DENIALS.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                <p style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'var(--fs-h3)', color: 'var(--fg)', marginBottom: '10px' }}>
                  {t}
                </p>
                <p style={{ ...BODY }}>{b}</p>
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
      <div style={WRAP}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            Who this is for
          </span>
          <h2 style={{ ...H2, marginBottom: '24px' }}>
            Businesses where customers enquire before they buy, and can come back again.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ ...BODY, marginBottom: '32px' }}>
            Clinics and dental practices. Aesthetics and skin. Car detailing and service. Coaching
            institutes and academies. Preschools and schools. Fitness studios. Caterers. Home and property
            services. Anyone whose enquiries arrive faster than a human can answer them.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div style={{ border: '1px solid var(--line)', padding: '26px 28px' }}>
            <p style={{ ...BODY }}>
              <span style={{ fontWeight: 500, color: 'var(--fg)' }}>Not for</span> businesses under thirty
              enquiries a month, businesses that spend nothing on getting enquiries in, or anyone looking
              for something to try for a month rather than a system to run their business on.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Founder block — approved 2026-07-29. Ships only while Rheo's own inbound
 * genuinely answers within a minute at night. */
export function FounderBlock() {
  return (
    <section style={{ padding: '0 var(--rail-pad) var(--section-gap)' }}>
      <div style={WRAP}>
        <Reveal>
          <div
            className="fy-founder"
            style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '44px', display: 'flex', gap: '28px', alignItems: 'flex-start' }}
          >
            {/* Drop a square headshot at public/founder.jpg and it appears
              * here. Until then the img removes itself and the block renders
              * exactly as before. No placeholder, no stock photo. */}
            <img
              src="/founder.jpg"
              alt="Ahaan Sharma"
              width={96}
              height={96}
              loading="lazy"
              style={{ display: 'block', width: '96px', height: '96px', objectFit: 'cover', flexShrink: 0, filter: 'grayscale(1) contrast(1.05)' }}
              onError={e => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontSize: 'clamp(1.35rem, 2.3vw, 1.7rem)',
                  lineHeight: 1.4,
                  color: 'var(--fg)',
                  marginBottom: '18px',
                }}
              >
                Every business loses customers in the stretch between someone saying they are interested
                and that person paying. Nobody&rsquo;s job covers it. That gap is the only thing we work on.
              </p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                Ahaan Sharma, Founder · Rheo AI, Pune
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .fy-founder { flex-direction: column; gap: 20px; }
        }
      `}</style>
    </section>
  );
}
