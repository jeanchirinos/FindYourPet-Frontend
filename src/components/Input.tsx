'use client'
import { Input as NextUiInput } from '@nextui-org/react'

type Props = React.ComponentProps<typeof NextUiInput> & { innerRef?: React.Ref<HTMLInputElement> }

export function Input(props: Props) {
  const { className, innerRef, ...componentProps } = props

  return (
    <NextUiInput
      {...componentProps}
      isRequired
      classNames={{
        // inputWrapper: 'group-data-[focus-visible=true]:ring-transparent',
        // bg-content2 group-data-[focus=true]:bg-content2
        label: 'after:hidden',
      }}
      ref={innerRef}
    />
  )
}
