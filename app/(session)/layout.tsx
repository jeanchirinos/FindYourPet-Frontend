import { SessionContext } from '@/context/SessionContext'
import { SessionLogged } from '@/types'
import { cookies } from 'next/headers'
import { Header } from 'app/(session)/components/Header/Header'
import NextTopLoader from 'nextjs-toploader'

export default function RootLayout(props: React.PropsWithChildren) {
  const cookieSession = cookies().get('session')?.value
  // const cookieSession2 = cookies().get('jwt')?.value
  // console.log({ cookieSession2 })
  // Store session cookie?

  const session = cookieSession
    ? (JSON.parse(cookieSession) as SessionLogged)
    : ({ auth: false } as const)

  return (
    <>
      <NextTopLoader color='#FF813F' height={1.5} showSpinner={false} />
      <SessionContext session={session}>
        {/* <div className='fixed z-50'>
          <p>{cookieSession}</p>
          <p className='text-red-500'>{cookieSession2}</p>
        </div> */}
        <Header />
        {props.children}
      </SessionContext>
    </>
  )
}
