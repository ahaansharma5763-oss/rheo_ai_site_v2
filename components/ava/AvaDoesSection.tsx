'use client';

import Reveal from '@/components/home/Reveal';
import WaveField from '@/components/ui/wave-field';
import Icon, { IconName } from '@/components/ui/icon';

interface Capability { icon: IconName; verb: string; description: string; }

const CAPABILITIES: Capability[] = [
  { icon: 'chat',           verb: 'Responds',   description: 'Instantly engages every inbound lead across WhatsApp, 24 hours a day. No lead waits till morning.' },
  { icon: 'filter',         verb: 'Qualifies',  description: 'Scores and segments leads in real time using configurable intent signals. Hot leads flagged to you.' },
  { icon: 'calendar-check', verb: 'Books',      description: 'Syncs with Google Calendar, detects conflicts, and confirms appointments autonomously.' },
  { icon: 'card',           verb: 'Collects',   description: 'Generates Razorpay payment links, sends reminders, and reconciles transactions automatically.' },
  { icon: 'refresh',        verb: 'Follows up', description: 'Runs multi-step drip sequences — Hinglish-native, human-sounding, never robotic.' },
  { icon: 'insights',       verb: 'Reports',    description: 'Delivers a consolidated daily briefing to your WhatsApp or dashboard. Zero noise.' },
];

export default function AvaDoesSection() {
  return (
    <section style={{ padding: 'var(--section-gap) var(--rail-pad)', position: 'relative', overflow: 'hidden' }}>
      <WaveField variant="corner-right" shape="simplex" colorFront="#2E6B8E" opacity={0.36} speed={0.26} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Reveal>
          <span className="eyebrow" style={{ display: 'block', marginBottom: '20px', color: 'var(--gold-end)' }}>
            One agent, the whole desk
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(32px, 4.6vw, 56px)',
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: 'var(--fg)',
            fontWeight: 500,
            maxWidth: '22ch',
            marginBottom: 'clamp(56px, 8vh, 88px)',
          }}>
            Six capabilities. One agent. Zero manual steps<span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.verb} delay={i * 70}>
              <article
                className="hover-rule"
                style={{
                  background: 'rgba(15,30,54,0.45)',
                  border: '1px solid rgba(46,107,142,0.28)',
                  padding: 'clamp(28px, 3.2vw, 36px)',
                  height: '100%',
                  transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1), background 0.4s ease, border-color 0.4s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.background = 'rgba(15,30,54,0.7)'; e.currentTarget.style.borderColor = 'rgba(196,162,90,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'rgba(15,30,54,0.45)'; e.currentTarget.style.borderColor = 'rgba(46,107,142,0.28)'; }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(196,162,90,0.1)', border: '1px solid rgba(196,162,90,0.3)',
                  marginBottom: '24px',
                }}>
                  <Icon name={cap.icon} size={26} color="var(--gold)" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '24px',
                  color: 'var(--warm-foam)',
                  fontWeight: 600,
                  letterSpacing: '-0.012em',
                  marginBottom: '12px',
                }}>
                  {cap.verb}<span style={{ color: 'var(--gold)' }}>.</span>
                </h3>
                <p style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                  lineHeight: 1.65,
                  color: 'var(--muted-cream)',
                  fontWeight: 300,
                }}>
                  {cap.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
