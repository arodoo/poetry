/*
 * File: SubscriptionStatusField.tsx
 * Purpose: Status select for subscription form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Select } from '../../../../ui/Select/Select'
import { Text } from '../../../../ui/Text/Text'

interface Props {
  t: (k: string) => string
  status: 'active' | 'inactive'
  setStatus: (v: 'active' | 'inactive') => void
}

export default function SubscriptionStatusField({
  t,
  status,
  setStatus,
}: Props): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {t('ui.subscriptions.table.status')}
      </Text>
      <Select
        value={status}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
          setStatus(e.target.value as 'active' | 'inactive')
        }}
        data-testid="subscription-status-select"
      >
        <option value="active">{t('ui.subscriptions.status.active')}</option>
        <option value="inactive">
          {t('ui.subscriptions.status.inactive')}
        </option>
      </Select>
    </Stack>
  )
}
