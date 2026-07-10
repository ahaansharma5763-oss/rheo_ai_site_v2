import SEHero from '@/components/sales-engineer/SEHero'
import SEDemo from '@/components/sales-engineer/SEDemo'
import SEGuarantee from '@/components/sales-engineer/SEGuarantee'
import SEProblem from '@/components/sales-engineer/SEProblem'
import SEROI from '@/components/sales-engineer/SEROI'
import SEHowItWorks from '@/components/sales-engineer/SEHowItWorks'
import SEWhoFor from '@/components/sales-engineer/SEWhoFor'
import SEWhatIs from '@/components/sales-engineer/SEWhatIs'
import SEGrounding from '@/components/sales-engineer/SEGrounding'
import SEOffer from '@/components/sales-engineer/SEOffer'
import SEFAQ from '@/components/sales-engineer/SEFAQ'
import SECTA from '@/components/sales-engineer/SECTA'
import SEDeepSea from '@/components/sales-engineer/SEDeepSea'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import PageGradient from '@/components/shared/PageGradient'

export const metadata = {
  title: 'Athena · The AI Sales Engineer for Industrial Companies | Rheo AI',
  description: 'Athena is the AI Sales Engineer for manufacturers and distributors of technical products. It qualifies buyers, recommends the right machine from your real catalogue, and sends exact, cited quotes in minutes. Try the live demo, then read the 60-day pay-for-itself guarantee.',
}

/* Page-scoped contrast boost: brighter copy tokens so the text pops,
 * and stays readable as the deep-sea overlay darkens the descent. */
const CONTRAST = {
  '--fg-mute': 'rgba(238,232,224,0.88)',
  '--muted-cream': '#DCD5C8',
  '--fg-dim': 'rgba(238,232,224,0.6)',
} as React.CSSProperties

export default function SalesEngineerPage() {
  return (
    <main style={{ position: 'relative', ...CONTRAST }}>
      <PageGradient />
      <SEDeepSea />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Nav />
        <SEHero />
        <SEDemo />
        <SEGuarantee />
        <SEProblem />
        <SEROI />
        <SEHowItWorks />
        <SEWhoFor />
        <SEWhatIs />
        <SEGrounding />
        <SEOffer />
        <SEFAQ />
        <SECTA />
        <Footer />
      </div>
    </main>
  )
}
