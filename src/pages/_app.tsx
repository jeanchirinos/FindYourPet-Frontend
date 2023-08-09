import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { NextUIProvider } from '@nextui-org/system'
import { Livvic } from 'next/font/google'

const DynamicToaster = dynamic(() => import('react-hot-toast').then(module => module.Toaster), {
  ssr: false,
})

const livvic = Livvic({ weight: ['400'], subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Encuentra tu mascota</title>
        <meta name='description' content='Encuentra y adopta una mascota' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <NextUIProvider>
        <div className={livvic.className}>
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
      <DynamicToaster />
    </>
  )
}
