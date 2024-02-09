/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem',
        '3xs': '.5rem',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        // constant - do not change
        link: "#15233D",

        // required - change as needed
        light_primary: "#479EAA",
        darker_primary: "#19989E",
        darkest_primary: "#146266",

        // custom - from Figma
        bg: "#434343",
        gray: "#434343",
        white: "#FFFFFF",
        green: "#CCEDCD",
        violet: "#ECDCFE",
        yellow: "#FFEEC0",
        blue: "#B5E0FA",
        red: "#FDC1C1",
      },
    },
    
  },
  plugins: [],
}
