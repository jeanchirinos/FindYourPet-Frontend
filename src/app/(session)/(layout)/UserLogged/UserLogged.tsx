import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import Link from 'next/link'
import Image from 'next/image'
import { LogoutForm } from './logout-form'
import { ERole, SessionLogged } from '@/models/Auth'

type Props = { session: SessionLogged }

export function UserLogged(props: Props) {
  const { session } = props

  // RENDER
  return (
    <Popover>
      <PopoverTrigger className='flex items-center'>
        <Image
          src={session.image}
          alt='Perfil'
          width={32}
          height={32}
          className='rounded-full'
          loading='eager'
        />
      </PopoverTrigger>
      <PopoverContent className='right-0 flex flex-col border border-th-fg-2 bg-th-fg-1 '>
        <div className='flex flex-col border-b border-th-fg-2 px-4 py-2'>
          <span className='text-sm font-semibold'>{session.username}</span>
          <span className='text-xs'>{session.email}</span>
        </div>
        <div className='flex flex-col hover:*:bg-foreground-100'>
          <Link href={`/perfil/${session.username}`} className='w-full px-4 py-2 text-sm'>
            Perfil
          </Link>
          <Link href='/ajustes' className='w-full px-4 py-2 text-sm'>
            Ajustes
          </Link>
          {session.role === ERole.ADMIN && (
            <Link href='#' className='w-full px-4 py-2 text-sm'>
              Administrar
            </Link>
          )}
          <LogoutForm />
        </div>
      </PopoverContent>
    </Popover>
  )
}
