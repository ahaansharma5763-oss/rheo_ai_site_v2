import PilotHero from '@/components/pilot/PilotHero'
import PilotProblem from '@/components/pilot/PilotProblem'
import PilotSystem from '@/components/pilot/PilotSystem'
import PilotProof from '@/components/pilot/PilotProof'
import PilotOffer from '@/components/pilot/PilotOffer'
import PilotGuarantee from '@/components/pilot/PilotGuarantee'
import PilotWhoFor from '@/components/pilot/PilotWhoFor'
import PilotFAQ from '@/components/pilot/PilotFAQ'
import PilotCTA from '@/components/pilot/PilotCTA'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'

export const metadata = {
  title: 'The Performance Pilot, Rheo AI',
  description:
    'We build a complete lead-recovery system on your live enquiries and run it for 14 days. If it does not recover more than it costs, you owe nothing. Two build slots a month.',
}

export default function PilotPage() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <PilotHero />
        <PilotProblem />
        <PilotSystem />
        <PilotProof />
        <PilotOffer />
        <PilotGuarantee />
        <PilotWhoFor />
        <PilotFAQ />
        <PilotCTA />
        <Footer />
      </div>
    </main>
  )
}
