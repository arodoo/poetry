/*
 * File: MembershipsCreatePage.tsx
 * Purpose: Create new membership page (MVP)
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'

export default function MembershipsCreatePage(): ReactElement {
  const t = useT()

  return (
    <div>
      <h1>{t('ui.memberships.create.title')}</h1>
      <p>{t('ui.memberships.create.subtitle')}</p>
      <p>Form implementation pending</p>
    </div>
  )
}
