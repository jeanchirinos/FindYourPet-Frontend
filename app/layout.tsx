import '@/styles/globals.css'
import { Livvic } from 'next/font/google'
import { Providers } from './providers'
import { Metadata } from 'next'


const livvic = Livvic({ weight: ['400'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Encuentra tu mascota',
  description: 'Encuentra y adopta una mascota',
  manifest: '/site.webmanifest',
}

//  <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
//   <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
//   <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
//   <link rel='manifest' href='/site.webmanifest' />
//   <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
//   <meta name='msapplication-TileColor' content='#da532c' />
//   <meta name='theme-color' content='#ffffff' />

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <html lang='es' className={livvic.className}>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  )
}