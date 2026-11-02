import type { Metadata } from 'next'

// The pages live in public/site (generated, see README). This layout only frames the 404.
export const metadata: Metadata = {
  metadataBase: new URL('https://rheoai.co.in'),
  title: 'Rheo AI',
  icons: { icon: '/site/logo96.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#050E1D', color: '#F4EDDF', fontFamily: 'system-ui, sans-serif' }}>{children}</body>
    </html>
  )
}
