/*
 * File: HardwareFingerprintActions.tsx
 * Purpose: Action buttons for the hardware fingerprint table.
 * Includes view and delete for orphan fingerprint cleanup.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Inline } from '../../../ui/Inline/Inline'
import { Button } from '../../../ui/Button/Button'
import type { MergedFingerprint } from './HardwareFingerprintTableShell'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useDeleteFingerprint } from '../hooks/useDeleteFingerprint'

export interface HardwareFingerprintActionsProps {
  row: MergedFingerprint
  t: (k: string) => string
}

export function HardwareFingerprintActions({
  row,
  t,
}: HardwareFingerprintActionsProps): ReactElement {
  const { locale } = useLocale()
  const { busy, handleDelete } = useDeleteFingerprint()
  const msg = t('ui.hardware.fingerprints.delete.confirm')

  return (
    <Inline gap="xs">
      <Button
        to={`/${locale}/hardware/fingerprints/${String(row.id)}`}
        size="sm" width="fixed-small"
        data-testid={`view-fp-${String(row.id)}`}
      >
        {t('ui.hardware.fingerprints.table.view')}
      </Button>
      <Button
        size="sm" variant="danger" width="fixed-small"
        disabled={busy}
        onClick={() => handleDelete(row.id, msg)}
        data-testid={`delete-fp-${String(row.id)}`}
      >
        {t('ui.hardware.fingerprints.delete')}
      </Button>
    </Inline>
  )
}
