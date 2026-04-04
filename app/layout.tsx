import type { Metadata } from 'next'
import './globals.css'
import FloatingCTAs from '@/components/shared/FloatingCTAs'
import PremiumCursor from '@/components/shared/PremiumCursor'
import { SmokeBackground } from '@/components/ui/spooky-smoke-animation'

export const metadata: Metadata = {
  title: 'Rheo AI — Operations that flow',
  description: 'Rheo AI designs and deploys end-to-end AI automation systems for businesses. We automate the space between data and decision.',
  openGraph: {
    title: 'Rheo AI — Operations that flow',
    description: 'Agentic AI for Business Operations.',
    url: 'https://rheoai.co.in',
    siteName: 'Rheo AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rheo AI — Operations that flow',
    description: 'Agentic AI for Business Operations.',
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230D1F3C'/><text x='50%' y='62%' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='serif' fill='%23C4A25A'>R</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Global smoke — fixed full-page, behind all content */}
        <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <SmokeBackground smokeColor="#2E6B8E" />
        </div>
        <PremiumCursor />
        {children}
        <FloatingCTAs />
      </body>
    </html>
  )
}
