import AvaHero from '@/components/ava/AvaHero'
import AvaDoesSection from '@/components/ava/AvaDoesSection'
import HowAvaWorksSection from '@/components/ava/HowAvaWorksSection'
import AvaNumbersSection from '@/components/ava/AvaNumbersSection'
import AvaCTASection from '@/components/ava/AvaCTASection'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'

export const metadata = {
  title: 'AVA, Rheo AI Operations Agent',
  description: 'AVA is your AI-powered WhatsApp operations agent. Responds, qualifies, books, collects payments, and reports, automatically.',
}

export default function AvaPage() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <AvaHero />
        <AvaDoesSection />
        <HowAvaWorksSection />
        <AvaNumbersSection />
        <AvaCTASection />
        <Footer />
      </div>
    </main>
  )
}
