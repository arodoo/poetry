/*
 * File: MembershipsListTopActions.tsx
 * Purpose: Top actions component for memberships list page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'

export function MembershipsListTopActions(): ReactElement {
  const { locale } = useLocale()
  const t = useT()
  return (
    <Button to={`/${locale}/memberships/new`} size="md" width="fixed-large">
      {t('ui.memberships.actions.new')}
    </Button>
  )
}
