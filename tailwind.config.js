/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#c2e0ff',
          300: '#9dccff',
          400: '#72b2ff',
          500: '#4b94ff',
          600: '#3377f5',
          700: '#2b60db',
          800: '#264fb1',
          900: '#25438a',
        },
        secondary: {
          50: '#f7f9ff',
          100: '#eef3ff',
          200: '#dee6ff',
          300: '#c2d3ff',
          400: '#a0b9ff',
          500: '#7e9fff',
          600: '#6484ff',
          700: '#546ce6',
          800: '#455ab8',
          900: '#3b4d97',
        },
        finance: {
          50: '#f0faf4',
          100: '#ddf3e4',
          200: '#bce7cb',
          300: '#8ad5ac',
          400: '#57bd87',
          500: '#38a169',
          600: '#2a8554',
          700: '#256c46',
          800: '#21573b',
          900: '#1e4a33',
        },
        corporate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 