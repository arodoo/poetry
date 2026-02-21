/*
 * File: BannerContext.tsx
 * Purpose: Context provider for managing registration banners.
 * Handles fetching user and membership data and managing banner lifecycle.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useState, useCallback, type ReactNode, type ReactElement } from 'react'
import { fetchUserById } from '../../features/users/api/usersApi'
import { fetchMembershipsPage } from '../../features/memberships/api/membershipsApi'
import { getUserDemographics } from '../../features/userdemographics/api/userDemographicsApi'
import { BannerContext, type BannerData } from './BannerStore'

export function BannerProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const [banners, setBanners] = useState<BannerData[]>([])

  const remove = useCallback((id: string) => {
    setBanners((prev: BannerData[]) =>
      prev.filter((b: BannerData) => b.id !== id)
    )
  }, [])

  const push = useCallback(
    async (userId: number | null) => {
      try {
        let user = null
        let membership = null
        let phone: string | null = null

        if (userId !== null) {
          user = await fetchUserById(userId.toString())
          const memberships = await fetchMembershipsPage(0, 1, userId.toString())
          membership = memberships.content?.[0] ?? null
          const demographics = await getUserDemographics(userId)
          phone = demographics?.phone ?? null
        }

        const id = crypto.randomUUID()
        const newBanner: BannerData = { id, user, membership, phone }

        setBanners((prev: BannerData[]) => {
          const updated = [...prev, newBanner]
          return updated.length > 10
            ? updated.slice(updated.length - 10)
            : updated
        })

        setTimeout(() => {
          remove(id)
        }, 60000)
      } catch (error) {
        console.error('Failed to fetch banner data', error)
      }
    },
    [remove]
  )

  return (
    <BannerContext.Provider value={{ banners, push, remove }}>
      {children}
    </BannerContext.Provider>
  )
}
