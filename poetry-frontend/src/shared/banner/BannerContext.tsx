/*
 * File: BannerContext.tsx
 * Purpose: Context provider for managing registration banners.
 * Delegates data fetching to bannerFetch. Surfaces fetch errors as
 * visible error banners instead of silently discarding them.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useCallback, type ReactNode, type ReactElement } from 'react'
import { fetchBannerData } from './bannerFetch'
import { BannerContext, type BannerData } from './BannerStore'

const MAX_BANNERS = 10
const BANNER_TTL_MS = 60_000
const ERROR_TTL_MS = 10_000

export function BannerProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const [banners, setBanners] = useState<BannerData[]>([])

  const remove = useCallback((id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const push = useCallback(
    async (userId: number | null) => {
      const id = crypto.randomUUID()
      try {
        const data = userId !== null
          ? await fetchBannerData(userId)
          : { user: null, membership: null, phone: null }
        const banner: BannerData = { id, ...data }
        setBanners((prev) => {
          const updated = [...prev, banner]
          return updated.length > MAX_BANNERS
            ? updated.slice(updated.length - MAX_BANNERS)
            : updated
        })
        setTimeout(() => remove(id), BANNER_TTL_MS)
      } catch (err) {
        console.error('[Banner] fetch failed', err)
        const errBanner: BannerData = {
          id, user: null, membership: null, phone: null, fetchError: true,
        }
        setBanners((prev) => [...prev, errBanner])
        setTimeout(() => remove(id), ERROR_TTL_MS)
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
