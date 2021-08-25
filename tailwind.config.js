module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './organisms/**/*.{js,ts,jsx,tsx}', './atom/**/*.{js,ts,jsx,tsx}', './templates/**/*.{js,ts,jsx,tsx}', './molecules/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        topography:
          "url('/img/topography.svg')",
      }),
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            h1: theme('colors.gray.50'),
            a: {
              color: theme('colors.indigo.400')
            },
            code: {
              color: theme('colors.green.400'),
              fontWeight: "400",
              "border-radius": "0.25rem"
            },
            "code::before": {
              content: '""',
              "padding-left": "0.25rem"
            },
            "code::after": {
              content: '""',
              "padding-right": "0.25rem"
            },
            // "pre code::before": {
            //   "padding-left": "unset"
            // },
            // "pre code::after": {
            //   "padding-right": "unset"
            // },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
