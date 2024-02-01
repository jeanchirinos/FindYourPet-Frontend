'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { useSearchParams, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

export function Order(props: { order: string }) {
  const { order } = props

  // STATES
  const [currentOrder, setCurrentOrder] = useState(order)

  // HOOKS
  const { replace, prefetch } = useRouter()
  const searchParams = useSearchParams()

  // EFFECTS
  useEffect(() => {
    setCurrentOrder(order)
  }, [order])

  // FUNCTIONS
  function handleChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('order', value)

    prefetch('?' + newSearchParams.toString())
    replace('?' + newSearchParams.toString())
  }

  // RENDER
  return (
    <div className='max-md:hidden'>
      <SelectNative
        state={{
          selected: currentOrder,
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
