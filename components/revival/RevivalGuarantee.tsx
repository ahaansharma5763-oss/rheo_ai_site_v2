'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';

const FITS = [
  'You have at least a few hundred past customers or enquiries with their numbers saved.',
  'Your average sale makes follow-up worth it. One returning customer should clearly outweigh the campaign.',
  'You can actually serve the demand this month. We revive it, you deliver it.',
];

const NOT_FITS = [
  'Your list was bought, scraped, or borrowed. We refuse these without exception. It damages your name and it does not work.',
  'Your customers left because of a service problem. Fix that first. We would only be amplifying it.',
];

export default function RevivalGuarantee() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-left" shape="swirl" colorFront="#2E74AC" opacity={0.26} speed={0.22} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px' }}>
            The guarantee
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px, 4.4vw, 54px)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--fg)', fontWeight: 500, maxWidth: '26ch', marginBottom: '28px' }}>
            If it does not pay for itself twice over, you only cover the deposit<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <div style={{ maxWidth: '70ch', marginBottom: 'clamp(56px, 8vh, 88px)' }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 17.5px)', lineHeight: 1.8, color: 'var(--fg-mute)', fontWeight: 300, marginBottom: '18px' }}>
              We will keep this simple. The Sprint has one job: recover more revenue than it costs. If, at the end
              of 21 days, the booked revenue it brought back is not more than double the fee, you pay only the
              small deposit that held your slot. Everything else, you keep.
            </p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.4vw, 17.5px)', lineHeight: 1.8, color: 'var(--fg-mute)', fontWeight: 300 }}>
              We can make this promise because we only run Sprints for businesses that pass our checks. If your
              list will not clear the bar, we will tell you on the call and not take the project.
            </p>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
          <Reveal delay={100}>
            <div style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(11,23,41,0.5)', padding: 'clamp(26px, 3vw, 36px)', height: '100%' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 1.9vw, 22px)', color: 'var(--warm-foam)', fontWeight: 500, marginBottom: '20px' }}>
                The Sprint fits you if:
              </h3>
              {FITS.map((t, i) => (
                <p key={i} style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, paddingLeft: '18px', borderLeft: '1px solid rgba(63,174,222,0.4)', marginBottom: i < FITS.length - 1 ? '16px' : 0 }}>
                  {t}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ border: '1px solid rgba(46,116,172,0.24)', background: 'rgba(11,23,41,0.5)', padding: 'clamp(26px, 3vw, 36px)', height: '100%' }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 1.9vw, 22px)', color: 'var(--warm-foam)', fontWeight: 500, marginBottom: '20px' }}>
                And it is not for you if:
              </h3>
              {NOT_FITS.map((t, i) => (
                <p key={i} style={{ fontFamily: 'var(--sans)', fontSize: '14.5px', lineHeight: 1.7, color: 'var(--muted-cream)', fontWeight: 300, paddingLeft: '18px', borderLeft: '1px solid rgba(217,106,106,0.45)', marginBottom: i < NOT_FITS.length - 1 ? '16px' : 0 }}>
                  {t}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
