/*
 File: useLocale.ts
 Purpose: Custom hook for managing user locale state with backend
 integration and fallback logic. All Rights Reserved. Arodi Emmanuel
*/
import { useState, useEffect } from 'react'
import { localeService } from '../services/localeService'
import { loadUserLocale, type LocaleLoadResult } from '../utils/localeLoader'

export interface UseLocaleResult {
  locale: string
  isLoading: boolean
  error: string | null
  setLocale: (locale: string) => void
}

export function useLocale(): UseLocaleResult {
  const [locale, setLocaleState] = useState<string>(
    localeService.getDefaultLocale()
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect((): void => {
    async function initializeLocale(): Promise<void> {
      setIsLoading(true)
      setError(null)

      const result: LocaleLoadResult = await loadUserLocale()
      setLocaleState(result.locale)
      setError(result.error)
      setIsLoading(false)
    }

    void initializeLocale()
  }, [])

  const setLocale: (newLocale: string) => void = (newLocale: string): void => {
    if (localeService.isValidLocale(newLocale)) {
      setLocaleState(newLocale)
      setError(null)
    }
  }

  return {
    locale,
    isLoading,
    error,
    setLocale,
  }
}
