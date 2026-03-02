/*
 * File: jest.config.js
 * Purpose: Jest configuration for the mobile app test suite.
 * Uses ts-jest with babel-jest for React Native transforms.
 * Maps path aliases and mocks native modules for unit tests.
 * All Rights Reserved. Arodi Emmanuel
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/tests'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      { tsconfig: 'tsconfig.json' },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: [
    '<rootDir>/src/tests/setup/jestSetup.ts',
  ],
}
