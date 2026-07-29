import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'
import { FYHero, FYClose } from '@/components/follow/HeroClose'
import {
  FYProblem,
  FYInvisible,
  FYSpeed,
  FYWhatItIs,
  FYNotABot,
  FYNot,
  FYWho,
  FounderBlock,
} from '@/components/follow/Narrative'
import { LedgerCompare, StatStrip } from '@/components/follow/Money'
import { StepTimeline } from '@/components/follow/Timeline'
import { FollowUpLadder } from '@/components/follow/Ladder'
import { FYDashboard, FYMemory } from '@/components/follow/Dashboard'
import { FYFramework } from '@/components/follow/Framework'
import { FYProof, FYFaq } from '@/components/follow/Proof'
import { FAQS } from '@/components/follow/faqData'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Rheo AI',
      url: 'https://rheoai.co.in',
      slogan: 'Answers in seconds. Forgets nothing.',
      email: 'ahaan@rheoai.co.in',
      founder: { '@type': 'Person', name: 'Ahaan Sharma' },
      address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        {/* §1 the diagnosis */}
        <FYHero />
        {/* §2 the problem */}
        <FYProblem />
        {/* §3 the emotional turn */}
        <FYInvisible />
        {/* §4 the money + frozen proof strip */}
        <LedgerCompare />
        <StatStrip />
        {/* §5 why speed decides it */}
        <FYSpeed />
        {/* §6 what it is */}
        <FYWhatItIs />
        {/* §7 how it works */}
        <StepTimeline />
        {/* §8 the five follow-ups */}
        <FollowUpLadder />
        {/* §9 the dashboard */}
        <FYDashboard />
        {/* §10 customer memory */}
        <FYMemory />
        {/* §11 not a bot */}
        <FYNotABot />
        {/* §12 the framework — the light beat */}
        <FYFramework />
        {/* §13 proof */}
        <FYProof />
        {/* §14 what this is not */}
        <FYNot />
        {/* objections, verbatim */}
        <FYFaq />
        {/* §15 who this is for */}
        <FYWho />
        <FounderBlock />
        {/* §16 close */}
        <FYClose />
        <Footer />
      </div>
    </main>
  )
}
