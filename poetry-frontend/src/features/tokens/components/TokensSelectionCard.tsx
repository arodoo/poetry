/*
 File: TokensSelectionCard.tsx
 Purpose: Card component displaying current token selection in a
 clean grid layout. Uses theme tokens for styling to demonstrate
 the design system. All Rights Reserved. Arodi Emmanuel
*/
import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import type { TokenBundle } from '../model/TokensSchemas'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { formatTokenLabel } from '../pages/tokensPageHelpers'

export interface TokensSelectionCardProps {
  current: TokenBundle['current']
  t: (k: I18nKey) => string
}

export function TokensSelectionCard({
  current,
  t,
}: TokensSelectionCardProps): ReactElement {
  const fields: {
    key: keyof TokenBundle['current']
    labelKey: I18nKey
  }[] = [
    { key: 'theme', labelKey: 'ui.tokens.fields.theme' },
    { key: 'font', labelKey: 'ui.tokens.fields.font' },
    { key: 'fontSize', labelKey: 'ui.tokens.fields.fontSize' },
    { key: 'spacing', labelKey: 'ui.tokens.fields.spacing' },
    { key: 'radius', labelKey: 'ui.tokens.fields.radius' },
    { key: 'shadow', labelKey: 'ui.tokens.fields.shadow' },
  ]

  return (
    <div className="border border-[var(--color-border)] rounded-lg p-4 bg-[var(--color-surface)] shadow-sm">
      <h2 className="mb-4 font-semibold text-lg text-[var(--color-text)]">
        {t('ui.admin.tokens.currentSelection')}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(({ key, labelKey }): ReactElement => (
          <div key={key} className="space-y-1">
            <Text size="sm" className="text-[var(--color-textMuted)]">
              {t(labelKey)}
            </Text>
            <Text size="md" className="font-medium text-[var(--color-text)]">
              {formatTokenLabel(current[key])}
            </Text>
          </div>
        ))}
      </div>
    </div>
  )
}
