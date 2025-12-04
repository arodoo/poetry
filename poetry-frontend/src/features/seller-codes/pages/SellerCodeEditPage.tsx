/*
 * File: SellerCodeEditPage.tsx
 * Purpose: Admin seller code edit page with FormLayout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { buildEditFormSections } from '../model/sellerCodeFormSections'
import { useSellerCodeEditPage } from '../hooks/useSellerCodeEditPage'
import {
  SellerCodeEditPageLoading,
  SellerCodeEditForm,
} from '../components/SellerCodeEditPageHelpers'

export default function SellerCodeEditPage(): ReactElement {
  const {
    detailQuery,
    formState,
    breadcrumbs,
    handleSubmit,
    handleCancel,
    mutation,
    t,
    sellerCode,
  } = useSellerCodeEditPage()
  if (detailQuery.isLoading) {
    return (
      <SellerCodeEditPageLoading message={t('ui.sellerCodes.status.loading')} />
    )
  }
  if (detailQuery.isError || !sellerCode) {
    return (
      <SellerCodeEditPageLoading message={t('ui.sellerCodes.status.error')} />
    )
  }
  return (
    <SellerCodeEditForm
      title={t('ui.sellerCodes.edit.title')}
      subtitle={t('ui.sellerCodes.edit.subtitle')}
      breadcrumbs={breadcrumbs}
      sections={buildEditFormSections(formState, t)}
      onSubmit={handleSubmit}
      submitLabel={t('ui.sellerCodes.actions.save')}
      cancelLabel={t('ui.sellerCodes.actions.cancel')}
      onCancel={handleCancel}
      isSubmitting={mutation.isPending}
    />
  )
}
