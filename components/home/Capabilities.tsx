'use client';

import Link from 'next/link';
import Reveal from './Reveal';
import { PRODUCTS, Product } from '@/lib/catalogue';

type CapabilityArea = {
  num: string;
  title: string;
  realm: string;
  tagline: string;
  body: string;
  builtSlugs: string[];
  emerging?: string[];
};

const AREAS: CapabilityArea[] = [
  {
    num: '01',
    title: 'Customer Intelligence',
    realm: 'The client-facing layer',
    tagline: 'Every external touchpoint, answered with intent.',
    body:
      'The agentic layer that meets every prospect, every customer, every enquiry. It listens, qualifies, quotes, books, follows up, asks for reviews, and brings lapsed customers back. Always on. Always in your tone. Never the bottleneck.',
    builtSlugs: [
      'speed-to-lead',
      'quote-estimator',
      'booking-scheduling',
      'waitlist-slot-recovery',
      'enquiry-pipeline',
      're-engagement-engine',
      'reviews-reputation',
      'post-service-follow-up',
    ],
  },
  {
    num: '02',
    title: 'Operations Intelligence',
    realm: 'The internal layer',
    tagline: 'How data flows inside the business.',
    body:
      'The intelligent workflows that coordinate your team without group chats or guesswork. Staff briefed and tracked. Invoices that collect themselves. New hires onboarded by a bot that remembers everything. The business runs whether you are in the room or not.',
    builtSlugs: [
      'staff-ops-bot',
      'staff-onboarding-bot',
      'payment-follow-up',
    ],
  },
  {
    num: '03',
    title: 'Network Intelligence',
    realm: 'Partners, suppliers, manufacturers',
    tagline: 'When your operating fabric extends past your walls.',
    body:
      'Most businesses are nodes in a larger network. Partners send referrals. Suppliers ship materials. Manufacturers commit to dates. We design the agents and pipelines that keep those relationships in sync, with status visible to everyone who needs it. This is the layer that compounds as you grow.',
    builtSlugs: [],
    emerging: [
      'Partner sync agents',
      'Supplier communication pipelines',
      'Manufacturer status fabric',
      'Channel partner enablement',
    ],
  },
  {
    num: '04',
    title: 'Decision Intelligence',
    realm: 'The layer that knows',
    tagline: 'What is happening, what just changed, what to do next.',
    body:
      'The diagnostic and reporting layer that turns the operating fabric into clarity. A morning brief on what matters. A close-of-day on what moved. An audit that tells you where the next leverage point lives. The owner stops guessing.',
    builtSlugs: [
      'daily-ops-dashboard',
      'ops-audit',
      'full-ops-stack',
    ],
  },
];

const ACCENT_HEX: Record<Product['accent'], string> = {
  gold:  '#C4A25A',
  crest: '#4599B5',
  ocean: '#2E6B8E',
  foam:  '#7EC8E3',
};

const SLUG_TO_IMAGE_SLUG: Record<string, string> = {
  'staff-onboarding-bot': 'staff-onboarding',
};

function imagePath(p: Product) {
  const slug = SLUG_TO_IMAGE_SLUG[p.slug] || p.slug;
  return `/images/products/${p.number}-${slug}.jpg`;
}

