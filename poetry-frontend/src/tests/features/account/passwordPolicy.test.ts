/*
 * File: passwordPolicy.test.ts
 * Purpose: Ensure password policy constant enforced at 6 chars.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { z } from 'zod'
import { MIN_PASSWORD_LENGTH } from '../../../shared/security/passwordPolicy'

const Schema = z.object({ pw: z.string().min(MIN_PASSWORD_LENGTH) })

describe('password policy', () => {
  it('accepts length 6', () => {
    const r = Schema.safeParse({ pw: 'a'.repeat(6) })
    expect(r.success).toBe(true)
  })
  it('rejects length 5', () => {
    const r = Schema.safeParse({ pw: 'a'.repeat(5) })
    expect(r.success).toBe(false)
  })
})
