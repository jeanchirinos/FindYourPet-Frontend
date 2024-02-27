'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ERole, SessionLogged } from '@/models/Auth'
import { SubmitButton } from '@/components/SubmitButton'
import { logout } from '@/controllers/Auth'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown'
// import { Notifications } from './Notifications'

type Props = { session: SessionLogged }

export function UserLogged(props: Props) {
  const { session } = props

  return (
    <div className='flex items-center gap-x-4'>
      {/* <Notifications /> */}
      <Dropdown
        placement='bottom-end'
        shouldBlockScroll={false}
        radius='sm'
        classNames={{
          content: 'p-0 border-small border-divider bg-background min-w-fit',
        }}
      >
        <DropdownTrigger>
          <Image
            src={session.image}
            alt='Perfil'
            width={32}
            height={32}
            className='cursor-pointer rounded-full transition-transform focus-visible:outline-none  focus-visible:outline-primary'
            loading='eager'
            role='button'
            tabIndex={0}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label='Custom item styles'
          disabledKeys={['profile']}
          className='p-1'
          itemClasses={{
            base: [
              'rounded-md',
              'transition-opacity',
              'data-[hover=true]:text-foreground',
              'data-[hover=true]:bg-default-100',
              'dark:data-[hover=true]:bg-default-50',
              'data-[selectable=true]:focus:bg-default-50',
              'data-[pressed=true]:opacity-70',
              'data-[focus-visible=true]:ring-default-500',
            ],
          }}
        >
          <DropdownSection aria-label='Profile & Actions' showDivider>
            <DropdownItem
              isReadOnly
              key='profile'
              className='h-14 gap-2 opacity-100'
              // className="opacity-100"
            >
              <div className='inline-flex flex-col items-start'>
                <span className='text-small text-default-700'>{session.username}</span>
                <span className='text-tiny text-default-600'>{session.email}</span>
              </div>
            </DropdownItem>
            <DropdownItem as={Link} key='posts' href='/publicaciones'>
              Mis publicaciones
            </DropdownItem>
            <DropdownItem as={Link} key='settings' href='/ajustes'>
              Ajustes
            </DropdownItem>
            {session.role === ERole.ADMIN ? (
              <DropdownItem as={Link} href='/administrar/publicaciones'>
                <Link href='/administrar/publicaciones'>Administrar</Link>
              </DropdownItem>
            ) : (
              <></>
            )}
          </DropdownSection>

          <DropdownSection aria-label='Help & Feedback'>
            <DropdownItem closeOnSelect={false} key='logout' isReadOnly className='p-0'>
              <form action={logout}>
                <SubmitButton className='h-fit w-full justify-start rounded-none bg-transparent px-2 py-1.5 text-inherit'>
                  Cerrar sesión
                </SubmitButton>
              </form>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
