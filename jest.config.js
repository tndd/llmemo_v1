module.exports = {
  testEnvironment: 'jsdom', // For testing React components that interact with the DOM
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Use babel-jest for transformations
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Optional: Setup files for global mocks or test setup
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Example for a setup file
  // Optional: Module name mapper for handling CSS, images, etc., if not handled by Babel/Webpack simulation
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks CSS imports
    // Add more mappers if needed for other static assets
  },
};
