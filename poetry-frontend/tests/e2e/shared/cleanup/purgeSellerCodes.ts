/*
 * File: purgeSellerCodes.ts
 * Purpose: Removes orphan seller codes left by tests that did not
 * own a user (so the user-delete cascade did not reach them).
 * All Rights Reserved. Arodi Emmanuel
 */
import type { APIRequestContext } from '@playwright/test'
import { deleteWithEtag } from './cleanupApi'
import {
  TEST_SELLER_CODE_PREFIXES,
  startsWithAny,
} from './testDataPatterns'

interface SellerRow {
  id: number
  code: string
}

interface PagedSeller {
  content: SellerRow[]
  totalPages: number
}

export async function purgeSellerCodes(
  ctx: APIRequestContext
): Promise<number> {
  let removed = 0
  for (let page = 0; page < 50; page++) {
    const r = await ctx.get(
      `/api/v1/seller-codes/paged?page=${page}&size=100`
    )
    if (!r.ok()) break
    const body = (await r.json()) as PagedSeller
    const matches = body.content.filter((c) =>
      startsWithAny(c.code, TEST_SELLER_CODE_PREFIXES)
    )
    for (const c of matches) {
      const ok = await deleteWithEtag(ctx, `/api/v1/seller-codes/${c.id}`)
      if (ok) removed++
    }
    if (page + 1 >= body.totalPages) break
  }
  return removed
}
