import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { AiOutlineCheck, AiOutlineDown } from 'react-icons/ai'

type Props = React.ComponentProps<typeof Combobox> & {
  array: any[]
  objectKey: string
  objectId: string
}

export function ComboboxComponent(props: Props) {
  const { array, objectKey, objectId } = props

  const [selected, setSelected] = useState(array[0])
  const [query, setQuery] = useState('')

  // const key = 'nombre_ubigeo'
  // const array = [] as any[]

  const filtered =
    query === ''
      ? array
      : array.filter(object =>
          object[objectKey]
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  // RENDER
  return (
    <Combobox value={selected ?? ''} onChange={setSelected}>
      <div className='relative mt-1'>
        <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
          <Combobox.Input
            className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0'
            // displayValue={(category: Category) => category.name}
            displayValue={(object: any) => object[objectKey]}
            onChange={e => setQuery(e.target.value)}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center px-2'>
            <AiOutlineDown />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filtered.length === 0 && query !== '' ? (
              <div className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                Nothing found.
              </div>
            ) : (
              filtered.map(object => (
                <Combobox.Option
                  key={object[objectId]}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={object}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {object[objectKey]}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <AiOutlineCheck className='h-5 w-5' aria-hidden='true' />
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
  )
}
