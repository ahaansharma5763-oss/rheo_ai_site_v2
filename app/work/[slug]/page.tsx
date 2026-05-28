import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/shared/Nav';
import Footer from '@/components/shared/Footer';
import PageGradient from '@/components/shared/PageGradient';
import { PRODUCTS, getProduct } from '@/lib/catalogue';

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: 'Not found' };
  return {
    title: `${p.name} · Rheo AI`,
    description: p.tagline,
  };
}

const ACCENT_HEX = {
  gold:  '#C4A25A',
  crest: '#4599B5',
  ocean: '#2E6B8E',
  foam:  '#7EC8E3',
} as const;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const accent = ACCENT_HEX[p.accent];

  // Find adjacent products for "next" navigation
  const idx = PRODUCTS.findIndex(x => x.slug === slug);
  const next = PRODUCTS[(idx + 1) % PRODUCTS.length];
  const prev = PRODUCTS[(idx - 1 + PRODUCTS.length) % PRODUCTS.length];

  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <Nav />

      {/* HERO */}
      <section style={{
        padding: 'clamp(140px, 18vh, 220px) var(--rail-pad) clamp(80px, 12vh, 120px)',
        maxWidth: '1180px',
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Product image, large, atmospheric */}
        <div aria-hidden style={{
          position: 'absolute',
          right: 'var(--rail-pad)',
          top: '14vh',
          width: 'min(38vw, 460px)',
          aspectRatio: '3 / 4',
          backgroundImage: `url('${p.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '20px',
          opacity: 0.92,
          zIndex: 0,
          boxShadow: '0 40px 120px rgba(5,12,24,0.6), 0 0 0 1px rgba(196,162,90,0.08)',
        }} className="product-hero-img" />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 'min(58ch, calc(100% - min(40vw, 480px)))' }} className="product-hero-text">
        <Link
          href="/#work"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
            marginBottom: '40px',
            display: 'inline-block',
          }}
        >
          ← All Work
        </Link>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '20px', marginBottom: '32px' }}>
          <span style={{
            fontFamily: 'var(--sans)',
            fontSize: '13px',
            letterSpacing: '0.4em',
            color: accent,
            fontWeight: 500,
          }}>
            {p.number}
          </span>
          <span style={{
            fontFamily: 'var(--sans)',
            fontSize: '11px',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
          }}>
            {p.cluster === 'lead' ? 'Lead & Conversion'
              : p.cluster === 'booking' ? 'Booking & Slots'
              : p.cluster === 'retention' ? 'Retention & Reputation'
              : p.cluster === 'ops' ? 'Operations & Visibility'
              : 'Audit & Bundle'}
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(48px, 8vw, 112px)',
          lineHeight: 0.98,
          letterSpacing: '-0.028em',
          color: 'var(--fg)',
          fontWeight: 400,
          marginBottom: '40px',
          maxWidth: '16ch',
        }}>
          {p.name}<span style={{ color: accent }}>.</span>
        </h1>

        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(18px, 1.7vw, 24px)',
          lineHeight: 1.5,
          color: 'var(--fg-mute)',
          fontWeight: 300,
          maxWidth: '52ch',
        }}>
          {p.tagline}
        </p>
        </div>
      </section>

      {/* PROBLEM */}
      <Block label="The Problem">
        <p style={para()}>{p.problem}</p>
      </Block>

      {/* WHAT WE DO */}
      <Block label="What We Do">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {p.what.map((line, i) => (
            <li key={i} style={{
              display: 'flex',
              gap: '20px',
              padding: '20px 0',
              borderTop: i === 0 ? '1px solid rgba(242,240,236,0.08)' : 'none',
              borderBottom: '1px solid rgba(242,240,236,0.08)',
              fontFamily: 'var(--sans)',
              fontSize: 'clamp(15px, 1.3vw, 17px)',
              lineHeight: 1.6,
              color: 'var(--fg)',
              fontWeight: 300,
            }}>
              <span style={{
                fontFamily: 'var(--sans)',
                fontSize: '12px',
                color: accent,
                letterSpacing: '0.2em',
                minWidth: '40px',
                paddingTop: '4px',
                fontWeight: 500,
              }}>
                0{i + 1}
              </span>
              <span style={{ flex: 1, color: 'var(--fg-mute)' }}>{line}</span>
            </li>
          ))}
        </ul>
      </Block>

      {/* WHAT YOU GET */}
      <Block label="What You Get">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {p.youGet.map((line, i) => (
            <div key={i} style={{
              background: 'rgba(11,23,41,0.5)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(242,240,236,0.06)',
              fontFamily: 'var(--sans)',
              fontSize: '14.5px',
              lineHeight: 1.6,
              color: 'var(--fg-mute)',
              fontWeight: 300,
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: accent,
                marginBottom: '14px',
              }} />
              {line}
            </div>
          ))}
        </div>
      </Block>

      {/* OUTCOMES */}
      <Block label="Outcomes">
        <div style={{
          borderTop: '1px solid rgba(242,240,236,0.08)',
        }}>
          {p.roi.map((r, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1.4fr)',
              gap: '24px',
              padding: '24px 0',
              borderBottom: '1px solid rgba(242,240,236,0.08)',
              alignItems: 'baseline',
            }}
            className="roi-row">
              <div style={{
                fontFamily: 'var(--sans)',
                fontSize: '15px',
                color: 'var(--fg-mute)',
                fontWeight: 300,
              }}>
                {r.metric}
              </div>
              <div style={{
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                color: 'var(--fg-dim)',
                textDecoration: 'line-through',
                textDecorationColor: 'rgba(242,240,236,0.2)',
              }}>
                {r.before}
              </div>
              <div style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                color: accent,
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
              }}>
                {r.after}
              </div>
            </div>
          ))}
        </div>
      </Block>

      {/* WHO */}
      <Block label="Who This Is For">
        <p style={para()}>{p.who}</p>
      </Block>

      {/* CTA */}
      <section style={{
        padding: 'clamp(120px, 18vh, 200px) var(--rail-pad)',
        maxWidth: '1100px',
        margin: '0 auto',
        textAlign: 'left',
      }}>
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(40px, 6vw, 80px)',
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: 'var(--fg)',
          fontWeight: 400,
          marginBottom: '32px',
          maxWidth: '14ch',
        }}>
          Ready to build this<span style={{ color: accent }}>?</span>
        </h2>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '18px',
          lineHeight: 1.6,
          color: 'var(--fg-mute)',
          maxWidth: '48ch',
          marginBottom: '48px',
          fontWeight: 300,
        }}>
          Every Rheo engagement begins with an Ops Audit. Forty-five minutes on a call, a written scorecard
          in five business days, and a clear list of what to fix first.
        </p>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <a href="https://calendly.com/ahaan-rheoai/30min" target="_blank" rel="noreferrer"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--bg)',
              background: 'var(--fg)',
              padding: '16px 32px',
              borderRadius: '999px',
            }}>
            Book the audit
          </a>
          <a href="mailto:ahaan@rheoai.co.in"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '14px',
              color: 'var(--fg-mute)',
              padding: '16px 0',
            }}>
            ahaan@rheoai.co.in →
          </a>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section style={{
        padding: '60px var(--rail-pad) 100px',
        maxWidth: '1280px',
        margin: '0 auto',
        borderTop: '1px solid rgba(242,240,236,0.08)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginTop: '40px',
        }}>
          <Link href={`/work/${prev.slug}`} style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: '8px' }}>
              ← Previous
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--fg)' }}>
              {prev.name}
            </div>
          </Link>
          <Link href={`/work/${next.slug}`} style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--fg-dim)', marginBottom: '8px' }}>
              Next →
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--fg)' }}>
              {next.name}
            </div>
          </Link>
        </div>
      </section>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .roi-row { grid-template-columns: 1fr !important; gap: 8px !important; }
          .product-hero-img { display: none !important; }
          .product-hero-text { max-width: 100% !important; }
        }
      ` }} />
      </div>
    </main>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{
      padding: 'clamp(80px, 12vh, 140px) var(--rail-pad)',
      maxWidth: '1180px',
      margin: '0 auto',
    }}>
      <p className="eyebrow" style={{ marginBottom: '40px' }}>{label}</p>
      {children}
    </section>
  );
}

function para(): React.CSSProperties {
  return {
    fontFamily: 'var(--sans)',
    fontSize: 'clamp(17px, 1.5vw, 21px)',
    lineHeight: 1.7,
    color: 'var(--fg-mute)',
    fontWeight: 300,
    maxWidth: '64ch',
  };
}
