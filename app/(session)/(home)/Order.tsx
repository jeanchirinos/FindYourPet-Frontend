'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { useSearchParams, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

export function Order(props: { order: string }) {
  const [order, setOrder] = useState(props.order)

  const { replace } = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    setOrder(props.order)
  }, [props.order])

  function handleChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('order', value)

    replace('?' + newSearchParams.toString())
  }

  return (
    <div className='sticky top-0 z-10 h-14 bg-th-fg-1'>
      <SelectNative
        state={{
          selected: order,
          onSelectChange: handleChange,
        }}
        options={[
          { id: 'asc', name: 'Más reciente' },
          { id: 'desc', name: 'Más antiguo' },
        ]}
      />
    </div>
  )
}
