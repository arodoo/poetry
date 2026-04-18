/*
 * File: purgePatterns.mjs
 * Purpose: Shared list of test-data prefixes consumed by the
 * standalone Node purge script. Mirrors the TS patterns used by
 * the Playwright teardown so both stay in sync.
 * All Rights Reserved. Arodi Emmanuel
 */

export const USERNAME_PREFIXES = [
  'persist-',
  'cascade-',
  'cascfull-',
  'test-',
  'testuser',
  'admin_',
  'e2e_',
  'e2e-user-',
  'e2euser_',
  'deletetest',
  'gerente',
]

export const SELLER_CODE_PREFIXES = [
  'SC-',
  'TEST-',
  'DELETE-TEST-',
  'DELTEST',
  'E2E-',
  'E2E-SC-',
  'SC-TEST-',
]

export const SUBSCRIPTION_PREFIXES = [
  'TEST-',
  'E2E-',
  'TestSub',
  'DeleteTest',
]
export const THEME_PREFIXES = ['E2E-']

export function startsWithAny(value, prefixes) {
  return prefixes.some((p) => String(value).startsWith(p))
}
