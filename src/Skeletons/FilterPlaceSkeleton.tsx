'use client'
import { IconArrowDown } from '@/icons'
import { Combobox } from '@headlessui/react'

export function FilterPlaceSkeleton() {
  return (
    <div className='flex w-96 max-w-full flex-col gap-y-2.5'>
      <Combobox disabled>
        <div className='relative z-20 mt-1 w-full'>
          <div className='relative w-full cursor-default text-left shadow-md sm:text-sm'>
            <Combobox.Input
              className='w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none'
              placeholder='Ubicación'
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <IconArrowDown className='size-5 text-gray-400' aria-hidden='true' />
            </div>
          </div>
        </div>
      </Combobox>
      <div className='flex h-7 gap-x-2.5' />
    </div>
  )
}
