'use client'
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { IconArrowDown, IconCheck } from '@/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { Chip } from '@nextui-org/react'
import { Breed } from '@/models/Pet'

export function FilterBreedsClient(props: { breeds: Breed[] }) {
  const { breeds } = props

  // STATES
  const [selectedBreeds, setSelectedBreeds] = useState<Breed[]>([])
  const [query, setQuery] = useState('')

  // HOOKS
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const breed_id = searchParams.get('breed_id')

  // EFFECTS
  useEffect(() => {
    const filteredBreeds = breeds.filter(breed =>
      breed_id?.split(',').includes(breed.id.toString()),
    )

    setSelectedBreeds(filteredBreeds)
  }, [breed_id, breeds])

  // VALUES
  const filteredBreeds =
    query === ''
      ? breeds
      : breeds.filter(breed =>
          breed.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  // FUNCTIONS
  function handleChange(value: typeof breeds) {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('breed_id', value.map(v => v.id).join(','))

    setSelectedBreeds(value)
    setQuery('')

    replace('?' + newSearchParams.toString())
  }

  function handleRemove(item: (typeof breeds)[0]) {
    const newSearchParams = new URLSearchParams(searchParams)

    const filteredBreeds = selectedBreeds.filter(b => b.id !== item.id)

    if (filteredBreeds.length === 0) {
      newSearchParams.delete('breed_id')
    } else {
      newSearchParams.set('breed_id', filteredBreeds.map(b => b.id).join(','))
    }

    replace('?' + newSearchParams.toString())
  }

  // RENDER
  return (
    <div className='flex w-full flex-col gap-y-5'>
      <Combobox value={selectedBreeds} onChange={handleChange} multiple>
        <div className='relative z-20 w-full'>
          <div className='relative w-full cursor-default text-left shadow-md sm:text-sm'>
            <Combobox.Button className='w-full '>
              <Combobox.Input
                className='w-full rounded-lg border-none py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none'
                placeholder='Raza'
                onChange={e => setQuery(e.target.value)}
                value={query}
              />
              <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
                <IconArrowDown className='size-5 text-gray-400' aria-hidden='true' />
              </div>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='text- absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-foreground-200 shadow-lg focus:outline-none sm:text-sm'>
              {filteredBreeds.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                  Sin resultados
                </div>
              ) : (
                filteredBreeds.map(breed => (
                  <Combobox.Option
                    key={breed.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary text-white' : ''
                      }`
                    }
                    value={breed}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {breed.name}
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

      {selectedBreeds.length > 0 && (
        <div className='flex flex-wrap gap-2.5'>
          {selectedBreeds.map(item => (
            <Chip onClose={() => handleRemove(item)} key={item.id}>
              {item.name}
            </Chip>
          ))}
        </div>
      )}
    </div>
  )
}
