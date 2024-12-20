module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-color': '#ff6b00',
        'background-light': '#f9f9f9',
        'text-dark': '#2c3e50',
        'text-light': '#ffffff',
        'secondary': '#007bff',
      },
      backgroundImage: {
        'hero-pattern': "url('path/to/hero-pattern.jpg')",
      },
    },
  },
  plugins: [],
}