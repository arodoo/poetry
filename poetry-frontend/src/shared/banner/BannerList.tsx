/*
 * File: BannerList.tsx
 * Purpose: Displays a stack of registration banners.
 * Shows user details and membership status with a 60s lifetime.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useBanner } from './BannerContext'
import { type ReactElement } from 'react'
import { useT } from '../i18n/useT'

export function BannerList(): ReactElement | null {
  const { banners } = useBanner()

  if (banners.length === 0) return null

  const containerClasses = [
    'fixed',
    'top-20',
      {banners.map((banner) => (
        <BannerItem banner={banner} key={banner.id} />
      ))}
                  className="text-xs text-[var(--color-textSubtle)]"
                >
                  {user.email}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-[var(--color-border)]">
              <div className="flex justify-between items-center text-xs">
                <span
                  className="text-[var(--color-textSubtle)]"
                >
                  {t('ui.banner.membership')}
                </span>
                <span
                  className={`font-medium ${statusClass}`}
                >
                  {statusText}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
