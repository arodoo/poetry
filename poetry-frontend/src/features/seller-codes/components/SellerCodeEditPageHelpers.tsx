/*
 * File: SellerCodeEditPageHelpers.tsx
 * Purpose: Helper components for SellerCodeEditPage to reduce file length.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { Text } from '../../../ui/Text/Text'
import type { FormLayoutSection } from '../../../ui/FormLayout/FormLayout'
import { useT } from '../../../shared/i18n/useT'

export function SellerCodeEditPageLoading(props: {
  message: string
}): ReactElement {
  const t = useT()
  return (
    <PageLayout
      title={t('ui.sellerCodes.edit.title')}
      subtitle={t('ui.sellerCodes.edit.subtitle')}
    >
      <Text size="sm">{props.message}</Text>
    </PageLayout>
  )
}

export function SellerCodeEditForm(props: {
  title: string
  subtitle: string
  breadcrumbs: readonly { label: string; href?: string }[]
  sections: readonly FormLayoutSection[]
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  submitLabel: string
  cancelLabel: string
  onCancel: () => void
  isSubmitting: boolean
}): ReactElement {
  return (
    <PageLayout title={props.title} subtitle={props.subtitle}>
      <div className="mb-4">
        <Breadcrumb items={props.breadcrumbs} />
      </div>
      <FormLayout
        sections={props.sections}
        onSubmit={props.onSubmit}
        submitLabel={props.submitLabel}
        cancelLabel={props.cancelLabel}
        onCancel={props.onCancel}
        isSubmitting={props.isSubmitting}
      />
    </PageLayout>
  )
}
