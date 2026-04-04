import HeroSection from '@/components/home/HeroSection'
import NameSection from '@/components/home/NameSection'
import WhoWeAreSection from '@/components/home/WhoWeAreSection'
import PrinciplesSection from '@/components/home/PrinciplesSection'
import ProblemSection from '@/components/home/ProblemSection'
import WhatWeDoSection from '@/components/home/WhatWeDoSection'
import ShiftSection from '@/components/home/ShiftSection'
import CTASection from '@/components/home/CTASection'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <NameSection />
      <WhoWeAreSection />
      <PrinciplesSection />
      <ProblemSection />
      <WhatWeDoSection />
      <ShiftSection />
      <CTASection />
      <Footer />
    </main>
  )
}
