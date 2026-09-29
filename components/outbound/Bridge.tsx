import Link from 'next/link'
import { outbound } from './content'

/* Homepage bridge to /outbound, directly under the hero. Quiet on purpose:
 * one line and one link, hairlines top and bottom, no gold. Inline styles
 * because outbound.css only loads on /outbound. */
export default function OutboundBridge() {
  const b = outbound.bridge
  return (
    <aside
      aria-label={b.link}
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--line-soft)',
        borderBottom: '1px solid var(--line-soft)',
        background: 'rgba(5,14,29,0.45)',
        padding: '22px var(--rail-pad)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '10px 32px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 'var(--fs-body-sm)',
            lineHeight: 1.6,
            color: 'var(--text-2)',
            maxWidth: '72ch',
          }}
        >
          {b.line}
        </p>
        <Link href="/outbound" className="ob-bridge-link">
          {b.link}
          <span aria-hidden className="ob-bridge-arrow" />
        </Link>
      </div>
      <style>{`
        .ob-bridge-link {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--sans); font-size: var(--fs-body-sm); white-space: nowrap;
          color: var(--crest);
          padding-bottom: 2px;
          background: linear-gradient(currentColor, currentColor) 0 100% / 0% 1px no-repeat;
          transition: background-size 0.26s var(--ease);
        }
        .ob-bridge-link:hover { background-size: 100% 1px; }
        .ob-bridge-arrow {
          width: 0; height: 0;
          border-top: 4px solid transparent; border-bottom: 4px solid transparent;
          border-left: 6px solid currentColor;
          transition: transform 0.16s var(--ease);
        }
        .ob-bridge-link:hover .ob-bridge-arrow { transform: translateX(3px); }
      `}</style>
    </aside>
  )
}
