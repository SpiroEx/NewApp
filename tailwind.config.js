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
        // template - change only the colors / recomplie to see changes
        input_border: "#b9b9b9",
        loading_icon: "#b9b9b9",
        button: "#0dbc73",
        header_modal: "#0dbc73",
        link: "#92b8ff",
        bg: "#3E3E3E",
        text: "#FFFFFF",

        // custom - from Figma
        bg_icon: '#F3F3EB',
        black: '#000000',
        white: '#FFFFFF',

      },
    },
    
  },
  plugins: [],
}
