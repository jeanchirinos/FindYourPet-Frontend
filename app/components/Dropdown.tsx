'use client'

// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'

// export default function App() {
//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         <Button variant='bordered'>Open Menu</Button>
//       </DropdownTrigger>
//       <DropdownMenu aria-label='Static Actions'>
//         <DropdownItem key='new'>New file</DropdownItem>
//         <DropdownItem key='copy'>Copy link</DropdownItem>
//         <DropdownItem key='edit'>Edit file</DropdownItem>
//         <DropdownItem key='delete' className='text-danger' color='danger'>
//           Delete file
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   )
// }

// import {
//   Dropdown as BaseDropdown,
//   DropdownTrigger as BaseDropdownTrigger,
//   DropdownMenu as BaseDropdownMenu,
//   DropdownItem,
// } from '@nextui-org/react'
import {
  Dropdown as BaseDropdown,
  DropdownTrigger as BaseDropdownTrigger,
  DropdownMenu as BaseDropdownMenu,
  DropdownItem,
  // DropdownItem as BaseDropdownItem,
} from '@headlessui/react'
import { Children } from 'react'

// export function DropdownItem(props: React.ComponentProps<typeof BaseDropdownItem>) {
//   return <BaseDropdownItem {...props}>{props.children}</BaseDropdownItem>
// }

import { Menu, Transition } from '@headlessui/react'

export function Dropdown(props: React.ComponentProps<typeof BaseDropdown>) {
  return (
    <BaseDropdown aria-label='Menú' {...props}>
      {props.children}
    </BaseDropdown>
  )
}

export function DropdownTrigger(props: React.ComponentProps<typeof BaseDropdownTrigger>) {
  return (
    <BaseDropdownTrigger {...props} aria-label=''>
      {/* <button>{props.children}</button> */}
      {props.children}
    </BaseDropdownTrigger>
  )
}

export function DropdownMenu(props: React.ComponentProps<typeof BaseDropdownMenu>) {
  return (
    <BaseDropdownMenu {...props} aria-label='Menú'>
      {Children.map(props.children, (child, index) => {
        return (
          <DropdownItem key={index} aria-label='Opción' className='p-0'>
            {/* @ts-ignore */}
            {child}
          </DropdownItem>
        )
      })}
      {/* {props.children} */}
    </BaseDropdownMenu>
  )
}
// import { Fragment, useEffect, useRef, useState } from 'react'
// import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function Example() {
  return (
    <div className='w-56 text-right'>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
            Options
            <ChevronDownIcon
              className='-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='px-1 py-1 '>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                    ) : (
                      <EditInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                    )}
                    Edit
                  </button>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DuplicateActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <DuplicateInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Duplicate
                  </button>
                )}
              </Menu.Item> */}
            </div>
            {/* <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ArchiveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArchiveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Archive
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <MoveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Move
                  </button>
                )}
              </Menu.Item>
            </div> */}
            {/* <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div> */}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
