import '@/styles/globals.css'
import { Josefin_Sans } from 'next/font/google'
import { Providers } from './providers'
import { Metadata, Viewport } from 'next'
import { getClientTheme } from '@/lib/getClientTheme'
import { twJoin } from 'tailwind-merge'

const livvic = Josefin_Sans({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Encuentra tu mascota',
  description: 'Encuentra y adopta una mascota',
  other: {
    'msapplication-TileColor': '#FFFFFF',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html
      lang='es'
      className={twJoin(livvic.className, 'bg-th-fg-1 text-th-txt-1')}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: getClientTheme }} />
      </head>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
