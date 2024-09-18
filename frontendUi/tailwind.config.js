module.exports = {
  content: [
    './index.html', // Point to the index.html in the root directory
    './src/**/*.{js,jsx,ts,tsx}', // Include all source files for React components
  ],
  theme: {
    extend: {
      colors: {
        brightPurple: 'hsl(285, 55%, 62%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(240, 29%, 17%)',
      },
    },
  },
  plugins: [],
};
