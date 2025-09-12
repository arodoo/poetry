/*
 File: AdminTokensPage.tsx
 Purpose: Admin-only page to display current design token bundle (raw JSON)
 for observability and verification. Uses i18n for all labels and React Query
 via useTokensQuery. All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement } from 'react'
import { useTokensQuery } from '../../tokens/hooks/useTokensQueries'
import { useT } from '../../../shared/i18n/useT'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { TokenSwitcherPanel } from '../components/TokenSwitcherPanel'

export function AdminTokensPage(): ReactElement {
  const t: (k: I18nKey) => string = useT()
  const { data, isLoading, error } = useTokensQuery()

  if (isLoading) return <p>{t('ui.admin.tokens.loading')}</p>
  if (error) return <p>{t('ui.admin.tokens.error')}</p>
  if (!data) return <p>{t('ui.admin.tokens.empty')}</p>

  return (
    <section className="p-4 space-y-4">
      <h1 className="text-lg font-semibold">{t('ui.admin.tokens.title')}</h1>
      <TokenSwitcherPanel />
      <pre
        className={
          'text-xs bg-[var(--color-background,#f5f5f5)] p-2 rounded ' +
          'overflow-x-auto'
        }
      >
        {JSON.stringify(data.bundle, null, 2)}
      </pre>
    </section>
  )
}
