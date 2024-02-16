'use client'
import { Input as NextUiInput } from '@nextui-org/input'

type Props = React.ComponentProps<typeof NextUiInput> & { innerRef?: React.Ref<HTMLInputElement> }

export function Input(props: Props) {
  const { className, innerRef, ...componentProps } = props

  return (
    <NextUiInput
      {...componentProps}
      isRequired
      classNames={{
        label: 'after:hidden',
      }}
      ref={innerRef}
    />
  )
}
