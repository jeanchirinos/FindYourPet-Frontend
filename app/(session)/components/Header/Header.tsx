'use client'
import { UserLogged } from './UserLogged'
import { UserNotLogged } from './UserNotLogged'
import Image from 'next/image'
import Logo from '@/public/img/logo.webp'
import { useSessionContext } from '@/context/SessionContext'
import Link from 'next/link'

// MAIN COMPONENT
export function Header() {
  const { session } = useSessionContext()

  return (
    <header className='fixed inset-0 z-20 mx-auto flex h-[40px] w-[1600px] max-w-full justify-between px-1.5'>
      <Link href='/' aria-label='Inicio'>
        <Image src={Logo} alt='Logo' height={40} />
      </Link>
      {session.auth ? <UserLogged session={session} /> : <UserNotLogged />}
    </header>
  )
}
