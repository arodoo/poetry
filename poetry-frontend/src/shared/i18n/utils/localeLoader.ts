/*
 File: localeLoader.ts
 Purpose: Dedicated logic for loading user locale from backend
 with proper error handling. All Rights Reserved. Arodi Emmanuel
*/
import {
  localeService,
  type LocaleServiceResult,
} from '../services/localeService'
import { i18nLogger } from '../utils/logger'

export interface LocaleLoadResult {
  locale: string
  error: string | null
}

export async function loadUserLocale(): Promise<LocaleLoadResult> {
  const result: LocaleServiceResult = await localeService.fetchUserLocale()

  if (
    result.success &&
    result.locale &&
    localeService.isValidLocale(result.locale)
  ) {
    i18nLogger.logSuccess(`Backend locale loaded: ${result.locale}`)
    return {
      locale: result.locale,
      error: null,
    }
  }

  if (
    result.success &&
    result.locale &&
    !localeService.isValidLocale(result.locale)
  ) {
    i18nLogger.logWarning(`Invalid locale from backend: ${result.locale}`)
    return {
      locale: localeService.getDefaultLocale(),
      error: `Invalid locale: ${result.locale}`,
    }
  }

  const fallbackLocale: string = localeService.getDefaultLocale()
  i18nLogger.logWarning(
    `Backend locale fetch failed, using fallback: ${fallbackLocale}`,
    result.error
  )

  return {
    locale: fallbackLocale,
    error: result.error ?? 'Failed to fetch locale',
  }
}
