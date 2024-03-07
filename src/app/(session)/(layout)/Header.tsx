import Link from 'next/link'
import { Session } from './Session'
import { Suspense } from '@/components/other/CustomSuspense'
import Logo from '@/public/img/logo.svg'
import { PublishButton } from './PublishButton'
import { HeaderLink } from './HeaderLink'
import { Skeleton } from '@nextui-org/skeleton'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { MobileMenu } from './MobileMenu'
import { links } from './links'
import { ROUTE } from '@/routes'

export function Header() {
  return (
    <header id='header-nav' className='sticky inset-0 top-0 z-50 h-header'>
      <div className='mx-auto flex w-[1600px] max-w-full justify-between px-2'>
        <aside className='flex'>
          <div className='flex items-center gap-x-0.5'>
            <MobileMenu />
            <Link href={ROUTE.PETS.INDEX} aria-label='Inicio'>
              <Logo width={40} />
            </Link>
          </div>
          <div className='flex *:flex *:items-center *:px-3 max-md:hidden'>
            {links.map(link => (
              <HeaderLink key={link.href} href={link.href}>
                {link.text}
              </HeaderLink>
            ))}
          </div>
        </aside>
        <aside className='flex items-center gap-x-4'>
          <ThemeSwitcher />
          <PublishButton />
          <Suspense fallback={<Skeleton className='size-8 rounded-full' />}>
            <Session />
          </Suspense>
        </aside>
      </div>
    </header>
  )
}
