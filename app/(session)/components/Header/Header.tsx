import Image from 'next/image'
import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from 'react'
import Logo from '@/public/img/logo.webp'
import { Button } from '@/components/Button'

export function Header() {
  return (
    <header className='fixed inset-0 z-20 mx-auto flex h-[40px] w-[1600px] max-w-full justify-between px-1.5'>
      <Link href='/' aria-label='Inicio'>
        <Image src={Logo} alt='Logo' width={40} loading='eager' />
      </Link>
      <aside className='flex items-center gap-x-4'>
        <Button className='bg-primary text-white'>Publicar</Button>
        <Suspense>
          <Session />
        </Suspense>
      </aside>
    </header>
  )
}
