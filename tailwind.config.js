/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#826D3F',
        ivory: '#F8F5EC',
        champagne: '#C8B27D',
        olive: '#393B29',
        cream: '#E9DFC9',
      },
      fontFamily: {
        script: ['"Pinyon Script"', '"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        label: ['Cinzel', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
