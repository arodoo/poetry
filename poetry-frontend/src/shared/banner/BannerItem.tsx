/*
 * File: BannerItem.tsx
 * Purpose: Renders a single fingerprint registration banner card.
 * Delegates header content to BannerItemContent and handles dismiss.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../i18n/useT'
import type { BannerData } from './BannerStore'
import { BannerItemContent } from './BannerItemContent'

interface BannerItemProps {
  banner: BannerData
  onDismiss: (id: string) => void
}

export function BannerItem({
  banner, onDismiss,
}: BannerItemProps): ReactElement {
  const { membership } = banner
  const t = useT()

  const isActive = membership?.status?.toLowerCase() === 'active'
  const isExpired = membership?.status?.toLowerCase() === 'expired'
  const isInactive = membership !== null && !isActive && !isExpired
  const isUnknown = banner.user === null && !banner.fetchError

  const borderClass = isUnknown || banner.fetchError
    ? 'border-[var(--color-warning)]'
    : isExpired || isInactive
      ? 'border-[var(--color-danger)]'
      : isActive
        ? 'border-[var(--color-success)]'
        : 'border-[var(--color-border)]'

  const statusClass = isExpired || isInactive
    ? 'text-[var(--color-danger)]'
    : isActive
      ? 'text-[var(--color-success)]'
      : 'text-[var(--color-textSubtle)]'

  const statusText = isActive ? t('ui.banner.status.active')
    : isExpired ? t('ui.banner.status.expired')
      : membership ? t('ui.banner.status.inactive')
        : t('ui.banner.status.none')

  const boxClass = [
    'pointer-events-auto bg-[var(--color-surface)] shadow-lg',
    'rounded-lg p-4 border-l-4', borderClass,
    'animate-in slide-in-from-right fade-in duration-300',
  ].join(' ')

  return (
    <div className={boxClass} data-testid="banner-item">
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          <BannerItemContent banner={banner} />
        </div>
        <button type="button" onClick={() => onDismiss(banner.id)}
          aria-label={t('ui.banner.close')}
          className="flex-shrink-0 text-[var(--color-textSubtle)]
            hover:text-[var(--color-text)] transition-colors p-0.5
            rounded focus:outline-none
            focus:ring-2 focus:ring-[var(--color-border)]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
            fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {!isUnknown && !banner.fetchError && (
        <div className="mt-2 pt-2 border-t border-[var(--color-border)]
          space-y-1">
          {membership?.nextPaymentDate && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--color-textSubtle)]">
                {t('ui.banner.nextPayment')}
              </span>
              <span className="font-medium text-[var(--color-textMuted)]
                truncate max-w-[60%] text-right">
                {new Date(membership.nextPaymentDate).toLocaleDateString()}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--color-textSubtle)]">
              {t('ui.banner.membership')}
            </span>
            <span className={`font-semibold ${statusClass}`}>
              {statusText}
            </span>
          </div>
          {(isExpired || isInactive) && (
            <p className="text-xs text-[var(--color-danger)] mt-1">
              ⚠ {t('ui.banner.status.expired')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
