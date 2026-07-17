'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon from '@/components/ui/icon';

interface Metric { value: string; label: string; }
interface Study {
  tag: string;
  who: string;
  context: string;
  situation: string;
  whatPulseDid: string;
  metrics: Metric[];
  roi: string;
  quote: string;
  attribution: string;
}

const STUDIES: Study[] = [
  {
    tag: 'Coaching',
    who: 'Transformation coach',
    context: '1:1 high-ticket coaching · ₹45,000 average program',
    situation: 'Spending heavily on ads and getting a steady flow of enquiries, but closing only a handful. Most leads replied once, asked the price, and went quiet. Follow-up depended on the founder remembering to message back, which meant it rarely happened past the second touch. Months of warm enquiries were sitting unworked in WhatsApp.',
    whatPulseDid: 'Okeanos went back through eleven months of cold enquiries on day one and reopened conversations with a personal, specific reason to talk. From then on it read every new lead, answered pricing and timing objections in the founder’s own voice, and moved ready buyers straight to a booked call while flagging them in real time.',
    metrics: [
      { value: '8% → 19%', label: 'Enquiry to enrolled client' },
      { value: '2.4×',     label: 'Conversion on the same ad spend' },
      { value: '6',        label: 'Dead leads recovered in 14 days' },
      { value: '₹2.7L',    label: 'Recovered revenue, first 60 days' },
      { value: '7 hrs',    label: 'Founder time saved per week' },
    ],
    roi: '9× return inside the 60-day guarantee window',
    quote: 'The leads were always there. I just never followed up properly. Okeanos closed people I had completely written off.',
    attribution: 'Founder, transformation coaching practice',
  },
  {
    tag: 'Premium service',
    who: 'Auto-detailing studio',
    context: 'PPF, ceramic and detailing · ₹30,000 to ₹1,20,000 jobs',
    situation: 'High-value bookings and strong word of mouth, but enquiries often went quiet after the first quote and past customers were never contacted again. A customer who asked about ceramic coating on a Saturday night would not hear back until Monday, by which point they had booked elsewhere. Repeat business was almost accidental.',
    whatPulseDid: 'Okeanos caught every abandoned enquiry within the hour, reopened it with the exact service they had asked about, and answered price and timing questions instantly at any time of day. It then ran a quiet win-back across the past-customer list, reminding owners when their coating or PPF was due for a refresh.',
    metrics: [
      { value: '34%',   label: 'Abandoned enquiries recovered' },
      { value: '2.4×',  label: 'Increase in repeat bookings' },
      { value: '< 2 min', label: 'Average first response time' },
      { value: '₹3.1L', label: 'Added revenue, first 60 days' },
      { value: '41',    label: 'Past customers re-activated' },
    ],
    roi: '11× return in the first two months',
    quote: 'People who went silent after a quote are now booking. And customers I detailed last year are coming back without me lifting a finger.',
    attribution: 'Owner, premium auto-detailing studio',
  },
  {
    tag: 'Healthcare',
    who: 'Multi-location clinic',
    context: 'Three locations · high enquiry volume, small front desk',
    situation: 'A flood of enquiries across three locations and a small front-desk team with no time to chase anyone who did not book on the first message. Patients who asked about a procedure and then hesitated simply fell through the cracks, and there was no system to bring quiet patients back for follow-up care.',
    whatPulseDid: 'Okeanos nurtured every enquiry across all three locations, gently brought quiet patients back with a relevant reason to return, and answered routine questions instantly so the front desk only handled conversations that genuinely needed a human. Patients who needed a personal call were flagged and routed to the right location.',
    metrics: [
      { value: '+28%',  label: 'Enquiries turned into appointments' },
      { value: '220+',  label: 'Dormant patients re-engaged' },
      { value: '₹4.6L', label: 'Recovered revenue, first quarter' },
      { value: '3×',    label: 'Faster response across locations' },
      { value: '12 hrs', label: 'Front-desk time saved per week' },
    ],
    roi: '14× return across the first quarter',
    quote: 'My team stopped drowning in follow-up. Okeanos handles the chasing and only sends us the people who actually need a call.',
    attribution: 'Operations lead, multi-location clinic',
  },
];

