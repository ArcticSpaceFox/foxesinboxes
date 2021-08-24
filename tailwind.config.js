module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './organisms/**/*.{js,ts,jsx,tsx}', './atom/**/*.{js,ts,jsx,tsx}', './templates/**/*.{js,ts,jsx,tsx}', './molecules/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        topography:
          "url('/img/topography.svg')",
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
