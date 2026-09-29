import fs from 'node:fs'
import path from 'node:path'
import type { Metadata } from 'next'
import './outbound.css'
import './backdrop.css'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import { outbound } from '@/components/outbound/content'
import Theatre from '@/components/outbound/Theatre'
import Motion from '@/components/outbound/Motion'
import {
  Hero,
  FilmBand,
  Problem,
  Turn,
  StepsSection,
  Report,
  Proof,
  Promises,
  YourPart,
  Timeline,
  Fit,
  Faq,
  Book,
} from '@/components/outbound/Sections'
import { clockToIso, clockToSeconds, normaliseTranscript } from '@/components/outbound/types'
import { MUX_PLAYBACK_ID } from '@/components/outbound/media';

const BASE = 'https://rheoai.co.in'

export const metadata: Metadata = {
  title: outbound.meta.title,
  description: outbound.meta.description,
  alternates: { canonical: '/outbound' },
  openGraph: {
    title: outbound.meta.title,
    description: outbound.meta.description,
    url: `${BASE}/outbound`,
    siteName: 'Rheo AI',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: outbound.meta.title,
    description: outbound.meta.description,
  },
}

/* The transcript is rendered into the page at build time so search engines
 * can read it. Film writes the file; until it lands the block is left out. */
function readTranscript() {
  try {
    const file = path.join(process.cwd(), 'public', 'outbound', 'film', 'transcript.json')
    return normaliseTranscript(JSON.parse(fs.readFileSync(file, 'utf8')))
  } catch {
    return []
  }
}

function jsonLd() {
  const chapters = outbound.film.chapters
  const total = clockToSeconds(outbound.hero.filmLength)
  const mux = MUX_PLAYBACK_ID
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${BASE}/outbound#faq`,
        mainEntity: outbound.faq.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'VideoObject',
        '@id': `${BASE}/outbound#film`,
        name: outbound.meta.title,
        description: outbound.meta.description,
        thumbnailUrl: [`${BASE}/outbound/film/poster.jpg`],
        uploadDate: '2026-10-02T00:00:00+05:30',
        duration: clockToIso(outbound.hero.filmLength),
        inLanguage: 'en',
        publisher: { '@type': 'Organization', name: 'Rheo AI', url: BASE },
        ...(mux
          ? { contentUrl: `https://stream.mux.com/${mux}.m3u8`, embedUrl: `https://player.mux.com/${mux}` }
          : {}),
        hasPart: chapters.map((c, i) => ({
          '@type': 'Clip',
          name: c.title,
          startOffset: c.seconds,
          endOffset: chapters[i + 1]?.seconds ?? total,
          url: `${BASE}/outbound?t=${c.seconds}`,
        })),
      },
    ],
  }
}

export default function OutboundPage() {
  const o = outbound
  const chapters = o.film.chapters
  const ld = JSON.stringify(jsonLd()).replace(/</g, '\\u003c')

  return (
    <main className="ob-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />
      <Nav />
      {/* 1 */}
      <Hero c={o.hero} />
      {/* 2 */}
      <FilmBand hero={o.hero} film={o.film} transcript={readTranscript()} />
      {/* 3 */}
      <Problem p={o.problem} chapters={chapters} />
      {/* 4, the one orchestrated moment */}
      <Turn t={o.turn} />
      {/* 5 */}
      <StepsSection intro={o.stepsIntro} steps={o.steps} chapters={chapters} />
      {/* 6 */}
      <Report r={o.report} chapters={chapters} />
      {/* 7 */}
      <Proof p={o.proof} chapters={chapters} />
      {/* 8 */}
      <Promises p={o.promises} />
      {/* 9, the one Warm Foam section */}
      <YourPart y={o.yourPart} chapters={chapters} />
      {/* 10 */}
      <Timeline t={o.timeline} />
      {/* 11 */}
      <Fit f={o.fit} />
      {/* 12 */}
      <Faq items={o.faq} />
      {/* 13 */}
      <Book b={o.book} />
      <Footer goldRule={false} />

      <Theatre
        chapters={chapters}
        label={o.hero.ctaFilm}
        captionsLabel={o.film.captionsLabel}
        transcriptHeading={o.film.transcriptHeading}
      />
      <Motion />
    </main>
  )
}
