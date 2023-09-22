import Image from 'next/image'
import Logo from '@/public/img/logo.webp'
import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from 'react'
// import { ServerAuth } from '@/components/ServerAuth'

// MAIN COMPONENT
export function Header() {
  return (
    <header className='fixed inset-0 z-20 mx-auto flex h-[40px] w-[1600px] max-w-full justify-between px-1.5'>
      <Link href='/' aria-label='Inicio'>
        <Image src={Logo} alt='Logo' height={40} loading='eager' />
      </Link>
      {/* <ServerAuth>{session => <Session session={session} />}</ServerAuth> */}
      <Suspense>
        <Session />
      </Suspense>
    </header>
  )
}
