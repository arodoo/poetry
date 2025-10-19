/*
 * File: SellerCodesListActions.tsx
 * Purpose: Actions area used by SellerCodesListPage (keeps page concise).
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'

export default function SellerCodesListActions(): ReactElement {
  const { locale } = useLocale()
  const t = useT()
  return (
    <Button to={`/${locale}/seller-codes/new`} size="md" width="fixed-large" data-testid="create-seller-code-button">
      {t('ui.sellerCodes.actions.new')}
    </Button>
  )
}
