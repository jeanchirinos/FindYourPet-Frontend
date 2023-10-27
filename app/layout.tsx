import '@/styles/globals.css'
import { Livvic } from 'next/font/google'
import { Providers } from './providers'
import { Metadata, Viewport } from 'next'
import { getClientTheme } from '@/lib/getClientTheme'

const livvic = Livvic({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Encuentra tu mascota',
  description: 'Encuentra y adopta una mascota',
  other: {
    'msapplication-TileColor': '#FFFFFF',
  },
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : new URL(`http://localhost:${process.env.PORT ?? 3000}`),
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang='es' className={livvic.className}>
      <head>{/* <script dangerouslySetInnerHTML={{ __html: getClientTheme }} /> */}</head>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
