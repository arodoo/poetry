/*
 * File: SellerCodeCreatePage.tsx
 * Purpose: Admin create seller code page with modern FormLayout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { useSellerCodesFormState } from '../components/useSellerCodesFormState'
import { useCreateSellerCodeMutation } from '../hooks/useSellerCodesMutations'
import type { CreateSellerCodeInput } from '../model/SellerCodesSchemas'
import { buildCreateFormSections } from './sellerCodeFormSections'
import { buildSellerCodeCreateBreadcrumbs } from './sellerCodeBreadcrumbHelpers'
import {
  createSellerCodeSubmitHandler,
  createSellerCodeCancelHandler,
} from './sellerCodeCreateHandlers'

export default function SellerCodeCreatePage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const mutation: ReturnType<typeof useCreateSellerCodeMutation> =
    useCreateSellerCodeMutation()
  const isSubmitting: boolean = mutation.isPending
  const formState: ReturnType<typeof useSellerCodesFormState> =
    useSellerCodesFormState()
  const breadcrumbs: readonly { label: string; href?: string }[] =
    buildSellerCodeCreateBreadcrumbs(locale, t)
  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void =
    createSellerCodeSubmitHandler(
      formState,
      (input: CreateSellerCodeInput): void => {
        mutation.mutate(input, {
          onSuccess: (): void => {
            toast.push(t('ui.sellerCodes.toast.create.success'))
            void navigate(`/${locale}/seller-codes`)
          },
          onError: (): void => {
            toast.push(t('ui.sellerCodes.toast.create.error'))
          },
        })
      }
    )
  const handleCancel: () => void = createSellerCodeCancelHandler(
    navigate,
    locale
  )

  return (
    <PageLayout
      title={t('ui.sellerCodes.create.title')}
      subtitle={t('ui.sellerCodes.create.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <FormLayout
        sections={buildCreateFormSections(formState, t)}
        onSubmit={handleSubmit}
        submitLabel={t('ui.sellerCodes.actions.submit')}
        cancelLabel={t('ui.sellerCodes.actions.cancel')}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </PageLayout>
  )
}
