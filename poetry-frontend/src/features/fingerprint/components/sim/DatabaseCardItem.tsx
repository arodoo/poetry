/*
 * File: DatabaseCardItem.tsx
 * Purpose: Single fingerprint database entry display.
 * Shows user ID and status. FMD is hidden but used for quick test.
 * All Rights Reserved Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Button } from '../../../../ui/Button/Button'
import { Text } from '../../../../ui/Text/Text'
import { useT } from '../../../../shared/i18n/useT'
import type { FingerprintResponse } from '../../model/FingerprintSchemas'

interface Props {
  fingerprint: FingerprintResponse
  onQuickTest: (fmd: string) => void
}

export function DatabaseCardItem(props: Props): ReactElement {
  const t = useT()
  const { fingerprint, onQuickTest } = props
  const fp = fingerprint

  const userId = String(fp.userId ?? 'N/A')
  const status = fp.status ?? 'N/A'

  return (
    <div className="flex justify-between p-3 border-b border-[var(--color-border-subtle)]">
      <div className="flex gap-4">
        <Text size="sm">User: {userId}</Text>
        <Text size="sm">Status: {status}</Text>
      </div>
      <Button
        size="sm"
        onClick={() => {
          // In HID model, we simulate taking the FMD from the record 
          // and "capturing" it to verify
          onQuickTest('MOCK_TEST_FMD_DATA')
        }}
      >
        {t('ui.fingerprints.simulator.database.quickTest')}
      </Button>
    </div>
  )
}
