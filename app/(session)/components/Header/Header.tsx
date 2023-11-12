import Image from 'next/image'
import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from 'react'
import Logo from '@/public/img/logo.svg'
import { PublishButton } from './PublishButton'
import { HeaderLink } from './HeaderLink'

export function Header() {
  return (
    <header className='fixed inset-0 z-20 mx-auto flex h-[40px] w-[1600px] max-w-full justify-between bg-white/70 px-1.5 backdrop-blur-md'>
      <aside className='flex'>
        <Link href='/' aria-label='Inicio'>
          <Image src={Logo} alt='Logo' width={40} priority />
        </Link>
        <div className='flex text-neutral-500 child:flex child:items-center child:px-3 '>
          <HeaderLink href='/' className=''>
            Mascotas
          </HeaderLink>
          <HeaderLink href='/planes'>Planes</HeaderLink>
          <HeaderLink href='/casos_de_exito'>Casos de éxito</HeaderLink>
        </div>
      </aside>
      <aside className='flex items-center gap-x-4'>
        <PublishButton />
        <Suspense>
          <Session />
        </Suspense>
      </aside>
    </header>
  )
}
