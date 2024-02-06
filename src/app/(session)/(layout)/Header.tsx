import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from '@/components/other/CustomSuspense'
import Logo from '@/public/img/logo.svg'
import { PublishButton } from './PublishButton'
import { HeaderLink } from './HeaderLink'
import { Skeleton } from '@nextui-org/react'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export function Header() {
  return (
    <header className='sticky inset-0 top-0 z-50 h-header bg-th-a/70 backdrop-blur-md'>
      <div className='mx-auto flex w-[1600px] max-w-full justify-between px-2'>
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
          <Suspense fallback={<Skeleton className='size-[32px] rounded-full' />}>
            <Session />
          </Suspense>
        </aside>
      </div>
    </header>
  )
}
