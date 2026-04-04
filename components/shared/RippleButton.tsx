'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

type Variant = 'gold' | 'ghost';

interface RippleButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Variant;
}

const BASE_STYLE: React.CSSProperties = {
  display: 'inline-block',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '12px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '14px 32px',
  cursor: 'pointer',
  textDecoration: 'none',
  borderRadius: '2px',
  transition: 'background 0.22s ease, color 0.22s ease',
  userSelect: 'none',
  lineHeight: 1,
};

const VARIANT_STYLES: Record<Variant, React.CSSProperties> = {
  gold: {
    background: 'var(--gold)',
    color: 'var(--ink)',
    border: 'none',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--gold)',
    border: '1px solid var(--gold)',
  },
};

function createRipple(
  event: React.MouseEvent<HTMLElement>,
  container: HTMLElement
) {
  const rect = container.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height) * 2;

  Object.assign(ripple.style, {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    borderRadius: '50%',
    border: '2px solid var(--gold)',
    transform: 'scale(0)',
    opacity: '1',
    pointerEvents: 'none',
    animation: 'rheo-ripple 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
  });

  container.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

export default function RippleButton({
  href,
  onClick,
  children,
  variant = 'gold',
}: RippleButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (ref.current) createRipple(e, ref.current);
    onClick?.();
  };

  const style: React.CSSProperties = {
    ...BASE_STYLE,
    ...VARIANT_STYLES[variant],
  };

  const hoverHandlers =
    variant === 'ghost'
      ? {
          onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.background = 'var(--gold)';
            (e.currentTarget as HTMLElement).style.color = 'var(--ink)';
          },
          onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
          },
        }
      : {};

  return (
    <>
      <style>{`
        @keyframes rheo-ripple {
          0%   { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>

      {href ? (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          style={style}
          onClick={handleClick}
          {...hoverHandlers}
        >
          {children}
        </Link>
      ) : (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          style={{ ...style, border: VARIANT_STYLES[variant].border ?? 'none' }}
          onClick={handleClick}
          {...hoverHandlers}
        >
          {children}
        </button>
      )}
    </>
  );
}
