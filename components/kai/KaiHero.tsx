'use client';

import Reveal from '@/components/home/Reveal';

const CALENDLY_URL = 'https://calendly.com/ahaan-rheoai-xnxc/30min';

export default function KaiHero() {
  return (
    <section style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <style>{`
        .kai-btn { display:inline-block; padding:17px 42px; background:linear-gradient(135deg,#FFDF8F 0%,#C4A25A 60%,#C6BCA3 100%); color:var(--bg); font-family:var(--sans); font-size:13px; letter-spacing:0.2em; text-transform:uppercase; font-weight:700; text-decoration:none; transition: box-shadow 0.4s ease, transform 0.2s ease; }
        .kai-btn:hover { box-shadow:0 0 50px rgba(255,223,143,0.35); transform: translateY(-2px); }
        @keyframes kaiRise { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Backplate: kai-hero (storm light, brass moonpath right) */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="/images/sea/kai-hero.webp"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '70% center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,14,29,0.92) 0%, rgba(5,14,29,0.72) 40%, rgba(5,14,29,0.25) 75%, rgba(5,14,29,0.45) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,14,29,0.55) 0%, transparent 30%, transparent 70%, #050E1D 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1240px', margin: '0 auto', padding: '140px var(--rail-pad) 100px' }}>
        <div style={{ maxWidth: '640px', animation: 'kaiRise 0.9s cubic-bezier(0.2,0.6,0.2,1) both' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '.44em', margin: '0 0 22px 0', opacity: 0.9 }}>
            Kai · Customer Orchestration · Rheo AI
          </p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5.6vw, 74px)', color: 'var(--fg)', letterSpacing: '-0.022em', lineHeight: 1.05, margin: '0 0 26px 0', fontWeight: 500 }}>
            Your next 50 customers are already in your phone.
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'var(--fg-mute)', fontWeight: 300, lineHeight: 1.7, maxWidth: '54ch', margin: '0 0 18px 0' }}>
            Kai is the layer that runs your entire customer funnel, from the very first enquiry to the loyal
            regular who refers their friends. It answers every new lead in seconds, qualifies them, books them,
            nurtures the hesitant, wins back the lapsed, and keeps the loyal coming back. One system,
            orchestrating every touchpoint, so nothing and nobody ever slips through.
          </p>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '14.5px', color: 'var(--muted-cream)', lineHeight: 1.6, margin: '0 0 28px 0' }}>
            Kai is Japanese for sea. Every river, every wave, every drop of rain ends in the sea.
            Every touchpoint ends in Kai.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '34px' }}>
            {['Respond', 'Qualify', 'Convert', 'Nurture', 'Win back', 'Retain'].map(s => (
              <span key={s} style={{ fontFamily: 'var(--sans)', fontSize: '9.5px', color: 'var(--crest)', letterSpacing: '.16em', textTransform: 'uppercase', border: '1px solid rgba(63,174,222,.28)', padding: '6px 14px', background: 'rgba(5,14,29,.4)' }}>{s}</span>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="kai-btn">
              Book a Pipeline Review →
            </a>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--fg-dim)', letterSpacing: '0.03em', lineHeight: 1.65, maxWidth: '52ch', margin: 0 }}>
              Built and run by Rheo AI. Backed by a 60-day money-back promise.
              Limited onboarding: two new builds a month.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
