'use client'

import { Listbox, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { IconCheck, IconDarkTheme, IconLightTheme, IconSystemTheme } from '@/icons'
import { Fragment } from 'react'
import { Button } from '@nextui-org/button'

const themes = [
  {
    id: 'system',
    name: 'Sistema',
    icon: <IconSystemTheme />,
  },
  {
    id: 'light',
    name: 'Claro',
    icon: <IconLightTheme />,
  },
  {
    id: 'dark',
    name: 'Oscuro',
    icon: <IconDarkTheme />,
  },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const selectedTheme = themes.find(t => t.id === theme) ?? themes[0]

  return (
    <Listbox value={selectedTheme} onChange={theme => setTheme(theme.id)}>
      <div className='relative'>
        <Listbox.Button as={Fragment}>
          <Button
            isIconOnly
            className='bg-default-100'
            size='sm'
            aria-label={`Tema ${selectedTheme.name}`}
          >
            {selectedTheme.icon}
          </Button>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
        >
          <Listbox.Options className='absolute right-0 mt-1 max-h-60 w-max overflow-auto rounded-md bg-content1 text-small shadow-small focus:outline-none'>
            {themes.map(theme => (
              <Listbox.Option
                key={theme.id}
                value={theme}
                onClick={() => setTheme(theme.id)}
                className='flex cursor-pointer items-center justify-between gap-x-2 px-3 py-1.5 ui-active:bg-foreground-100'
                aria-label={theme.name}
              >
                <div className='flex items-center gap-x-1.5'>
                  {theme.icon}
                  <span>{theme.name}</span>
                </div>
                <IconCheck className='invisible ui-selected:visible' />
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
