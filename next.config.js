const imagesDomains = process.env.NEXT_PUBLIC_IMAGES_DOMAINS?.split(',')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: imagesDomains,
  },
}

module.exports = nextConfig
