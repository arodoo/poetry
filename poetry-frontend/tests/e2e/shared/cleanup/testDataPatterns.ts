/*
 * File: testDataPatterns.ts
 * Purpose: Centralised list of username, seller-code, theme and
 * subscription patterns used by Playwright specs to seed data.
 * The teardown matcher uses these to delete leftover rows.
 * All Rights Reserved. Arodi Emmanuel
 */

export const TEST_USERNAME_PREFIXES: readonly string[] = [
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

export const TEST_SELLER_CODE_PREFIXES: readonly string[] = [
  'SC-',
  'TEST-',
  'DELETE-TEST-',
  'DELTEST',
  'E2E-',
  'E2E-SC-',
  'SC-TEST-',
]

export const TEST_THEME_PREFIXES: readonly string[] = ['E2E-']

export const TEST_SUBSCRIPTION_PREFIXES: readonly string[] = [
  'TEST-',
  'E2E-',
  'TestSub',
  'DeleteTest',
]

export function startsWithAny(
  value: string,
  prefixes: readonly string[]
): boolean {
  return prefixes.some((p) => value.startsWith(p))
}
