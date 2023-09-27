'use client'
import { SessionLogged } from '@/types'
import { useLogout } from '@/services/auth'
import { Button } from '@nextui-org/react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import { ERole } from '@/enums'
import { removeCookie } from 'typescript-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function UserLogged(props: { session: SessionLogged }) {
  const { session } = props

  // HOOKS
  const { trigger, isMutating } = useLogout()

  const router = useRouter()

  // FUNCTIONS
  function handleLogout() {
    trigger(null, {
      onSuccess() {
        localStorage.clear()
        removeCookie('jwt')
        // router.replace('/')
        router.refresh()
        // window.location.href = '/'
      },
      revalidate: false,
    })
  }

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
          {session.name && <span className='text-sm font-semibold'>{session.name}</span>}
          <span className='text-xs'>{session.email}</span>
        </div>
        <Link href={`/perfil/${session.username}`} className='w-full px-4 py-2 text-sm'>
          Perfil
        </Link>
        <Link href='/ajustes' className='w-full px-4 py-2 text-sm'>
          Ajustes
        </Link>
        {session.role === ERole.ADMIN && (
          <Link href='/crud/especies' className='w-full px-4 py-2 text-sm'>
            Administrar
          </Link>
        )}
        <Button
          onPress={handleLogout}
          className='w-full justify-start bg-transparent px-4 py-0 text-sm'
          isLoading={isMutating}
        >
          Cerrar sesión
        </Button>
      </PopoverContent>
    </Popover>
  )
}
