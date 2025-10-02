/*
 * File: UsersDetailSummary.tsx
 * Purpose: Detail summary placeholder for admin user view.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'

export function UsersDetailSummary(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  return (
    <Card padding="lg">
      <Stack gap="md">
        <Heading level={2} size="md">
          {t('ui.users.detail.placeholder.title')}
        </Heading>
        <Text size="sm">{t('ui.users.detail.placeholder.subtitle')}</Text>
        <Stack gap="sm" as="div">
          <Text size="sm" className="font-medium">
            {t('ui.users.detail.placeholder.identity')}
          </Text>
          <Text size="sm" className="text-neutral-500">
            {t('ui.users.detail.placeholder.identity_hint')}
          </Text>
        </Stack>
        <Stack gap="sm" as="div">
          <Text size="sm" className="font-medium">
            {t('ui.users.detail.placeholder.security')}
          </Text>
          <Text size="sm" className="text-neutral-500">
            {t('ui.users.detail.placeholder.security_hint')}
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}
