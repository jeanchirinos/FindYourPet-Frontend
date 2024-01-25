'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: Record<string, string | number>
  classNames?: {
    selected?: string
    notSelected?: string
  }
  value: string | number
  selectedValue: string
}

export function LinkSearchParams(props: Props) {
  const { href, className, classNames, selectedValue, value, ...restProps } = props

  const searchParams = useSearchParams()

  function getNewSearchParams() {
    const newSearchParams = new URLSearchParams(searchParams)

    Object.entries(props.href).forEach(([key, value]) => {
      newSearchParams.set(key, value.toString())
    })

    return '?' + newSearchParams.toString()
  }

  const isSelected = selectedValue === value.toString()

  return (
    <Link
      href={getNewSearchParams()}
      replace
      className={twMerge(
        className,
        isSelected && classNames?.selected,
        !isSelected && classNames?.notSelected,
      )}
      {...restProps}
    />
  )
}
