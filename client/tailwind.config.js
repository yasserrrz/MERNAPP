/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        bgColor: 'var(--color-bg)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        blue: 'var(--color-blue)',
        white: 'var(--color-white)',
        ascent1: 'var(--color-ascent1)',
        ascent2: 'var(--color-ascent2)',
      },
    },
  },
  plugins: [],
}