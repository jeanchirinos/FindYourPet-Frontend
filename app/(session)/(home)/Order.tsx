'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { useSearchParams, useRouter } from 'next/navigation'

export function Order(props: { order: string }) {
  // HOOKS
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  // FUNCTIONS
  function handleChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('order', value)

    replace('?' + newSearchParams.toString())
  }

  // RENDER
  return (
    <div className='max-md:hidden'>
      <SelectNative
        state={{
          onSelectChange: handleChange,
        }}
        defaultValue={props.order}
        options={[
          { id: 'desc', name: 'Más reciente' },
          { id: 'asc', name: 'Más antiguo' },
        ]}
      />
    </div>
  )
}
