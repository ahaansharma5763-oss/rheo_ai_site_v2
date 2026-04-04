import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
