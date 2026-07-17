import RevivalHero from '@/components/revival/RevivalHero'
import RevivalProblem from '@/components/revival/RevivalProblem'
import RevivalWhatIs from '@/components/revival/RevivalWhatIs'
import RevivalMath from '@/components/revival/RevivalMath'
import RevivalGuarantee from '@/components/revival/RevivalGuarantee'
import RevivalBridge from '@/components/revival/RevivalBridge'
import RevivalFAQ from '@/components/revival/RevivalFAQ'
import RevivalCTA from '@/components/revival/RevivalCTA'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'

export const metadata = {
  title: 'The Revival Sprint, Rheo AI',
  description:
    'One 21-day campaign that turns your dormant customer and enquiry list into booked revenue. Real conversations, not blasts. Ends with one number: what came back.',
}

export default function RevivalSprintPage() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <RevivalHero />
        <RevivalProblem />
        <RevivalWhatIs />
        <RevivalMath />
        <RevivalGuarantee />
        <RevivalBridge />
        <RevivalFAQ />
        <RevivalCTA />
        <Footer />
      </div>
    </main>
  )
}
