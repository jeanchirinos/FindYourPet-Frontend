'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/Button'

type Props = React.ComponentProps<typeof Button> & { innerRef?: React.Ref<HTMLButtonElement> }

export function SubmitButton(props: Props) {
  const { pending } = useFormStatus()

  const { children = 'Guardar', innerRef, ...otherProps } = props

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      color='primary'
      innerRef={innerRef}
      {...otherProps}
    >
      {pending ? 'Cargando' : children}
    </Button>
  )
}
