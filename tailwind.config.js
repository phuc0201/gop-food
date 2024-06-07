/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
        "slide-right": "slide-right .7s ease-out 0.7s infinite both",
        "shadow-drop-center": "shadow-drop-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both"
      },
      keyframes: {
        "slide-right": {
          "0%": {
            transform: "translateX(0)"
          },
          to: {
            transform: "translateX(5px)"
          }
        },
        "shadow-drop-center": {
          "0%": {
            "box-shadow": "0 0 0 0 transparent"
          },
          to: {
            "box-shadow": "0 0 20px 0 rgba(0, 177, 79, .35)"
          }
        }

      },
      boxShadow: {
        '1x': '0px 5px 15px 0px rgba(0,0,0,0.15)',
        '2x': '0px 18px 1px -15px rgba(255,255,255,0.5)',
        '3x': 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;',
        '4x': '30px 30px 60px #A6ABBD',
        'header': '0 1px 1px rgba(28, 28, 28, 0.1)'
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
        'green3': '#ace3c426',
        'green4': '#ccefdb',
        'green5': '#ace3c42b',
        'grey': '#717176',
        'grey1': '#676767',
        'orange1': '#ff7903',
        'black1': '#1E1D23',
      },
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
  plugins: [
    require('flowbite/plugin')
  ],
}

