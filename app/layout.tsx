import '@/styles/globals.css'
import { Providers } from './providers'
import { Metadata } from 'next'
import { twJoin } from 'tailwind-merge'
import { font } from './font'

export const metadata: Metadata = {
  title: {
    template: '%s | Encuentra tu mascota',
    default: 'Encuentra tu mascota',
  },
  description: 'Encuentra y adopta una mascota',
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html
      lang='es'
      className={twJoin(font.className, 'bg-th-fg-1 text-th-txt-1')}
      suppressHydrationWarning
    >
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
