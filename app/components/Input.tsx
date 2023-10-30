'use client'
import { Input as BaseInput } from '@nextui-org/react'
import { forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, React.ComponentProps<typeof BaseInput>>(
  function Input(props, ref) {
    return (
      <BaseInput
        isRequired
        {...props}
        classNames={{
          inputWrapper: 'group-data-[focus-visible=true]:ring-transparent',
          label: 'after:hidden',
        }}
        ref={ref}
      />
    )
  },
)
