/*
 * File: accountClient.ts
 * Purpose: SDK surface for account endpoints using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getLocale, changePassword } from '../../../api/generated'
import type { LocaleDto, PasswordChangeRequest } from '../../../api/generated'

export type { LocaleDto, PasswordChangeRequest }

export async function getAccountLocaleRaw(): Promise<LocaleDto> {
  const response = await getLocale()
  if (response.error || !response.data) {
    throw new Error('Failed to fetch locale')
  }
  return response.data as unknown as LocaleDto
}

export async function postAccountPassword(
  body: PasswordChangeRequest
): Promise<void> {
  const response = await changePassword({ body })
  if (response.error) {
    throw new Error('Failed to change password')
  }
}
