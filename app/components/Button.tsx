'use client'
import { Button as BaseButton, Spinner } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'
import { forwardRef } from 'react'

type Props = React.ComponentProps<typeof BaseButton> & {
  /**
   * Temporal implementation since isLoading seems to add isDisabled prop which may cause Popover to close.
   */
  safeIsLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(props, ref) {
  const { safeIsLoading, className, ...componentProps } = props

  return (
    <BaseButton
      className={twMerge(safeIsLoading && 'pointer-events-none', className)}
      {...componentProps}
      ref={ref}
    >
      {safeIsLoading && <Spinner color='default' size='sm' />}
      {props.children}
    </BaseButton>
  )
})
