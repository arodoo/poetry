/*
 * File: UsersListShell.tsx
 * Purpose: Placeholder list layout for admin users overview.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Text } from '../../../ui/Text/Text'
import { Heading } from '../../../ui/Heading/Heading'
import { Button } from '../../../ui/Button/Button'
import { useT } from '../../../shared/i18n/useT'

export function UsersListShell(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  return (
    <Card padding="lg">
      <Stack gap="md">
        <Heading level={2} size="md">
          {t('ui.users.list.placeholder.title')}
        </Heading>
        <Text size="sm">{t('ui.users.list.placeholder.subtitle')}</Text>
        <Stack
          as="div"
          gap="sm"
          className="md:flex md:items-center md:justify-between"
        >
          <Stack gap="sm">
            <Text size="sm" className="uppercase tracking-wide">
              {t('ui.users.list.placeholder.filters.label')}
            </Text>
            <Text size="sm" className="text-[var(--color-textMuted)]">
              {t('ui.users.list.placeholder.filters.hint')}
            </Text>
          </Stack>
          <Button variant="primary" size="sm">
            {t('ui.users.actions.invite')}
          </Button>
        </Stack>
        <Card padding="md" shadow={false}>
          <Stack gap="sm">
            <Heading level={3} size="md">
              {t('ui.users.list.placeholder.row_title')}
            </Heading>
            <Text size="sm" className="text-[var(--color-textMuted)]">
              {t('ui.users.list.placeholder.row_subtitle')}
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  )
}
