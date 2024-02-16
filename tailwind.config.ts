import type { Config } from 'tailwindcss'
import { ThemeColors, nextui } from '@nextui-org/theme'
import plugin from 'tailwindcss/plugin'

const theme: Config['theme'] = {
  extend: {
    spacing: {
      header: 'var(--header-height)',
      header_sticky: 'calc(var(--header-height) + 1.25rem)',
    },
    colors: {
      focus: '#FD8F52',
      // status colors
      search: '#79616F',
      lost: '#AE6378',
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
        primary: {
          DEFAULT: '#FD8F52',
          foreground: '#FFFFFF',
        },
        custom1: '#FFEDD9',
      } as CustomColors,
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: '#FD8F52',
          foreground: '#FFFFFF',
        },
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

  matchVariant('any-*', value => {
    if (value.includes(',')) {
      const selectors = value.split(',')
      const hoverSelectors = selectors.map(selector => `& ${selector}`)

      return hoverSelectors
    }

    return `& ${value}`
  })

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
  darkMode: 'class',
  plugins: [
    nextuiPlugin,
    require('tailwindcss-animated'),
    require('@headlessui/tailwindcss'),
    tailwindPlugin,
  ],
}

export default config
