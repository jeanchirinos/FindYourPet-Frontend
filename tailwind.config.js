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
        primary: '#f27140',
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
