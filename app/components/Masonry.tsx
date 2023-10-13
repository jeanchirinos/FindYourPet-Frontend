'use client'

import dynamic from 'next/dynamic'

const Masonry = dynamic(
  //@ts-ignore
  async () => {
    const BaseMasonry = await import('react-responsive-masonry')
    return BaseMasonry
  },
  {
    ssr: false,
  },
)

const ResponsiveMasonry = dynamic(
  //@ts-ignore
  async () => {
    const { ResponsiveMasonry: BaseResponsiveMasonry } = await import('react-responsive-masonry')
    return BaseResponsiveMasonry
  },
  {
    ssr: false,
  },
)

export { Masonry, ResponsiveMasonry }
