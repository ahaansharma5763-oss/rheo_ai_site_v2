'use client';

import WaveField from '@/components/ui/wave-field';
import PilotForm from '@/components/pilot/PilotForm';

export default function PilotHero() {
  return (
    <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <style>{`
        @keyframes pilotRise { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pilotGlow { 0%,100%{text-shadow:0 0 60px rgba(196,162,90,.22)} 50%{text-shadow:0 0 100px rgba(196,162,90,.4)} }
        .pilot-inner { position:relative; z-index:2; display:flex; align-items:center; width:100%; max-width:1240px; margin:0 auto; padding:128px var(--rail-pad) 80px; gap:56px; }
        .pilot-copy  { flex:1 1 0; min-width:0; animation:pilotRise 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .pilot-form  { flex:0 0 420px; animation:pilotRise 1s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        @media(max-width:960px) {
          .pilot-inner { flex-direction:column !important; padding:120px 24px 64px !important; gap:40px !important; }
          .pilot-form  { flex:0 0 auto !important; width:100%; max-width:460px; }
        }
      `}</style>

      <WaveField variant="full" shape="ripple" colorBack="#07101E" colorFront="#4599B5" opacity={0.5} speed={0.26} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 75% 70% at 55% 50%, rgba(7,16,30,0.55) 0%, transparent 78%)' }} />

      <div className="pilot-inner">
        <div className="pilot-copy">
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.44em', margin: '0 0 22px 0', opacity: 0.85 }}>
            The Performance Pilot · A Rheo AI Offer
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(38px,5vw,68px)', color: 'var(--fg)', letterSpacing: '-0.022em', lineHeight: 1.06, margin: '0 0 24px 0', fontWeight: 600 }}>
            We build it. You watch it work. You pay only if it{' '}
            <span className="gold-text" style={{ animation: 'pilotGlow 4s ease-in-out infinite' }}>does</span>.
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px,1.4vw,18px)', color: 'var(--fg-mute)', fontWeight: 300, lineHeight: 1.7, maxWidth: '54ch', margin: '0 0 28px 0' }}>
            We install a complete lead-recovery system on your live enquiries and run it for 14 days. You watch it catch
            and convert the leads you are losing right now, in your own numbers. If it does not recover more than it costs,
            you owe nothing.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
            {['14-day live build', 'Pay only if it works', 'Two slots a month'].map(s => (
              <span key={s} style={{ fontFamily: 'var(--sans)', fontSize: '9.5px', color: 'var(--crest)', letterSpacing: '.16em', textTransform: 'uppercase', border: '1px solid rgba(69,153,181,.24)', borderRadius: '20px', padding: '6px 14px', background: 'rgba(69,153,181,.05)' }}>{s}</span>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--fg-dim)', letterSpacing: '0.02em', margin: 0 }}>
            Built by Rheo AI · The team behind Metis and Ascend Arena · No recovery, no fee.
          </p>
        </div>

        <div className="pilot-form">
          <PilotForm idPrefix="pilot-hero" />
        </div>
      </div>
    </section>
  );
}
