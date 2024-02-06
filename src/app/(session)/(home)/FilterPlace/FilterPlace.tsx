'use client'

import { Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { IconCheck, IconSearch } from '@/icons'
import { Chip } from '@nextui-org/react'
import { useFilterPlace } from './useFilterPlace'

// export function FilterPlace() {
export function FilterPlace(props: { places: any }) {
  const { filteredPlaces, handleChange, handleRemove, query, setQuery, selectedPlaces } =
    useFilterPlace(props.places)

  // RENDER
  return (
    <div className='flex w-96 max-w-full flex-col gap-y-2.5'>
      <Combobox value={selectedPlaces} onChange={handleChange} multiple>
        <div className='relative z-20 w-full'>
          <div className='relative w-full cursor-default text-left shadow-md sm:text-sm'>
            <Combobox.Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='Ubicación'
              className='w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none'
            />
            <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <IconSearch className='size-5 text-gray-400' aria-hidden='true' />
            </div>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-foreground-200 shadow-lg focus:outline-none sm:text-sm'>
              {filteredPlaces.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2'>Sin resultados</div>
              ) : (
                filteredPlaces.map(place => (
                  <Combobox.Option
                    key={place.code}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary text-white' : ''
                      }`
                    }
                    value={place}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {place.tag.long}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-primary'
                            }`}
                          >
                            <IconCheck className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      <div className='flex h-7 gap-x-2.5'>
        {selectedPlaces.map(item => (
          <Chip onClose={() => handleRemove(item)} key={item.code} title={item.tag.long}>
            {item.name}
          </Chip>
        ))}
      </div>
    </div>
  )
}
