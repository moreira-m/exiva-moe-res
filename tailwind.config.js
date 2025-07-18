/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#242424',
        'text-default': 'rgba(255, 255, 255, 0.87)',
        'link': '#646cff',
        'link-hover': '#535bf2',
        'link-light-hover': '#747bff',
        'button-dark-bg': '#1a1a1a',
        'text-dark': '#213547',
        'bg-light': '#ffffff',
        'button-light-bg': '#f9f9f9',
        'app-bg': '#0a2f36',
        'surface': '#0a2f36',
        'card-bg': '#144952',
        'border-main': '#F69192',
        'accent': '#F69192',
        'accent-hover': '#a94e5b',
        'accent-green': '#A8C090',
        'gray': '#808080',
        'gray-dark': '#888',
        'white': '#ffffff',
        'gray-light': '#ccc',
        'black': '#000000',
        'red-600': '#dc2626',
        'gray-100': '#f3f4f6',
        'gray-200': '#e5e7eb',
        'gray-400': '#9ca3af',
        'gray-500': '#6b7280',
        'gray-600': '#4b5563',
        'gray-900': '#111827',
        'react-blue': '#61dafb',
        'blue-600': '#2563eb',
        'link-alpha': '#646cffaa',
        'react-blue-alpha': '#61dafbaa',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}

