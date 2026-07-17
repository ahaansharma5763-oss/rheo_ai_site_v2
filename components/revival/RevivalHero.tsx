'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';

export default function RevivalHero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(160px, 24vh, 230px) var(--rail-pad) clamp(90px, 14vh, 140px)' }}>
      <WaveField variant="bottom" shape="wave" colorBack="#050E1D" colorFront="#2E74AC" opacity={0.3} speed={0.22} />

      <style>{`
        .rev-btn { display:inline-block; padding:17px 42px; border:1px solid var(--gold); background:transparent; color:var(--warm-foam); font-family:var(--sans); font-size:13px; letter-spacing:0.2em; text-transform:uppercase; font-weight:500; text-decoration:none; transition: background 0.3s cubic-bezier(0.2,0.6,0.2,1), transform 0.3s cubic-bezier(0.2,0.6,0.2,1); }
        .rev-btn:hover { background: rgba(196,162,90,0.1); transform: translateY(-2px); }
      `}</style>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '24px', color: 'var(--gold-end)' }}>
            The Revival Sprint
          </span>
        </Reveal>

        <Reveal delay={120}>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px, 6vw, 72px)', lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--fg)', fontWeight: 500, maxWidth: '18ch', marginBottom: '30px' }}>
            We turn your dead leads into booked revenue. In 21 days.
          </h1>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 18px)', lineHeight: 1.75, color: 'var(--fg-mute)', fontWeight: 300, maxWidth: '62ch', marginBottom: '44px' }}>
            Every business is sitting on a list of people who enquired and went quiet, and customers who simply
            never came back. The Revival Sprint is one focused campaign that goes through that list, starts real
            conversations, and brings the right people back through your door. You get a report with one number
            on it: the revenue it recovered.
          </p>
        </Reveal>

        <Reveal delay={360}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="rev-btn">
              Find out what your list is worth →
            </a>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12.5px', letterSpacing: '0.04em', color: 'var(--fg-dim)', lineHeight: 1.65, maxWidth: '52ch' }}>
              Built by Rheo AI, the team behind Athena and Pulse. If the Sprint does not recover more than twice
              what it costs, you only cover the small holding deposit.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
