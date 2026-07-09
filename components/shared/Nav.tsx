'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const LINKS = [
  { label: 'Work',  href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Sales Engineer', href: '/sales-engineer' },
  { label: 'Pulse', href: '/pulse' },
  { label: 'Pilot', href: '/pilot' },
  { label: 'Audit', href: 'https://audit.rheoai.co.in' },
];

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
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: scrolled ? '12px var(--rail-pad)' : '20px var(--rail-pad)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(7,16,30,0.75)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(69,153,181,0.12)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(5,12,24,0.4)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo + wordmark, top-left only */}
        <Link
          href="/"
          aria-label="Rheo AI home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            position: 'relative',
            zIndex: 2,
          }}
          data-cursor="link"
        >
          <img
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            style={{
              display: 'block',
              width: '36px',
              height: '36px',
              objectFit: 'contain',
              borderRadius: '6px',
            }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <span style={{
            fontFamily: 'var(--serif)',
            color: 'var(--fg)',
            fontSize: '20px',
            letterSpacing: '0.04em',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}>
            Rheo AI
          </span>
        </Link>

        {/* Center nav */}
        <div className="nav-desktop" style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          {LINKS.map(l => {
            const linkStyle = {
              fontFamily: 'var(--sans)',
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase' as const,
              fontWeight: 500,
              color: 'var(--muted-cream)',
              textDecoration: 'none',
            };
            const isPilot = l.label === 'Pilot';
            return l.href.startsWith('http')
              ? <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={linkStyle}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--gold-end)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted-cream)'}>
                  {l.label}
                </a>
              : <Link key={l.label} href={l.href} data-cursor="link" className={isPilot ? 'nav-pilot' : undefined} style={linkStyle}
                  onMouseEnter={e => { if (!isPilot) (e.currentTarget as HTMLElement).style.color = 'var(--gold-end)' }}
                  onMouseLeave={e => { if (!isPilot) (e.currentTarget as HTMLElement).style.color = 'var(--muted-cream)' }}>
                  {l.label}
                </Link>;
          })}
        </div>

        {/* Right CTA pill */}
        <a
          href="https://calendly.com/ahaan-rheoai-xnxc/30min"
          target="_blank"
          rel="noreferrer"
          className="nav-cta"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: 'var(--warm-foam)',
            border: '1px solid rgba(46,107,142,0.6)',
            padding: '10px 22px',
            borderRadius: '999px',
            transition: 'border-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--gold-end)';
            e.currentTarget.style.color = 'var(--gold-end)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(46,107,142,0.6)';
            e.currentTarget.style.color = 'var(--warm-foam)';
          }}
        >
          Book a Call
        </a>

        {/* Hamburger */}
        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(p => !p)}
          className="nav-hamburger"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '22px',
              height: '1px',
              background: 'var(--fg)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: open
                ? i === 0 ? 'translateY(6px) rotate(45deg)'
                : i === 1 ? 'scaleX(0)'
                : 'translateY(-6px) rotate(-45deg)'
                : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(7,16,30,0.97)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        zIndex: 99,
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '36px',
      }}>
        {LINKS.map(l => (
          l.href.startsWith('http')
            ? <a key={l.label} href={l.href} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}
                style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'var(--fg)', textDecoration: 'none' }}>
                {l.label}
              </a>
            : <Link key={l.label} href={l.href} onClick={() => setOpen(false)} data-cursor="link"
                className={l.label === 'Pilot' ? 'nav-pilot-m' : undefined}
                style={{ fontFamily: 'var(--serif)', fontSize: '32px', color: 'var(--fg)', textDecoration: 'none' }}>
                {l.label}
              </Link>
        ))}
        <a href="https://calendly.com/ahaan-rheoai-xnxc/30min" target="_blank" rel="noreferrer"
          className="gold-bg"
          style={{
            marginTop: '12px',
            color: 'var(--bg)',
            padding: '14px 30px',
            borderRadius: '999px',
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
          Book a Call
        </a>
      </div>

      <style>{`
        @keyframes navPilotGlow {
          0%, 100% { text-shadow: 0 0 6px rgba(196,162,90,0.35); }
          50%      { text-shadow: 0 0 18px rgba(240,208,128,0.85), 0 0 32px rgba(240,208,128,0.4); }
        }
        .nav-pilot { color: var(--gold-end) !important; animation: navPilotGlow 2.4s ease-in-out infinite; transition: color 0.3s ease; }
        .nav-pilot:hover { color: #FCE6A8 !important; }
        .nav-pilot-m { color: var(--gold-end) !important; animation: navPilotGlow 2.4s ease-in-out infinite; }
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-cta    { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
