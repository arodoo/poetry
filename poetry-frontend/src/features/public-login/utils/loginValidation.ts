/*
 * File: loginValidation.ts
 * Purpose: Small helper to map validation errors to simple field error
 * messages. All Rights Reserved. Arodi Emmanuel
 */

export function mapLoginErrors(errors: unknown[]): {
  username?: string
  password?: string
} {
  const out: { username?: string; password?: string } = {}
  try {
    errors.forEach(function (err: unknown): void {
      const e: { path?: unknown[] } = err as { path?: unknown[] }
      if (Array.isArray(e.path) && e.path[0] === 'username') {
        out.username = 'Username is required'
      }
      if (Array.isArray(e.path) && e.path[0] === 'password') {
        out.password = 'Password is required'
      }
    })
  } catch (_err: unknown) {
    // noop - preserve default empty errors
    void _err
  }

  return out
}
