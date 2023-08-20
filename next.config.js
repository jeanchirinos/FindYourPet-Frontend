/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_BACKEND_DOMAIN_STORAGE, 'opulent-trout-469j6p94g6x2qgr4-3001.app.github.dev'],
  },
}

module.exports = nextConfig

