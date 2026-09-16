/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
      colors: {
        navy: '#0f172a',
        primary: '#1d4ed8',
        teal: '#14b8a6',
        skybg: '#edf7ff',
        mint: '#e6fff8',
        accent: '#f59e0b',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
}
