/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-background': "url('assets/img/auth-background.jpg')",
        'home-background': "url('assets/img/home-background.jpg')",
      }
    },
  },
  plugins: [],
}