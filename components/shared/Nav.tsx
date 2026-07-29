'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/* 2026-07-29 rebuild: four items maximum. No product names in the header. */
const LINKS = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Results', href: '/work' },
  { label: 'About', href: '/about' },
];

const AUDIT = 'https://audit.rheoai.co.in';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '12px var(--rail-pad)' : '20px var(--rail-pad)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(5,14,29,0.92)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
          transition: 'padding 0.3s var(--ease), background 0.3s var(--ease), border-color 0.3s var(--ease)',
        }}
      >
        <Link
          href="/"
          aria-label="Rheo AI home"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', textDecoration: 'none', position: 'relative', zIndex: 2 }}
        >
          <img
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            style={{ display: 'block', width: '36px', height: '36px', objectFit: 'contain' }}
            onError={e => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
          <span
            style={{
              fontFamily: 'var(--serif)',
              color: 'var(--fg)',
              fontSize: '19px',
              letterSpacing: '0.05em',
              fontWeight: 400,
              textTransform: 'uppercase',
            }}
          >
            Rheo AI
          </span>
        </Link>

        {/* Center nav */}
        <div
          className="nav-desktop"
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {LINKS.map(l => (
            <Link
              key={l.label}
              href={l.href}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase' as const,
                fontWeight: 500,
                color: 'var(--text-2)',
                textDecoration: 'none',
                transition: 'color 0.16s var(--ease)',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--fg)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text-2)')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* The one CTA */}
        <a
          href={AUDIT}
          className="nav-cta"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
            color: 'var(--fg)',
            border: '1px solid rgba(196,162,90,0.65)',
            padding: '11px 20px',
            transition: 'border-color 0.16s var(--ease), background 0.16s var(--ease)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--gold-hi)';
            e.currentTarget.style.background = 'rgba(196,162,90,0.07)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(196,162,90,0.65)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Show me what I&rsquo;m losing
        </a>

        {/* Hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(p => !p)}
          className="nav-hamburger"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px' }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1px',
                background: 'var(--fg)',
                transition: 'transform 0.3s var(--ease), opacity 0.3s var(--ease)',
                transform: open
                  ? i === 0
                    ? 'translateY(6px) rotate(45deg)'
                    : i === 1
                    ? 'scaleX(0)'
                    : 'translateY(-6px) rotate(-45deg)'
                  : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile sheet — solid navy, no blur. visibility keeps it out of the
          tab order and away from screen readers while closed. */}
      <div
        aria-hidden={!open}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5,14,29,0.98)',
          zIndex: 99,
          transform: open ? 'translateY(0)' : 'translateY(-100%)',
          visibility: open ? 'visible' : 'hidden',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.4s var(--ease), visibility 0.4s',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '36px',
        }}
      >
        {LINKS.map(l => (
          <Link
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: '30px', color: 'var(--fg)', textDecoration: 'none' }}
          >
            {l.label}
          </Link>
        ))}
        <a
          href={AUDIT}
          onClick={() => setOpen(false)}
          style={{
            marginTop: '12px',
            color: 'var(--fg)',
            border: '1px solid rgba(196,162,90,0.65)',
            padding: '15px 28px',
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          Show me what I&rsquo;m losing
        </a>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
