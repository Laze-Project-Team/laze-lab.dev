const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './src',
});

/**
 * @type {import('@jest/types').Config.InitialOptions}
 **/
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/e2e/'],
  moduleNameMapper: { 'src/(.*)': '<rootDir>/src/$1' }, // Handle module aliases (this will be automatically configured for you soon)
};

module.exports = createJestConfig(customJestConfig);
