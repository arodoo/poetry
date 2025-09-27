/*
 * File: public-forgot-passwordQueries.test.ts
 * Purpose: Ensure forgot-password query keys stay stable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { publicForgotPasswordKeys } from '../../../../features/public-forgot-password'

describe('publicForgotPasswordKeys', () => {
  it('builds request key deterministically', () => {
    expect(publicForgotPasswordKeys.request()).toEqual([
      'publicForgotPassword',
      'request',
    ])
  })
})
