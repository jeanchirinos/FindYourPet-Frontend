'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from './Button'

type Props = React.ComponentProps<typeof Button> & {
  classNames?: {
    selected?: string
    notSelected?: string
  }
  searchParamKey: string
  searchParamValue: string | number
  toggle?: boolean
  keysToDelete?: string[]
  innerRef?: React.RefObject<HTMLButtonElement>
  defaultParam?: string | number
}

export function LinkSearchParams(props: Props) {
  const {
    className,
    classNames,
    searchParamKey,
    searchParamValue,
    keysToDelete,
    defaultParam,
    ...restProps
  } = props

  // HOOKS
  const searchParams = useSearchParams()

  const param = searchParams.get(searchParamKey)?.toString()
  const searchParamValueString = searchParamValue.toString()

  const isDefaultParam = searchParamValueString === defaultParam?.toString()

  // FUNCTIONS
  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams)

    if (isDefaultParam) {
      params.delete(searchParamKey)
    } else {
      params.set(searchParamKey, searchParamValueString)
    }

    keysToDelete?.forEach(key => {
      params.delete(key)
    })

    return '?' + params.toString()
  }, [searchParams, searchParamKey, keysToDelete, searchParamValueString, isDefaultParam])

  // VALUES
  const isSelected = searchParamValueString === param || (!param && isDefaultParam)

  const dataSelected = isSelected ? { 'data-selected': 'true' } : {}
  const dataNotSelected = !isSelected ? { 'data-not-selected': 'true' } : {}

  // RENDER
  return (
    <Button
      as={Link}
      {...dataSelected}
      {...dataNotSelected}
      href={createQueryString()}
      replace
      className={twMerge(
        className,
        !isSelected && classNames?.notSelected,
        isSelected && classNames?.selected,
      )}
      {...restProps}
    />
  )
}
