'use client';

/* "How it works": a crest hairline draws across as the section comes into view and the four steps rise in
 * order (120 ms apart). Visible at rest: the steps are only held back once script has confirmed the section is
 * still below the fold, so a reader without script, or with reduced motion, sees everything at once. */

import { useEffect, useRef, useState } from 'react';
import { forecast } from './content';

export default function HowSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const [state, setState] = useState<'rest' | 'armed' | 'on'>('rest');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;   // already on screen: leave it at rest
    setState('armed');
    const io = new IntersectionObserver(entries => {
      if (entries.some(x => x.isIntersecting)) { setState('on'); io.disconnect(); }
    }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`pf-steps-wrap pf-steps--${state}`}>
    <span className="pf-steps-line" aria-hidden />
    <ol ref={ref} className="pf-steps">
      {forecast.how.steps.map((s, i) => (
        <li key={s.title} style={{ transitionDelay: state === 'on' ? `${120 * i}ms` : '0ms' }}>
          <span className="pf-mono">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="pf-h3">{s.title}</h3>
          <p className="pf-body pf-mute">{s.body}</p>
        </li>
      ))}
    </ol>
    </div>
  );
}
