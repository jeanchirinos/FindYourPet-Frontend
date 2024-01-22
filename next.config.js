const million = require('million/compiler');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.IMAGES_DOMAIN,
      },
    ],
  },
}

module.exports = million.next(
  nextConfig
, { auto: { rsc: true } }
)