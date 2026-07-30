'use client';

import Reveal from '@/components/home/Reveal';

/* §12 — Convert. Remember. Understand. The one Warm Foam light beat on the
 * page (slide-6 principle): the calm clarity moment. Token swap is
 * all-or-nothing via [data-theme="light"]. Never list SKU names here. */

const VERBS = [
  {
    verb: 'Convert',
    body: 'Every enquiry answered, every question handled, every quote sent, every booking made, every quiet lead followed up five times. You stop losing people you already paid to attract.',
  },
  {
    verb: 'Remember',
    body: 'A permanent record of every customer and every conversation, filling itself in the background. You stop forgetting the people you have already served.',
  },
  {
    verb: 'Understand',
    body: 'Real numbers about your own business. What your average order value is, which service actually makes money, where your good customers come from.',
  },
];

export function FYFramework() {
  return (
    <section
      id="framework"
      data-theme="light"
      style={{
        background: '#F4EDDF',
        padding: 'clamp(96px, 15vh, 150px) var(--rail-pad)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '980px', margin: '0 auto' }}>
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontWeight: 400,
              fontSize: 'var(--fs-h2)',
              color: '#0B2147',
              marginBottom: 'clamp(44px, 6vh, 64px)',
            }}
          >
            Convert. Remember. Understand.
          </h2>
        </Reveal>

        <div className="fy-verbs" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }}>
          {VERBS.map((v, i) => (
            <Reveal key={v.verb} delay={i * 140}>
              <div
                className="fy-verb-col"
                style={{
                  padding: i === 0 ? '0 clamp(20px, 3vw, 36px) 0 0' : '0 clamp(20px, 3vw, 36px)',
                  borderLeft: i > 0 ? '1px solid rgba(11,33,71,0.24)' : 'none',
                  height: '100%',
                }}
              >
                <p style={{ fontFamily: 'var(--serif)', fontWeight: 400, fontSize: 'clamp(1.5rem, 2.6vw, 2rem)', color: '#0B2147', marginBottom: '16px' }}>
                  {v.verb}
                </p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '15.5px', lineHeight: 1.75, color: '#47597a' }}>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div style={{ marginTop: 'clamp(44px, 6vh, 64px)', borderTop: '1px solid rgba(11,33,71,0.24)', paddingTop: '36px' }}>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 500, fontSize: 'var(--fs-lead)', color: '#7A6128', marginBottom: '12px' }}>
              You start with Convert.
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '15.5px', lineHeight: 1.75, color: '#47597a', maxWidth: '58ch' }}>
              Nobody needs the other two on day one. They are the reason this gets more valuable every month
              instead of less.
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .fy-verbs { grid-template-columns: 1fr !important; }
          .fy-verb-col {
            border-left: none !important;
            border-top: 1px solid rgba(11,33,71,0.24);
            padding: 28px 0 !important;
          }
          .fy-verbs > div:first-child .fy-verb-col { border-top: none; padding-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}
