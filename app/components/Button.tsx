'use client'
import { Button as BaseButton, Spinner } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'

type Props = React.ComponentProps<typeof BaseButton> & {
  /**
   * Temporal implementation since isLoading seems to add isDisabled prop which may cause Popover to close.
   */
  safeIsLoading?: boolean
}

export function Button(props: Props) {
  const { safeIsLoading, className, ...componentProps } = props

  return (
    <BaseButton
      className={twMerge(safeIsLoading && 'pointer-events-none', className)}
      {...componentProps}
    >
      {safeIsLoading && <Spinner color='default' size='sm' />}
      {props.children}
    </BaseButton>
  )
}
