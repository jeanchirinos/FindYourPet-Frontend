import Image from 'next/image'
import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from 'react'
import Logo from '@/public/img/logo.webp'
import { PublishButton } from './PublishButton'

export function Header() {
  return (
    <header className='fixed inset-0 z-20 mx-auto flex h-[40px] w-[1600px] max-w-full justify-between bg-white/70 px-1.5 backdrop-blur-md'>
      <Link href='/' aria-label='Inicio'>
        <Image src={Logo} alt='Logo' width={40} loading='eager' priority />
      </Link>
      <aside className='flex items-center gap-x-4'>
        <PublishButton />
        <Suspense>
          <Session />
        </Suspense>
      </aside>
    </header>
  )
}
