'use client'
import { RadioGroup } from '@headlessui/react'
import { twJoin } from 'tailwind-merge'
import { StatusList } from '@/models/Pet'
import { useRouter, useSearchParams } from 'next/navigation'

export function FilterStatusClient(props: { statusList: StatusList }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(status: string) {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('status', status)
    newSearchParams.delete('page')

    router.replace('?' + newSearchParams.toString())
  }

  const defaultValue = searchParams.get('status') ?? '1'

  return (
    <RadioGroup defaultValue={defaultValue} onChange={handleChange}>
      <div className='flex flex-col gap-y-2'>
        {props.statusList.map(item => (
          <RadioGroup.Option
            key={item.id}
            value={item.id.toString()}
            className={({ checked }) =>
              twJoin(
                'flex w-full cursor-pointer items-center rounded-lg p-2.5 text-sm shadow-md focus:outline-none',
                checked && 'bg-orange-100 text-orange-600',
              )
            }
          >
            <RadioGroup.Label className='w-max'>{item.value}</RadioGroup.Label>
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
