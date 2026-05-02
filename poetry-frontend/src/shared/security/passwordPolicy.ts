/*
 * File: passwordPolicy.ts
 * Purpose: Centralizes frontend password rules.
 * It mirrors backend checks when client data is enough.
 * It keeps account form validation consistent.
 * All Rights Reserved. Arodi Emmanuel
 */
export const MIN_PASSWORD_LENGTH = 12
export const MAX_PASSWORD_LENGTH = 72

const UPPERCASE = /[A-Z]/
const LOWERCASE = /[a-z]/
const DIGIT = /[0-9]/
const SYMBOL = /[^A-Za-z0-9]/
const REPEAT_4 = /(.)\1{3,}/
const BLACKLIST = new Set([
  'Password123!',
  'Welcome2024!',
  'ChangeMe!1',
])
const POLICY_ERROR_KEY = 'error.password.policy.invalid'

export function isPasswordLengthValid(
  candidate: string
): boolean {
  return (
    candidate.length >= MIN_PASSWORD_LENGTH &&
    candidate.length <= MAX_PASSWORD_LENGTH
  )
}

export function isPasswordPolicyValid(
  candidate: string
): boolean {
  return (
    isPasswordLengthValid(candidate) &&
    UPPERCASE.test(candidate) &&
    LOWERCASE.test(candidate) &&
    DIGIT.test(candidate) &&
    SYMBOL.test(candidate) &&
    !REPEAT_4.test(candidate) &&
    !BLACKLIST.has(candidate)
  )
}

export function assertPasswordValid(
  candidate: string
): void {
  if (!isPasswordPolicyValid(candidate)) {
    throw new Error(POLICY_ERROR_KEY)
  }
}
