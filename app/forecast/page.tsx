import type { Metadata } from 'next'
import './forecast.css'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import ForecastForm from '@/components/forecast/ForecastForm'
import EntryShowcase from '@/components/forecast/EntryShowcase'
import HowSteps from '@/components/forecast/HowSteps'
import StickyCTA from '@/components/forecast/StickyCTA'
import { forecast as C } from '@/components/forecast/content'

const BASE = 'https://rheoai.co.in'

export const metadata: Metadata = {
  title: C.meta.title,
  description: C.meta.description,
  alternates: { canonical: '/forecast' },
  openGraph: {
    title: C.meta.title,
    description: C.meta.description,
    url: `${BASE}/forecast`,
    siteName: 'Rheo AI',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: { card: 'summary', title: C.meta.title, description: C.meta.description },
}

export default function ForecastPage() {
  return (
    <main className="pf-page">
      <Nav />

      <section className="pf-hero" aria-labelledby="pf-h1">
        <div className="pf-wrap pf-hero-grid pf-load">
          <div className="pf-hero-copy">
            <p className="eyebrow">{C.hero.eyebrow}</p>
            <h1 id="pf-h1" className="pf-h1">{C.hero.heading}</h1>
            <p className="pf-lede">{C.hero.sub}</p>
            <ul className="pf-points">
              {C.hero.points.map(p => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div id="get" className="pf-hero-form">
            <ForecastForm />
          </div>
        </div>
      </section>

      <section className="pf-section" aria-labelledby="pf-inside">
        <div className="pf-wrap">
          <p className="eyebrow">{C.inside.eyebrow}</p>
          <h2 id="pf-inside" className="pf-h2">{C.inside.heading}</h2>
          <EntryShowcase />
          <p className="pf-body pf-whole">{C.inside.whole}</p>
        </div>
      </section>

      <section className="pf-section" aria-labelledby="pf-how">
        <div className="pf-wrap">
          <p id="pf-how" className="eyebrow">{C.how.eyebrow}</p>
          <HowSteps />
        </div>
      </section>

      <section className="pf-section pf-foam" data-theme="light" aria-labelledby="pf-fit">
        <div className="pf-wrap pf-fit">
          <p id="pf-fit" className="eyebrow">{C.fit.eyebrow}</p>
          <div className="pf-two">
            <div>
              <h3 className="pf-h3">{C.fit.forTitle}</h3>
              <p className="pf-body">{C.fit.forBody}</p>
            </div>
            <div>
              <h3 className="pf-h3 pf-mute">{C.fit.notTitle}</h3>
              <p className="pf-body pf-mute">{C.fit.notBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pf-section pf-last" aria-labelledby="pf-faq">
        <div className="pf-wrap pf-faq">
          <p id="pf-faq" className="eyebrow">{C.faq.eyebrow}</p>
          <div className="pf-two">
            {C.faq.items.map(f => (
              <div key={f.q} className="pf-q">
                <h3 className="pf-h3">{f.q}</h3>
                <p className="pf-body pf-mute">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="pf-back">
            <a className="pf-link" href="#get">{C.form.eyebrow}</a>
          </p>
        </div>
      </section>

      <Footer goldRule={false} />
      <StickyCTA />
    </main>
  )
}
