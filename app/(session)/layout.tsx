import { SessionContext } from '@/context/SessionContext'
import { SessionLogged } from '@/types'
import { cookies } from 'next/headers'
// import '@/styles/globals.css'
// import dynamic from 'next/dynamic'
// import { Livvic } from 'next/font/google'
// import { Metadata } from 'next'
import { Header } from '@/components/Header/Header'
import NextTopLoader from 'nextjs-toploader'

// const DynamicToaster = dynamic(() => import('react-hot-toast').then(module => module.Toaster), {
//   ssr: false,
// })

// export const metadata: Metadata = {
//   title: 'Encuentra tu mascota',
//   description: 'Encuentra y adopta una mascota',
//   manifest: '/site.webmanifest',
// }

//  <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
//   <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
//   <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
//   <link rel='manifest' href='/site.webmanifest' />
//   <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
//   <meta name='msapplication-TileColor' content='#da532c' />
//   <meta name='theme-color' content='#ffffff' />

export default function RootLayout(props: React.PropsWithChildren) {
  const cookieSession = cookies().get('session')?.value

  const session = cookieSession
    ? (JSON.parse(cookieSession) as SessionLogged)
    : ({ auth: false } as const)

  return (
    // <html lang='es' className={livvic.className}>
    // <body className='py-10'>
    <>
      <NextTopLoader color='#FF813F' height={1.5} showSpinner={false} />
      <SessionContext session={session}>
        {/* <Providers> */}
        <Header />
        {props.children}
        {/* </Providers> */}
      </SessionContext>
    </>

    // </html>
  )
}
