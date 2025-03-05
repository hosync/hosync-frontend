import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    maxWidth: {
      large: '1600px',
      xLarge: '1920px'
    },
    extend: {
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))'
      },
      colors: {
        caribbean: '#01C98F',
        cerulean: '#007fb2',
        cinnabar: '#E23428',
        codGray: '#111',
        colonial: '#FFEBBD',
        dodger: '#049EDC',
        eden: '#135846',
        elephant: '#104235',
        emerald: '#43D440',
        fire: '#F47C06',
        forest: '#2BA829',
        mineShaft: '#333333',
        pacific: '#04B0B6',
        palm: '#0e250a',
        pastel: '#68E365',
        salem: '#038C48',
        seaweed: '#193314',
        spring: '#38FF9C',
        thunderbird: '#C5261B',
        transparent: 'transparent',
        turquoise: '#00C8F9',
        wild: '#00CF68',
        wildSand: '#CCC'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        monserrat: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        xxs: '0.65rem'
      },
      screens: {
        '3xl': '1793px'
      }
    }
  },
  plugins: []
}
export default config
