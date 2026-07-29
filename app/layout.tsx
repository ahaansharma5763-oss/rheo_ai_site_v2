import type { Metadata } from 'next'
import './globals.css'
import WhatsAppFloat from '@/components/shared/WhatsAppFloat'
import PilotPopup from '@/components/shared/PilotPopup'

export const metadata: Metadata = {
  metadataBase: new URL('https://rheoai.co.in'),
  title: 'Rheo AI · Answers in seconds. Forgets nothing.',
  description:
    'You don’t have a lead problem. You have a follow-up problem. Every enquiry answered in under a minute, followed up five times, and booked into your calendar, with one screen showing every lead in your business.',
  keywords: [
    'lead follow-up system',
    'missed enquiries',
    'lead management',
    'booking automation',
    'customer follow-up',
    'revenue leak',
    'india',
  ],
  openGraph: {
    title: 'Rheo AI · Answers in seconds. Forgets nothing.',
    description:
      'You don’t have a lead problem. You have a follow-up problem. We built the system that runs the follow-up.',
    url: 'https://rheoai.co.in',
    siteName: 'Rheo AI',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/og-share.jpg', width: 2048, height: 2048, alt: 'Rheo AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rheo AI · Answers in seconds. Forgets nothing.',
    description:
      'You don’t have a lead problem. You have a follow-up problem. We built the system that runs the follow-up.',
    images: ['/og-share.jpg'],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23050507'/><text x='50%' y='62%' dominant-baseline='middle' text-anchor='middle' font-size='18' font-family='serif' fill='%23C4A25A'>R</text></svg>",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          id="vtag-ai-js"
          async
          src="https://r2.leadsy.ai/tag.js"
          data-pid="POCQAT99HOcHG9cm"
          data-version="062024"
        />
      </head>
      <body>
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
        <WhatsAppFloat />
        <PilotPopup />
      </body>
    </html>
  )
}
