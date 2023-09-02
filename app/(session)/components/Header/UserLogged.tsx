'use client'
import Image from 'next/image'
import { SessionLogged as UserLoggedType } from '@/types'
import { useLogout } from '@/services/auth'
// import { Button, Link } from '@nextui-org/react'
import { Button } from '@nextui-org/react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/Popover'
import { ERole } from '@/enums'
import { removeCookie } from 'typescript-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { useSessionContext } from '@/context/SessionContext'

export function UserLogged(props: { session: UserLoggedType }) {
  // export function UserLogged() {
  const { session } = props
  // const {session} = useSessionContext()

  // HOOKS
  const { trigger, isMutating } = useLogout()

  const router = useRouter()

  // FUNCTIONS
  function handleLogout() {
    trigger(
      {},
      {
        onSuccess() {
          localStorage.clear()
          removeCookie('session')
          removeCookie('jwt')
          router.replace('/')
          router.refresh()
          // window.location.href = '/'
        },
        revalidate: false,
        populateCache: true,
      },
    )
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
        <Link href='/perfil' className='w-full px-4 py-2 text-sm'>
          Perfil
        </Link>
        {session.role === ERole.ADMIN && (
          <Link href='/administrar' className='w-full px-4 py-2 text-sm'>
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
