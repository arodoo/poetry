/*
 * File: UsersSchemas.test.ts
 * Purpose: Validate admin users schemas for happy and failure cases.
 * Tests aligned with generated SDK types requirements.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import {
  CreateUserSchema,
  UpdateUserRolesSchema,
} from '../../../../features/users'

describe('UsersSchemas', () => {
  it('accepts a valid create payload', () => {
    const result = CreateUserSchema.safeParse({
      firstName: 'Aaron',
      lastName: 'Smith',
      username: 'aaron',
      email: 'aaron@example.com',
      locale: 'en',
      roles: ['admin'],
      password: 'strong-password',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty roles on update', () => {
    const result = UpdateUserRolesSchema.safeParse({
      roles: [],
      version: 'v1',
    })
    expect(result.success).toBe(false)
  })
})
