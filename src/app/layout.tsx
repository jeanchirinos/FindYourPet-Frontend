import '@/styles/globals.css'
import { Providers } from './providers'
import { Metadata } from 'next'
import { font } from './font'

export const metadata: Metadata = {
  title: {
    template: '%s | Encuentra tu mascota',
    default: 'Encuentra tu mascota',
  },
  description: 'Encuentra y adopta una mascota',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  openGraph: {
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang='es' className='bg-th-fg-1 text-th-txt-1' suppressHydrationWarning>
      <body className={font.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}