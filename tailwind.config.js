const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FD8F52',
        // light
        'l-fg-1': '#FFEDD9',
        'l-fg-2': '#FFFBF7',
        'l-txt-1': '#2F3C42',
        'l-txt-2': '#4B4B4B',

        // dark
        'd-fg-1': '#2D2A26',
        'd-fg-2': '#181613',
        'd-txt-1': '#CCD6DA',
        'd-txt-2': '#B4B4B4',

        // theme
        'theme-fg-1': 'var(--th-fg-1)',
        'theme-fg-2': 'var(--th-fg-2)',
        'theme-txt-1': 'var(--th-txt-1)',
        'theme-txt-2': 'var(--th-txt-2)',
      },

      backgroundImage: {
        'main-gradient': 'linear-gradient(180deg, #EF7828 0%, #FDA26B 50%, #FDBB64 100%)',
      },
    },
  },
  plugins: [
    nextui(),
    require('tailwindcss-animated'),
    plugin => {
      const { addVariant, matchUtilities, addUtilities, matchComponents, matchVariant } = plugin

      addVariant('child', '& > *')
      addVariant('child-hover', '& > *:hover')

      matchUtilities(
        {
          transform: value => ({
            transform: value,
          }),
        },
        {
          values: {
            '': '',
          },
        },
      )

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
        '.text-balance': {
          textWrap: 'balance',
        },
        '.scrollbar-transparent': {
          '&::-webkit-scrollbar': {
            backgroundColor: 'transparent',
          },
        },
      })
    },
  ],
}
