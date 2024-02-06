'use client'

import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = React.ComponentProps<typeof Button> & {
  classNames?: {
    selected?: string
    notSelected?: string
  }
  currentParam?: string
  searchParamKey: string
  searchParamValue: string | number
  toggle?: boolean
  keysToDelete?: string[]
}

export function LinkSearchParams(props: Props) {
  const {
    className,
    classNames,
    currentParam,
    searchParamKey,
    searchParamValue,
    toggle = false,
    keysToDelete,
    ...restProps
  } = props

  // HOOKS
  const searchParams = useSearchParams()

  const param = currentParam ?? searchParams.get(searchParamKey)
  const searchParamValueString = searchParamValue.toString()

  // FUNCTIONS
  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams)

    if (toggle) {
      if (searchParamValueString === param) {
        params.delete(searchParamKey)
      } else {
        params.set(searchParamKey, searchParamValueString)
      }
    } else {
      params.set(searchParamKey, searchParamValueString)
    }

    keysToDelete?.forEach(key => {
      params.delete(key)
    })

    return '?' + params.toString()
  }, [searchParams, searchParamKey, toggle, keysToDelete, param, searchParamValueString])

  // VALUES
  const isSelected = searchParamValueString === param

  // RENDER
  return (
    <Button
      as={Link}
      href={createQueryString()}
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
