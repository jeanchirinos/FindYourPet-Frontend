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

import {
  Dropdown as BaseDropdown,
  DropdownTrigger as BaseDropdownTrigger,
  DropdownMenu as BaseDropdownMenu,
  DropdownItem,
  // DropdownItem as BaseDropdownItem,
} from '@nextui-org/react'
import { Children } from 'react'

export function Dropdown(props: React.ComponentProps<typeof BaseDropdown>) {
  return (
    <BaseDropdown aria-label='Menú' closeOnSelect={false} shouldBlockScroll={false} {...props}>
      {props.children}
    </BaseDropdown>
  )
}

export function DropdownTrigger(props: React.ComponentProps<typeof BaseDropdownTrigger>) {
  return (
    <BaseDropdownTrigger {...props} aria-label='Aas'>
      <button>{props.children}</button>
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

// export function DropdownItem(props: React.ComponentProps<typeof BaseDropdownItem>) {
//   return <BaseDropdownItem {...props}>{props.children}</BaseDropdownItem>
// }
