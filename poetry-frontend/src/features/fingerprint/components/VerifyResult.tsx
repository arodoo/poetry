/*
 * File: VerifyResult.tsx
 * Purpose: Display verification result with match status.
 * Shows user ID when fingerprint matches a record.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import type { VerifyResponse } from '../model/FingerprintSchemas'

interface Props {
  result: VerifyResponse
}

export function VerifyResult(props: Props): ReactElement {
  const t = useT()
  const { result } = props

  return (
    <div className="p-4 border rounded">
      <Text size="sm" weight="bold">
        {result.matched
          ? t('ui.fingerprints.verify.matched')
          : t('ui.fingerprints.verify.notMatched')}
      </Text>
      {result.matched && result.userId && (
        <Text size="sm">
          {t('ui.fingerprints.verify.userId')}: {result.userId}
        </Text>
      )}
    </div>
  )
}
