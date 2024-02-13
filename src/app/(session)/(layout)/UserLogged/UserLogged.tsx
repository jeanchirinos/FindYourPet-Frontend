'use client'
import Link from 'next/link'
import Image from 'next/image'
import { LogoutForm } from './logout-form'
import { ERole, SessionLogged } from '@/models/Auth'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

type Props = { session: SessionLogged }

export function UserLogged(props: Props) {
  const { session } = props

  // RENDER
  return (
    <Menu as='div' className='relative'>
      <Menu.Button className='flex items-center'>
        <Image
          src={session.image}
          alt='Perfil'
          width={32}
          height={32}
          className='rounded-full'
          loading='eager'
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-1 flex flex-col overflow-hidden rounded-md bg-content1 shadow-small'>
          <div className='flex flex-col border-b border-content2 px-4 py-2'>
            <span className='text-sm font-semibold'>{session.username}</span>
            <span className='text-xs'>{session.email}</span>
          </div>
          <div className='flex flex-col hover:*:bg-foreground-100'>
            <Menu.Item>
              <Link href={`/perfil/${session.username}`} className='w-full px-4 py-2 text-sm'>
                Perfil
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link href='/ajustes' className='w-full px-4 py-2 text-sm'>
                Ajustes
              </Link>
            </Menu.Item>

            {session.role === ERole.ADMIN && (
              <Menu.Item>
                <Link href='#' className='w-full px-4 py-2 text-sm'>
                  Administrar
                </Link>
              </Menu.Item>
            )}
            <LogoutForm />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
