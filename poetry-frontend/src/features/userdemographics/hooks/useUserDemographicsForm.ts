/*
 * File: useUserDemographicsForm.ts
 * Purpose: Manages birthDate, gender and phone state. Loads existing data
 * when a userId is provided and exposes saveForUser() to upsert.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useEffect } from 'react'
import {
  getUserDemographics,
  upsertUserDemographics,
} from '../api/userDemographicsApi'

export interface UserDemographicsFormState {
  readonly birthDate: string
  readonly gender: string
  readonly phone: string
  readonly setBirthDate: (v: string) => void
  readonly setGender: (v: string) => void
  readonly setPhone: (v: string) => void
  readonly saveForUser: (userId: number) => Promise<void>
}

export function useUserDemographicsForm(
  userId?: number
): UserDemographicsFormState {
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (!userId) return
    void getUserDemographics(userId).then((data) => {
      if (!data) return
      setBirthDate(data.birthDate ?? '')
      setGender(data.gender ?? '')
      setPhone(data.phone ?? '')
    })
  }, [userId])

  async function saveForUser(uid: number): Promise<void> {
    if (!birthDate && !gender && !phone) return
    await upsertUserDemographics(uid, { birthDate, gender, phone })
  }

  return {
    birthDate,
    gender,
    phone,
    setBirthDate,
    setGender,
    setPhone,
    saveForUser,
  }
}
