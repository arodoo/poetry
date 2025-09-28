/*
 * File: AccountLocaleCard.tsx
 * Purpose: Presentational card summarizing the user locale with i18n labels.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

type TranslateFn = ReturnType<typeof useT>

export interface AccountLocaleCardProps {
  readonly locale: string | null
  readonly isLoading: boolean
  readonly t: TranslateFn
}

export function AccountLocaleCard({
  locale,
  isLoading,
  t,
}: AccountLocaleCardProps): ReactElement {
  const body: string = isLoading
    ? t('ui.account.security.locale.loading')
    : locale
      ? t('ui.account.security.locale.value', { locale })
      : t('ui.account.security.locale.missing')
  const statusLabel: string = isLoading
    ? t('ui.account.security.locale.status.loading')
    : t('ui.account.security.locale.status.ready')

  return (
    <Card padding="lg" shadow radius="lg" aria-live="polite">
      <Stack gap="sm">
        <Heading level={2} size="lg">
          {t('ui.account.security.locale.heading')}
        </Heading>
        <Text aria-live="polite" data-testid="account-locale-value">
          {body}
        </Text>
        <Text className="text-[color:var(--color-muted,#6b7280)]" size="sm">
          {statusLabel}
        </Text>
      </Stack>
    </Card>
  )
}
