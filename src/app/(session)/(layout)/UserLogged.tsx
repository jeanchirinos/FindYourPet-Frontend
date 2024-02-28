import Link from 'next/link'
import Image from 'next/image'
import { ERole, SessionLogged } from '@/models/Auth'
import { SubmitButton } from '@/components/SubmitButton'
import { logout } from '@/controllers/Auth'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/Menu'
// import { Notifications } from './Notifications'

type Props = { session: SessionLogged }

export function UserLogged(props: Props) {
  const { session } = props

  return (
    <div className='flex items-center gap-x-4'>
      {/* <Notifications /> */}
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
        <MenuContent className='right-0'>
          <div className='flex flex-col border-b border-content2 px-4 py-2'>
            <span className='font-semibold'>{session.username}</span>
            <span className='text-xs'>{session.email}</span>
          </div>
          <div className='flex flex-col any-*-[a]:w-full any-*-[a]:px-4 any-*-[a]:py-2'>
            <MenuItem>
              <Link href='/publicaciones'>Mis publicaciones</Link>
            </MenuItem>
            <MenuItem>
              <Link href='/ajustes'>Ajustes</Link>
            </MenuItem>

            {session.role === ERole.ADMIN && (
              <MenuItem>
                <Link href='/administrar/publicaciones'>Administrar</Link>
              </MenuItem>
            )}

            <form action={logout}>
              <SubmitButton className='w-full justify-start rounded-none bg-transparent text-inherit hover:bg-foreground-100'>
                Cerrar sesión
              </SubmitButton>
            </form>
          </div>
        </MenuContent>
      </Menu>
    </div>
  )
}
