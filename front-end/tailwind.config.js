/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '390px',
        'xs' : '425px',
      },
    },
    plugins: [],
  }
}

