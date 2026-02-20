/*
 * File: useUserAddressForm.ts
 * Purpose: Manages address field state. Loads existing data when a userId
 * is provided and exposes saveForUser() to upsert.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useEffect } from 'react'
import { getUserAddress, upsertUserAddress } from '../api/userAddressApi'

export interface UserAddressFormState {
  readonly line1: string
  readonly line2: string
  readonly city: string
  readonly state: string
  readonly zip: string
  readonly country: string
  readonly setLine1: (v: string) => void
  readonly setLine2: (v: string) => void
  readonly setCity: (v: string) => void
  readonly setState: (v: string) => void
  readonly setZip: (v: string) => void
  readonly setCountry: (v: string) => void
  readonly saveForUser: (userId: number) => Promise<void>
}

export function useUserAddressForm(
  userId?: number
): UserAddressFormState {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    if (!userId) return
    void getUserAddress(userId).then((data) => {
      if (!data) return
      setLine1(data.line1 ?? '')
      setLine2(data.line2 ?? '')
      setCity(data.city ?? '')
      setState(data.state ?? '')
      setZip(data.zip ?? '')
      setCountry(data.country ?? '')
    })
  }, [userId])

  async function saveForUser(uid: number): Promise<void> {
    if (!line1 && !city && !country) return
    await upsertUserAddress(uid, { line1, line2, city, state, zip, country })
  }

  return {
    line1, line2, city, state, zip, country,
    setLine1, setLine2, setCity, setState, setZip, setCountry,
    saveForUser,
  }
}
