'use client'

import { useEffect, useState } from 'react'
import { HiMiniComputerDesktop, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
// import { Listbox } from '@headlessui/react'

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}

// const themes = [
//   { id: 1, icon: <HiMiniComputerDesktop /> },
//   { id: 2, name: <HiOutlineMoon /> },
//   { id: 3, name: <HiOutlineSun /> },
// ]

export function ThemeSwitcher() {
  // STATES
  const [currentTheme, setCurrentTheme] = useState<Theme | undefined>()

  // EFFECTS
  useEffect(() => {
    const getCurrentTheme = () => {
      const localTheme = localStorage.getItem('theme')

      if (!localTheme || !Object.values(Theme).includes(localTheme as Theme)) return Theme.SYSTEM

      return localTheme as Theme
    }

    setCurrentTheme(getCurrentTheme())
  }, [])

  // FUNCTIONS
  function handleChangeTheme(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    setCurrentTheme(e.target.value as Theme)
    const html = document.documentElement.classList

    localStorage.setItem('theme', e.target.value)
    html.remove(Theme.DARK, Theme.LIGHT, Theme.SYSTEM)
    html.add(e.target.value)

    if (e.target.value === Theme.SYSTEM) {
      window.matchMedia('(prefers-color-scheme: dark)').matches && html.add(Theme.DARK)
    }
  }

  // VALUES
  const icons = {
    [Theme.SYSTEM]: <HiMiniComputerDesktop />,
    [Theme.DARK]: <HiOutlineMoon />,
    [Theme.LIGHT]: <HiOutlineSun />,
  }

  // const [selectedTheme, setSelectedTheme] = useState(themes[0])

  // RENDER
  return (
    <>
      <fieldset className='flex text-xl text-foreground-400 max-md:hidden'>
        <Popover>
          <PopoverTrigger>
            <label>
              <input
                type='radio'
                checked={currentTheme === Theme.SYSTEM}
                value={Theme.SYSTEM}
                onChange={handleChangeTheme}
                className='peer'
                hidden
              />
              <div className='cursor-pointer rounded-full p-1.5 peer-checked:bg-neutral-600 peer-checked:text-d-txt-1'>
                {icons[Theme.SYSTEM]}
              </div>
            </label>
          </PopoverTrigger>
          <PopoverContent className='-right-2 -mt-3 rounded-2xl bg-th-fg-1 p-1.5'>
            <div className='flex flex-col gap-y-2'>
              <label>
                <input
                  type='radio'
                  checked={currentTheme === Theme.LIGHT}
                  value={Theme.LIGHT}
                  onChange={handleChangeTheme}
                  className='peer'
                  hidden
                />
                <div className='cursor-pointer rounded-full p-1.5 peer-checked:bg-neutral-600 peer-checked:text-d-txt-1'>
                  {icons[Theme.LIGHT]}
                </div>
              </label>
              <label>
                <input
                  type='radio'
                  checked={currentTheme === Theme.DARK}
                  value={Theme.DARK}
                  onChange={handleChangeTheme}
                  className='peer'
                  hidden
                />
                <div className='cursor-pointer rounded-full p-1.5 peer-checked:bg-neutral-600 peer-checked:text-d-txt-1'>
                  {icons[Theme.DARK]}
                </div>
              </label>
            </div>
          </PopoverContent>
        </Popover>
      </fieldset>

      {/* <Listbox value={selectedTheme} onChange={setSelectedTheme} >
        <Listbox.Button>{selectedTheme.icon}</Listbox.Button>
        <Listbox.Options>
          {themes.map(person => (
            <Listbox.Option key={person.id} value={person}>
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox> */}
    </>
  )
}
