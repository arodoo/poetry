/*
 * File: RestoreConfirmDialog.tsx
 * Purpose: Confirmation modal for database restore operations.
 * Uses the project Modal component with Portal and Backdrop for
 * accessibility. Warns the user before destructive restore.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { Modal } from '../../../ui/Modal/Modal'
import { Button } from '../../../ui/Button/Button'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'

interface Props {
  readonly open: boolean
  readonly onConfirm: () => void
  readonly onCancel: () => void
}

export function RestoreConfirmDialog({
  open,
  onConfirm,
  onCancel,
}: Props): ReactElement | null {
  const t = useT()
  return (
    <Modal
      open={open}
      onClose={onCancel}
      size="sm"
      labelledBy="restore-confirm-title"
    >
      <div className="p-6" data-testid="restore-confirm-dialog">
        <div id="restore-confirm-title">
          <Heading level={3}>
            {t('ui.dbManagement.restore.confirm.title')}
          </Heading>
        </div>
        <Text className="mt-2 mb-4 text-[var(--color-textMuted)]">
          {t('ui.dbManagement.restore.confirm.message')}
        </Text>
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
            data-testid="restore-cancel-btn"
          >
            {t('ui.dbManagement.restore.confirm.no')}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            data-testid="restore-confirm-btn"
          >
            {t('ui.dbManagement.restore.confirm.yes')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
