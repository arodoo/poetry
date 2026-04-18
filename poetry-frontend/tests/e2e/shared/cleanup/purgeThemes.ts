/*
 * File: purgeThemes.ts
 * Purpose: Removes leftover theme rows produced by the tokens
 * theme-creator e2e specs. The theme list endpoint is not paged
 * so a single request enumerates every row.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { APIRequestContext } from '@playwright/test'
import { deleteWithEtag } from './cleanupApi'
import { TEST_THEME_PREFIXES, startsWithAny } from './testDataPatterns'

interface ThemeRow {
  id: number
  name: string
}

export async function purgeThemes(ctx: APIRequestContext): Promise<number> {
  const r = await ctx.get('/api/v1/themes')
  if (!r.ok()) return 0
  const body = (await r.json()) as ThemeRow[]
  let removed = 0
  for (const t of body) {
    if (!startsWithAny(t.name ?? '', TEST_THEME_PREFIXES)) continue
    const ok = await deleteWithEtag(ctx, `/api/v1/themes/${t.id}`)
    if (ok) removed++
  }
  return removed
}
