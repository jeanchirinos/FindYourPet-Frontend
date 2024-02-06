import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import plugin from 'tailwindcss/plugin'

const theme: Config['theme'] = {
  extend: {
    spacing: {
      header: 'var(--header-height)',
    },
    colors: {
      primary: '#FD8F52',
      // light
      'l-fg-1': 'rgb(255, 251, 247)',
      'l-fg-2': '#FFEDD9',
      'l-txt-1': '#2F3C42',
      'l-txt-2': '#4B4B4B',

      // dark
      'd-fg-1': 'rgb(24, 22, 19)',
      'd-fg-2': '#2D2A26',
      'd-txt-1': '#CCD6DA',
      'd-txt-2': '#B4B4B4',

      // theme
      'th-fg-1': 'var(--th-fg-1)',
      'th-fg-2': 'var(--th-fg-2)',
      'th-txt-1': 'var(--th-txt-1)',
      'th-txt-2': 'var(--th-txt-2)',
      'th-a': 'rgb(var(--th-a) / <alpha-value>)',

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
    '.scrollbar-transparent': {
      '&::-webkit-scrollbar': {
        backgroundColor: 'transparent',
      },
    },
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
  plugins: [
    nextui(),
    // require('tailwindcss-animate'),
    require('tailwindcss-animated'),
    tailwindPlugin,
  ],
}

export default config
