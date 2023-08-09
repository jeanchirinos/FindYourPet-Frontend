import Link from 'next/link'
import Image from 'next/image'
import { SessionLogged as UserLoggedType } from '@/types'
import { useLogout } from '@/services/auth'
import { Popover, PopoverButton, PopoverContent } from '@/components/Popover'

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
    <Popover>
      <PopoverButton>
        <Image
          src={props.session.image}
          alt='Perfil'
          width={32}
          height={32}
          className='rounded-full'
          loading='eager'
        />
      </PopoverButton>
      <PopoverContent className='right-0 flex flex-col border border-neutral-200'>
        <Link href='#' className='px-4 py-1'>
          Perfil
        </Link>
        <button className='w-max px-4 py-1' onClick={handleLogout} disabled={isMutating}>
          {isMutating ? 'Cerrando Sesión' : 'Cerrar sesión'}
        </button>
      </PopoverContent>
    </Popover>
  )
}
