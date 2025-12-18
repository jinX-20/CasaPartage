/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{html,js,jsx,tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        acme: ['Acme', 'sans-serif'],
        julee: ['Julee', 'sans-serif'],
        abeezee: ['ABeeZee', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      screens: {
        'md-custom-lg': '1024px',
        'md-custom-md': '768px',
        'md-custom-sm': '480px',
        'md-custom-xsm': '320px',
      },
        //'md-custom-lg': '686px',
        // 'md-custom-md': '580px',
        // 'md-custom-sm': '390px',
        // 'md-custom-xsm': '0px',
      
    },
  },
  plugins: [],
}

