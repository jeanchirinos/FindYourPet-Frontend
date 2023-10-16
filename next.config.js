/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMAGES_DOMAIN],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
