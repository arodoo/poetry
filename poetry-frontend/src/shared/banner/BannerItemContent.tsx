/*
 * File: BannerItemContent.tsx
 * Purpose: Renders header content for a banner based on its state.
 * Shows known user name/phone, unknown finger warning, or fetch error.
 * Extracted from BannerItem to keep each file under 60 lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../i18n/useT'
import type { BannerData } from './BannerStore'

interface Props {
  banner: Pick<BannerData, 'user' | 'phone' | 'fetchError'>
}

export function BannerItemContent({ banner }: Props): ReactElement {
  const t = useT()
  const { user, phone, fetchError } = banner

  if (fetchError === true) {
    return (
      <h4 className="font-bold text-[var(--color-warning)] text-sm">
        {t('ui.banner.fetchError')}
      </h4>
    )
  }

  if (user === null) {
    return (
      <>
        <h4 className="font-bold text-[var(--color-warning)] text-sm">
          {t('ui.banner.unknownFinger')}
        </h4>
        <p className="text-xs text-[var(--color-textMuted)] mt-1">
          {t('ui.banner.unknownFingerDetail')}
        </p>
      </>
    )
  }

  return (
    <>
      <h4 className="font-bold text-[var(--color-text)] text-sm">
        {t('ui.banner.newRegistration')}
      </h4>
      <p className="text-sm text-[var(--color-textMuted)] mt-1 truncate">
        {user.firstName ?? ''} {user.lastName ?? ''}
      </p>
      <p className="text-xs text-[var(--color-textSubtle)] truncate">
        {phone ?? ''}
      </p>
    </>
  )
}
