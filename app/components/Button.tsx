'use client'
import { Button as NextUiButton, Spinner } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

type Props = React.ComponentProps<typeof NextUiButton> & { innerRef?: React.Ref<HTMLButtonElement> }

export function Button(props: Props) {
  const { isLoading, className, innerRef, children, ...componentProps } = props

  return (
    <NextUiButton
      {...componentProps}
      className={twMerge(isLoading && 'pointer-events-none', className)}
      ref={innerRef}
    >
      {isLoading && <Spinner color='default' size='sm' />}
      {children}
    </NextUiButton>
  )
}
