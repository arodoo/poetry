/*
 * File: accountApi.ts
 * Purpose: Account endpoints wrapper (password update, etc.).
 * All Rights Reserved. Arodi Emmanuel
 */
import { getAccountLocaleRaw, postAccountPassword } from '../../../shared/sdk'
import {
  AccountLocaleSchema,
  AccountPasswordChangeSchema,
  type AccountLocale,
  type AccountPasswordChangeRequest,
} from '../model/AccountSchemas'

export async function fetchAccountLocale(): Promise<AccountLocale> {
  const dto: unknown = await getAccountLocaleRaw()
  return AccountLocaleSchema.parse(dto)
}

export async function updatePassword(
  body: AccountPasswordChangeRequest
): Promise<void> {
  const payload: AccountPasswordChangeRequest =
    AccountPasswordChangeSchema.parse(body)
  await postAccountPassword(payload)
}
