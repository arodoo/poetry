/*
 * File: passwordPolicy.ts
 * Purpose: Centralized password policy constants and validation helpers.
 * All Rights Reserved. Arodi Emmanuel
 */
export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 72 // bcrypt typical safe upper bound

export function isPasswordLengthValid(candidate: string): boolean {
  return (
    candidate.length >= MIN_PASSWORD_LENGTH &&
    candidate.length <= MAX_PASSWORD_LENGTH
  )
}

export function assertPasswordValid(candidate: string): void {
  if (!isPasswordLengthValid(candidate)) {
    throw new Error('error.password.length.invalid')
  }
}

const passwordPolicyDescriptionSegments: readonly string[] = [
  `Password length must be between ${String(MIN_PASSWORD_LENGTH)}`,
  `and ${String(MAX_PASSWORD_LENGTH)} characters.`,
]

export const passwordPolicyDescription: string =
  passwordPolicyDescriptionSegments.join(' ')
