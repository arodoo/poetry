/*
 * File: devtoolsApi.test.ts
 * Purpose: Tests for devtools API.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { devtoolsApi } from '../../../../../src/features/devtools/api/devtoolsApi'

describe('devtoolsApi', () => {
  it('checkHealth returns true', async () => {
    const result = await devtoolsApi.checkHealth()
    expect(result).toBe(true)
  })
})
