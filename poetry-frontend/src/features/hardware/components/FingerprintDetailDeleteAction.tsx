/*
 * File: FingerprintDetailDeleteAction.tsx
 * Purpose: Delete action button rendered inside the fingerprint
 * detail view. Wraps the deletion hook and navigates back to
 * the hardware list page on success.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../ui/Button/Button'
import { Inline } from '../../../ui/Inline/Inline'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useDeleteFingerprint } from '../hooks/useDeleteFingerprint'

interface Props {
  id: number
}

export function FingerprintDetailDeleteAction({ id }: Props): ReactElement {
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const { busy, handleDelete } = useDeleteFingerprint()

  const onClick = (): void => {
    handleDelete(id, t('ui.hardware.fingerprints.delete.confirm'), () =>
      navigate(`/${locale}/hardware`)
    )
  }

  return (
    <Inline gap="sm">
      <Button
        size="sm"
        width="fixed-small"
        variant="danger"
        disabled={busy}
        onClick={onClick}
        data-testid="delete-fingerprint-button"
      >
        {t('ui.hardware.fingerprints.delete')}
      </Button>
    </Inline>
  )
}
