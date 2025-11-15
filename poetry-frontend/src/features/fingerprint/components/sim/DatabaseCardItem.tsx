/*
 * File: DatabaseCardItem.tsx
 * Purpose: Single fingerprint database entry display.
 * Shows slot ID, user ID, status with quick test.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Button } from '../../../../ui/Button/Button'
import { Text } from '../../../../ui/Text/Text'
import { useT } from '../../../../shared/i18n/useT'
import type { FingerprintResponse } from '../../model/FingerprintSchemas'

interface Props {
  fingerprint: FingerprintResponse
  onQuickTest: (slotId: number) => void
}

export function DatabaseCardItem(props: Props): ReactElement {
  const t = useT()
  const { fingerprint, onQuickTest } = props
  const fp = fingerprint

  const slotId = String(fp.r503SlotId ?? 'N/A')
  const userId = String(fp.userId ?? 'N/A')
  const status = fp.status ?? 'N/A'

  return (
    <div className="flex justify-between p-3">
      <div className="flex gap-4">
        <Text size="sm">Slot: {slotId}</Text>
        <Text size="sm">User: {userId}</Text>
        <Text size="sm">Status: {status}</Text>
      </div>
      <Button
        size="sm"
        onClick={() => {
          if (fp.r503SlotId) onQuickTest(fp.r503SlotId)
        }}
      >
        {t('ui.fingerprints.simulator.database.quickTest')}
      </Button>
    </div>
  )
}
