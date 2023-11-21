import '@/styles/globals.css'
import { Josefin_Sans } from 'next/font/google'
import { Providers } from './providers'
import { Metadata, Viewport } from 'next'
import NextTopLoader from 'nextjs-toploader'
import { getClientTheme } from '@/lib/getClientTheme'
import { twJoin } from 'tailwind-merge'

const livvic = Josefin_Sans({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Binarial App',
  description: 'La primera plataforma de inversiones inmobiliarias del Perú con alta rentabilidad',
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
    <html lang='es' className={twJoin(livvic.className, 'bg-th-fg-1 text-th-txt-1')}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: getClientTheme }} />
      </head>
      <body>
        <NextTopLoader color='#FF813F' height={1.5} showSpinner={false} />
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
