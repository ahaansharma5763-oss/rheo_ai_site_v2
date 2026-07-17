/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/ava', destination: '/sales-engineer', permanent: true },
      { source: '/pulse', destination: '/okeanos', permanent: true },
    ]
  },
}
module.exports = nextConfig
