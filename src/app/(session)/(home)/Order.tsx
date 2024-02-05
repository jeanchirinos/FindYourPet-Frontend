'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { useSearchParams, useRouter } from 'next/navigation'

export function Order(props: { order: string }) {
  // HOOKS
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  // FUNCTIONS
  function handleChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('order', value)
    newSearchParams.delete('page')

    replace('?' + newSearchParams.toString())
  }

  // RENDER
  return (
    <div className='max-md:hidden'>
      <SelectNative
        state={{
          selected: props.order,
          onSelectChange: handleChange,
        }}
        options={[
          { id: 'desc', name: 'Más reciente' },
          { id: 'asc', name: 'Más antiguo' },
        ]}
      />
    </div>
  )
}
