'use client'

import { Fragment, useEffect, useState } from 'react'
import { HiMiniComputerDesktop, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { Listbox, Transition } from '@headlessui/react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}

const themes = [
  { id: 1, icon: <HiMiniComputerDesktop />, value: Theme.SYSTEM },
  { id: 2, icon: <HiOutlineMoon />, value: Theme.DARK },
  { id: 3, icon: <HiOutlineSun />, value: Theme.LIGHT },
]

export function ThemeSwitcher() {
  // STATES
  const [selectedTheme, setSelectedTheme] = useState(themes[0])

  // EFFECTS
  useEffect(() => {
    const getCurrentTheme = () => {
      const localTheme = localStorage.getItem('theme')

      const defaulTheme = themes[0]

      if (!localTheme) return defaulTheme

      const theme = themes.find(theme => theme.value === localTheme)

      if (theme) {
        return theme
      } else {
        return defaulTheme
      }
    }

    setSelectedTheme(getCurrentTheme())
  }, [])

  // FUNCTIONS
  function handleChangeTheme(theme: (typeof themes)[0]) {
    setSelectedTheme(theme)

    const html = document.documentElement.classList

    localStorage.setItem('theme', theme.value)
    html.remove(Theme.DARK, Theme.LIGHT, Theme.SYSTEM)
    html.add(theme.value)

    if (theme.value === Theme.SYSTEM) {
      window.matchMedia('(prefers-color-scheme: dark)').matches && html.add(Theme.DARK)
    }
  }

  // RENDER
  return (
    <Listbox value={selectedTheme} onChange={newTheme => handleChangeTheme(newTheme)}>
      <div className='relative'>
        <Listbox.Button className='relative flex items-center px-2'>
          <span>{selectedTheme.icon}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 rounded-b-lg bg-th-fg-1'>
            {themes
              .filter(theme => theme.id !== selectedTheme.id)
              .map(theme => (
                <Listbox.Option key={theme.id} className='px-2 py-2' value={theme}>
                  <span>{theme.icon}</span>
                </Listbox.Option>
              ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
