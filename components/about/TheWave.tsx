'use client';

import Reveal from '@/components/home/Reveal';

export default function TheWave() {
  return (
    <section style={{
      padding: 'clamp(160px, 26vh, 280px) var(--rail-pad)',
      borderTop: '1px solid rgba(242,240,236,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Hokusai photographic backdrop */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/images/hokusai-reference.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.18,
        zIndex: 0,
        pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 90% 80% at 70% 50%, black 30%, transparent 90%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 70% 50%, black 30%, transparent 90%)',
      }} />
      {/* Decorative SVG overlay (kept subtle) */}
      <svg
        aria-hidden
        style={{
          position: 'absolute',
          right: '-10%',
          top: '10%',
          width: '80%',
          maxWidth: '1200px',
          opacity: 0.10,
          pointerEvents: 'none',
        }}
        viewBox="0 0 800 500"
        fill="none"
      >
        {/* Multiple wave layers, layered like the Great Wave */}
        <path d="M0,300 Q150,180 280,260 Q360,320 480,240 Q600,160 720,260 Q780,300 800,280"
          stroke="#1E4080" strokeWidth="1.4" fill="none" opacity="0.7" />
        <path d="M0,330 Q150,210 280,290 Q360,350 480,270 Q600,190 720,290 Q780,330 800,310"
          stroke="#2E74AC" strokeWidth="1" fill="none" opacity="0.8" />
        <path d="M0,360 Q150,240 280,320 Q360,380 480,300 Q600,220 720,320 Q780,360 800,340"
          stroke="#3FAEDE" strokeWidth="0.7" fill="none" opacity="0.6" />
        <path d="M0,390 Q150,270 280,350 Q360,410 480,330 Q600,250 720,350 Q780,390 800,370"
          stroke="#C4A25A" strokeWidth="0.6" fill="none" opacity="0.5" />

        {/* Crest curl (the iconic Hokusai curl) */}
        <path d="M180,260 Q150,140 240,160 Q310,175 290,230 Q280,255 250,250"
          stroke="#C4A25A" strokeWidth="1" fill="none" opacity="0.7" />
        <path d="M210,210 Q210,180 240,190 Q260,200 250,225"
          stroke="#8FDCF8" strokeWidth="0.5" fill="none" opacity="0.5" />

        {/* Foam dots */}
        <circle cx="230" cy="160" r="2.5" fill="#F2F0EC" opacity="0.5" />
        <circle cx="265" cy="175" r="1.8" fill="#F2F0EC" opacity="0.4" />
        <circle cx="248" cy="185" r="1.5" fill="#F2F0EC" opacity="0.35" />
      </svg>

      <div style={{ maxWidth: '1180px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: '40px' }}>The Wave</p>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(36px, 5.5vw, 80px)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: 'var(--fg)',
            fontWeight: 400,
            maxWidth: '17ch',
            marginBottom: '64px',
          }}>
            Why we built the brand around <span style={{ color: 'var(--gold)' }}>Hokusai</span>.
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(40px, 5vw, 80px)',
          marginTop: '40px',
        }}>
          <Reveal delay={300}>
            <div>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: '24px',
                color: 'var(--fg)',
                marginBottom: '16px',
                fontWeight: 400,
                lineHeight: 1.2,
              }}>
                Power that looks effortless.
              </h3>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--fg-mute)',
                fontWeight: 300,
              }}>
                Hokusai&apos;s Great Wave is not a violent painting. It is a still, almost meditative
                composition of a single, enormous force. That is what good automation looks like.
                A lot is happening. None of it is loud.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: '24px',
                color: 'var(--fg)',
                marginBottom: '16px',
                fontWeight: 400,
                lineHeight: 1.2,
              }}>
                Precision behind the curl.
              </h3>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--fg-mute)',
                fontWeight: 300,
              }}>
                Look closely at the print. Every line is deliberate. The foam is mathematical. The curl
                is engineered. We build the same way. The operator sees a single answer arrive on time.
                Underneath: state machines, intent routing, data brokers, every edge case handled.
              </p>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div>
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: '24px',
                color: 'var(--fg)',
                marginBottom: '16px',
                fontWeight: 400,
                lineHeight: 1.2,
              }}>
                Made to last centuries.
              </h3>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                lineHeight: 1.75,
                color: 'var(--fg-mute)',
                fontWeight: 300,
              }}>
                The Great Wave was carved as a woodblock print in the 1830s. It is still legible today,
                two hundred years later, on phone screens it could never have imagined. We build systems
                with that same intent. Boring infrastructure on purpose. Made to run for years.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={650}>
          <div style={{
            marginTop: 'clamp(80px, 12vh, 140px)',
            paddingTop: '48px',
            borderTop: '1px solid rgba(242,240,236,0.08)',
          }}>
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(20px, 2vw, 26px)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              color: 'var(--fg-mute)',
              maxWidth: '60ch',
              fontWeight: 400,
            }}>
              &ldquo;The wave is not the water. The wave is the pattern the water moves in.&rdquo;
            </p>
            <p style={{
              marginTop: '20px',
              fontFamily: 'var(--sans)',
              fontSize: '12px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
            }}>
              The brand, in one sentence.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
