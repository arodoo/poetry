/*
 File: AdminTokensPage.tsx
 Purpose: Admin-only page for managing global UI token selection.
 Displays current selection, provides form for updates, and persists
 changes to backend. Follows PageLayout pattern.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement } from 'react'
import { useTokensQuery } from '../hooks/useTokensQueries'
import { useUpdateSelectionMutation } from '../hooks/useTokensMutations'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { TokensSelectionCard } from '../components/selection/TokensSelectionCard'
import { TokensSelectionForm } from '../components/selection/TokensSelectionForm'
import { useTokensFormState } from './useTokensFormState'
import { buildTokensBreadcrumbs } from './tokensPageHelpers'
import { getSafeInitial } from './tokensUtils'
import {
  createTokensSubmitHandler,
  createTokensCancelHandler,
} from './tokensSubmitHandlers'
import type { UpdateSelectionInput } from '../api/tokensApi'

export function AdminTokensPage(): ReactElement {
  const t: (k: I18nKey) => string = useT()
  const { locale } = useLocale()
  const toast = useToast()
  const { data, isLoading, error } = useTokensQuery()
  const mutation = useUpdateSelectionMutation()

  const safeInitial = getSafeInitial(data)

  const { formState, setField, resetForm } = useTokensFormState(safeInitial)

  if (isLoading) return <p>{t('ui.admin.tokens.loading')}</p>
  if (error) return <p>{t('ui.admin.tokens.error')}</p>
  if (!data) return <p>{t('ui.admin.tokens.empty')}</p>

  const { bundle } = data
  const breadcrumbs = buildTokensBreadcrumbs(locale, t)

  const handleSubmit = createTokensSubmitHandler(
    formState,
    (input: UpdateSelectionInput): void => {
      mutation.mutate(input, {
        onSuccess: (): void => {
          toast.push(t('ui.tokens.toast.update.success'))
        },
        onError: (): void => {
          toast.push(t('ui.tokens.toast.update.error'))
        },
      })
    }
  )

  // `data` presence is checked above; bundle.current fields are required by schema
  const handleCancel = createTokensCancelHandler(resetForm, {
    theme: bundle.current.theme,
    font: bundle.current.font,
    fontSize: bundle.current.fontSize,
    spacing: bundle.current.spacing,
    radius: bundle.current.radius,
    shadow: bundle.current.shadow,
  })

  return (
    <PageLayout
      title={t('ui.admin.tokens.title')}
      subtitle={t('ui.admin.tokens.subtitle')}
    >
      <Breadcrumb items={breadcrumbs} />
      <div className="mt-6 space-y-6">
        <TokensSelectionCard current={bundle.current} t={t} />
        <TokensSelectionForm
          bundle={bundle}
          formState={formState}
          onFieldChange={setField}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={mutation.isPending}
          t={t}
        />
      </div>
    </PageLayout>
  )
}
