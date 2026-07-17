import KaiHero from '@/components/kai/KaiHero'
import KaiProblem from '@/components/kai/KaiProblem'
import KaiWhatIs from '@/components/kai/KaiWhatIs'
import KaiMeans from '@/components/kai/KaiMeans'
import KaiIncludes from '@/components/kai/KaiIncludes'
import KaiHow from '@/components/kai/KaiHow'
import KaiUseCases from '@/components/kai/KaiUseCases'
import KaiMeasured from '@/components/kai/KaiMeasured'
import KaiBridge from '@/components/kai/KaiBridge'
import KaiGuarantee from '@/components/kai/KaiGuarantee'
import KaiStory from '@/components/kai/KaiStory'
import KaiWhoFAQ from '@/components/kai/KaiWhoFAQ'
import KaiCTA from '@/components/kai/KaiCTA'
import DeepOcean from '@/components/revival/DeepOcean'
import SEDeepSea from '@/components/sales-engineer/SEDeepSea'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'

export const metadata = {
  title: 'Kai, Customer Orchestration by Rheo AI',
  description:
    'Kai runs your entire customer funnel, from the first enquiry to the loyal regular. Instant response, qualification, nurture, win-back, and retention in one orchestration layer.',
}

/* Page-scoped contrast boost (Athena pattern): brighter copy tokens so
 * text stays readable as the deep-sea overlay darkens the descent. */
const CONTRAST = {
  '--fg-mute': 'rgba(244,237,223,0.88)',
  '--muted-cream': '#DCD5C8',
  '--fg-dim': 'rgba(244,237,223,0.6)',
} as React.CSSProperties

export default function KaiPage() {
  return (
    <main style={{ position: 'relative', ...CONTRAST }}>
      <DeepOcean />
      <SEDeepSea />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <KaiHero />
        <KaiProblem />
        <KaiWhatIs />
        <KaiMeans />
        <KaiIncludes />
        <KaiHow />
        <KaiUseCases />
        <KaiMeasured />
        <KaiBridge />
        <KaiGuarantee />
        <KaiStory />
        <KaiWhoFAQ />
        <KaiCTA />
        <Footer />
      </div>
    </main>
  )
}
