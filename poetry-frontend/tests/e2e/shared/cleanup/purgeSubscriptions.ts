/*
 * File: purgeSubscriptions.ts
 * Purpose: Removes orphan subscription rows whose name matches the
 * known test prefixes. Memberships referencing them must be gone
 * already because the user-purge step cascades them away first.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { APIRequestContext } from '@playwright/test'
import { deleteWithEtag } from './cleanupApi'
import {
  TEST_SUBSCRIPTION_PREFIXES,
  startsWithAny,
} from './testDataPatterns'

interface SubRow {
  id: number
  name: string
}

interface PagedSub {
  content: SubRow[]
  totalPages: number
}

export async function purgeSubscriptions(
  ctx: APIRequestContext
): Promise<number> {
  let removed = 0
  for (let page = 0; page < 50; page++) {
    const r = await ctx.get(
      `/api/v1/subscriptions/paged?page=${page}&size=100`
    )
    if (!r.ok()) break
    const body = (await r.json()) as PagedSub
    const matches = body.content.filter((s) =>
      startsWithAny(s.name, TEST_SUBSCRIPTION_PREFIXES)
    )
    for (const s of matches) {
      const ok = await deleteWithEtag(ctx, `/api/v1/subscriptions/${s.id}`)
      if (ok) removed++
    }
    if (page + 1 >= body.totalPages) break
  }
  return removed
}
