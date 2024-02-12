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
  currentParam?: string | number
  searchParamKey: string
  searchParamValue: string | number
  toggle?: boolean
  keysToDelete?: string[]
  innerRef?: React.RefObject<HTMLButtonElement>
}

export function LinkSearchParams(props: Props) {
  const {
    className,
    classNames,
    currentParam,
    searchParamKey,
    searchParamValue,
    keysToDelete,
    itemRef,
    ...restProps
  } = props

  // HOOKS
  const searchParams = useSearchParams()

  const param = currentParam ?? searchParams.get(searchParamKey)
  const searchParamValueString = searchParamValue.toString()

  // FUNCTIONS
  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams)

    //
    if (searchParamValueString === '0') {
      params.delete(searchParamKey)
    } else {
      params.set(searchParamKey, searchParamValueString)
    }

    keysToDelete?.forEach(key => {
      params.delete(key)
    })

    return '?' + params.toString()
  }, [searchParams, searchParamKey, keysToDelete, searchParamValueString])

  // VALUES
  //
  const isSelected =
    searchParamValueString === param?.toString() || (searchParamValueString === '0' && !param)

  const dataSelected = isSelected ? { 'data-selected': 'true' } : {}
  const dataNotSelected = !isSelected ? { 'data-not-selected': 'true' } : {}

  // RENDER
  return (
    <Button
      ref={itemRef as unknown as React.RefObject<HTMLButtonElement>}
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
