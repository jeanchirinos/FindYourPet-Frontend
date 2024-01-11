import '@/styles/globals.css'
import { Providers } from './providers'
import { Metadata } from 'next'
import { getClientTheme } from '@/lib/getClientTheme'
import { twJoin } from 'tailwind-merge'
import { font } from './font'

export const metadata: Metadata = {
  title: {
    template: '%s | Encuentra tu mascota',
    default: 'Encuentra tu mascota',
  },
  description: 'Encuentra y adopta una mascota',
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html
      lang='es'
      className={twJoin(font.className, 'bg-th-fg-1 text-th-txt-1')}
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
