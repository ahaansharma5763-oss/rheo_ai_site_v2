import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'
import Hero from '@/components/home/Hero'
import Metrics from '@/components/home/Metrics'
import Positioning from '@/components/home/Positioning'
import Methodology from '@/components/home/Methodology'
import CaseStudy from '@/components/home/CaseStudy'
import Capabilities from '@/components/home/Capabilities'
import CustomerJourney from '@/components/home/CustomerJourney'
import ROIModels from '@/components/home/ROIModels'
import Philosophy from '@/components/home/Philosophy'
import ClosingCTA from '@/components/home/ClosingCTA'

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <Hero />
        <Metrics />
        <Positioning />
        <Capabilities />
        <CustomerJourney />
        <ROIModels />
        <Methodology />
        <CaseStudy />
        <Philosophy />
        <ClosingCTA />
        <Footer />
      </div>
    </main>
  )
}
