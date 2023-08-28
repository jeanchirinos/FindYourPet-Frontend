import { Menu as BaseMenu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

export function Menu(props: React.ComponentProps<typeof BaseMenu>) {
  return (
    <BaseMenu as='div' className='relative'>
      {props.children}
    </BaseMenu>
  )
}

export function MenuButton(props: React.ComponentProps<typeof BaseMenu.Button>) {
  return <BaseMenu.Button>{props.children}</BaseMenu.Button>
}

export function MenuItems(props: React.ComponentProps<typeof BaseMenu.Items>) {
  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <BaseMenu.Items className={twMerge('absolute', props.className)}>
        {props.children}
      </BaseMenu.Items>
    </Transition>
  )
}

export function MenuItem(props: React.ComponentProps<typeof BaseMenu.Item>) {
  return <BaseMenu.Item>{props.children}</BaseMenu.Item>
}
