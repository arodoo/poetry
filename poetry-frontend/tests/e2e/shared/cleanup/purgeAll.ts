/*
 * File: purgeAll.ts
 * Purpose: Orchestrates the e2e cleanup steps in dependency order
 * so the user-delete cascade fires first and orphan tables are
 * tidied afterwards.
 * All Rights Reserved. Arodi Emmanuel
 */
import { adminCtx } from './cleanupApi'
import { purgeUsers } from './purgeUsers'
import { purgeSellerCodes } from './purgeSellerCodes'
import { purgeSubscriptions } from './purgeSubscriptions'
import { purgeThemes } from './purgeThemes'

export interface PurgeReport {
  users: number
  sellerCodes: number
  subscriptions: number
  themes: number
}

export async function purgeAll(): Promise<PurgeReport> {
  const ctx = await adminCtx()
  try {
    const users = await purgeUsers(ctx)
    const sellerCodes = await purgeSellerCodes(ctx)
    const subscriptions = await purgeSubscriptions(ctx)
    const themes = await purgeThemes(ctx)
    return { users, sellerCodes, subscriptions, themes }
  } finally {
    await ctx.dispose()
  }
}
