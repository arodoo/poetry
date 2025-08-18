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
    coverage: {
      reporter: ['text', 'html'],
    },
  },
})
