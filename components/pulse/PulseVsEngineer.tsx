'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Side { name: string; tag: string; icon: IconName; lead: string; points: string[]; }

const ENGINEER: Side = {
  name: 'Athena', tag: 'The AI Sales Engineer', icon: 'chat',
  lead: 'Athena answers the door.',
  points: [
    'Answers every technical enquiry in seconds, around the clock',
    'Qualifies the requirement, recommends the right product, sends a cited quote',
    'Your sharpest, most reliable front of house — it never misses an enquiry',
  ],
};

const PULSE: Side = {
  name: 'Pulse', tag: 'The journey', icon: 'heart',
  lead: 'Pulse runs the whole house.',
  points: [
    'Revives the leads that went cold long ago',
    'Nurtures the interested-but-not-ready, wins back past customers',
    'Watches the health of every relationship over months, not minutes',
  ],
};

function Column({ side, highlight }: { side: Side; highlight?: boolean }) {
  return (
    <article
      className="hover-rule"
      style={{
        background: highlight ? 'rgba(196,162,90,0.06)' : 'rgba(15,30,54,0.45)',
        border: `1px solid ${highlight ? 'rgba(196,162,90,0.35)' : 'rgba(46,107,142,0.28)'}`,
        padding: 'clamp(30px, 3.6vw, 44px)', height: '100%',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
        <div style={{ width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
          <Icon name={side.icon} size={25} color="var(--gold)" />
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.2vw, 26px)', color: 'var(--gold)', fontWeight: 600, lineHeight: 1.1 }}>{side.name}</h3>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--crest)' }}>{side.tag}</span>
        </div>
      </div>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '19px', color: 'var(--warm-foam)', fontWeight: 500, marginBottom: '22px', fontStyle: 'italic' }}>{side.lead}</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {side.points.map((p, i) => (
          <li key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, paddingTop: '2px' }}><Icon name="check" size={16} color="var(--gold)" /></span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.6, color: 'var(--muted-cream)', fontWeight: 300 }}>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PulseVsEngineer() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,107,142,0.12)' }}>
      <WaveField variant="corner-left" shape="swirl" colorFront="#C4A25A" opacity={0.26} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: 'var(--gold-end)' }}>
            Pulse and Athena
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px, 5vw, 56px)', color: 'var(--fg)', letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 18px', lineHeight: 1.1, fontWeight: 600 }}>
            Two intelligences. One unstoppable journey<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.7, color: 'var(--fg-mute)', fontWeight: 300, textAlign: 'center', maxWidth: '60ch', margin: '0 auto clamp(48px, 7vh, 72px)' }}>
            Athena is the conversation. Pulse is the journey. One catches every opportunity at the front. The other makes sure every opportunity is carried all the way through.
          </p>
        </Reveal>

        <div className="pulse-vs-grid" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'stretch' }}>
          <Reveal><Column side={ENGINEER} /></Reveal>
          <div className="pulse-vs-plus" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(7,16,30,0.8)', border: '1px solid rgba(196,162,90,0.4)', fontFamily: 'var(--serif)', fontSize: '24px', color: 'var(--gold)' }}>+</div>
          </div>
          <Reveal delay={120}><Column side={PULSE} highlight /></Reveal>
        </div>

        <Reveal delay={200}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, textAlign: 'center', maxWidth: '58ch', margin: 'clamp(40px, 6vh, 56px) auto 0' }}>
            You can start with either. Most businesses end up running both — because the front door and the journey are two halves of the same thing.
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .pulse-vs-grid { grid-template-columns: 1fr !important; }
          .pulse-vs-plus { padding: 4px 0; }
        }
      `}</style>
    </section>
  );
}
