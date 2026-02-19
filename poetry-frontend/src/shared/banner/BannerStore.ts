/*
 * File: BannerStore.ts
 * Purpose: Internal store for banner context and hook exports.
 * Exports `BannerContext` and `useBanner` for consumption by components.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createContext, useContext } from 'react'
import type { MembershipResponse, UserResponse } from '../../api/generated'

export interface BannerData {
  id: string
  user: UserResponse | null
  membership: MembershipResponse | null
}

interface BannerContextType {
  banners: BannerData[]
  push: (userId: number | null) => Promise<void>
  remove: (id: string) => void
}

export const BannerContext = createContext<BannerContextType | null>(null)

export function useBanner(): BannerContextType {
  const context = useContext(BannerContext)
  if (!context)
    throw new Error('useBanner must be used within a BannerProvider')
  return context
}
