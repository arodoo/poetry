/*
 * File: membership-form-helpers.ts
 * Purpose: Shared helpers for membership E2E tests including admin
 * membership cleanup and user search interaction through the
 * SearchableSelect component. Keeps test files focused and small.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type Page, expect } from '@playwright/test'
import { authedApi } from '../shared/fixtures/seedApi'
import { selectFirstOption } from '../shared/helpers/searchableSelectHelper'

interface MembershipItem {
  id: number
  userId: number
}

export async function deleteAdminMemberships(): Promise<void> {
  const api = await authedApi()
  const r = await api.get('/api/v1/memberships?size=100')
  if (!r.ok()) {
    await api.dispose()
    return
  }
  const data = await r.json()
  const items: MembershipItem[] = Array.isArray(data)
    ? (data as MembershipItem[])
    : ((data as { content?: MembershipItem[] }).content ?? [])
  for (const m of items.filter((i) => i.userId === 1)) {
    await api.delete(`/api/v1/memberships/${m.id}`).catch(() => {})
  }
  await api.dispose()
}

export async function pickUserAndWaitEligibility(
  page: Page,
  search: string
): Promise<void> {
  await selectFirstOption(page, 'user-search-input', search)
  await expect(page.getByTestId('submit-membership-button')).toBeVisible({
    timeout: 15000,
  })
}
