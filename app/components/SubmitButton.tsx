'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/Button'
import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'

export const SubmitButton = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  function SubmitButton(props, ref) {
    const { pending } = useFormStatus()

    const { children = 'Guardar', className, ...otherProps } = props

    return (
      <Button
        type='submit'
        aria-disabled={pending}
        disabled={pending}
        className={twMerge('bg-primary text-white disabled:bg-gray-500', className)}
        {...otherProps}
        ref={ref}
      >
        {pending ? 'Cargando' : children}
      </Button>
    )
  },
)
