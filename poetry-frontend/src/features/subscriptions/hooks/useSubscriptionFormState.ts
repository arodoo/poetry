/*
 * File: useSubscriptionFormState.ts
 * Purpose: Form state hook for subscription create page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'

export interface SubscriptionFormState {
  name: string
  setName: (v: string) => void
  description: string
  setDescription: (v: string) => void
  price: number
  setPrice: (v: number) => void
  currency: string
  setCurrency: (v: string) => void
  durationDays: number
  setDurationDays: (v: number) => void
  status: 'active' | 'inactive'
  setStatus: (v: 'active' | 'inactive') => void
}

export function useSubscriptionFormState(): SubscriptionFormState {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('USD')
  const [durationDays, setDurationDays] = useState<number>(30)
  const [status, setStatus] = useState<'active' | 'inactive'>('active')

  return {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    currency,
    setCurrency,
    durationDays,
    setDurationDays,
    status,
    setStatus,
  }
}
