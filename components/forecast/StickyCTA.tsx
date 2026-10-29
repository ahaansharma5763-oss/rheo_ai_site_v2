'use client';

/* Phones only: once the form has scrolled out of view, a bar at the bottom brings it back in one tap.
 * Hidden while the form is on screen. Clears the phone's bottom safe area. */

import { useEffect, useState } from 'react';
import { FORM_LIVE } from './content';

export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById('get');
    if (!form || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([x]) => {
      setShow(!x.isIntersecting && x.boundingClientRect.top < 0);
    });
    io.observe(form);
    return () => io.disconnect();
  }, []);

  const back = () => {
    const form = document.getElementById('get');
    if (!form) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    form.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    setTimeout(() => (form.querySelector('input, textarea, button') as HTMLElement | null)?.focus({ preventScroll: true }), smooth ? 500 : 0);
  };

  return (
    <div className={`pf-sticky${show ? ' is-on' : ''}`} aria-hidden={!show}>
      <button type="button" className="pf-btn pf-btn--primary" onClick={back} tabIndex={show ? 0 : -1}>
        {FORM_LIVE.stickyCta}
      </button>
    </div>
  );
}
