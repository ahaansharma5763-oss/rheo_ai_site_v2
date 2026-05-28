'use client';

import Link from 'next/link';
import { Product } from '@/lib/catalogue';

const ACCENT_HEX: Record<Product['accent'], string> = {
  gold:  '#C4A25A',
  crest: '#4599B5',
  ocean: '#2E6B8E',
  foam:  '#7EC8E3',
};

export default function ProductCard({ p }: { p: Product }) {
  const accent = ACCENT_HEX[p.accent];

  return (
    <Link
      href={`/work/${p.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(11,23,41,0.7)',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(242,240,236,0.06)',
        transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, background 0.4s ease',
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(-6px)';
        el.style.borderColor = `${accent}40`;
        el.style.background = 'rgba(15,30,54,0.85)';
        const img = el.querySelector<HTMLElement>('[data-img]');
        if (img) img.style.transform = 'scale(1.06)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'rgba(242,240,236,0.06)';
        el.style.background = 'rgba(11,23,41,0.7)';
        const img = el.querySelector<HTMLElement>('[data-img]');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      {/* Photo well */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
        background: '#07101E',
      }}>
        <div
          data-img
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${p.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* Number badge */}
        <div style={{
          position: 'absolute',
          top: '18px',
          right: '20px',
          padding: '5px 11px',
          background: 'rgba(7,16,30,0.65)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          fontFamily: 'var(--mono)',
          fontSize: '10px',
          letterSpacing: '0.32em',
          color: 'var(--gold-end)',
          fontWeight: 500,
          borderRadius: '2px',
        }}>
          {p.number}
        </div>
        {/* Bottom gradient for legibility */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, rgba(11,23,41,0.65) 100%)',
        }} />
      </div>

      {/* Copy */}
      <div style={{ padding: '28px 28px 32px' }}>
        <h3 style={{
          fontFamily: 'var(--serif)',
          fontSize: '22px',
          color: 'var(--fg)',
          letterSpacing: '-0.012em',
          lineHeight: 1.2,
          marginBottom: '12px',
          fontWeight: 600,
        }}>
          {p.name}<span style={{ color: accent }}>.</span>
        </h3>
        <p style={{
          fontFamily: 'var(--sans)',
          fontSize: '13.5px',
          lineHeight: 1.6,
          color: 'var(--muted-cream)',
          fontWeight: 300,
          minHeight: '64px',
        }}>
          {p.tagline}
        </p>
        <div style={{
          marginTop: '22px',
          fontFamily: 'var(--sans)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: accent,
          fontWeight: 600,
        }}>
          Read more →
        </div>
      </div>
    </Link>
  );
}
