import HeroSection from '@/components/home/HeroSection'
import NameSection from '@/components/home/NameSection'
import WhoWeAreSection from '@/components/home/WhoWeAreSection'
import PrinciplesSection from '@/components/home/PrinciplesSection'
import ProblemSection from '@/components/home/ProblemSection'
import WhatWeDoSection from '@/components/home/WhatWeDoSection'
import ProcessSection from '@/components/home/ProcessSection'
import CaseStudiesSection from '@/components/home/CaseStudiesSection'
import ShiftSection from '@/components/home/ShiftSection'
import CTASection from '@/components/home/CTASection'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import { WaveHairline } from '@/components/shared/GreekElements'

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />
      <WaveHairline />
      <NameSection />
      <WaveHairline />
      <WhoWeAreSection />
      <WaveHairline />
      <PrinciplesSection />
      <WaveHairline />
      <ProblemSection />
      <WaveHairline />
      <WhatWeDoSection />
      <WaveHairline />
      <ProcessSection />
      <WaveHairline />
      <CaseStudiesSection />
      <WaveHairline />
      <ShiftSection />
      <WaveHairline />
      <CTASection />
      <Footer />
    </main>
  )
}
