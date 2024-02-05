'use client'

// import { SelectNative } from '@/components/Select/SelectNative'
import { useSearchParams, useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'

export function Order(props: { order: string }) {
  const { order } = props

  // const [currentOrder, setCurrentOrder] = useState(order)

  // useEffect(() => {
  //   setCurrentOrder(order)
  // }, [order])

  // HOOKS
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  // FUNCTIONS
  function handleChange(value: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('order', value)
    newSearchParams.delete('page')

    replace('?' + newSearchParams.toString())
    // setCurrentOrder(value)
  }

  // RENDER
  return (
    <div className='max-md:hidden'>
      <select value={order} onChange={e => handleChange(e.target.value)}>
        <option value='desc'>Más reciente</option>
        <option value='asc'>Más antiguo</option>
      </select>
      {/* <SelectNative
        state={{
          // selected: currentOrder,
          selected: order,
          onSelectChange: handleChange,
        }}
        options={[
          { id: 'desc', name: 'Más reciente' },
          { id: 'asc', name: 'Más antiguo' },
        ]}
      /> */}
    </div>
  )
}
