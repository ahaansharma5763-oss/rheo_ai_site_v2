'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'AVA', href: '/ava' },
    { label: 'Contact', href: 'mailto:ahaan@rheoai.co.in' },
  ];

  const linkStyle: React.CSSProperties = {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.44em',
    color: 'var(--ocean)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    fontFamily: 'DM Sans, sans-serif',
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(13, 31, 60, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(69, 153, 181, 0.08)',
          transition: 'padding 0.3s ease',
          padding: scrolled ? '12px 48px' : '20px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stem of R */}
            <rect x="6" y="6" width="5" height="24" fill="#1A3566"/>
            {/* Hatch lines in stem */}
            <line x1="6" y1="10" x2="11" y2="10" stroke="#4599B5" strokeWidth="0.5" opacity="0.6"/>
            <line x1="6" y1="14" x2="11" y2="14" stroke="#4599B5" strokeWidth="0.5" opacity="0.6"/>
            <line x1="6" y1="18" x2="11" y2="18" stroke="#4599B5" strokeWidth="0.5" opacity="0.6"/>
            <line x1="6" y1="22" x2="11" y2="22" stroke="#4599B5" strokeWidth="0.5" opacity="0.6"/>
            <line x1="6" y1="26" x2="11" y2="26" stroke="#4599B5" strokeWidth="0.5" opacity="0.6"/>
            {/* Bowl of R - wave-shaped arc */}
            <path d="M11 6 Q26 6 26 15 Q26 22 11 22" stroke="#1A3566" strokeWidth="5" fill="none"/>
            {/* Wave crest on bowl top */}
            <path d="M11 6 Q18 4 24 8 Q28 11 26 15" stroke="#C4A25A" strokeWidth="1" fill="none"/>
            {/* Foam dots */}
            <circle cx="24" cy="8" r="1" fill="#BDB5A5" opacity="0.6"/>
            <circle cx="27" cy="11" r="0.8" fill="#BDB5A5" opacity="0.5"/>
            <circle cx="28" cy="14" r="0.6" fill="#BDB5A5" opacity="0.4"/>
            {/* Leg of R */}
            <path d="M11 22 L26 30" stroke="#1A3566" strokeWidth="5" strokeLinecap="round"/>
            {/* Hatch lines in leg */}
            <line x1="14" y1="23" x2="17" y2="25" stroke="#4599B5" strokeWidth="0.5" opacity="0.5"/>
            <line x1="18" y1="25" x2="21" y2="27" stroke="#4599B5" strokeWidth="0.5" opacity="0.5"/>
            <line x1="22" y1="27" x2="25" y2="29" stroke="#4599B5" strokeWidth="0.5" opacity="0.5"/>
          </svg>
          <span
            style={{
              fontFamily: 'Georgia, serif',
              color: 'var(--warm-foam)',
              letterSpacing: '0.3em',
              fontSize: '18px',
              fontWeight: 400,
            }}
          >
            RHEO
          </span>
        </Link>

        {/* Desktop links */}
        <div
          style={{
            display: 'flex',
            gap: '36px',
            alignItems: 'center',
          }}
          className="nav-desktop-links"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={linkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--ocean)')}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(prev => !prev)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
          className="nav-hamburger"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: 'var(--gold)',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transformOrigin: 'center',
                transform:
                  menuOpen
                    ? i === 0
                      ? 'translateY(6.5px) rotate(45deg)'
                      : i === 1
                      ? 'scaleX(0)'
                      : 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: '260px',
          background: 'var(--navy)',
          zIndex: 999,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '96px',
          paddingLeft: '36px',
          gap: '32px',
          boxShadow: menuOpen ? '-8px 0 32px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              ...linkStyle,
              fontSize: '13px',
              letterSpacing: '0.3em',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--ocean)')}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 16, 30, 0.6)',
            zIndex: 998,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
