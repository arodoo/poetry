/*
 * File: accountApi.ts
 * Purpose: Account endpoints wrapper using generated SDK (password update, locale, etc.).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  getLocale as getLocaleSdk,
  changePassword as changePasswordSdk,
} from '../../../api/generated'
import {
  AccountLocaleSchema,
  AccountPasswordChangeSchema,
  type AccountLocale,
  type AccountPasswordChangeRequest,
} from '../model/AccountSchemas'

export async function fetchAccountLocale(): Promise<AccountLocale> {
  const response = await getLocaleSdk()
  const dto = response.data
  return AccountLocaleSchema.parse(dto)
}

export async function updatePassword(
  body: AccountPasswordChangeRequest
): Promise<void> {
  const payload: AccountPasswordChangeRequest =
    AccountPasswordChangeSchema.parse(body)
  await changePasswordSdk({
    body: {
      currentPassword: payload.currentPassword,
      newPassword: payload.newPassword,
    },
  })
}
