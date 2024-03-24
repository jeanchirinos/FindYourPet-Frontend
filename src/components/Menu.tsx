'use client'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { Fragment, type ComponentProps } from 'react'
import { cnx } from '@/lib/utils'

export function Menu(props: ComponentProps<typeof HeadlessMenu>) {
  return <HeadlessMenu as='div' {...props} className={cnx('relative', props.className)} />
}
export function MenuTrigger(props: ComponentProps<typeof HeadlessMenu.Button>) {
  return <HeadlessMenu.Button {...props} />
}

export function MenuContent(props: ComponentProps<typeof HeadlessMenu.Items>) {
  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-200'
      enterFrom='opacity-0 translate-y-1'
      enterTo='opacity-100 translate-y-0'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 translate-y-1'
    >
      <HeadlessMenu.Items
        {...props}
        className={cnx(
          'absolute mt-1 flex flex-col overflow-hidden rounded-md bg-content1 text-sm shadow-small',
          props.className,
        )}
      >
        {props.children}
      </HeadlessMenu.Items>
    </Transition>
  )
}

export function MenuItem(props: ComponentProps<typeof HeadlessMenu.Item>) {
  return (
    <HeadlessMenu.Item {...props} className={cnx('ui-active:bg-foreground-100', props.className)} />
  )
}
