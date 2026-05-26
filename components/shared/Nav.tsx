'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const openCalendly = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/ahaan-rheoai/30min' });
    } else {
      window.open('https://calendly.com/ahaan-rheoai/30min', '_blank');
    }
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#case-studies' },
    { label: 'AVA', href: '/ava' },
    { label: 'Contact', href: 'mailto:ahaan@rheoai.co.in' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(7,16,30,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,162,90,0.1)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
        padding: scrolled ? '14px 48px' : '24px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src="/rheo-logo.png"
            alt="Rheo AI"
            style={{ width: '32px', height: '32px', objectFit: 'contain', borderRadius: '0px', display: 'block' }}
          />
          <span style={{
            fontFamily: 'Georgia, serif',
            color: 'var(--gold)',
            letterSpacing: '0.32em',
            fontSize: '16px',
            fontWeight: 400,
          }}>
            RHEO
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="nav-desktop-links">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                color: 'rgba(238,232,224,0.6)',
                textDecoration: 'none',
                padding: '8px 16px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--warm-foam)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(238,232,224,0.6)'; }}
            >
              {label}
            </a>
          ))}
          <button
            onClick={openCalendly}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.3em',
              color: 'var(--ink)',
              background: 'var(--gold)',
              border: 'none',
              padding: '9px 22px',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              marginLeft: '8px',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            Book a Call
          </button>
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
            <span key={i} style={{
              display: 'block',
              width: '22px',
              height: '1.5px',
              background: 'var(--gold)',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              transformOrigin: 'center',
              transform: menuOpen
                ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                : i === 1 ? 'scaleX(0)'
                : 'translateY(-6.5px) rotate(-45deg)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0,
        height: '100vh',
        width: '260px',
        background: 'var(--ink)',
        borderLeft: '1px solid rgba(196,162,90,0.15)',
        zIndex: 999,
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '96px',
        paddingLeft: '36px',
        gap: '28px',
      }}>
        {navLinks.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.35em',
            color: 'rgba(238,232,224,0.65)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--warm-foam)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(238,232,224,0.65)'; }}
          >
            {label}
          </a>
        ))}
      </div>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: 'fixed', inset: 0,
          background: 'rgba(7,16,30,0.7)',
          zIndex: 998,
          backdropFilter: 'blur(2px)',
        }} />
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
