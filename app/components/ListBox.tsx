import { Listbox as HeadlessListBox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

export function ListBox(props: React.ComponentProps<typeof HeadlessListBox>) {
  const { children, ...componentProps } = props

  return (
    // @ts-ignore
    <HeadlessListBox {...componentProps}>
      {/* <div className='relative'>{children}</div> */}
    </HeadlessListBox>
  )
}

export function ListBoxButton(props: React.ComponentProps<typeof HeadlessListBox.Button>) {
  const { children, className, ...componentProps } = props

  return (
    <HeadlessListBox.Button
      {...componentProps}
      className={twMerge('relative flex items-center px-2', className)}
    >
      {props.children}
    </HeadlessListBox.Button>
  )
}

export function ListBoxOptions(props: React.ComponentProps<typeof HeadlessListBox.Options>) {
  const { children, className, ...componentProps } = props

  return (
    <Transition
      as={Fragment}
      leave='transition ease-in duration-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <HeadlessListBox.Options
        {...componentProps}
        className={twMerge('relative flex items-center px-2', className)}
      >
        {props.children}
      </HeadlessListBox.Options>
    </Transition>
  )
}
