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
        bg: "#434343",

        // custom - from Figma
        white: '#FFFFFF',
        light_dark: '#2E2A29',
        dark_green: '#75A843',
        dark: '#231E1C',
        orange: '#FD7753',
        light_orange: '#D4684A',
        black: '#000000',
        green: '#83BF4F',
        black: '#1F1E31',
        white: '#FFFFFF',
        light_blue: '#C4E2FF',
        night: '#233B52',
        gray: '#ECF3F8',
        yellow: '#FED402',
        blue: '#24609B',
        blog_green: '#ECFEDB',
        blog_green_dark: '#8AD109',
        blog_yellow: '#FFFEDC',
        blog_yellow_dark: '#E5F313',
        blog_blue: '#DCF1FF',
        blog_blue_dark: '#139FD2',
        blog_pink: '#FFDBF0',
        blog_pink_dark: '#FE76E7',
        blog_bluegreen: '#DBFEF2',
        blog_bluegreen_dark: '#0BD4B1',
        blog_gray: '#F4F4F4',
        blog_gray_dark: '#242525',
        black: '#1F1E31',
        white: '#FFFFFF',
        light_blue: '#C4E2FF',
        night: '#233B52',
        gray: '#ECF3F8',
        yellow: '#FED402',
        blue: '#24609B',
        blog_green: '#ECFEDB',
        blog_green_dark: '#8AD109',
        blog_yellow: '#FFFEDC',
        blog_yellow_dark: '#E5F313',
        blog_blue: '#DCF1FF',
        blog_blue_dark: '#139FD2',
        blog_pink: '#FFDBF0',
        blog_pink_dark: '#FE76E7',
        blog_bluegreen: '#DBFEF2',
        blog_bluegreen_dark: '#0BD4B1',
        blog_gray: '#F4F4F4',
        blog_gray_dark: '#242525',
      },
    },
    
  },
  plugins: [],
}
