'use client';

import Reveal from './Reveal';
import ProductCard from './ProductCard';
import { CLUSTERS, productsByCluster } from '@/lib/catalogue';

export default function Work() {
  return (
    <section id="work" style={{
      padding: 'clamp(120px, 18vh, 200px) var(--rail-pad)',
      maxWidth: '1280px',
      margin: '0 auto',
    }}>
      <Reveal>
        <p className="eyebrow" style={{ marginBottom: '32px' }}>The Work</p>
      </Reveal>

      <Reveal delay={150}>
        <h2 style={{
          fontSize: 'clamp(36px, 5.5vw, 80px)',
          lineHeight: 1.05,
          letterSpacing: '-0.022em',
          color: 'var(--fg)',
          fontWeight: 400,
          maxWidth: '16ch',
          marginBottom: '32px',
        }}>
          Fourteen products. Five quiet systems.
        </h2>
      </Reveal>

      <Reveal delay={250}>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(16px, 1.4vw, 19px)',
          lineHeight: 1.7,
          color: 'var(--fg-mute)',
          fontWeight: 300,
          maxWidth: '58ch',
          marginBottom: 'clamp(64px, 10vh, 120px)',
        }}>
          Every product is custom-built, retainer-backed, and yours to own. Tap any card to read what we
          will build for you, what you get, and the outcomes you can expect.
        </p>
      </Reveal>

      {CLUSTERS.map((cluster, ci) => {
        const products = productsByCluster(cluster.key);
        return (
          <div key={cluster.key} style={{ marginBottom: 'clamp(80px, 12vh, 140px)' }}>
            <Reveal delay={ci * 60}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '32px',
                marginBottom: '40px',
                flexWrap: 'wrap',
              }}>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(24px, 2.6vw, 34px)',
                  color: 'var(--fg)',
                  letterSpacing: '-0.015em',
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}>
                  {cluster.title}<span style={{ color: 'var(--gold)' }}>.</span>
                </h3>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                  color: 'var(--fg-dim)',
                  lineHeight: 1.6,
                  maxWidth: '52ch',
                  flex: 1,
                  minWidth: '240px',
                }}>
                  {cluster.blurb}
                </p>
              </div>
            </Reveal>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}>
              {products.map((p, i) => (
                <Reveal key={p.slug} delay={i * 40}>
                  <ProductCard p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
