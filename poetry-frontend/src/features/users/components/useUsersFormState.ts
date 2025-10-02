/*
 * File: useUsersFormState.ts
 * Purpose: Custom hook for managing users form state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import type { UsersFormValues } from './UsersForm'

export interface UsersFormState {
  readonly username: string
  readonly email: string
  readonly locale: string
  readonly rolesString: string
  readonly password: string
  readonly setUsername: (value: string) => void
  readonly setEmail: (value: string) => void
  readonly setLocale: (value: string) => void
  readonly setRolesString: (value: string) => void
  readonly setPassword: (value: string) => void
}

export function useUsersFormState(
  initialValues?: Partial<UsersFormValues>
): UsersFormState {
  const [username, setUsername] = useState<string>(
    initialValues?.username ?? ''
  )
  const [email, setEmail] = useState<string>(initialValues?.email ?? '')
  const [locale, setLocale] = useState<string>(initialValues?.locale ?? 'en')
  const [rolesString, setRolesString] = useState<string>(
    initialValues?.roles?.join(',') ?? 'ADMIN'
  )
  const [password, setPassword] = useState<string>(
    initialValues?.password ?? ''
  )
  return {
    username,
    email,
    locale,
    rolesString,
    password,
    setUsername,
    setEmail,
    setLocale,
    setRolesString,
    setPassword,
  }
}
