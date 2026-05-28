import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'
import Hero from '@/components/home/Hero'
import Metrics from '@/components/home/Metrics'
import Methodology from '@/components/home/Methodology'
import CaseStudy from '@/components/home/CaseStudy'
import Capabilities from '@/components/home/Capabilities'
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
        <Methodology />
        <CaseStudy />
        <Capabilities />
        <Philosophy />
        <ClosingCTA />
        <Footer />
      </div>
    </main>
  )
}
