/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    colors: {
      cms_1: '#F5E8C7',
      cms_2: '#ECCCB2',
      cms_3: '#DEB6AB',
      cms_4: '#AC7088',
      cms_black: '#1D1D1D',
      cms_white: '#F5F5DC'
    },
    extend: {
      keyframes: {
        notification: {
          '0%': { background: '#F5E8C7' },
          '50%': { background: '#AC7088' },
          '100%': { background: '#AC7088' },
        },
      },
    },
  },
  plugins: [],
}
