import Link from 'next/link'
import Image from 'next/image'
import { SessionLogged } from '@/models/Auth'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/Menu'
import { SubmitButton } from '@/components/SubmitButton'
import { logout } from '@/controllers/Auth'

type Props = { session: SessionLogged }

export function UserLogged(props: Props) {
  const { session } = props

  // RENDER
  return (
    <Menu>
      <MenuTrigger className='flex items-center'>
        <Image
          src={session.image}
          alt='Perfil'
          width={32}
          height={32}
          className='rounded-full'
          loading='eager'
        />
      </MenuTrigger>
      <MenuContent className='right-0 flex flex-col overflow-hidden rounded-md bg-content1 shadow-small'>
        <div className='flex flex-col border-b border-content2 px-4 py-2'>
          <span className='text-sm font-semibold'>{session.username}</span>
          <span className='text-xs'>{session.email}</span>
        </div>
        <div className='flex flex-col ui-active:*:bg-foreground-100'>
          <MenuItem>
            <Link href='/ajustes' className='w-full px-4 py-2 text-sm'>
              Ajustes
            </Link>
          </MenuItem>

          {/* {session.role === ERole.ADMIN && (
            <MenuItem>
              <Link href='#' className='w-full px-4 py-2 text-sm'>
                Administrar
              </Link>
            </MenuItem>
          )} */}

          <form action={logout}>
            <SubmitButton className='w-full justify-start rounded-none bg-transparent px-4 py-0 text-sm text-inherit hover:bg-foreground-100'>
              Cerrar sesión
            </SubmitButton>
          </form>
        </div>
      </MenuContent>
    </Menu>
  )
}
