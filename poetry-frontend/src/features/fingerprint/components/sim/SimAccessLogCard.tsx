/*
 * File: SimAccessLogCard.tsx
 * Purpose: Terminal-style access log viewer.
 * Displays timestamped verification attempts in green on black.
 * Provides clear button to reset log for fresh testing.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Button } from '../../../../ui/Button/Button'
import { Text } from '../../../../ui/Text/Text'
import { Card } from '../../../../ui/Card/Card'
import { useT } from '../../../../shared/i18n/useT'

interface SimAccessLogCardProps {
  logs: string[]
  onClear: () => void
}

export function SimAccessLogCard({
  logs,
  onClear,
}: SimAccessLogCardProps): ReactElement {
  const t = useT()

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Text size="lg" weight="bold">
            {t('ui.fingerprints.simulator.log.title')}
          </Text>
          <Button size="sm" onClick={onClear}>
            {t('ui.fingerprints.simulator.log.clear')}
          </Button>
        </div>
        <div
          className="bg-[var(--color-surface)]
            text-[var(--color-success)] p-4 rounded"
        >
          {logs.length > 0 ? (
            logs.map((log, idx) => (
              <div key={idx} className="mb-1">
                {log}
              </div>
            ))
          ) : (
            <Text size="sm" className="text-[var(--color-textMuted)]">
              {t('ui.fingerprints.simulator.log.empty')}
            </Text>
          )}
        </div>
      </div>
    </Card>
  )
}
