import Image from 'next/image'
import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from 'react'
import Logo from '@/public/img/logo.svg'
import { PublishButton } from './PublishButton'
import { HeaderLink } from './HeaderLink'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export function Header() {
  return (
    <header className='bg-th-a/70 fixed inset-0 z-20 mx-auto h-[40px] max-w-full px-1.5 backdrop-blur-md'>
      <div className='mx-auto flex w-[1600px] max-w-full justify-between'>
        <aside className='flex'>
          <Link href='/' aria-label='Inicio'>
            <Image src={Logo} alt='Logo' width={40} priority />
          </Link>
          <div className='flex  child:flex child:items-center child:px-3 '>
            <HeaderLink href='/' className=''>
              Mascotas
            </HeaderLink>
            <HeaderLink href='/planes'>Planes</HeaderLink>
            <HeaderLink href='/casos_de_exito'>Casos de éxito</HeaderLink>
          </div>
        </aside>
        <aside className='flex items-center gap-x-4'>
          <ThemeSwitcher />
          <PublishButton />
          <Suspense>
            <Session />
          </Suspense>
        </aside>
      </div>
    </header>
  )
}
