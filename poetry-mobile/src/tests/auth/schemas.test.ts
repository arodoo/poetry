/*
 * File: schemas.test.ts
 * Purpose: Tests Zod validation for UserProfile schema.
 * Ensures invalid data is rejected at runtime boundaries.
 * All Rights Reserved. Arodi Emmanuel
 */
import { UserProfileSchema } from '../../shared/auth/UserProfile'

describe('UserProfileSchema', () => {
  it('parses valid profile', () => {
    const result = UserProfileSchema.parse({
      id: 'u-1',
      email: 'test@test.com',
      displayName: 'Test',
    })
    expect(result.id).toBe('u-1')
  })

  it('rejects missing email', () => {
    expect(() =>
      UserProfileSchema.parse({
        id: 'u-1',
        displayName: 'Test',
      })
    ).toThrow()
  })

  it('rejects invalid email format', () => {
    expect(() =>
      UserProfileSchema.parse({
        id: 'u-1',
        email: 'not-an-email',
        displayName: 'Test',
      })
    ).toThrow()
  })
})
