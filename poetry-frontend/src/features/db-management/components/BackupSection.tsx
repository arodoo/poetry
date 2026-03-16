/*
 * File: BackupSection.tsx
 * Purpose: One-click SQL backup download section. Triggers a full
 * database backup generation and downloads the resulting SQL file
 * with a timestamped filename via blob download.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'
import { useBackupDownload } from '../hooks/useBackupDownload'

export function BackupSection(): ReactElement {
  const t = useT()
  const toast = useToast()
  const backup = useBackupDownload()

  const handleBackup = (): void => {
    backup.mutate(undefined, {
      onError: () => {
        toast.push(
          t('ui.dbManagement.backup.error'),
          'error'
        )
      },
    })
  }

  return (
    <Card padding="md" data-testid="backup-section">
      <Text className="mb-4 text-[var(--color-textMuted)]">
        {t('ui.dbManagement.backup.description')}
      </Text>
      <Button
        variant="primary"
        disabled={backup.isPending}
        onClick={handleBackup}
        data-testid="backup-download-btn"
      >
        {backup.isPending
          ? t('ui.dbManagement.backup.downloading')
          : t('ui.dbManagement.backup.download')}
      </Button>
    </Card>
  )
}
