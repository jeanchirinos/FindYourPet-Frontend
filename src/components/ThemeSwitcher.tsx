'use client'

import { useTheme } from 'next-themes'
import { IconDarkTheme, IconLightTheme, IconSystemTheme } from '@/icons'
import { Select, SelectItem } from '@nextui-org/select'
import { useEffect, useState } from 'react'

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

  // STATES
  const [selectedTheme, setSelectTheme] = useState(themes[0])

  // EFFECTS
  useEffect(() => {
    const newTheme = themes.find(t => t.id === theme)
    newTheme && setSelectTheme(newTheme)
  }, [theme])

  // RENDER
  return (
    <Select
      size='sm'
      classNames={{
        base: 'w-fit',
        trigger: 'min-h-4 !max-h-8 w-fit bg-content2',
        value: '!text-inherit hidden',
        popoverContent: 'w-fit absolute right-0',
      }}
      aria-label='Cambiar tema'
      selectorIcon={<></>}
      startContent={<div>{selectedTheme.icon}</div>}
      selectedKeys={[selectedTheme.id]}
      selectionMode='single'
      onChange={e => setTheme(e.target.value)}
    >
      {themes.map(t => (
        <SelectItem key={t.id} startContent={t.icon}>
          {t.name}
        </SelectItem>
      ))}
    </Select>
  )
}
