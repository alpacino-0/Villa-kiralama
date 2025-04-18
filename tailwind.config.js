/** @type {import('@tailwindcss/postcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'inn-black': '#000000',
        'inn-navy': '#100049',
        'inn-purple': '#180675',
        'inn-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-nunito)'],
        heading: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
} 