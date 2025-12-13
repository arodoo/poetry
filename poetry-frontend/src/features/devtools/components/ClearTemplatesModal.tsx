/*
 * File: ClearTemplatesModal.tsx
 * Purpose: Confirmation modal for clearing all fingerprint templates.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Modal } from '../../../ui/Modal/Modal'
import { useT } from '../../../shared/i18n/useT'

interface ClearTemplatesModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ClearTemplatesModal({
  open,
  onClose,
  onConfirm,
}: ClearTemplatesModalProps): ReactElement {
  const t = useT()

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      labelledBy="clear-confirm-title"
    >
      <div className="p-6">
        <div id="clear-confirm-title">
          <Heading level={2} className="mb-4">
            {t('ui.devtools.hardware.clearConfirmTitle')}
          </Heading>
        </div>
        <Text className="mb-6">
          {t('ui.devtools.hardware.clearConfirmBody')}
        </Text>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {t('ui.common.cancel')}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {t('ui.devtools.hardware.clearAll')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
