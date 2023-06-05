/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Noto Sans', "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
    },
    extend: {
      animation: {
        'slide-up': 'slideUp 0.5s ease-out'
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(50%)' },
          '100%': { transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}