/*
 * File: BannerList.tsx
 * Purpose: Displays a stack of registration banners.
 * Shows user details and membership status with a 60s lifetime.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useBanner } from './BannerStore'
import { type ReactElement } from 'react'
import { BannerItem } from './BannerItem'

export function BannerList(): ReactElement | null {
  const { banners, remove } = useBanner()

  if (banners.length === 0) return null

  const containerClasses = [
    'fixed',
    'top-20',
    'right-4',
    'z-50',
    'flex',
    'flex-col',
    'gap-2',
    'w-80',
    'pointer-events-none',
  ].join(' ')

  return (
    <div className={containerClasses}>
      {banners.map((banner) => (
        <BannerItem banner={banner} key={banner.id} onDismiss={remove} />
      ))}
    </div>
  )
}
