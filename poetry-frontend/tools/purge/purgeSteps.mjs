/*
 * File: purgeSteps.mjs
 * Purpose: Pages each admin list endpoint and removes rows whose
 * identifier matches the centralised test-data prefixes. Users
 * are deleted first so the cascade removes their dependents.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getJson, deleteWithEtag } from './purgeHttp.mjs'
import {
  USERNAME_PREFIXES,
  SELLER_CODE_PREFIXES,
  SUBSCRIPTION_PREFIXES,
  THEME_PREFIXES,
  startsWithAny,
} from './purgePatterns.mjs'

async function purgePaged(path, field, prefixes, deletePath, skip = []) {
  let removed = 0
  for (let page = 0; page < 50; page++) {
    const body = await getJson(`${path}?page=${page}&size=100`)
    if (!body) break
    const matches = (body.content || []).filter(
      (row) =>
        !skip.includes(row[field]) && startsWithAny(row[field], prefixes)
    )
    for (const row of matches) {
      const ok = await deleteWithEtag(`${deletePath}/${row.id}`)
      if (ok) removed++
    }
    if (page + 1 >= (body.totalPages ?? 1)) break
  }
  return removed
}

export async function purgeAll() {
  const users = await purgePaged(
    '/api/v1/users/paged',
    'username',
    USERNAME_PREFIXES,
    '/api/v1/users',
    ['admin']
  )
  const sellerCodes = await purgePaged(
    '/api/v1/seller-codes/paged',
    'code',
    SELLER_CODE_PREFIXES,
    '/api/v1/seller-codes'
  )
  const subscriptions = await purgePaged(
    '/api/v1/subscriptions/paged',
    'name',
    SUBSCRIPTION_PREFIXES,
    '/api/v1/subscriptions'
  )
  const themesList = (await getJson('/api/v1/themes')) || []
  let themes = 0
  for (const t of themesList) {
    if (!startsWithAny(t.name || '', THEME_PREFIXES)) continue
    if (await deleteWithEtag(`/api/v1/themes/${t.id}`)) themes++
  }
  return { users, sellerCodes, subscriptions, themes }
}
