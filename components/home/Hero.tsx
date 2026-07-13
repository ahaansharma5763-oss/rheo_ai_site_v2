'use client';

import Reveal from './Reveal';
import { HeroDithering } from '@/components/ui/hero-dithering-card';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100svh',
      padding: 'clamp(120px, 16vh, 220px) var(--rail-pad) clamp(60px, 10vh, 140px)',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Brand wave shader, scoped to hero only, fades out at the bottom */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.95,
        // Soft vertical fade so the wave dissolves into the gradient below
        // instead of cutting off at the section edge
        maskImage: 'linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.6) 78%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.6) 78%, transparent 100%)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}>
          <HeroDithering colorBack="#0D1F3C" colorFront="#4599B5" shape="wave" type="4x4" speed={0.32} />
        </div>
      </div>
      {/* Soft radial vignette so the headline holds against the wave */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 70% at 30% 50%, rgba(7,16,30,0.45) 0%, transparent 75%)',
      }} />

      <div style={{ maxWidth: 'var(--container-max)', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <Reveal delay={100}>
          <span className="eyebrow eyebrow-tick" style={{ display: 'inline-flex', marginBottom: '36px' }}>
            EST. 2026 &nbsp;·&nbsp; THE CONNECTIVE TISSUE
          </span>
        </Reveal>

        <Reveal delay={250}>
          <h1 className="gold-shimmer" style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(46px, 8.4vw, 104px)',
            lineHeight: 1.03,
            letterSpacing: '-0.022em',
            fontWeight: 600,
            maxWidth: '18ch',
            marginBottom: '48px',
            filter: 'drop-shadow(0 0 60px rgba(196,162,90,0.3))',
          }}>
            AI-native infrastructure for{' '}
            <span className="under-gold">businesses that compound</span>.
          </h1>
        </Reveal>

        <Reveal delay={450}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(17px, 1.45vw, 19px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '56ch',
            marginBottom: '56px',
          }}>
            We design intelligent workflows that let your data, tools, and people talk to each other.
            The connective tissue that turns a stack of disconnected tools into one operating fabric,
            so founders spend their time on strategy, not operations.
          </p>
        </Reveal>

        <Reveal delay={650}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a
              href="https://audit.rheoai.co.in"
              target="_blank"
              rel="noreferrer"
              className="gold-bg"
              style={{
                color: 'var(--bg)',
                padding: '16px 32px',
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 700,
                transition: 'box-shadow 0.4s ease, transform 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(240,208,128,0.32)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start with an Ops Audit
            </a>
            <a
              href="/sales-engineer"
              style={{
                border: '1px solid var(--ocean)',
                color: 'var(--warm-foam)',
                padding: '16px 32px',
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 700,
                transition: 'border-color 0.3s ease, color 0.3s ease',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gold-end)';
                e.currentTarget.style.color = 'var(--gold-end)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--ocean)';
                e.currentTarget.style.color = 'var(--warm-foam)';
              }}
            >
              Meet Athena
            </a>
          </div>
        </Reveal>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue" aria-hidden style={{
        position: 'absolute',
        bottom: '36px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontFamily: 'var(--sans)',
          fontSize: '9px',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--fg-dim)',
          fontWeight: 500,
        }}>
          Scroll
        </span>
        <span style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(180deg, var(--gold), transparent)',
        }} />
      </div>

    </section>
  );
}
