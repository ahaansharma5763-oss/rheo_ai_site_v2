/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/ava', destination: '/sales-engineer', permanent: true },
      { source: '/pulse', destination: '/kai', permanent: true },
      { source: '/okeanos', destination: '/kai', permanent: true },
      { source: '/revival-sprint', destination: '/nami', permanent: true },
    ]
  },
}
module.exports = nextConfig
