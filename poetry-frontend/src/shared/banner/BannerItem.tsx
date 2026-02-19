/*
 * File: BannerItem.tsx
 * Purpose: Render a single registration banner item.
 * It shows user and membership status succinctly for display.
 * Extracted from BannerList to keep files small and focused.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { useT } from '../i18n/useT'
import type { BannerData } from './BannerStore'

interface BannerItemProps {
  banner: BannerData
  onDismiss: (id: string) => void
}

export function BannerItem({ banner, onDismiss }: BannerItemProps): ReactElement {
  const { user, membership } = banner
  const t = useT()

  const isUnknown = user === null
  const isExpired = membership?.status === 'expired'

  // Border and accent color by state
  const borderClass = isUnknown
    ? 'border-[var(--color-warning)]'
    : isExpired
      ? 'border-[var(--color-danger)]'
      : 'border-[var(--color-success)]'

  const boxClasses = [
    'pointer-events-auto',
    'bg-[var(--color-surface)]',
    'shadow-lg',
    'rounded-lg',
    'p-4',
    'border-l-4',
    borderClass,
    'animate-in',
    'slide-in-from-right',
    'fade-in',
    'duration-300',
  ].join(' ')

  const statusClass = isExpired
    ? 'text-[var(--color-danger)]'
    : membership
      ? 'text-[var(--color-success)]'
      : 'text-[var(--color-textSubtle)]'

  const statusText = membership
    ? isExpired
      ? t('ui.banner.status.expired')
      : t('ui.banner.status.active')
    : t('ui.banner.status.none')

  return (
    <div className={boxClasses}>
      {/* Header row */}
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          {isUnknown ? (
            <>
              <h4 className="font-bold text-[var(--color-warning)] text-sm">
                {t('ui.banner.unknownFinger')}
              </h4>
              <p className="text-xs text-[var(--color-textMuted)] mt-1">
                {t('ui.banner.unknownFingerDetail')}
              </p>
            </>
          ) : (
            <>
              <h4 className="font-bold text-[var(--color-text)] text-sm">
                {t('ui.banner.newRegistration')}
              </h4>
              <p className="text-sm text-[var(--color-textMuted)] mt-1 truncate">
                {user?.firstName ?? ''} {user?.lastName ?? ''}
              </p>
              <p className="text-xs text-[var(--color-textSubtle)] truncate">
                {user?.email ?? ''}
              </p>
            </>
          )}
        </div>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={() => onDismiss(banner.id)}
          aria-label={t('ui.banner.close')}
          className="flex-shrink-0 text-[var(--color-textSubtle)] hover:text-[var(--color-text)] transition-colors p-0.5 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-border)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Membership footer — only for known users */}
      {!isUnknown && (
        <div className="mt-2 pt-2 border-t border-[var(--color-border)] space-y-1">
          {membership?.subscriptionName && (
            <div className="flex justify-between items-center text-xs">
              <span className="text-[var(--color-textSubtle)]">
                {t('ui.banner.subscription')}
              </span>
              <span className="font-medium text-[var(--color-textMuted)] truncate max-w-[60%] text-right">
                {membership.subscriptionName}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-xs">
            <span className="text-[var(--color-textSubtle)]">
              {t('ui.banner.membership')}
            </span>
            <span className={`font-semibold ${statusClass}`}>{statusText}</span>
          </div>
          {isExpired && (
            <p className="text-xs text-[var(--color-danger)] mt-1">
              ⚠ {t('ui.banner.status.expired')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
