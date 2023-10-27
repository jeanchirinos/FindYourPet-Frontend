import { SessionLogged } from '@/types'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import { ERole } from '@/enums'
import Link from 'next/link'
import Image from 'next/image'
import { LogoutForm } from './logout-form'

export function UserLogged(props: { session: SessionLogged }) {
  const { session } = props

  // RENDER
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          src={session.image}
          alt='Perfil'
          width={32}
          height={32}
          className='rounded-full'
          loading='eager'
        />
      </PopoverTrigger>
      <PopoverContent className='right-0 flex flex-col border border-neutral-200 bg-white'>
        <div className='flex flex-col border-b border-neutral-100 px-4 py-2'>
          <span className='text-sm font-semibold'>{session.username}</span>
          <span className='text-xs'>{session.email}</span>
        </div>
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
      </PopoverContent>
    </Popover>
  )
}
