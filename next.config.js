const million = require('million/compiler')
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.IMAGES_DOMAIN,
      },
    ],
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        // Remove issuer since it causes errors
        resourceQuery: { not: /url/ },
        use: ['@svgr/webpack'],
      },
    )
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = million.next(nextConfig, { auto: { rsc: true }, mute: true })
