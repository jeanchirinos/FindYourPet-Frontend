'use client'
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { useCategories } from '@/services/category'

export function MyCombobox() {
  const { categories = [] } = useCategories()

  const [selected, setSelected] = useState(categories[0])

  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? categories
      : categories.filter(person =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  useEffect(() => {
    setSelected(categories[0])
  }, [categories])

  // RENDER
  return (
    <div className='z-10 w-72'>
      <Combobox value={selected} onChange={setSelected}>
        <div className='relative mt-1'>
          <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0'
              displayValue={(person: any) => person.name}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              {/* <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' /> */}
              {/* <TomNook className='h-5 w-5 text-gray-400' aria-hidden='true' /> */}
              {/* <Icon name={selected.name} className='h-5 w-5 text-gray-400' aria-hidden='true' /> */}
              {selected && (
                <div
                  className='[&>*]:h-5 [&>*]:w-5 [&>*]:text-gray-400'
                  dangerouslySetInnerHTML={{ __html: selected.image }}
                />
              )}
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {filteredPeople.length === 0 && query !== '' ? (
                <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                  Nothing found.
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
                            {/* <CheckIcon className='h-5 w-5' aria-hidden='true' /> */}
                            {/* <Icon name={person.name} className='h-5 w-5' aria-hidden='true' /> */}
                            <div
                              className='[&>*]:h-5 [&>*]:w-5'
                              dangerouslySetInnerHTML={{ __html: person.image }}
                            />{' '}
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

// export function Combobox(props: React.ComponentProps<typeof BaseCombobox>){
//   return <BaseCombobox {...props}>
//     {props.children}
//   </BaseCombobox>
// }
