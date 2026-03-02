/*
 * File: SubscriptionTier.ts
 * Purpose: Defines subscription tiers for the app. Free tier
 * gives full local access. Pro tier unlocks Google Drive
 * backup, multi-device sync, and export features.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const TIERS = ['free', 'pro'] as const

export const SubscriptionTierSchema = z.enum(TIERS)

export type SubscriptionTier = z.infer<
  typeof SubscriptionTierSchema
>

export const DEFAULT_TIER: SubscriptionTier = 'free'

export function isPro(tier: SubscriptionTier): boolean {
  return tier === 'pro'
}
