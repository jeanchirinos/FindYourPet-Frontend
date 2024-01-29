'use client'
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { IconArrowDown, IconCheck } from '@/icons'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'

const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]

export function ComboboxAutocomplete(props: {}) {
  const [selected, setSelected] = useState<typeof people>([])
  const [query, setQuery] = useState('')

  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const filteredPeople =
    query === ''
      ? people
      : people.filter(person =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  function handleChange(value: typeof people) {
    const newSearchParams = new URLSearchParams(searchParams)

    setSelected(value)
  }

  return (
    <div>
      <div className='flex flex-col gap-y-2'>
        {selected.map(item => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
      {/* nullable */}
      <Combobox value={selected} onChange={handleChange} multiple>
        <div className='relative mt-1'>
          <div className='rounded-lgtext-left relative w-full cursor-default overflow-hidden shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Button>
              <Combobox.Input
                className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
                // displayValue={(items: typeof people) => items.map(item => item.name).join(',')}
                // displayValue={() => 'Personas'}
                placeholder='Personas'
                onChange={e => setQuery(e.target.value)}
              />
              <IconArrowDown className='h-5 w-5 text-gray-400' aria-hidden='true' />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            // afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {filteredPeople.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                  Sin resultados
                </div>
              ) : (
                filteredPeople.map(person => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
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
    </div>
  )
}
