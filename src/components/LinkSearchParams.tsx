'use client'

import { useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { cnx } from '@/lib/utils'
import { ButtonLink } from './ButtonLink'

type Props = React.ComponentProps<typeof ButtonLink> & {
  classNames?: {
    selected?: string
    notSelected?: string
  }
  searchParamKey: string
  searchParamValue: string | number
  keysToDelete?: string[]
  defaultParam?: string | number
  innerRef?: React.Ref<HTMLButtonElement>
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
    <ButtonLink
      {...dataSelected}
      href={createQueryString()}
      replace
      className={cnx(
        className,
        !isSelected && classNames?.notSelected,
        isSelected && classNames?.selected,
      )}
      innerRef={innerRef}
      {...restProps}
    />
  )
}