function ProductCard({ slug }: { slug: string }) {
  const p = PRODUCTS.find(x => x.slug === slug);
  if (!p) return null;
  const accent = ACCENT_HEX[p.accent];

  return (
    <Link
      href={`/work/${p.slug}`}
      data-cursor="link"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(11,23,41,0.65)',
        border: '1px solid rgba(46,107,142,0.25)',
        borderRadius: '20px',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.4s ease, background 0.4s ease',
        willChange: 'transform',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-6px)';
        el.style.borderColor = `${accent}80`;
        el.style.background = 'rgba(15,30,54,0.85)';
        el.style.boxShadow = `0 18px 50px rgba(196,162,90,0.18), 0 0 80px ${accent}33, 0 0 0 1px ${accent}55`;
        const img = el.querySelector<HTMLElement>('[data-img]');
        if (img) {
          img.style.transform = 'scale(1.06)';
          img.style.filter = 'brightness(1.05) saturate(1.1)';
        }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'rgba(46,107,142,0.25)';
        el.style.background = 'rgba(11,23,41,0.65)';
        el.style.boxShadow = 'none';
        const img = el.querySelector<HTMLElement>('[data-img]');
        if (img) {
          img.style.transform = 'scale(1)';
          img.style.filter = 'brightness(0.92) saturate(0.95)';
        }
      }}
    >
      {/* Image well */}
      <div style={{
        position: 'relative',
        aspectRatio: '3 / 2',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${accent}1A 0%, rgba(7,16,30,0.9) 100%)`,
      }}>
        <div
          data-img
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imagePath(p)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease',
            filter: 'brightness(0.92) saturate(0.95)',
          }}
        />
        {/* Bottom fade for legibility, in case the image is busy at the edge */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 55%, rgba(11,23,41,0.85) 100%)',
          pointerEvents: 'none',
        }} />
        {/* Number badge, top-right */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '18px',
          fontFamily: 'var(--mono)',
          fontSize: '10.5px',
          letterSpacing: '0.4em',
          color: accent,
          fontWeight: 500,
          padding: '4px 10px',
          background: 'rgba(7,16,30,0.65)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: `1px solid ${accent}40`,
          borderRadius: '999px',
        }}>
          {p.number}
        </div>
      </div>

      {/* Copy */}
      <div style={{ padding: '24px 24px 28px' }}>
        <h4 style={{
          fontFamily: 'var(--serif)',
          fontSize: '21px',
          color: 'var(--warm-foam)',
          letterSpacing: '-0.015em',
          lineHeight: 1.2,
          marginBottom: '10px',
          fontWeight: 600,
        }}>
          {p.name}<span style={{ color: accent }}>.</span>
        </h4>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '13.5px',
          lineHeight: 1.6,
          color: 'var(--muted-cream)',
          fontWeight: 300,
          minHeight: '4em',
        }}>
          {p.tagline}
        </p>
        <div style={{
          marginTop: '20px',
          fontFamily: 'var(--sans)',
          fontSize: '11px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: accent,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          Explore <span>→</span>
        </div>
      </div>
    </Link>
  );
}

function EmergingCard({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: 'rgba(15,30,54,0.4)',
      border: '1px dashed rgba(126,200,227,0.35)',
      borderRadius: '20px',
      padding: '28px 24px',
      minHeight: '180px',
    }}>
      <span style={{
        fontFamily: 'var(--sans)',
        fontSize: '9.5px',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: 'var(--foam)',
        opacity: 0.7,
        fontWeight: 600,
      }}>
        Emerging
      </span>
      <h4 style={{
        fontFamily: 'var(--serif)',
        fontSize: '22px',
        color: 'var(--warm-foam)',
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: '-0.015em',
      }}>
        {label}<span style={{ color: 'var(--foam)' }}>.</span>
      </h4>
      <span style={{
        fontFamily: 'var(--sans)',
        fontSize: '11px',
        letterSpacing: '0.24em',
        textTransform: 'uppercase',
        color: 'var(--foam)',
        opacity: 0.6,
      }}>
        In active build
      </span>
    </div>
  );
}

export default function Capabilities() {
  return (
    <section id="work" style={{
      padding: 'var(--section-gap) var(--rail-pad)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            The Capability Map
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(34px, 5vw, 64px)',
            lineHeight: 1.08,
            letterSpacing: '-0.022em',
            color: 'var(--fg)',
            fontWeight: 600,
            maxWidth: '20ch',
            marginBottom: '32px',
          }}>
            Four intelligent layers. One operating fabric.
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: 'clamp(16px, 1.4vw, 19px)',
            lineHeight: 1.75,
            color: 'var(--fg-mute)',
            fontWeight: 300,
            maxWidth: '64ch',
            marginBottom: 'clamp(72px, 10vh, 120px)',
          }}>
            We design across every direction a business communicates and decides. Most engagements
            start in one layer and expand outward as the fabric matures. Each capability lists work
            we have already shipped. Tap a card to read the full implementation.
          </p>
        </Reveal>

        {AREAS.map((area, i) => (
          <div key={area.num} style={{
            paddingTop: 'clamp(56px, 8vh, 88px)',
            borderTop: '1px solid rgba(242,240,236,0.08)',
            marginBottom: 'clamp(48px, 7vh, 72px)',
          }}>
            <Reveal delay={i * 60}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.6fr)',
                gap: 'clamp(28px, 5vw, 72px)',
                alignItems: 'baseline',
                marginBottom: '48px',
              }}
              className="cap-head">
                <div>
                  <div style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '12px',
                    color: 'var(--gold)',
                    letterSpacing: '0.4em',
                    marginBottom: '18px',
                    fontWeight: 500,
                  }}>
                    {area.num}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(26px, 3.4vw, 42px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.018em',
                    color: 'var(--fg)',
                    fontWeight: 600,
                    marginBottom: '14px',
                  }}>
                    {area.title}<span style={{ color: 'var(--gold)' }}>.</span>
                  </h3>
                  <div style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '11px',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--crest)',
                    fontWeight: 500,
                  }}>
                    {area.realm}
                  </div>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(18px, 1.7vw, 22px)',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    color: 'var(--warm-foam)',
                    fontWeight: 400,
                    marginBottom: '20px',
                    maxWidth: '52ch',
                  }}>
                    {area.tagline}
                  </p>
                  <p style={{
                    fontFamily: 'var(--sans)',
                    fontSize: 'clamp(15px, 1.3vw, 17px)',
                    lineHeight: 1.75,
                    color: 'var(--fg-mute)',
                    fontWeight: 300,
                    maxWidth: '60ch',
                  }}>
                    {area.body}
                  </p>
                </div>
              </div>
            </Reveal>

            {area.builtSlugs.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
              }}>
                {area.builtSlugs.map(slug => (
                  <Reveal key={slug} delay={40}>
                    <ProductCard slug={slug} />
                  </Reveal>
                ))}
              </div>
            )}

            {area.emerging && area.emerging.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '16px',
              }}>
                {area.emerging.map(label => (
                  <EmergingCard key={label} label={label} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

        <Reveal>
          <div style={{
            marginTop: 'clamp(64px, 10vh, 96px)',
            padding: '40px 48px',
            background: 'rgba(15,30,54,0.45)',
            border: '1px solid rgba(196,162,90,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <div>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 600,
                marginBottom: '12px',
              }}>
                Not sure which layer to start with?
              </p>
              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(20px, 2vw, 26px)',
                color: 'var(--warm-foam)',
                fontWeight: 400,
                lineHeight: 1.3,
                maxWidth: '44ch',
              }}>
                Take the free 3-minute audit. It scores your business across all four layers and tells you exactly where the leverage is.
              </p>
            </div>
            <a
              href="https://audit.rheoai.co.in"
              target="_blank"
              rel="noreferrer"
              className="gold-bg"
              style={{
                color: 'var(--bg)',
                padding: '16px 36px',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                display: 'inline-block',
                transition: 'box-shadow 0.4s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(240,208,128,0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get my free audit →
            </a>
          </div>
        </Reveal>

      <style>{`
        @media (max-width: 900px) {
          .cap-head { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}
