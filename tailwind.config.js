/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",    // Include all files in the src/app folder
    "./src/pages/**/*.{js,ts,jsx,tsx}",  // Include all files in the src/pages folder
    "./src/components/**/*.{js,ts,jsx,tsx}", // Include all components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
