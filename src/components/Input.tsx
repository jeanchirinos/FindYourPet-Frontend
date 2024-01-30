'use client'
import { Input as NextUiInput } from '@nextui-org/react'

type Props = React.ComponentProps<typeof NextUiInput> & { innerRef?: React.Ref<HTMLInputElement> }

export function Input(props: Props) {
  const { className, innerRef, children, ...componentProps } = props

  return (
    <NextUiInput
      {...componentProps}
      isRequired
      classNames={{
        inputWrapper: 'group-data-[focus-visible=true]:ring-transparent',
        label: 'after:hidden',
      }}
      ref={innerRef}
    >
      {children}
    </NextUiInput>
  )
}