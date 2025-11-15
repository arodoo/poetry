/*
 * File: EnrollFormStatus.tsx
 * Purpose: Status messages for fingerprint enrollment.
 * Displays success or error feedback to the user.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'

interface Props {
  isError: boolean
  isSuccess: boolean
}

export function EnrollFormStatus(props: Props): ReactElement | null {
  const t = useT()
  const { isError, isSuccess } = props

  if (isError) {
    return (
      <Text size="sm" className="text-[var(--color-error)]">
        {t('ui.fingerprints.errors.enrollFailed')}
      </Text>
    )
  }

  if (isSuccess) {
    return (
      <Text size="sm" className="text-[var(--color-success)]">
        {t('ui.fingerprints.success.enrolled')}
      </Text>
    )
  }

  return null
}
