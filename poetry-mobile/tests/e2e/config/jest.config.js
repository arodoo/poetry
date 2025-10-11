/*
 * File: jest.config.js
 * Purpose: Jest configuration for Detox e2e tests.
 * Configures test environment, timeouts, and file patterns.
 * Copyright 2025 - All rights reserved.
 */

module.exports = {
  rootDir: '../../..',
  testMatch: ['<rootDir>/tests/e2e/specs/**/*.spec.ts'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: ['detox/runners/jest/reporter'],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
