'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '@nextui-org/button'

type Props = React.ComponentProps<typeof Button> & {
  classNames?: {
    selected?: string
    notSelected?: string
  }
  searchParamKey: string
  searchParamValue: string | number
  keysToDelete?: string[]
  defaultParam?: string | number
  innerRef?: React.RefObject<HTMLButtonElement>
}

export function LinkSearchParams(props: Props) {
  const {
    className,
    classNames,
    searchParamKey,
    searchParamValue,
    keysToDelete,
    defaultParam,
    innerRef,
    ...restProps
  } = props

  // HOOKS
  const searchParams = useSearchParams()

  // VALUES
  const param = searchParams.get(searchParamKey)?.toString()
  const searchParamValueString = searchParamValue.toString()

  const isDefaultParam = searchParamValueString === defaultParam?.toString()
  const isSelected = searchParamValueString === param || (!param && isDefaultParam)

  const dataSelected = isSelected ? { 'data-selected': true } : { 'data-not-selected': true }

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

  // RENDER
  return (
    <Button
      as={Link}
      {...dataSelected}
      href={createQueryString()}
      replace
      className={twMerge(
        className,
        !isSelected && classNames?.notSelected,
        isSelected && classNames?.selected,
      )}
      ref={innerRef}
      {...restProps}
    />
  )
}
