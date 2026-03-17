/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F1B2D',
          mid:     '#1A2E4A',
          light:   '#243D5C',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E8D5A0',
          dark:    '#8B6914',
        },
        cream: {
          DEFAULT: '#FAF8F3',
          dark:    '#F0EDE4',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
