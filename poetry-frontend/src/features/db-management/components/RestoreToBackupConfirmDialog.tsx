/*
 * File: RestoreToBackupConfirmDialog.tsx
 * Purpose: Confirmation modal for restoring database to a specific backup point.
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
  readonly fileName: string
  readonly onConfirm: () => void
  readonly onCancel: () => void
}

export function RestoreToBackupConfirmDialog({
  open,
  fileName,
  onConfirm,
  onCancel,
}: Props): ReactElement | null {
  const t = useT()
  return (
    <Modal
      open={open}
      onClose={onCancel}
      size="sm"
      labelledBy="restore-to-backup-title"
    >
      <div className="p-6" data-testid="restore-to-backup-dialog">
        <div id="restore-to-backup-title">
          <Heading level={3}>{t('ui.autoBackup.restore.title')}</Heading>
        </div>
        <Text className="mt-2 mb-4 text-[var(--color-textMuted)]">
          {t('ui.autoBackup.restore.message', { fileName })}
        </Text>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onCancel}>
            {t('ui.autoBackup.restore.cancel')}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {t('ui.autoBackup.restore.confirm')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
