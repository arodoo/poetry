import { type ReactElement } from 'react'
import { useT } from '../i18n/useT'

export function BannerItem({ banner }: { banner: any }): ReactElement {
  const { user, membership } = banner
  const isExpired = membership?.status === 'expired'
  const t = useT()

  const boxClasses = [
    'pointer-events-auto',
    'bg-[var(--color-surface)]',
    'shadow-lg',
    'rounded-lg',
    'p-4',
    'border-l-4',
    'border-[var(--color-info)]',
    'animate-in',
    'slide-in-from-right',
    'fade-in',
    'duration-300',
  ].join(' ')

  const statusClass = isExpired
    ? 'text-[var(--color-danger)]'
    : 'text-[var(--color-success)]'

  const statusText = membership
    ? isExpired
      ? t('ui.banner.status.expired')
      : t('ui.banner.status.active')
    : t('ui.banner.status.none')

  return (
    <div key={banner.id} className={boxClasses}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-[var(--color-text)] text-sm">
            {t('ui.banner.newRegistration')}
          </h4>
          <p className="text-sm text-[var(--color-textMuted)] mt-1">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-[var(--color-textSubtle)]">{user.email}</p>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-[var(--color-border)]">
        <div className="flex justify-between items-center text-xs">
          <span className="text-[var(--color-textSubtle)]">{t('ui.banner.membership')}</span>
          <span className={`font-medium ${statusClass}`}>{statusText}</span>
        </div>
      </div>
    </div>
  )
}
