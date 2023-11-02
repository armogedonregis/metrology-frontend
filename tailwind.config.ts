import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        sans: ['var(--font-sans)'],
      },
      backgroundImage: {
        bgHero: "url('/assets/images/hero_bg.png')",
        bgGrad: "radial-gradient(124% 170.77% at 20.36% 65.9%, #0024CB 0%, #4CA5FF 50.57%, #F2FAFF 100%)",
        bgBtn: "linear-gradient(180deg, #062ECF 0%, #0C299F 100%), radial-gradient(44.72% 313.37% at 50% 50%, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)",
        bgReq: "linear-gradient(90deg, #175CE5 100%, #2873C8 100%)",
      },
      fontSize: {
        '8pxl': ['8px', '8px'],
      },
      borderRadius: {
        '20xl': '20px',
        '100xl': '100px',
      },
      colors: {
        primary: {
          DEFAULT: "#175CE5",
          btn: "#2873C8",
          raiting: "#1F67D9",
        },
        second: {
          DEFAULT: "#0A1833",
        },
        dark: {
          DEFAULT: "#2F3338",
          gray: "#AAAAAA",
        },
        light: {
          DEFAULT: "#F2F9FF",
          bord: "#FFFFFF33"
        },
      },
    },
  },
  plugins: [],
}
export default config
