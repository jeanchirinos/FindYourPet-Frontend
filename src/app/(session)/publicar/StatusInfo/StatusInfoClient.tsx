'use client'

import { StatusList } from '@/models/Pet'
import { RadioGroup } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'

export function StatusInfoClient(props: { statusList: StatusList }) {
  const { statusList } = props

  return (
    <RadioGroup name='status' defaultValue={statusList[0]?.id.toString()}>
      <div className='flex gap-2 max-sm:flex-col'>
        {statusList.map(item => (
          <RadioGroup.Option
            key={item.id}
            value={item.id.toString()}
            className={({ checked }) =>
              twJoin(
                'flex w-full cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-sm shadow-md focus:outline-none',
                checked && 'bg-orange-100 text-orange-600',
              )
            }
          >
            <RadioGroup.Label as='p'>{item.value}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
