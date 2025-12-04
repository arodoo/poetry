/*
 * File: useUsersFormState.ts
 * Purpose: Custom hook for managing users form state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import type { UsersFormValues } from './UsersForm'

export interface UsersFormState {
  readonly firstName: string
  readonly lastName: string
  readonly username: string
  readonly email: string
  readonly locale: string
  readonly rolesString: string
  readonly password: string
  readonly status: 'active' | 'inactive'
  readonly setFirstName: (value: string) => void
  readonly setLastName: (value: string) => void
  readonly setUsername: (value: string) => void
  readonly setEmail: (value: string) => void
  readonly setLocale: (value: string) => void
  readonly setRolesString: (value: string) => void
  readonly setPassword: (value: string) => void
  readonly setStatus: (value: 'active' | 'inactive') => void
}

export function useUsersFormState(
  initialValues?: Partial<UsersFormValues>
): UsersFormState {
  const [firstName, setFirstName] = useState<string>(
    initialValues?.firstName ?? ''
  )
  const [lastName, setLastName] = useState<string>(
    initialValues?.lastName ?? ''
  )
  const [username, setUsername] = useState<string>(
    initialValues?.username ?? ''
  )
  const [email, setEmail] = useState<string>(initialValues?.email ?? '')
  const [locale, setLocale] = useState<string>(initialValues?.locale ?? 'en')
  const [rolesString, setRolesString] = useState<string>(
    initialValues?.roles?.join(',') ?? ''
  )
  const [password, setPassword] = useState<string>(
    initialValues?.password ?? ''
  )
  const [status, setStatus] = useState<'active' | 'inactive'>(
    initialValues?.status ?? 'active'
  )

  return {
    firstName,
    lastName,
    username,
    email,
    locale,
    rolesString,
    password,
    status,
    setFirstName,
    setLastName,
    setUsername,
    setEmail,
    setLocale,
    setRolesString,
    setPassword,
    setStatus,
  }
}
