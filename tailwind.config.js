/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#091322',
          900: '#0F1E36',
          800: '#172C4C',
          700: '#233F68',
          100: '#EDF2F7',
          50: '#F5F8FA',
        },
        emerald: {
          primary: '#1F8A70',
          dark: '#166E58',
          light: '#28A789',
          soft: '#EEF8F5',
          border: '#BFDFD6',
        },
        coral: {
          primary: '#D9534F',
          dark: '#B53D3A',
          soft: '#FDF2F2',
          border: '#F8C8C6',
        },
        amber: {
          academic: '#92400E',
          soft: '#FEF3C7',
          border: '#FDE68A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
