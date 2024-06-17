module.exports = {
    testEnvironment: 'jsdom', // Ensures Jest uses jsdom environment
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest", // Use babel-jest to transform JS/JSX files
    },
    moduleNameMapper: {
      '^axios$': require.resolve('axios'), // Correctly mock axios
    },
  };
  