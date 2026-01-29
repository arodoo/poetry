/*
 * File: BannerContext.tsx
 * Purpose: Context provider for managing registration banners.
 * Handles fetching user and membership data and managing banner lifecycle.
 * All Rights Reserved. Arodi Emmanuel
 */

import { createContext, useContext, useState, useCallback, type ReactNode, type ReactElement } from 'react'
import { fetchUserById } from '../../features/users/api/usersApi'
import { fetchMembershipsPage } from '../../features/memberships/api/membershipsApi'
import type { UserResponse, MembershipResponse } from '../../api/generated'

export interface BannerData {
  id: string
  user: UserResponse
  membership: MembershipResponse | null
}

interface BannerContextType {
  banners: BannerData[]
  push: (userId: number) => Promise<void>
  remove: (id: string) => void
}

const BannerContext = createContext<BannerContextType | null>(null)

export function useBanner(): BannerContextType {
  const context = useContext(BannerContext)
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider')
  }
  return context
}

export function BannerProvider({ children }: { children: ReactNode }): ReactElement {
  const [banners, setBanners] = useState<BannerData[]>([])

  const remove = useCallback((id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const push = useCallback(
    async (userId: number) => {
      try {
        const user = await fetchUserById(userId.toString())
        const memberships = await fetchMembershipsPage(0, 1, user.email)
        const membership = memberships.content?.[0] ?? null

        const id = crypto.randomUUID()
        const newBanner: BannerData = { id, user, membership }

        setBanners((prev) => {
          const updated = [...prev, newBanner]
          return updated.length > 10 ? updated.slice(updated.length - 10) : updated
        })

        setTimeout(() => remove(id), 60000)
      } catch (error) {
        console.error('Failed to fetch banner data', error)
      }
    },
    [remove]
  )

  return <BannerContext.Provider value={{ banners, push, remove }}>{children}</BannerContext.Provider>
}
