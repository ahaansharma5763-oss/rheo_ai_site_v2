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
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'

export const metadata = {
  title: 'Kai, Customer Orchestration by Rheo AI',
  description:
    'Kai runs your entire customer funnel, from the first enquiry to the loyal regular. Instant response, qualification, nurture, win-back, and retention in one orchestration layer.',
}

export default function KaiPage() {
  return (
    <main style={{ position: 'relative' }}>
      <DeepOcean />
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
