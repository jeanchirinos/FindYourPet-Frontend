'use client'
import { Input as NextUiInput } from '@nextui-org/input'
import { cnx } from '@/lib/utils'

type Props = React.ComponentProps<typeof NextUiInput> & { innerRef?: React.Ref<HTMLInputElement> }

export function Input(props: Props) {
  const { classNames, innerRef, ...componentProps } = props

  return (
    <NextUiInput
      isRequired
      classNames={{
        ...classNames,
        label: cnx('after:hidden !text-foreground-500', classNames?.label),
      }}
      labelPlacement='outside'
      placeholder=' '
      {...componentProps}
      ref={innerRef}
    />
  )
}
