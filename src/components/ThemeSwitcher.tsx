'use client'

import { useTheme } from 'next-themes'

import { IconDarkTheme, IconLightTheme, IconSystemTheme } from '@/icons'
import { SelectCustom } from './Select/SelectCustom'

export function ThemeSwitcher() {
  const options = [
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

  const { theme, setTheme } = useTheme()

  return (
    <SelectCustom
      type='always-custom'
      className='ml-auto h-8 w-fit min-w-8'
      options={options}
      state={{ selected: theme, onSelectChange: setTheme }}
      showOnlySelectedIcon
      showArrow={false}
      placeholder=''
    />
  )
}
