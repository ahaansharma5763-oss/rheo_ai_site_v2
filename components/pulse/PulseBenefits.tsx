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
    icon: 'trending-up',
    kicker: 'More revenue',
    title: 'The customers you already paid to find',
    body: 'Okeanos goes back through every lead you have ever spoken to and brings the right ones back to life — then makes sure no new lead ever slips through again. You are not buying software. You are buying the customers you already paid to find and never closed.',
    stat: 2, prefix: '', suffix: '×', statLabel: 'conversion from the same leads',
  },
  {
    icon: 'clock',
    kicker: 'More time',
    title: 'Your team stops chasing, starts closing',
    body: 'Good follow-up means someone remembering who said what, when to circle back, and what to say. That is hours every week, and it still misses people. Okeanos carries all of it, so your team only ever talks to people who are already warm.',
    stat: 12, prefix: '', suffix: ' hrs', statLabel: 'of follow-up handed back each week',
  },
  {
    icon: 'check-circle',
    kicker: 'Less effort',
    title: 'It runs in the background, by design',
    body: 'Nothing to learn, nothing to log into every morning, nothing to manage. Okeanos brings the important moments to you — a hot-lead alert when someone is ready to buy, a heads-up when a good customer is slipping away. The rest, it simply handles.',
    stat: 0, prefix: '', suffix: '', statLabel: 'dashboards you have to check',
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

export default function PulseBenefits() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="wave" colorFront="#3FAEDE" opacity={0.3} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: 'var(--gold-end)' }}>
            What this means for you
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px, 5vw, 56px)', color: 'var(--fg)', letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 clamp(48px, 7vh, 72px)', lineHeight: 1.1, fontWeight: 600 }}>
            More revenue. More time. Less effort<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {PILLARS.map((p, i) => <PillarCard key={p.kicker} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
