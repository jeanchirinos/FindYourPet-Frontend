'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: Record<
    string,
    | string
    | number
    | {
        value: string | number
      }
  >
  classNames?: {
    selected?: string
    notSelected?: string
  }
  value: string | number
  selectedValue: string | undefined | string[]
  searchParamKey?: string
  toggle?: boolean
}

export function LinkSearchParams(props: Props) {
  const {
    href,
    className,
    classNames,
    selectedValue = '',
    value,
    searchParamKey,
    toggle = false,
    ...restProps
  } = props

  const searchParams = useSearchParams()

  // FUNCTIONS
  function getNewSearchParams() {
    let newSearchParams = new URLSearchParams(searchParams)

    Object.entries(props.href).forEach(([key, value]) => {
      if (toggle && key === searchParamKey) {
        if (isSelected) {
          newSearchParams.delete(key)
        } else {
          ;(typeof value === 'string' || typeof value === 'number') &&
            newSearchParams.set(key, value.toString())
        }

        return '?' + newSearchParams.toString()
      }

      if (typeof value === 'object') {
        if (isSelected) {
          const entries = Array.from(newSearchParams.entries())

          const selectedValueIndex = entries.findIndex(
            ([key, v]) => key === searchParamKey && v === value.value.toString(),
          )

          entries.splice(selectedValueIndex, 1)

          newSearchParams = new URLSearchParams(entries)
        } else {
          newSearchParams.append(key, value.value.toString())
        }
      } else {
        newSearchParams.set(key, value.toString())
      }
    })

    return '?' + newSearchParams.toString()
  }

  // VALUES
  const isSelected =
    selectedValue === value.toString() ||
    (Array.isArray(selectedValue) && selectedValue.includes(value.toString()))

  // RENDER
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
