'use client'
import { Fragment } from 'react'
import { Combobox as HeadlessCombobox, Transition } from '@headlessui/react'
import { IconArrowDown, IconCheck } from '@/icons'
import { IconType } from 'react-icons'
import { cn } from '@/lib/utils'

type Props = Omit<React.ComponentProps<typeof HeadlessCombobox>, 'multiple'> & {
  query: string
  setQuery: (value: string) => void
  options: any[]
  withInputButton?: boolean
  icon?: IconType
  multiple?: boolean
  itemKeyId?: string
  itemKeyValue?: string
  placeholder?: string
}

export function Combobox(props: Props) {
  const {
    query,
    setQuery,
    options,
    withInputButton = true,
    icon,
    itemKeyId = 'id',
    itemKeyValue,
    placeholder = 'Buscar',
    ...restProps
  } = props

  const Icon = icon ?? IconArrowDown

  function getValue(option: any) {
    if (!itemKeyValue) return option.name

    const keyParts = itemKeyValue?.split('.')

    let value = option

    for (const part of keyParts) {
      value = value[part]
    }

    return value
  }

  const Input = (
    <>
      <HeadlessCombobox.Input
        className='w-full rounded-lg border-none bg-default-100 py-2 pl-3 pr-10 text-sm leading-5 focus:outline-none'
        onChange={e => setQuery(e.target.value)}
        value={query}
        placeholder={placeholder}
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
        <Icon className='size-5 text-gray-400' aria-hidden='true' />
      </div>
    </>
  )

  return (
    //@ts-ignore
    <HeadlessCombobox {...restProps}>
      <div className='relative z-20 w-full'>
        <div className='relative w-full cursor-default text-left sm:text-sm'>
          {withInputButton ? (
            <HeadlessCombobox.Button className='w-full'>{Input}</HeadlessCombobox.Button>
          ) : (
            Input
          )}
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <HeadlessCombobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-default-100 focus:outline-none sm:text-sm'>
            {options.length === 0 && query !== '' ? (
              <div className='cursor-default select-none px-4 py-2'>Sin resultados</div>
            ) : (
              options.map(option => (
                <HeadlessCombobox.Option
                  key={option[itemKeyId]}
                  className={({ active }) =>
                    cn(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      active && 'bg-primary text-white',
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}
                      >
                        {getValue(option)}
                      </span>

                      {selected && (
                        <span
                          className={cn(
                            'absolute inset-y-0 left-0 flex items-center pl-3',
                            active ? 'text-white' : 'text-primary',
                          )}
                        >
                          <IconCheck className='size-5' aria-hidden='true' />
                        </span>
                      )}
                    </>
                  )}
                </HeadlessCombobox.Option>
              ))
            )}
          </HeadlessCombobox.Options>
        </Transition>
      </div>
    </HeadlessCombobox>
  )
}
