import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Providers } from './providers'
import { font } from './font'

export const metadata: Metadata = {
  title: {
    // template: '%s | Encuentra tu mascota',
    // default: 'Encuentra tu mascota',
    template: '%s | Petcontrado',
    default: 'Petcontrado',
  },
  description: 'Encuentra, adopta o reporta una mascota.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  openGraph: {
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
}

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={font.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}
