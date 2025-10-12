/*
 File: localeService.ts
 Purpose: Service for fetching user locale from backend API with
 error handling and logging. All Rights Reserved. Arodi Emmanuel
*/
import { getEnv } from '../../config/env'

export interface LocaleResponse {
  locale: string
}

export interface LocaleServiceResult {
  success: boolean
  locale?: string
  error?: string
}

export class LocaleService {
  private readonly env: ReturnType<typeof getEnv> = getEnv()

  public async fetchUserLocale(
    userId = 'demo'
  ): Promise<LocaleServiceResult> {
    try {
      // Align with backend versioned base path "/api/v1"
      const response: Response = await fetch('/api/v1/me/locale', {
        headers: {
          'X-User-Id': userId,
          Accept: 'application/json',
        },
      })

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status.toString()}`,
        }
      }

      const data: LocaleResponse = (await response.json()) as LocaleResponse

      if (!data.locale) {
        return {
          success: false,
          error: 'No locale in response',
        }
      }

      return {
        success: true,
        locale: data.locale,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  public isValidLocale(locale: string): boolean {
    return locale === 'en' || locale === 'es'
  }

  public getDefaultLocale(): string {
    return this.env.VITE_DEFAULT_LOCALE
  }
}

export const localeService: LocaleService = new LocaleService()
