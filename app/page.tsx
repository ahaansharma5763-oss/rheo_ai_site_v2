import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'
import Hero from '@/components/home/Hero'
import Metrics from '@/components/home/Metrics'
import Positioning from '@/components/home/Positioning'
import Capabilities from '@/components/home/Capabilities'
import ROIModels from '@/components/home/ROIModels'
import ClosingCTA from '@/components/home/ClosingCTA'

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        {/* What we do */}
        <Hero />
        <Metrics />
        {/* Who we are / who we serve */}
        <Positioning />
        {/* What we solve */}
        <Capabilities />
        {/* Proof */}
        <ROIModels />
        <ClosingCTA />
        <Footer />
      </div>
    </main>
  )
}
