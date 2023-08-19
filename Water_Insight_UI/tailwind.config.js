/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "hsla(218,80%,17%,1)",
          500: "hsla(218,80%,17%,.8)",
          400: "hsla(218,80%,17%,.6)",
          300: "hsla(218,80%,17%,.4)",
          200: "hsla(218,80%,17%,.2)",
          100: "hsla(218,80%,17%,.1)",
        }
      },
      boxShadow: {
        'light': '0 0 2px rgba(0, 0, 0, .3)',
        'outer': '0 1px 4px rgba(0, 0, 0, .3)',
        'intensed': "0 0 9px rgba(0, 0, 0, .3)",
        "spread": "0 0 20px 4px rgb(154 161 177 / 15%), 0 4px 80px -8px rgb(36 40 47 / 25%), 0 4px 4px -2px rgb(91 94 105 / 15%)"
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
      },
      animation: {
        'enter-opacity': 'enterOpacity 300ms ease-out',
        'enter': 'enter 300ms ease-out',
        'scale': 'scale 200ms ease-in-out',
      },
      keyframes: {
        enterOpacity: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        enter: {
          '0%': { opacity: '0', transform: 'scale(.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scale: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        }
      },
    },
  },
  plugins: [],
}
