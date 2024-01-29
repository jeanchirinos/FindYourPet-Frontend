import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from '@/components/other/CustomSuspense'
import Logo from '@/public/img/logo.svg'
import { PublishButton } from './PublishButton'
import { HeaderLink } from './HeaderLink'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export function Header() {
  return (
    <header className='fixed inset-0 z-20 h-header w-screen bg-th-a/70 backdrop-blur-md'>
      <div className='mx-auto flex w-[1600px] max-w-full justify-between px-1.5'>
        <aside className='flex'>
          <Link href='/' aria-label='Inicio'>
            <Logo width={40} />
          </Link>
          <div className='flex *:flex *:items-center *:px-3 max-md:hidden'>
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
