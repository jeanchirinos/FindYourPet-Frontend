import type { Config } from 'tailwindcss'
import { ThemeColors, nextui } from '@nextui-org/react'
import plugin from 'tailwindcss/plugin'

const theme: Config['theme'] = {
  extend: {
    spacing: {
      header: 'var(--header-height)',
      header_sticky: 'calc(var(--header-height) + 1.25rem)',
    },
    colors: {
      primary: '#FD8F52',
      focus: '#FD8F52',
      // status colors
      lost: '#AE6378',
      search: '#79616F',
      adopt: '#D87F81',
    },
    backgroundImage: {
      'main-gradient': 'linear-gradient(180deg, #EF7828 0%, #FDA26B 50%, #FDBB64 100%)',
    },
  },
}

//* PLUGINS

type CustomColors = (Partial<ThemeColors> & { custom1?: string }) | undefined

// NextUI
const nextuiPlugin = nextui({
  addCommonColors: true,
  themes: {
    light: {
      colors: {
        custom1: '#FFEDD9',
      } as CustomColors,
    },
    dark: {
      colors: {
        custom1: '#2D2A26',
      } as CustomColors,
    },
  },
})

const tailwindPlugin = plugin(plugin => {
  const { addUtilities, matchComponents, matchVariant } = plugin

  matchComponents(
    {
      templateColumns: value => ({
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${value}, 100%), 1fr))`,
      }),
    },
    {
      values: {
        '': '',
      },
    },
  )

  matchVariant('nth-child', value => {
    let valueToNumber = Number(value)

    if (valueToNumber >= 0) {
      return `& > *:nth-child(${value})`
    }

    valueToNumber = Math.abs(valueToNumber)

    return `& > *:nth-last-child(${valueToNumber})`
  })

  addUtilities({
    '.flex-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
})

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme,
  plugins: [nextuiPlugin, require('tailwindcss-animated'), tailwindPlugin],
}

export default config
