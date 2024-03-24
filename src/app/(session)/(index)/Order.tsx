'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { useSearchParams, useRouter } from 'next/navigation'

const DEFAULT_ORDER = 'desc'

export function Order() {
  // HOOKS
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  // FUNCTIONS
  function handleChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams)

    if (value === DEFAULT_ORDER) {
      newSearchParams.delete('order')
    } else {
      newSearchParams.set('order', value)
    }

    newSearchParams.delete('page')

    replace('?' + newSearchParams.toString())
  }

  // RENDER
  return (
    <SelectNative
      className='h-fit '
      aria-label='Ordenar'
      state={{
        selected: searchParams.get('order') ?? DEFAULT_ORDER,
        onSelectChange: handleChange,
      }}
      options={[
        { id: 'desc', name: 'Más reciente' },
        { id: 'asc', name: 'Más antiguo' },
      ]}
    />
  )
}
