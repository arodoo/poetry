/*
 * File: SellerCodeDeleteConfirm.tsx
 * Purpose: Extracted confirmation block used in SellerCodeDeletePage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'

interface Props {
  onCancel: () => void
  onConfirm: () => void
  isSubmitting: boolean
  t: (k: string) => string
}

export default function SellerCodeDeleteConfirm({
  onCancel,
  onConfirm,
  isSubmitting,
  t,
}: Props): ReactElement {
  return (
    <Stack gap="lg">
      <Text size="lg" weight="bold">
        {t('ui.sellerCodes.delete.form.title')}
      </Text>
      <Text size="sm" className="text-error-600">
        {t('ui.sellerCodes.delete.form.warning')}
      </Text>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={onCancel}
          data-testid="cancel-delete-seller-code-button"
        >
          {t('ui.sellerCodes.actions.cancel')}
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={onConfirm}
          disabled={isSubmitting}
          data-testid="confirm-delete-seller-code-button"
        >
          {t('ui.sellerCodes.actions.confirmDelete')}
        </Button>
      </div>
    </Stack>
  )
}
