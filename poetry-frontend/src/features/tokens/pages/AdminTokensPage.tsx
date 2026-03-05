/*
 File: AdminTokensPage.tsx
 Purpose: Admin page for managing global UI token selection and theme creation.
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
import { AdminTokensContent } from './AdminTokensContent'
import { useTokensFormState } from '../hooks/useTokensFormState'
import { buildTokensPageHandlers } from '../hooks/useTokensPageHandlers'
import { buildTokensBreadcrumbs } from '../model/tokensPageHelpers'
import { getSafeInitial } from '../model/tokensUtils'

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
  const { handleSubmit, handleCancel } = buildTokensPageHandlers({
    formState, resetForm, current: bundle.current, t,
    toast, mutate: mutation.mutate,
  })

  return (
    <PageLayout
      title={t('ui.admin.tokens.title')}
      subtitle={t('ui.admin.tokens.subtitle')}
    >
      <Breadcrumb items={buildTokensBreadcrumbs(locale, t)} />
      <AdminTokensContent
        bundle={bundle}
        formState={formState}
        onFieldChange={setField}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={mutation.isPending}
        t={t as (k: string) => string}
      />
    </PageLayout>
  )
}
