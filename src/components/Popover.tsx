'use client'
import { Popover as HeadlessPopover, Transition } from '@headlessui/react'
import { Fragment, type ComponentProps } from 'react'
import { cnx } from '@/lib/utils'

export function Popover(props: ComponentProps<typeof HeadlessPopover>) {
  return <HeadlessPopover {...props} className={cnx('relative', props.className)} />
}

export function PopoverTrigger(props: ComponentProps<typeof HeadlessPopover.Button>) {
  return <HeadlessPopover.Button {...props} />
}

export function PopoverContent(props: ComponentProps<typeof HeadlessPopover.Panel>) {
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
      <HeadlessPopover.Panel
        {...props}
        className={cnx('absolute mt-1 rounded-md', props.className)}
      >
        {props.children}
      </HeadlessPopover.Panel>
    </Transition>
  )
}
