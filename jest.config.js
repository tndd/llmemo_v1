const nextJest = require('next/jest')({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // If you have a jest.setup.js, add it here:
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Commented out as jest.setup.js does not exist
  testEnvironment: 'jest-environment-jsdom',
  // Add any other Jest specific configurations here
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = nextJest(customJestConfig);
