/*
 * File: usersFormHelpers.ts
 * Purpose: Helper functions to process form data and reduce component lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UsersFormValues } from './UsersForm'
import type { UsersFormState } from './useUsersFormState'

export function buildFormData(
  state: UsersFormState,
  showPassword: boolean
): UsersFormValues {
  const roles: string[] = state.rolesString
    .split(',')
    .map((r: string): string => r.trim())
    .filter((r: string): boolean => r.length > 0)
  const formData: UsersFormValues = {
    firstName: state.firstName,
    lastName: state.lastName,
    username: state.username,
    email: state.email,
    locale: state.locale,
    roles,
    status: state.status,
    birthDate: state.birthDate || undefined,
    gender: state.gender || undefined,
    phone: state.phone || undefined,
    addressLine1: state.addressLine1 || undefined,
    addressLine2: state.addressLine2 || undefined,
    addressCity: state.addressCity || undefined,
    addressState: state.addressState || undefined,
    addressZip: state.addressZip || undefined,
    addressCountry: state.addressCountry || undefined,
  }
  if (showPassword && state.password) {
    return { ...formData, password: state.password }
  }
  return formData
}
