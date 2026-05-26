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
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#case-studies' },
    { label: 'AVA', href: '/ava' },
    { label: 'Contact', href: 'mailto:ahaan@rheoai.co.in' },
  ];

  const openCalendly = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/ahaan-rheoai/30min' })
    } else {
      window.open('https://calendly.com/ahaan-rheoai/30min', '_blank')
    }
  };

  const linkStyle: React.CSSProperties = {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.44em',
    color: 'var(--gold)',
    textDecoration: 'none',
    transition: 'color 0.2s ease, opacity 0.2s ease, background 0.2s ease, box-shadow 0.25s ease, transform 0.2s ease, border-color 0.2s ease',
    fontFamily: 'DM Sans, sans-serif',
    opacity: 0.85,
    padding: '7px 18px',
    borderRadius: '0px',
    border: '1px solid transparent',
    background: 'transparent',
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
          background: 'rgba(7,16,30,0.96)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(69,153,181,0.15)',
          boxShadow: '0 1px 0 rgba(196,162,90,0.08), 0 8px 32px rgba(7,16,30,0.4)',
          transition: 'padding 0.3s ease',
          padding: scrolled ? '12px 48px' : '20px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* Neural network nodes — desktop nav decoration */}
        <svg aria-hidden="true" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', opacity: 0.18,
        }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1280 80">
          <defs>
            <style>{`
              @keyframes navNodePulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
              .nn { animation: navNodePulse 3s ease-in-out infinite; }
              .nn:nth-child(2){animation-delay:.5s} .nn:nth-child(3){animation-delay:1s}
              .nn:nth-child(4){animation-delay:1.5s} .nn:nth-child(5){animation-delay:2s}
              .nn:nth-child(6){animation-delay:2.5s}
            `}</style>
          </defs>
          {/* Edges */}
          {[
            [80,40,200,20],[200,20,360,55],[360,55,520,18],[520,18,700,45],[700,45,900,22],[900,22,1100,50],[1100,50,1200,30]
          ].map(([x1,y1,x2,y2],i)=>(
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4599B5" strokeWidth="0.6" opacity="0.5"/>
          ))}
          {/* Nodes */}
          {[[80,40],[200,20],[360,55],[520,18],[700,45],[900,22],[1100,50],[1200,30]].map(([cx,cy],i)=>(
            <circle key={i} className="nn" cx={cx} cy={cy} r="3" fill="none" stroke="#4599B5" strokeWidth="1"/>
          ))}
          {[[80,40],[200,20],[360,55],[520,18],[700,45],[900,22],[1100,50],[1200,30]].map(([cx,cy],i)=>(
            <circle key={`c${i}`} cx={cx} cy={cy} r="1.2" fill="#C4A25A" opacity="0.6"/>
          ))}
        </svg>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <img
            src="/rheo-logo.png"
            alt="Rheo AI"
            style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '0px', display: 'block' }}
          />
          <span
            style={{
              fontFamily: 'Georgia, serif',
              color: 'var(--gold)',
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
            gap: '8px',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
          className="nav-desktop-links"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-guard"
              style={linkStyle}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--gold)';
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.background = 'rgba(196,162,90,0.08)';
                e.currentTarget.style.borderColor = 'rgba(196,162,90,0.25)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--gold)';
                e.currentTarget.style.opacity = '0.85';
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {label}
            </a>
          ))}
          {/* Book a call CTA */}
          <button
            onClick={openCalendly}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              color: 'var(--ink)',
              background: 'var(--gold)',
              border: '1px solid var(--gold)',
              padding: '7px 20px',
              borderRadius: '0px',
              cursor: 'pointer',
              transition: 'background 0.2s ease, color 0.2s ease',
              fontWeight: 500,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--gold)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--gold)';
              e.currentTarget.style.color = 'var(--ink)';
            }}
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
          background: 'linear-gradient(160deg, #07101E 0%, #0D1F3C 25%, #1A3566 55%, #2E6B8E 80%, #4599B5 100%)',
          zIndex: 999,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '96px',
          paddingLeft: '36px',
          gap: '32px',
          boxShadow: menuOpen ? '-8px 0 48px rgba(26,53,102,0.6)' : 'none',
          overflow: 'hidden',
        }}
      >
        {/* Neural network background SVG */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12, pointerEvents: 'none' }}
          viewBox="0 0 260 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <style>{`
              @keyframes navPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
              @keyframes navDot { 0%{offset-distance:0%} 100%{offset-distance:100%} }
              .nav-node { animation: navPulse 3s ease-in-out infinite; }
              .nav-node:nth-child(2) { animation-delay: 0.6s; }
              .nav-node:nth-child(3) { animation-delay: 1.2s; }
              .nav-node:nth-child(4) { animation-delay: 1.8s; }
              .nav-node:nth-child(5) { animation-delay: 2.4s; }
              .nav-node:nth-child(6) { animation-delay: 0.9s; }
              .nav-node:nth-child(7) { animation-delay: 1.5s; }
            `}</style>
          </defs>
          {/* Edges */}
          {[
            'M40,80 Q130,140 200,100','M200,100 Q240,200 180,280','M40,80 Q60,200 80,280',
            'M80,280 Q140,320 180,280','M80,280 Q50,400 100,480','M180,280 Q220,380 200,480',
            'M100,480 Q150,520 200,480','M100,480 Q70,600 120,680','M200,480 Q230,580 220,680',
            'M120,680 Q170,720 220,680',
          ].map((d, i) => (
            <path key={i} d={d} stroke="#7EC8E3" strokeWidth="0.8" fill="none" opacity="0.6" />
          ))}
          {/* Nodes */}
          {[
            [40,80],[200,100],[80,280],[180,280],[100,480],[200,480],[120,680],[220,680],
          ].map(([cx, cy], i) => (
            <circle key={i} className="nav-node" cx={cx} cy={cy} r="5" fill="none" stroke="#4599B5" strokeWidth="1.2" />
          ))}
          {/* Small center dots */}
          {[
            [40,80],[200,100],[80,280],[180,280],[100,480],[200,480],[120,680],[220,680],
          ].map(([cx, cy], i) => (
            <circle key={`d${i}`} cx={cx} cy={cy} r="2" fill="#C4A25A" opacity="0.7" />
          ))}
        </svg>

        {/* Left border gradient line */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '1px',
          background: 'linear-gradient(to bottom, transparent, #4599B5 30%, #7EC8E3 60%, #C4A25A 85%, transparent)',
        }} />

        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            style={{
              ...linkStyle,
              fontSize: '13px',
              letterSpacing: '0.3em',
              position: 'relative',
              zIndex: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.opacity = '0.85'; }}
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
