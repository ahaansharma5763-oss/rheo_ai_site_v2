'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Pillar { num: string; icon: IconName; verb: string; description: string; }

const PILLARS: Pillar[] = [
  { num: '01', icon: 'eye',         verb: 'It reads',    description: 'Every message, every signal, every moment of interest or hesitation. Okeanos always knows where each person is in their journey.' },
  { num: '02', icon: 'brain',       verb: 'It decides',  description: 'Based on what each person actually needs, Okeanos chooses the right next move — a fast path to yes, reassurance, or a reason to come back.' },
  { num: '03', icon: 'bolt',        verb: 'It acts',     description: 'Okeanos reaches out with a message written specifically for that person and that moment. It feels personal because it is personal.' },
  { num: '04', icon: 'refresh',     verb: 'It learns',   description: 'Every response makes the next move smarter. Over time Okeanos understands your customers better than any spreadsheet ever could.' },
];

export default function PulseWhatIs() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden' }}>
      <WaveField variant="corner-right" shape="swirl" colorFront="#3FAEDE" opacity={0.34} speed={0.26} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            Broadcasting is over · Intelligence wins now
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4.6vw, 56px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '22ch', marginBottom: '28px' }}>
            The brain that runs your entire customer journey<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '64ch', marginBottom: 'clamp(56px, 8vh, 88px)' }}>
            Okeanos does the opposite of broadcasting. It treats every lead as one person — because that is what they are.
            It sits quietly inside your business and manages the full life of every relationship, from the first hello to
            the moment they refer their friends. Four things, continuously, without you lifting a finger:
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.verb} delay={i * 80}>
              <article
                className="hover-rule"
                style={{ background: 'rgba(15,30,54,0.45)', border: '1px solid rgba(46,116,172,0.28)', padding: 'clamp(28px, 3.2vw, 36px)', height: '100%', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, border-color 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(15,30,54,0.7)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(15,30,54,0.45)'; e.currentTarget.style.borderColor = 'rgba(46,116,172,0.28)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
                    <Icon name={p.icon} size={26} color="var(--gold)" />
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.3em', color: 'var(--ocean)' }}>{p.num}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '23px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.012em', marginBottom: '12px' }}>
                  {p.verb}<span style={{ color: 'var(--gold)' }}>.</span>
                </h3>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.65, color: 'var(--muted-cream)', fontWeight: 300 }}>{p.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
