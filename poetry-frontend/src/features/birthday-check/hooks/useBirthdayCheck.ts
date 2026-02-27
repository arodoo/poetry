/*
 * File: useBirthdayCheck.ts
 * Purpose: Custom hook managing the birthday check feature state.
 * Exposes isOpen, celebrants list, isLoading flag, plus check() and
 * close() actions so components stay free of data-fetching logic.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import {
  fetchTodaysBirthdays,
  type BirthdayUserDto,
} from '../api/birthdayCheckApi'

export interface BirthdayCheckState {
  readonly isOpen: boolean
  readonly celebrants: BirthdayUserDto[]
  readonly isLoading: boolean
  readonly check: () => Promise<void>
  readonly close: () => void
}

export function useBirthdayCheck(): BirthdayCheckState {
  const [isOpen, setIsOpen] = useState(false)
  const [celebrants, setCelebrants] = useState<BirthdayUserDto[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function check(): Promise<void> {
    setIsLoading(true)
    try {
      const data = await fetchTodaysBirthdays()
      setCelebrants(data)
      setIsOpen(true)
    } finally {
      setIsLoading(false)
    }
  }

  function close(): void {
    setIsOpen(false)
  }

  return { isOpen, celebrants, isLoading, check, close }
}
