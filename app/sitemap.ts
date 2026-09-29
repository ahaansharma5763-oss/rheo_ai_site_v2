import type { MetadataRoute } from 'next'

const BASE = 'https://rheoai.co.in'

/* The live routes only. Redirected and dark routes (/kai, /nami, /pilot,
 * /managed-outbound and the rest in next.config.ts) stay out. */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/outbound', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/what-we-build', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/work', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return ROUTES.map(r => ({
    url: `${BASE}${r.path === '/' ? '' : r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
