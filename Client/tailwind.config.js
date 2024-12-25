import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23373240' fill-opacity='0.53'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E\")",
      },
      colors :{

        'custom-black' : '#000000',
      },
      animation : {
        'loop-scroll' : "loop-scroll 25s  linear infinite",
      },
      keyframes : {
        'loop-scroll' : {
         from : { transform : "translateX(0)"},
         to : { transform :  "translateX(-100%)" }
        }
      },
      fontFamily : {
          "title-font" : ["Poppins" , "sans-serif"]
      }
    },
  },
  plugins: [],
}

