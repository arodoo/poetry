/*
 * File: BannerList.tsx
 * Purpose: Displays a stack of registration banners.
 * Shows user details and membership status with a 60s lifetime.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useBanner } from './BannerContext'
import { type ReactElement } from 'react'

export function BannerList(): ReactElement | null {
  const { banners } = useBanner()

  if (banners.length === 0) return null

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 w-80 pointer-events-none">
      {banners.map((banner) => {
        const { user, membership } = banner
        const isExpired = membership?.status === 'expired'
        // Date not available in MembershipResponse
        // const endDate = membership?.endDate ? new Date(membership.endDate).toLocaleDateString() : 'N/A'

        return (
          <div
            key={banner.id}
            className="pointer-events-auto bg-[var(--color-surface)] shadow-lg rounded-lg p-4 border-l-4 border-[var(--color-info)] animate-in slide-in-from-right fade-in duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-[var(--color-text)] text-sm">New Registration</h4>
                <p className="text-sm text-[var(--color-textMuted)] mt-1">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-[var(--color-textSubtle)]">{user.email}</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[var(--color-border)]">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--color-textSubtle)]">Membership:</span>
                <span
                  className={`font-medium ${
                    isExpired ? 'text-[var(--color-danger)]' : 'text-[var(--color-success)]'
                  }`}
                >
                  {membership ? (isExpired ? 'Expired' : 'Active') : 'None'}
                </span>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}
