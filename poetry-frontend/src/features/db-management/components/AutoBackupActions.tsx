/*
 * File: AutoBackupActions.tsx
 * Purpose: Actions cell for auto backup table.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Inline } from '../../../ui/Inline/Inline'
import { Button } from '../../../ui/Button/Button'
import { useT } from '../../../shared/i18n/useT'

interface AutoBackupActionsProps {
  id: number
  fileName: string
  onDownload: (id: number, name: string) => void
  onRestore: (id: number, name: string) => void
  onDelete: (id: number, name: string) => void
}

export function AutoBackupActions(props: AutoBackupActionsProps): ReactElement {
  const t = useT()
  const dl = (): void => props.onDownload(props.id, props.fileName)
  const rs = (): void => props.onRestore(props.id, props.fileName)
  const rm = (): void => props.onDelete(props.id, props.fileName)
  return (
    <Inline gap="xs">
      <Button variant="primary" size="sm" width="fixed-small" onClick={dl}>
        {t('ui.autoBackup.download')}
      </Button>
      <Button variant="secondary" size="sm" width="fixed-small" onClick={rs}>
        {t('ui.autoBackup.restore')}
      </Button>
      <Button variant="danger" size="sm" width="fixed-small" onClick={rm}>
        {t('ui.autoBackup.delete')}
      </Button>
    </Inline>
  )
}
