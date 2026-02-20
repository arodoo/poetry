/*
 * File: useUsersFormState.ts
 * Purpose: Custom hook for managing users form state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import type { UsersFormValues } from './UsersForm'
import {
  useUsersAddressState,
  type UsersAddressState,
} from './useUsersAddressState'

export interface UsersFormState extends UsersAddressState {
  readonly firstName: string
  readonly lastName: string
  readonly username: string
  readonly email: string
  readonly locale: string
  readonly rolesString: string
  readonly password: string
  readonly status: 'active' | 'inactive'
  readonly birthDate: string
  readonly gender: string
  readonly phone: string
  readonly setFirstName: (value: string) => void
  readonly setLastName: (value: string) => void
  readonly setUsername: (value: string) => void
  readonly setEmail: (value: string) => void
  readonly setLocale: (value: string) => void
  readonly setRolesString: (value: string) => void
  readonly setPassword: (value: string) => void
  readonly setStatus: (value: 'active' | 'inactive') => void
  readonly setBirthDate: (value: string) => void
  readonly setGender: (value: string) => void
  readonly setPhone: (value: string) => void
}

export function useUsersFormState(
  initialValues?: Partial<UsersFormValues>
): UsersFormState {
  const [firstName, setFirstName] = useState(initialValues?.firstName ?? '')
  const [lastName, setLastName] = useState(initialValues?.lastName ?? '')
  const [username, setUsername] = useState(initialValues?.username ?? '')
  const [email, setEmail] = useState(initialValues?.email ?? '')
  const [locale, setLocale] = useState(initialValues?.locale ?? 'en')
  const [rolesString, setRolesString] = useState(
    initialValues?.roles?.join(',') ?? ''
  )
  const [password, setPassword] = useState(initialValues?.password ?? '')
  const [status, setStatus] = useState<'active' | 'inactive'>(
    initialValues?.status ?? 'active'
  )
  const [birthDate, setBirthDate] = useState(initialValues?.birthDate ?? '')
  const [gender, setGender] = useState(initialValues?.gender ?? '')
  const [phone, setPhone] = useState(initialValues?.phone ?? '')
  const address = useUsersAddressState(initialValues)
  return {
    firstName, lastName, username, email, locale,
    rolesString, password, status,
    birthDate, gender, phone,
    ...address,
    setFirstName, setLastName, setUsername, setEmail,
    setLocale, setRolesString, setPassword, setStatus,
    setBirthDate, setGender, setPhone,
  }
}
