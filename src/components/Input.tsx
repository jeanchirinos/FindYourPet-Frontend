'use client'
import { Input as NextUiInput } from '@nextui-org/input'
import { twMerge } from 'tailwind-merge'

type Props = React.ComponentProps<typeof NextUiInput> & { innerRef?: React.Ref<HTMLInputElement> }

export function Input(props: Props) {
  const { classNames, innerRef, ...componentProps } = props

  return (
    <NextUiInput
      {...componentProps}
      isRequired
      classNames={{ ...classNames, label: twMerge('after:hidden', classNames?.label) }}
      ref={innerRef}
    />
  )
}
