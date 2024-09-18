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
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
      },
    },
  },
  plugins: [],
};
