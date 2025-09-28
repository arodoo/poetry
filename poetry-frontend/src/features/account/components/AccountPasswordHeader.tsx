/*
 * File: AccountPasswordHeader.tsx
 * Purpose: Heading and description for the account password form.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

type TranslateFn = ReturnType<typeof useT>

export function AccountPasswordHeader(props: {
  readonly t: TranslateFn
}): ReactElement {
  return (
    <div className="flex flex-col gap-1">
      <Heading level={2} size="lg">
        {props.t('ui.account.security.password.heading')}
      </Heading>
      <Text size="sm" className="text-[color:var(--color-muted,#6b7280)]">
        {props.t('ui.account.security.password.description')}
      </Text>
    </div>
  )
}
