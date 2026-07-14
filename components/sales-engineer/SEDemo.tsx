'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

/* ────────────────────────────────────────────────
 * The live demo counter. Two variants of Athena:
 * one your customers talk to, one your sales
 * engineers use. Both demos are live on Telegram.
 * ──────────────────────────────────────────────── */

const CUSTOMER_DEMO = 'https://t.me/KestrelSalesEngineer_bot';
const ENGINEER_DEMO: string | null = 'https://t.me/KestrelCopilotbot';

const ATTACKS: { icon: IconName; text: string }[] = [
  { icon: 'globe',  text: 'Ask it in Hindi, Marathi, or half-and-half' },
  { icon: 'target', text: 'Invent a model number and watch it refuse' },
  { icon: 'card',   text: 'Demand a 25% discount and a 10-day delivery' },
  { icon: 'bolt',   text: 'Corner it on an impossible spec' },
];

interface Variant {
  name: string;
  audience: string;
  body: string;
  href: string | null;
  cta: string;
}

const VARIANTS: Variant[] = [
  {
    name: 'Athena for Customers',
    audience: 'What your buyers and dealers talk to',
    body: 'The customer-facing Athena, running live on a fictional hydraulics catalogue. It qualifies, recommends, quotes with citations, and refuses what it cannot verify. Walk in as a buyer and be as difficult as you like.',
    href: CUSTOMER_DEMO,
    cta: 'Try it live on Telegram',
  },
  {
    name: 'Athena for Sales Engineers',
    audience: 'The copilot your own team uses',
    body: 'The internal Athena. Your engineers ask it anything about the catalogue mid-call and get the exact spec, the right model, and the price logic in seconds. It runs on the same catalogue as the customer demo, so you can compare both sides.',
    href: ENGINEER_DEMO,
    cta: 'Try the copilot on Telegram',
  },
];

function VariantCard({ v, delay }: { v: Variant; delay: number }) {
  const live = !!v.href;
  return (
    <Reveal delay={delay}>
      <article style={{
        height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'left',
        background: live ? 'rgba(196,162,90,0.07)' : 'rgba(11,23,41,0.55)',
        border: `1px solid ${live ? 'rgba(196,162,90,0.45)' : 'rgba(46,116,172,0.28)'}`,
        borderRadius: '16px', padding: 'clamp(26px, 3vw, 36px)',
        boxShadow: live ? '0 30px 80px rgba(0,0,0,0.45), 0 0 40px rgba(196,162,90,0.08)' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '5px 13px', borderRadius: '999px',
            background: live ? 'rgba(196,162,90,0.12)' : 'rgba(46,116,172,0.14)',
            border: `1px solid ${live ? 'rgba(196,162,90,0.5)' : 'rgba(63,174,222,0.35)'}`,
          }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: live ? 'var(--gold)' : 'var(--crest)',
              boxShadow: live ? '0 0 10px var(--gold)' : 'none',
              animation: live ? 'seDemoPulse 1.6s ease-out infinite' : 'none',
            }} />
            <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: live ? 'var(--gold-end)' : 'var(--crest)' }}>
              {live ? 'Live now' : 'In final testing'}
            </span>
          </span>
        </div>

        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(21px, 2.2vw, 26px)', color: 'var(--fg)', fontWeight: 600, letterSpacing: '-0.014em', lineHeight: 1.15, marginBottom: '6px' }}>
          {v.name}
        </h3>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 600, marginBottom: '16px' }}>
          {v.audience}
        </p>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, marginBottom: '26px', flex: 1 }}>
          {v.body}
        </p>

        {live ? (
          <a href={v.href!} target="_blank" rel="noreferrer" className="se-demo-btn" style={{ alignSelf: 'flex-start' }}>
            {v.cta}
            <Icon name="arrow-right" size={16} color="var(--bg)" />
          </a>
        ) : (
          <span style={{
            alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: '16px 32px', border: '1px dashed rgba(63,174,222,0.45)', borderRadius: '2px',
            color: 'var(--crest)', fontFamily: 'var(--sans)', fontSize: '12px',
            letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600,
          }}>
            <Icon name="clock" size={15} color="var(--crest)" />
            {v.cta}
          </span>
        )}
      </article>
    </Reveal>
  );
}

export default function SEDemo() {
  return (
    <section id="live-demo" style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)', scrollMarginTop: '80px' }}>
      <WaveField variant="corner-right" shape="wave" colorFront="#3FAEDE" opacity={0.3} speed={0.24} />

      <style>{`
        @keyframes seDemoPulse { 0%{box-shadow:0 0 0 0 rgba(196,162,90,0.5)} 100%{box-shadow:0 0 0 10px rgba(196,162,90,0)} }
        .se-demo-btn { display:inline-flex; align-items:center; gap:10px; padding:16px 34px; background:linear-gradient(135deg,#FFDF8F 0%,#C4A25A 60%,#C6BCA3 100%); color:var(--bg); font-family:var(--sans); font-size:12.5px; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; text-decoration:none; transition:box-shadow 0.4s ease, transform 0.2s ease; }
        .se-demo-btn:hover { box-shadow:0 0 46px rgba(255,223,143,0.35); transform:translateY(-2px); }
        .se-demo-variants { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        @media (max-width: 860px) { .se-demo-variants { grid-template-columns:1fr; } }
      `}</style>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vh, 56px)' }}>
          <Reveal>
            <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
              Live on this page, right now
            </span>
          </Reveal>

          <Reveal delay={140}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.8vw, 54px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 600, maxWidth: '20ch', margin: '0 auto 24px' }}>
            Do not take our word for it. Try to break it<span style={{ color: 'var(--gold)' }}>.</span>
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '58ch', margin: '0 auto' }}>
              This is not a request-a-demo form. Athena comes in two forms, one for each side of the counter,
              and you can talk to it right now, before anyone from our side talks to you:
            </p>
          </Reveal>
        </div>

        <div className="se-demo-variants" style={{ marginBottom: 'clamp(36px, 5vh, 48px)' }}>
          {VARIANTS.map((v, i) => <VariantCard key={v.name} v={v} delay={i * 120} />)}
        </div>

        <Reveal delay={120}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--fg-dim)', textAlign: 'center', marginBottom: '18px' }}>
            Things worth trying on the customer demo
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          {ATTACKS.map((a, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(11,23,41,0.55)', border: '1px solid rgba(46,116,172,0.26)', borderRadius: '12px', padding: '16px 18px', height: '100%' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
                  <Icon name={a.icon} size={17} color="var(--gold)" />
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '13.5px', lineHeight: 1.5, color: 'var(--muted-cream)', fontWeight: 300 }}>{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.7vw, 20px)', lineHeight: 1.6, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', textAlign: 'center', maxWidth: '52ch', margin: 'clamp(36px, 5vh, 48px) auto 0' }}>
            Broke it? Tell us how, we will fix it. Could not? Keep scrolling. The guarantee is next.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
