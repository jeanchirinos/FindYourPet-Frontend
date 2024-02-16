'use client'
import { Button as NextUiButton } from '@nextui-org/button'

type Props = React.ComponentProps<typeof NextUiButton> & { innerRef?: React.Ref<HTMLButtonElement> }

export function Button(props: Props) {
  const { innerRef, ...componentProps } = props

  return <NextUiButton {...componentProps} ref={innerRef} />
}
