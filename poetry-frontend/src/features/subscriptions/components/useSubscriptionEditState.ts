/*
 * File: useSubscriptionEditState.ts
 * Purpose: Encapsulate state and initialization logic for
 * SubscriptionEditForm so the form file stays under the max-lines limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useEffect } from 'react'

interface SubscriptionEditState {
  name: string
  setName: (n: string) => void
  description: string
  setDescription: (s: string) => void
  price: number
  setPrice: (v: number) => void
  currency: string
  setCurrency: (c: string) => void
  durationDays: number
  setDurationDays: (d: number) => void
  status: 'active' | 'inactive'
  setStatus: (s: 'active' | 'inactive') => void
}

export function useSubscriptionEditState(
  queryData: unknown
): SubscriptionEditState {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [currency, setCurrency] = useState<string>('USD')
  const [durationDays, setDurationDays] = useState<number>(30)
  const [status, setStatus] = useState<'active' | 'inactive'>('active')

  useEffect((): void => {
    if (typeof queryData === 'object' && queryData !== null) {
      const d = queryData as Record<string, unknown>

      const nameVal = d['name']
      if (typeof nameVal === 'string') setName(nameVal)

      const descVal = d['description']
      if (typeof descVal === 'string') setDescription(descVal)

      const priceVal = d['price']
      if (typeof priceVal === 'number') setPrice(priceVal)

      const currencyVal = d['currency']
      if (typeof currencyVal === 'string') setCurrency(currencyVal)

      const durationVal = d['durationDays']
      if (typeof durationVal === 'number') setDurationDays(durationVal)

      const statusVal = d['status']
      if (statusVal === 'active' || statusVal === 'inactive')
        setStatus(statusVal)
    }
  }, [queryData])

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
