/*
 * File: useUsersAddressState.ts
 * Purpose: Address sub-state hook for UsersFormState.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import type { UsersFormValues } from './UsersForm'

export interface UsersAddressState {
  readonly addressLine1: string
  readonly addressLine2: string
  readonly addressCity: string
  readonly addressState: string
  readonly addressZip: string
  readonly addressCountry: string
  readonly setAddressLine1: (value: string) => void
  readonly setAddressLine2: (value: string) => void
  readonly setAddressCity: (value: string) => void
  readonly setAddressState: (value: string) => void
  readonly setAddressZip: (value: string) => void
  readonly setAddressCountry: (value: string) => void
}

export function useUsersAddressState(
  initialValues?: Partial<UsersFormValues>
): UsersAddressState {
  const [addressLine1, setAddressLine1] = useState(
    initialValues?.addressLine1 ?? ''
  )
  const [addressLine2, setAddressLine2] = useState(
    initialValues?.addressLine2 ?? ''
  )
  const [addressCity, setAddressCity] = useState(
    initialValues?.addressCity ?? ''
  )
  const [addressState, setAddressState] = useState(
    initialValues?.addressState ?? ''
  )
  const [addressZip, setAddressZip] = useState(
    initialValues?.addressZip ?? ''
  )
  const [addressCountry, setAddressCountry] = useState(
    initialValues?.addressCountry ?? ''
  )
  return {
    addressLine1, addressLine2, addressCity,
    addressState, addressZip, addressCountry,
    setAddressLine1, setAddressLine2, setAddressCity,
    setAddressState, setAddressZip, setAddressCountry,
  }
}
