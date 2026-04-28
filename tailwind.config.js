/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#0B0B15',
        'bg-surface': '#121224',
        'cyber-purple': '#7B2FF7',
        'cyber-pink': '#FF2E9F',
        'cyber-blue': '#2D9CFF',
        'text-primary': '#EAEAF0',
        'muted': 'rgba(234, 234, 240, 0.6)',
      },
      fontFamily: {
        'display': ['Outfit', 'sans-serif'],
        'body': ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
