/*
 File: AdminTokensPage.tsx
 Purpose: Admin page for managing global UI token selection and theme creation.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTokensQuery } from '../hooks/useTokensQueries'
import { useUpdateSelectionMutation } from '../hooks/useTokensMutations'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { AdminTokensContent } from './AdminTokensContent'
import { AdminTokensStatusView } from './AdminTokensStatusView'
import { useTokensFormState } from '../hooks/useTokensFormState'
import { buildTokensPageHandlers } from '../hooks/useTokensPageHandlers'
import { buildTokensBreadcrumbs } from '../model/tokensPageHelpers'
import { getSafeInitial } from '../model/tokensUtils'

export function AdminTokensPage(): ReactElement {
  const t: (k: I18nKey) => string = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const toast = useToast()
  const { data, isLoading, error } = useTokensQuery()
  const mutation = useUpdateSelectionMutation()
  const safeInitial = getSafeInitial(data)
  const { formState, setField, resetForm } = useTokensFormState(safeInitial)

  const title = t('ui.admin.tokens.title')
  const subtitle = t('ui.admin.tokens.subtitle')
  const crumbs = <Breadcrumb items={buildTokensBreadcrumbs(locale, t)} />
  const status = (msg: string, variant?: 'info' | 'error'): ReactElement => (
    <AdminTokensStatusView
      title={title}
      subtitle={subtitle}
      crumbs={crumbs}
      message={msg}
      variant={variant}
    />
  )

  if (isLoading) return status(t('ui.admin.tokens.loading'))
  if (error) return status(t('ui.admin.tokens.error'), 'error')
  if (!data) return status(t('ui.admin.tokens.empty'))

  const { bundle } = data
  const { handleSubmit, handleCancel } = buildTokensPageHandlers({
    formState,
    resetForm,
    current: bundle.current,
    t,
    toast,
    navigate,
    currentPathname: pathname,
    mutate: mutation.mutate,
  })

  return (
    <PageLayout title={title} subtitle={subtitle}>
      {crumbs}
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
