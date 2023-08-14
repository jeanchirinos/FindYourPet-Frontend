import Image from 'next/image'
import { SessionLogged as UserLoggedType } from '@/types'
import { useLogout } from '@/services/auth'
import { Button, Link } from '@nextui-org/react'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover'

export function UserLogged(props: { session: UserLoggedType }) {
  // HOOKS
  const { trigger, isMutating } = useLogout()

  // FUNCTIONS
  function handleLogout() {
    trigger(
      {},
      {
        revalidate: false,
        populateCache: true,
      },
    )
  }

  // RENDER
  return (
    <Popover placement='bottom-end'>
      <PopoverTrigger>
        <Image
          src={props.session.image}
          alt='Perfil'
          width={32}
          height={32}
          className='rounded-full'
          loading='eager'
        />
      </PopoverTrigger>
      <PopoverContent className='w-40'>
        <Link href='#' className='w-full p-2 text-sm'>
          Perfil
        </Link>
        <Button
          onPress={handleLogout}
          className='w-full justify-start bg-transparent px-2 py-0 text-sm'
          isLoading={isMutating}
        >
          Cerrar sesión
        </Button>
      </PopoverContent>
    </Popover>
  )
}
