import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const DynamicToaster = dynamic(() => import('react-hot-toast').then(module => module.Toaster), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Encuentra tu mascota</title>
      </Head>
      <Component {...pageProps} />
      <DynamicToaster />
    </>
  )
}
