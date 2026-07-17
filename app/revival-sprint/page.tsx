import RevivalHero from '@/components/revival/RevivalHero'
import RevivalProblem from '@/components/revival/RevivalProblem'
import RevivalWhatIs from '@/components/revival/RevivalWhatIs'
import RevivalTimeline from '@/components/revival/RevivalTimeline'
import RevivalMeasure from '@/components/revival/RevivalMeasure'
import RevivalMath from '@/components/revival/RevivalMath'
import RevivalGuarantee from '@/components/revival/RevivalGuarantee'
import RevivalAudit from '@/components/revival/RevivalAudit'
import RevivalBridge from '@/components/revival/RevivalBridge'
import RevivalFAQ from '@/components/revival/RevivalFAQ'
import RevivalCTA from '@/components/revival/RevivalCTA'
import DeepOcean from '@/components/revival/DeepOcean'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'

export const metadata = {
  title: 'The Revival Sprint, Rheo AI',
  description:
    'One 21-day campaign that turns your dormant customer and enquiry list into booked revenue. Real conversations, not blasts. Ends with one number: what came back.',
}

export default function RevivalSprintPage() {
  return (
    <main style={{ position: 'relative' }}>
      <DeepOcean />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <RevivalHero />
        <RevivalProblem />
        <RevivalWhatIs />
        <RevivalTimeline />
        <RevivalMeasure />
        <RevivalMath />
        <RevivalGuarantee />
        <RevivalAudit />
        <RevivalBridge />
        <RevivalFAQ />
        <RevivalCTA />
        <Footer />
      </div>
    </main>
  )
}
