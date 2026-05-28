'use client';

import { useEffect, useRef, ReactNode } from 'react';

export default function Reveal({ children, delay = 0, as: As = 'div', style }: {
  children: ReactNode;
  delay?: number;
  as?: any;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add('in'), delay);
        obs.disconnect();
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return <As ref={ref} className="reveal" style={style}>{children}</As>;
}
