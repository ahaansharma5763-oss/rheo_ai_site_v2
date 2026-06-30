import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/shared/CustomCursor'
import NeuralAccent from '@/components/shared/NeuralAccent'
import WhatsAppFloat from '@/components/shared/WhatsAppFloat'
import PilotPopup from '@/components/shared/PilotPopup'

export const metadata: Metadata = {
  title: 'Rheo AI · AI-native infrastructure for businesses that compound',
  description:
    'Intelligent workflows and agentic systems that let your data, tools, and people talk to each other. The connective tissue for modern businesses.',
  keywords: [
    'ai-native infrastructure',
    'intelligent workflows',
    'agentic systems',
    'ai consultancy',
    'operations intelligence',
    'business connective tissue',
    'data fabric',
  ],
  openGraph: {
    title: 'Rheo AI',
    description: 'AI-native infrastructure for businesses that compound.',
    url: 'https://rheoai.co.in',
    siteName: 'Rheo AI',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/images/og-share.jpg', width: 2048, height: 2048, alt: 'Rheo AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rheo AI',
    description: 'AI-native infrastructure for businesses that compound.',
    images: ['/images/og-share.jpg'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23050507'/><text x='50%' y='62%' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='serif' fill='%23C4A25A'>R</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <NeuralAccent />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        <WhatsAppFloat />
        <PilotPopup />
      </body>
    </html>
  )
}
