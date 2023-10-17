'use client'

import {
  //@ts-ignore
  experimental_useFormStatus as useFormStatus,
} from 'react-dom'
import { Button } from '@/components/Button'
import { twMerge } from 'tailwind-merge'

export function SubmitButton(props: React.ComponentProps<typeof Button>) {
  const { pending } = useFormStatus()

  const { children = 'Guardar', className, ...otherProps } = props

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className={twMerge('bg-primary text-white disabled:bg-gray-500', className)}
      {...otherProps}
    >
      {pending ? 'Cargando' : children}
    </Button>
  )
}
