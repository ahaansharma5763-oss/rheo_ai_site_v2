import PulseHero from '@/components/pulse/PulseHero'
import PulseProblem from '@/components/pulse/PulseProblem'
import PulseWhatIs from '@/components/pulse/PulseWhatIs'
import PulseBenefits from '@/components/pulse/PulseBenefits'
import PulseHowItWorks from '@/components/pulse/PulseHowItWorks'
import PulseUseCases from '@/components/pulse/PulseUseCases'
import PulseCaseStudies from '@/components/pulse/PulseCaseStudies'
import PulseVsAva from '@/components/pulse/PulseVsAva'
import PulseGuarantee from '@/components/pulse/PulseGuarantee'
import PulseWhoFor from '@/components/pulse/PulseWhoFor'
import PulseFAQ from '@/components/pulse/PulseFAQ'
import PulseCTA from '@/components/pulse/PulseCTA'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'

export const metadata = {
  title: 'Pulse, Rheo AI Customer Journey Intelligence',
  description: 'Pulse is the intelligence layer that reads every lead, understands what each person needs, and reaches out at the moment they are ready to buy — reviving dead pipelines and winning back customers automatically.',
}

export default function PulsePage() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <PulseHero />
        <PulseProblem />
        <PulseWhatIs />
        <PulseBenefits />
        <PulseHowItWorks />
        <PulseUseCases />
        <PulseCaseStudies />
        <PulseVsAva />
        <PulseGuarantee />
        <PulseWhoFor />
        <PulseFAQ />
        <PulseCTA />
        <Footer />
      </div>
    </main>
  )
}
