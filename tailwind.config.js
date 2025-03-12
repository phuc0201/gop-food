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
        '5x': 'rgba(149, 157, 165, 0.2) 0px 8px 24px;',
        '6x': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;',
        'header': '0 1px 1px rgba(28, 28, 28, 0.1)'
      },
      colors: {
        'primary': '#00b14f',
        'white': '#fff',
        'white1': '#f1f1f5',
        'blue1': '#4a40e7',
        'blue2': '#e9eeff',
        'red1': '#ef5350',
        'red2': '#ef3e3e',
        'green1': '#42cd74',
        'green2': '#4CE5B1',
        'green3': '#ace3c4',
        'green4': '#ace3c426',
        'green5': '#ccefdb',
        'green6': '#ace3c42b',
        'grey1': '#717176',
        'grey2': '#676767',
        'orange1': '#ff7903',
        'black1': '#1E1D23',
        'yellow1': '#FC8A06',
      },
    },
    screens: {
      'xs': '376px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1500px',
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

