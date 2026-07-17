'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

/* The watertight section: exactly what is delivered,
 * exactly how recovered revenue is counted. */

const CHAIN = ['SENT', 'DELIVERED', 'REPLIED', 'BOOKED', 'SHOWED', '₹ COUNTED'];

const RECEIPTS = [
  { title: 'Every booking carries a tag', body: 'Each conversation the Sprint starts is tagged to the campaign. A booking without the tag is never claimed as ours. "They would have come anyway" gets settled by the tag, not by argument.' },
  { title: 'You watch the sheet live', body: 'The bookings ledger is shared with you from day one. Names, dates, values, tags. Not a summary we send you at the end. You see every entry the moment it lands.' },
  { title: 'The threshold is agreed in writing', body: 'Before the first message goes out, we agree the guarantee number and what counts toward it: booked value from tagged conversations inside the 21 days. No moving goalposts, in either direction.' },
  { title: 'The report is one page', body: 'Reached, replied, booked, recovered, next to the threshold. If the number cleared, you see exactly how. If it did not, you see that too, and you only cover the deposit.' },
];

const INCLUDED = [
  'List cleaning, de-duplication, and segmentation by recency, service, and spend',
  'Three campaign waves written in your voice, approved by you before anything sends',
  'Every reply answered in seconds, at any hour, for all 21 days',
  'Booking capture wired to your calendar or front desk',
  'Hot-lead alerts to your phone the moment someone turns warm',
  'Automatic opt-out handling and a permanent suppression list',
  'The live bookings ledger and the day-21 report',
];

const NEEDED = [
  'Your contact list, exported once',
  'Ten minutes to approve the message drafts',
  'Your booking preferences and service details',
];

const NEVER = [
  'No purchased or scraped lists, ever',
  'No discounting unless you approve it first',
  'No re-messaging anyone who opted out',
  'No claiming bookings the campaign did not start',
];

export default function RevivalMeasure() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="simplex" colorFront="#2E74AC" opacity={0.24} speed={0.2} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            How it is measured
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '24ch', marginBottom: '18px' }}>
            Recovered revenue is counted, not claimed<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '66ch', marginBottom: 'clamp(44px, 6vh, 64px)' }}>
            Every contact moves through one chain, and you can see each link for every single person on your list:
          </p>
        </Reveal>

        {/* The attribution chain */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: 'clamp(52px, 8vh, 80px)' }}>
          {CHAIN.map((stage, i) => (
            <Reveal key={stage} delay={i * 110} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '12.5px', letterSpacing: '0.14em',
                  padding: '11px 18px',
                  color: i === CHAIN.length - 1 ? 'var(--gold-end)' : 'var(--warm-foam)',
                  border: `1px solid ${i === CHAIN.length - 1 ? 'rgba(196,162,90,0.55)' : 'rgba(63,174,222,0.32)'}`,
                  background: i === CHAIN.length - 1 ? 'rgba(196,162,90,0.08)' : 'rgba(11,23,41,0.55)',
                }}>
                  {stage}
                </span>
                {i < CHAIN.length - 1 && (
                  <span aria-hidden style={{ fontFamily: 'var(--sans)', color: 'var(--fg-dim)', fontSize: '13px' }}>→</span>
                )}
              </>
            </Reveal>
          ))}
        </div>

        {/* The receipts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginBottom: 'clamp(52px, 8vh, 80px)' }}>
          {RECEIPTS.map((r, i) => (
            <Reveal key={i} delay={i * 90}>
              <article style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(11,23,41,0.5)', padding: 'clamp(24px, 2.8vw, 32px)', height: '100%' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 1.8vw, 20px)', color: 'var(--warm-foam)', fontWeight: 500, lineHeight: 1.3, marginBottom: '12px' }}>
                  {r.title}
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300 }}>
                  {r.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Exactly what you get / need / never */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px' }}>
          <Reveal delay={80}>
            <div style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(15,30,54,0.4)', padding: 'clamp(24px, 2.8vw, 32px)', height: '100%' }}>
              <span className="eyebrow" style={{ display: 'block', marginBottom: '18px', fontSize: '11px' }}>Exactly what you get</span>
              {INCLUDED.map((t, i) => (
                <p key={i} style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300, paddingLeft: '16px', borderLeft: '1px solid rgba(63,174,222,0.4)', marginBottom: i < INCLUDED.length - 1 ? '13px' : 0 }}>
                  {t}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', height: '100%' }}>
              <div style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(15,30,54,0.4)', padding: 'clamp(24px, 2.8vw, 32px)', flex: 1 }}>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '18px', fontSize: '11px' }}>All we need from you</span>
                {NEEDED.map((t, i) => (
                  <p key={i} style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300, paddingLeft: '16px', borderLeft: '1px solid rgba(63,174,222,0.4)', marginBottom: i < NEEDED.length - 1 ? '13px' : 0 }}>
                    {t}
                  </p>
                ))}
              </div>
              <div style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(15,30,54,0.4)', padding: 'clamp(24px, 2.8vw, 32px)', flex: 1 }}>
                <span className="eyebrow" style={{ display: 'block', marginBottom: '18px', fontSize: '11px' }}>What we never do</span>
                {NEVER.map((t, i) => (
                  <p key={i} style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300, paddingLeft: '16px', borderLeft: '1px solid rgba(217,106,106,0.45)', marginBottom: i < NEVER.length - 1 ? '13px' : 0 }}>
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
