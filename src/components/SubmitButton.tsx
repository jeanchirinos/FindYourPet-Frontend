'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@nextui-org/button'

type Props = React.ComponentProps<typeof Button> & { innerRef?: React.Ref<HTMLButtonElement> }

export function SubmitButton(props: Props) {
  const { pending } = useFormStatus()

  const { children = 'Guardar', innerRef, ...otherProps } = props

  return (
    <Button type='submit' isLoading={pending} color='primary' {...otherProps} ref={innerRef}>
      {children}
    </Button>
  )
}
