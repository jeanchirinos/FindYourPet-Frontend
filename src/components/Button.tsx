'use client'
import { Button as NextUiButton } from '@nextui-org/button'
import { forwardRef } from 'react'

type Props = React.ComponentProps<typeof NextUiButton> & { innerRef?: React.Ref<HTMLButtonElement> }

export function Button(props: Props) {
  const { innerRef, ...componentProps } = props

  return <NextUiButton {...componentProps} ref={innerRef} />
}

export const ButtonWithRef = forwardRef<HTMLButtonElement, Props>(function Button(props, ref) {
  return <NextUiButton {...props} ref={ref} />
})
