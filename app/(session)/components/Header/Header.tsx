// 'use client'
// import { UserLogged } from './UserLogged'
// import { UserNotLogged } from './UserNotLogged'
import Image from 'next/image'
import Logo from '@/public/img/logo.webp'
// import { SessionContext } from '@/context/SessionContext'
import Link from 'next/link'
import { Session } from './Session'
import { cookies } from 'next/headers'
import { Session as SessionType } from '@/types'
import { getSession } from '@/services/session'
// import { cookies } from 'next/headers'
// import { SessionLogged } from '@/types'

// MAIN COMPONENT
export async function Header() {
  // const cookieSession = cookies().get('session')?.value
  // const cookieSession2 = cookies().get('jwt')?.value
  // console.log({ cookieSession2 })
  // Store session cookie?

  // const session = cookieSession
  //   ? (JSON.parse(cookieSession) as SessionLogged)
  //   : ({ auth: false } as const)

  const authCookie = cookies().get('jwt')?.value

  let session: SessionType

  if (authCookie) {
    session = await getSession(authCookie)
  } else {
    session = { auth: false } as const
  }

  return (
    <header className='fixed inset-0 z-20 mx-auto flex h-[40px] w-[1600px] max-w-full justify-between px-1.5'>
      <Link href='/' aria-label='Inicio'>
        <Image src={Logo} alt='Logo' height={40} loading='eager' />
      </Link>
      <Session session={session} />
    </header>
  )
}
