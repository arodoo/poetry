/*
 * File: usersFormHelpers.ts
 * Purpose: Helper functions to process form data and reduce component lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UsersFormValues } from './UsersForm'

export function buildFormData(
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  locale: string,
  rolesString: string,
  password: string,
  showPassword: boolean,
  version?: string
): UsersFormValues {
  const roles: string[] = rolesString
    .split(',')
    .map((r: string): string => r.trim())
    .filter((r: string): boolean => r.length > 0)
  const formData: {
    firstName: string
    lastName: string
    username: string
    email: string
    locale: string
    roles: string[]
    version?: string
    password?: string
  } = {
    firstName,
    lastName,
    username,
    email,
    locale,
    roles,
  }
  if (version) {
    formData.version = version
  }
  if (showPassword && password) {
    formData.password = password
  }
  return formData as UsersFormValues
}
