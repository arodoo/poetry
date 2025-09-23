/*
 File: vitest.config.ts
 Purpose: Vitest configuration for frontend tests with jsdom environment
 and basic coverage reporters to align with repo CI rules. All Rights
 Reserved. Arodi Emmanuel
*/
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [
      'tests/e2e/**',
      'node_modules/**',
      'dist/**',
      '.git/**',
      '.idea/**',
      '.cache/**',
    ],
    include: [
      'src/tests/**/*.test.{ts,tsx}',
      'src/tests/**/*.spec.{ts,tsx}',
      'tests/**/*.test.{ts,tsx}',
      'tests/**/*.spec.{ts,tsx}',
    ],
    env: {
      VITE_API_BASE_URL: 'https://example.com',
      VITE_LOG_LEVEL: 'info',
      VITE_FEATURE_AUTH: 'true',
      VITE_HTTP_TIMEOUT_MS: '5000',
      VITE_HTTP_RETRY_MAX_ATTEMPTS: '3',
      VITE_HTTP_RETRY_BACKOFF_MS: '200',
      VITE_DEFAULT_LOCALE: 'es',
    },
    setupFiles: ['src/tests/setupTests.ts'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})
