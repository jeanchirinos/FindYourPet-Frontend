'use client'
import { twJoin } from 'tailwind-merge'
import { StatusList } from '@/models/Pet'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

type Props = { statusList: StatusList; status: string }

export function FilterStatusClient(props: Props) {
  const { status } = props

  const searchParams = useSearchParams()
  const [currentStatus, setCurrentStatus] = useState(status)

  useEffect(() => {
    setCurrentStatus(status)
  }, [status])

  const createQueryString = useCallback(
    (id: number) => {
      const params = new URLSearchParams(searchParams)

      params.set('status', id.toString())
      params.delete('page')

      return '?' + params.toString()
    },
    [searchParams],
  )

  const isSelected = (id: number) => id.toString() === currentStatus

  return (
    <div className='flex flex-col gap-y-2'>
      {props.statusList.map(item => (
        <Link
          key={item.id}
          href={createQueryString(item.id)}
          onClick={() => setCurrentStatus(item.id.toString())}
          className={twJoin(
            isSelected(item.id) ? 'bg-orange-100 text-orange-600' : 'hover:bg-foreground-100',
            'flex w-full min-w-max cursor-pointer items-center rounded-lg p-2.5 text-sm shadow-md',
          )}
        >
          {item.value}
        </Link>
      ))}
    </div>
  )
}
