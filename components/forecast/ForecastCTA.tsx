import Link from 'next/link'
import { FORECAST_CTA as C } from './content'

/* The band that sends visitors to /forecast from every other page (build b-009).
 * One gold in the band: the button hairline (the eyebrow stays quiet). Inline styles plus one small
 * style block, because the page stylesheets only load on their own routes.
 * `from` names the placement; it rides on the link as utm_content so the form records which band worked. */
export default function ForecastCTA({ from = 'default', tone = 'deep' }: { from?: string; tone?: 'deep' | 'plain' }) {
  const heading = C.headings[from] ?? C.headings.default
  const href = `/forecast?utm_source=site&utm_medium=band&utm_content=${encodeURIComponent(from)}`
  return (
    <aside
      aria-label={C.eyebrow}
      className="fc-band"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: tone === 'deep' ? 'var(--bg-low)' : 'transparent',
        paddingBlock: 'clamp(48px, 8vh, 88px)',
        paddingLeft: 'max(var(--rail-pad), env(safe-area-inset-left, 0px))',
        paddingRight: 'max(var(--rail-pad), env(safe-area-inset-right, 0px))',
      }}
    >
      <div className="fc-grid">
        <div style={{ minWidth: 0 }}>
          <p className="eyebrow eyebrow--quiet" style={{ margin: '0 0 16px' }}>{C.eyebrow}</p>
          <p className="fc-h">{heading}</p>
        </div>
        <div className="fc-act">
          <Link href={href} className="fc-btn">
            {C.button}
          </Link>
          <p className="fc-sub">{C.sub}</p>
        </div>
      </div>
      <style>{`
        .fc-grid { max-width: var(--container-max); margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr); gap: 28px; align-items: end; }
        @media (min-width: 900px) { .fc-grid { grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); gap: clamp(40px, 6vw, 96px); } }
        .fc-h { font-family: var(--serif); font-weight: 400; font-size: clamp(1.55rem, 2.8vw, 2.2rem); line-height: 1.18; color: var(--fg); margin: 0; max-width: 24em; text-wrap: balance; }
        .fc-act { display: grid; gap: 14px; justify-items: start; }
        @media (min-width: 900px) { .fc-act { justify-items: end; text-align: right; } }
        .fc-btn {
          display: inline-flex; align-items: center; gap: 12px; min-height: 52px; padding: 0 26px;
          font-family: var(--sans); font-size: 0.82rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--fg); border: 1px solid rgba(196,162,90,0.7); text-decoration: none;
          transition: border-color 0.16s var(--ease), background 0.16s var(--ease);
        }
        .fc-btn:hover { border-color: var(--gold-hi); background: rgba(196,162,90,0.07); }
        .fc-btn:focus-visible { outline: 2px solid var(--gold-hi); outline-offset: 3px; }
        .fc-sub { margin: 0; font-family: var(--sans); font-size: 0.88rem; color: var(--text-3, var(--fg-dim)); }
        @media (prefers-reduced-motion: reduce) { .fc-btn { transition: none; } }
      `}</style>
    </aside>
  )
}
