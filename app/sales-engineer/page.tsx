import SEHero from '@/components/sales-engineer/SEHero'
import SEWhoFor from '@/components/sales-engineer/SEWhoFor'
import SEProblem from '@/components/sales-engineer/SEProblem'
import SEWhatIs from '@/components/sales-engineer/SEWhatIs'
import SEGrounding from '@/components/sales-engineer/SEGrounding'
import SEDemo from '@/components/sales-engineer/SEDemo'
import SEROI from '@/components/sales-engineer/SEROI'
import SEHowItWorks from '@/components/sales-engineer/SEHowItWorks'
import SEOffer from '@/components/sales-engineer/SEOffer'
import SEGuarantee from '@/components/sales-engineer/SEGuarantee'
import SEFAQ from '@/components/sales-engineer/SEFAQ'
import SECTA from '@/components/sales-engineer/SECTA'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'

export const metadata = {
  title: 'Metis · The AI Sales Engineer for Industrial Companies | Rheo AI',
  description: 'Metis is the AI Sales Engineer for manufacturers and distributors of technical products. It qualifies buyers, recommends the right machine from your real catalogue, and sends exact, cited quotes in minutes. In any language, on any channel, around the clock. Live in under 3 weeks with a 60-day pay-for-itself guarantee.',
}

export default function SalesEngineerPage() {
  return (
    <main style={{ position: 'relative' }}>
      <PageGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <SEHero />
        <SEWhoFor />
        <SEProblem />
        <SEWhatIs />
        <SEGrounding />
        <SEDemo />
        <SEROI />
        <SEHowItWorks />
        <SEOffer />
        <SEGuarantee />
        <SEFAQ />
        <SECTA />
        <Footer />
      </div>
    </main>
  )
}
