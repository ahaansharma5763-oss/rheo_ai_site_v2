'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Pillar {
  icon: IconName;
  kicker: string;
  title: string;
  body: string;
  stat: number;
  prefix?: string;
  suffix?: string;
  statLabel: string;
}

const PILLARS: Pillar[] = [
  {
    icon: 'bolt',
    kicker: 'Speed wins deals',
    title: 'First cited quote in minutes, not days',
    body: 'In considered purchases, the first credible quote frames the whole negotiation. When your quote lands the same hour as the enquiry, with the spec reasoning attached, you are the benchmark every competitor gets compared against.',
    stat: 8, prefix: '', suffix: ' min', statLabel: 'from enquiry to a cited quote',
  },
  {
    icon: 'clock',
    kicker: 'Nothing leaks',
    title: 'Every enquiry answered, captured, and logged',
    body: 'Nights, Sundays, exhibition weeks, and the hour your engineer was on a site visit. Every conversation becomes a qualified, logged lead with the full technical context attached. Zero enquiries die in someone’s inbox.',
    stat: 100, prefix: '', suffix: '%', statLabel: 'of enquiries captured, day and night',
  },
  {
    icon: 'trending-up',
    kicker: 'Engineers multiplied',
    title: 'Your seniors stop repeating, start closing',
    body: 'The repetitive 80% of technical questions gets absorbed. Your engineers get their week back for site visits, negotiations, and the deals that actually need a human, with a briefing of what each buyer already said.',
    stat: 15, prefix: '', suffix: '+ hrs', statLabel: 'of engineering time returned weekly',
  },
];

function useCountOnView(target: number, ms = 1100) {
  const ref = useRef<HTMLDivElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / ms);
        const eased = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target, ms]);
  return { ref, val };
}

function PillarCard({ p, i }: { p: Pillar; i: number }) {
  const { ref, val } = useCountOnView(p.stat);
  return (
    <Reveal delay={i * 120}>
      <article
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          background: 'rgba(11,23,41,0.6)', border: '1px solid rgba(46,116,172,0.28)',
          borderTop: '2px solid var(--gold)', padding: 'clamp(30px, 3.4vw, 42px)',
          height: '100%', display: 'flex', flexDirection: 'column',
          transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 30px 70px rgba(0,0,0,0.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)' }}>
            <Icon name={p.icon} size={23} color="var(--gold)" />
          </div>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 600 }}>{p.kicker}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '6px' }}>
          <span className="gold-text" style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(44px, 5vw, 60px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>
            {p.prefix}{val}{p.suffix}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: '24px' }}>{p.statLabel}</p>

        <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: '14px' }}>{p.title}</h3>
        <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300 }}>{p.body}</p>
      </article>
    </Reveal>
  );
}

export default function SEROI() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="wave" colorFront="#3FAEDE" opacity={0.3} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: 'var(--gold-end)' }}>
            The return
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px, 5vw, 56px)', color: 'var(--fg)', letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 clamp(48px, 7vh, 72px)', lineHeight: 1.1, fontWeight: 600 }}>
            One engineer&apos;s salary caps you. This does not<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: 'clamp(44px, 6vh, 60px)' }}>
          {PILLARS.map((p, i) => <PillarCard key={p.kicker} p={p} i={i} />)}
        </div>

        <Reveal delay={140}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap', padding: 'clamp(24px, 3vw, 34px) clamp(24px, 3.2vw, 40px)', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(196,162,90,0.1) 0%, rgba(11,23,41,0.6) 70%)', border: '1px solid rgba(196,162,90,0.35)' }}>
            <Icon name="insights" size={28} color="var(--gold)" />
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.8vw, 21px)', lineHeight: 1.55, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', flex: 1, minWidth: '280px' }}>
              A good sales engineer costs lakhs a year, takes months to hire and years to train, covers one
              conversation at a time, and resigns with everything in their head. This costs a fraction of one hire,
              is live in three weeks, covers every product line and every enquiry at once, and its knowledge stays
              yours forever. That is the investment case in one sentence.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
