/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gd-black': '#050505',
        'gd-dark-gray': '#111111',
        
        'gd-blue': '#0066ff', 
        'gd-red': '#ff3300', 
        'gd-gold': '#ffcc00',
      },
      backgroundImage: {
        'gd-gradient-vs': 'linear-gradient(to right, rgba(0,102,255,0.1), transparent, rgba(255,51,0,0.1))',
      },
      fontFamily: {
        'gundam': ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 15px rgba(0, 102, 255, 0.4)',
        'glow-red': '0 0 15px rgba(255, 51, 0, 0.4)',
      }
    },
  },
  plugins: [],
}