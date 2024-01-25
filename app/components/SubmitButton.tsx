'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/Button'
import { twMerge } from 'tailwind-merge'

type Props = React.ComponentProps<typeof Button> & { innerRef?: React.Ref<HTMLButtonElement> }

export function SubmitButton(props: Props) {
  const { pending } = useFormStatus()

  const { children = 'Guardar', className, innerRef, ...otherProps } = props

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      className={twMerge('bg-primary text-white ', className)}
      innerRef={innerRef}
      {...otherProps}
    >
      {pending ? 'Cargando' : children}
    </Button>
  )
}
