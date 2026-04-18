/*
 * File: purgeUsers.ts
 * Purpose: Pages through users and cascade-deletes any whose
 * username matches the test data prefixes. Uses the existing
 * user delete cascade so seller codes, demographics, fingerprints
 * and memberships are removed in the same call.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { APIRequestContext } from '@playwright/test'
import { deleteWithEtag } from './cleanupApi'
import {
  TEST_USERNAME_PREFIXES,
  startsWithAny,
} from './testDataPatterns'

interface UserRow {
  id: number
  username: string
}

interface PagedUsers {
  content: UserRow[]
  totalPages: number
}

export async function purgeUsers(ctx: APIRequestContext): Promise<number> {
  let removed = 0
  for (let page = 0; page < 50; page++) {
    const r = await ctx.get(`/api/v1/users/paged?page=${page}&size=100`)
    if (!r.ok()) break
    const body = (await r.json()) as PagedUsers
    const matches = body.content.filter(
      (u) =>
        u.username !== 'admin' &&
        startsWithAny(u.username, TEST_USERNAME_PREFIXES)
    )
    for (const u of matches) {
      const ok = await deleteWithEtag(ctx, `/api/v1/users/${u.id}`)
      if (ok) removed++
    }
    if (page + 1 >= body.totalPages) break
  }
  return removed
}
