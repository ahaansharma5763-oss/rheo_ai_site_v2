import RevivalHero from '@/components/revival/RevivalHero'
import RevivalProblem from '@/components/revival/RevivalProblem'
import RevivalWhatIs from '@/components/revival/RevivalWhatIs'
import RevivalTimeline from '@/components/revival/RevivalTimeline'
import NamiIncludes from '@/components/revival/NamiIncludes'
import RevivalMeasure from '@/components/revival/RevivalMeasure'
import RevivalMath from '@/components/revival/RevivalMath'
import RevivalGuarantee from '@/components/revival/RevivalGuarantee'
import NamiSlots from '@/components/revival/NamiSlots'
import NamiStory from '@/components/revival/NamiStory'
import RevivalBridge from '@/components/revival/RevivalBridge'
import RevivalFAQ from '@/components/revival/RevivalFAQ'
import RevivalCTA from '@/components/revival/RevivalCTA'
import DeepOcean from '@/components/revival/DeepOcean'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'

export const metadata = {
  title: 'Nami, The 21-Day Win-Back by Rheo AI',
  description:
    'Nami is a done-for-you win-back campaign. One wave of real conversations through your dormant list, and 21 days later, a report with one number: the revenue that came back.',
}

export default function NamiPage() {
  return (
    <main style={{ position: 'relative' }}>
      <DeepOcean />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <RevivalHero />
        <RevivalProblem />
        <RevivalWhatIs />
        <RevivalTimeline />
        <NamiIncludes />
        <RevivalMeasure />
        <RevivalMath />
        <RevivalGuarantee />
        <NamiSlots />
        <NamiStory />
        <RevivalBridge />
        <RevivalFAQ />
        <RevivalCTA />
        <Footer />
      </div>
    </main>
  )
}
