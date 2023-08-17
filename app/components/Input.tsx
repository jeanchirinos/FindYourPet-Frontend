'use client'
// import { twMerge } from 'tailwind-merge'
import { Input as BaseInput } from '@nextui-org/react'
// import { useEffect, useRef } from 'react'

// interface Props extends React.ComponentProps<'input'> {
//   label: string
// }

export function Input(props: React.ComponentProps<typeof BaseInput>) {
  // const {autoComplete} = props

  // let inputRef = useRef<HTMLInputElement>(null)

  // if(props.ref) {
  //   inputRef = props.ref as React.MutableRefObject<HTMLInputElement>
  // }

  // useEffect(() => {

  //   if (autoComplete === 'off') {
  //     inputRef?.current?.setAttribute('autocomplete', 'off')
  //     input?.setAttribute('autocomplete', 'off')
  //   }

  // }, [autoComplete])

  return (
    <BaseInput
      isRequired
      // ref={inputRef}
      {...props}
      classNames={{
        inputWrapper:
          // 'group-data-[focus-visible=true]:ring-1 group-data-[focus-visible=true]:ring-[#cacaca]',
          'group-data-[focus-visible=true]:ring-transparent',
        label: 'after:hidden',
      }}
    />
  )
}
