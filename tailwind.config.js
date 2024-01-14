/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        '1x': '0px 5px 15px 0px rgba(0,0,0,0.15)',
        '2x': '0px 18px 1px -15px rgba(255,255,255,0.5)',
        '3x': '20px 20px 40px #A6ABBD',
        '4x': '30px 30px 60px #A6ABBD',
      },
      colors: {
        'primary': '#00b14f',
        'white': '#fff',
        'white1': '#f1f1f5',
        'blue': '#4a40e7',
        'blue1': '#e9eeff',
        'red': '#ef5350',
        'red1': '#ef3e3e',
        'green': '#42cd74',
        'green1': '#4CE5B1',
        'green2': '#ace3c4',
        'grey': '#717176',
        'grey1': '#676767',
        'orange1': '#ff7903',
      }
    },
    screens: {
      'xs': '376px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1600px',
    },
  },
  plugins: [],
}

