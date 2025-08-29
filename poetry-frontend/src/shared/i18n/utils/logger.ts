/*
 File: logger.ts
 Purpose: Centralized logging utility for i18n operations with
 development-only logging. All Rights Reserved. Arodi Emmanuel
*/

export class I18nLogger {
  private isDevelopment(): boolean {
    return import.meta.env.DEV
  }

  public logSuccess(message: string, data?: unknown): void {
    if (this.isDevelopment()) {
      console.log(`✅ i18n: ${message}`, data ?? '')
    }
  }

  public logWarning(message: string, error?: unknown): void {
    if (this.isDevelopment()) {
      console.warn(`⚠️ i18n: ${message}`, error ?? '')
    }
  }

  public logError(message: string, error?: unknown): void {
    if (this.isDevelopment()) {
      console.error(`❌ i18n: ${message}`, error ?? '')
    }
  }
}

export const i18nLogger: I18nLogger = new I18nLogger()
