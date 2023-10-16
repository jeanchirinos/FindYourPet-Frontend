'use client'
import { Input as BaseInput } from '@nextui-org/react'

export function Input(props: React.ComponentProps<typeof BaseInput>) {
  return (
    <BaseInput
      isRequired
      {...props}
      classNames={{
        inputWrapper: 'group-data-[focus-visible=true]:ring-transparent',
        label: 'after:hidden',
      }}
    />
  )
}
