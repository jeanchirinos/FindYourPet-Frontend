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
  const { session } = props

  // HOOKS
  const { trigger, isMutating } = useLogout()

  const router = useRouter()

  // FUNCTIONS
  function handleLogout() {
    // trigger(
    //   {},
    //   {
    //     onSuccess() {
    //       localStorage.clear()
    //       removeCookie('session')
    //       removeCookie('jwt')
    //       router.replace('/')
    //       router.refresh()
    //       // window.location.href = '/'
    //     },
    //     revalidate: false,
    //     populateCache: true,
    //   },
    // )

    trigger(null, {
      onSuccess() {
        localStorage.clear()
        removeCookie('jwt')
        router.replace('/')
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
        <img
          src={session.image}
          alt='Perfil'
          width={32}
          height={32}
          className='rounded-full'
          loading='eager'
        />
      </PopoverTrigger>
      <PopoverContent className='right-0 flex flex-col border border-neutral-200 bg-white'>
        <Link href={`/perfil/${session.username}`} className='w-full px-4 py-2 text-sm'>
          Perfil
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
