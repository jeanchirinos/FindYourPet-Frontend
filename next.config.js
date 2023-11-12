/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: process.env.IMAGES_DOMAIN,
      },
    ],
  },
  experimental: {
    // typedRoutes: true,
  },
}

module.exports = nextConfig
