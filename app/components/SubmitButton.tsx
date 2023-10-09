'use client'

import {
  //@ts-ignore
  experimental_useFormStatus as useFormStatus,
} from 'react-dom'
import { Button } from '@/components/Button'

export function SubmitButton(props: React.ComponentProps<typeof Button>) {
  const { pending } = useFormStatus()

  const { children = 'Guardar', ...otherProps } = props

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className='bg-primary text-white disabled:bg-gray-500'
      {...otherProps}
    >
      {pending ? 'Cargando' : children}
    </Button>
  )
}