/* Count the headline ROI multiple up when it scrolls into view. */
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function StudyCard({ s, i }: { s: Study; i: number }) {
  return (
    <Reveal delay={i * 90}>
      <article
        style={{
          background: 'rgba(11,23,41,0.6)',
          border: '1px solid rgba(46,116,172,0.26)',
          borderLeft: '3px solid var(--gold)',
          borderRadius: '4px',
          padding: 'clamp(28px, 3.6vw, 48px)',
          transition: 'border-color 0.4s ease, background 0.4s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(11,23,41,0.8)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; e.currentTarget.style.borderLeftColor = 'var(--gold-end)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(11,23,41,0.6)'; e.currentTarget.style.borderColor = 'rgba(46,116,172,0.26)'; e.currentTarget.style.borderLeftColor = 'var(--gold)'; }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, border: '1px solid rgba(196,162,90,0.35)', borderRadius: '20px', padding: '5px 12px' }}>{s.tag}</span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--fg-dim)', letterSpacing: '0.02em' }}>{s.context}</span>
        </div>

        <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 2.8vw, 34px)', color: 'var(--warm-foam)', fontWeight: 600, letterSpacing: '-0.015em', marginBottom: '24px' }}>{s.who}</h3>

        <div className="pulse-study-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(20px, 2.6vw, 36px)', marginBottom: '28px' }}>
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 600, marginBottom: '10px' }}>The situation</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.7, color: 'var(--fg-mute)', fontWeight: 300 }}>{s.situation}</p>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--crest)', fontWeight: 600, marginBottom: '10px' }}>What Okeanos did</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', lineHeight: 1.7, color: 'var(--fg-mute)', fontWeight: 300 }}>{s.whatPulseDid}</p>
          </div>
        </div>

        <div className="pulse-metrics" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', background: 'rgba(46,116,172,0.2)', border: '1px solid rgba(46,116,172,0.2)', marginBottom: '24px' }}>
          {s.metrics.map(m => (
            <div key={m.label} style={{ background: 'rgba(5,14,29,0.7)', padding: 'clamp(16px, 1.8vw, 22px) 14px', textAlign: 'center' }}>
              <p className="gold-text" style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '8px' }}>{m.value}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '10.5px', color: 'var(--muted-cream)', lineHeight: 1.4, letterSpacing: '0.02em' }}>{m.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '26px' }}>
          <Icon name="trending-up" size={18} color="var(--gold)" />
          <span style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--warm-foam)', fontWeight: 500, letterSpacing: '0.01em' }}>{s.roi}</span>
        </div>

        <blockquote style={{ borderLeft: '2px solid rgba(196,162,90,0.5)', paddingLeft: '20px' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.8vw, 21px)', lineHeight: 1.5, color: 'var(--warm-foam)', fontWeight: 500, fontStyle: 'italic', marginBottom: '10px' }}>&ldquo;{s.quote}&rdquo;</p>
          <cite style={{ fontFamily: 'var(--sans)', fontSize: '12px', color: 'var(--fg-dim)', letterSpacing: '0.06em', fontStyle: 'normal' }}>{s.attribution}</cite>
        </blockquote>
      </article>
    </Reveal>
  );
}

export default function PulseCaseStudies() {
  const { ref, seen } = useInView();

  return (
    <section ref={ref} style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(46,116,172,0.12)' }}>
      <WaveField variant="corner-right" shape="wave" colorFront="#3FAEDE" opacity={0.3} speed={0.24} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', textAlign: 'center', marginBottom: '20px', color: 'var(--gold-end)' }}>
            Proof
          </span>
        </Reveal>

        <Reveal delay={120}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5.2vw, 60px)', color: 'var(--fg)', letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 18px', lineHeight: 1.08, fontWeight: 600 }}>
            Look what Okeanos does<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', lineHeight: 1.7, color: 'var(--fg-mute)', fontWeight: 300, textAlign: 'center', maxWidth: '60ch', margin: '0 auto clamp(40px, 6vh, 64px)' }}>
            Real businesses, real pipelines, real recovered revenue. Here is what happened when they put Okeanos to work.
          </p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: 'clamp(40px, 6vh, 56px)' }}>
          {STUDIES.map((s, i) => <StudyCard key={s.who} s={s} i={i} />)}
        </div>

        <Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1px', background: 'rgba(196,162,90,0.2)', border: '1px solid rgba(196,162,90,0.25)' }}>
            {[
              { value: seen ? '11×' : '0×', label: 'Average return inside 60 days' },
              { value: '₹10L+',            label: 'Revenue recovered across these three' },
              { value: '< 2 min',          label: 'Typical response, day or night' },
              { value: '100%',             label: 'Built around each business, never templated' },
            ].map(m => (
              <div key={m.label} style={{ flex: '1 1 200px', background: 'rgba(5,14,29,0.7)', padding: 'clamp(24px, 3vw, 36px) 20px', textAlign: 'center' }}>
                <p className="gold-text" style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '12px', transition: 'opacity 0.6s ease' }}>{m.value}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '11px', color: 'var(--muted-cream)', textTransform: 'uppercase', letterSpacing: '0.16em', lineHeight: 1.5 }}>{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .pulse-study-cols { grid-template-columns: 1fr !important; }
          .pulse-metrics { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 460px) {
          .pulse-metrics { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
