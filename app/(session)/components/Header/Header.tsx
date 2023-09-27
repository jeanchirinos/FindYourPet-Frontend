import Image from 'next/image'
import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from 'react'

export function Header() {
  return (
    <header className='fixed inset-0 z-20 mx-auto flex h-[40px] w-[1600px] max-w-full justify-between px-1.5'>
      <Link href='/' aria-label='Inicio'>
        <Image src='/img/logo.webp' alt='Logo' height={40} width={40} loading='eager' />
      </Link>
      <Suspense>
        <Session />
      </Suspense>
    </header>
  )
}
