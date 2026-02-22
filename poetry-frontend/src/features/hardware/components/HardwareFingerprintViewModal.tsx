/*
 * File: HardwareFingerprintViewModal.tsx
 * Purpose: Modal displaying technical Details of a single Fingerprint FMD.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Modal } from '../../../ui/Modal/Modal'
import { Heading } from '../../../ui/Heading/Heading'
import { Button } from '../../../ui/Button/Button'
import { useT } from '../../../shared/i18n/useT'
import type { MergedFingerprint } from './HardwareFingerprintTableShell'
import { Stack } from '../../../ui/Stack/Stack'
import { formatDate } from '../../../shared/utils/dateUtils'

interface Props {
  fingerprint: MergedFingerprint
  onClose: () => void
}

export function HardwareFingerprintViewModal({
  fingerprint,
  onClose,
}: Props): ReactElement {
  const t = useT()

  return (
    <Modal open={true} onClose={onClose} size="md">
      <div className="p-6">
        <Heading level={2}>{t('ui.hardware.fingerprints.modal.title')}</Heading>
        <Stack gap="md" className="py-4">
          <DetailRow
            label={t('ui.hardware.fingerprints.modal.id')}
            value={String(fingerprint.id)}
          />
          <DetailRow
            label={t('ui.hardware.fingerprints.modal.userId')}
            value={String(fingerprint.userId)}
          />
          <DetailRow
            label={t('ui.hardware.fingerprints.modal.username')}
            value={fingerprint.username}
          />
          <DetailRow
            label={t('ui.hardware.fingerprints.modal.status')}
            value={fingerprint.status}
          />
          <DetailRow
            label={t('ui.hardware.fingerprints.modal.version')}
            value={String(fingerprint.version)}
          />
          <DetailRow
            label={t('ui.hardware.fingerprints.modal.enrolledAt')}
            value={formatDate(fingerprint.enrolledAt)}
          />
        </Stack>
        <div className="flex justify-end pt-4 border-t border-[var(--color-border)]">
          <Button variant="secondary" onClick={onClose}>
            {t('ui.common.close') || 'Close'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function DetailRow({
  label,
  value,
}: {
  label: string
  value: string
}): ReactElement {
  return (
    <div className="flex justify-between border-b border-[var(--color-border)] pb-2 last:border-0">
      <span className="text-sm font-medium text-[var(--color-text-muted)]">
        {label}
      </span>
      <span className="text-sm text-[var(--color-text)] font-mono">
        {value}
      </span>
    </div>
  )
}
