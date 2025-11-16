/*
 * File: UsersCreatePage.tsx
 * Purpose: Admin create user page with modern FormLayout.
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
import { buildCreateFormSections } from './userFormSections'
import { buildUserCreateBreadcrumbs } from './userBreadcrumbHelpers'
import { UsersCreateFingerprintSection } from './UsersCreateFingerprintSection'
import { useUsersCreatePage } from './useUsersCreatePage'

export default function UsersCreatePage(): ReactElement {
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const breadcrumbs = buildUserCreateBreadcrumbs(locale, t)

  const {
    formState,
    createdUserId,
    isSubmitting,
    handleSubmit,
    handleCancel,
    handleFingerprintSuccess,
    handleSkipFingerprint,
  } = useUsersCreatePage(locale, navigate, toast, t)

  return (
    <PageLayout
      title={t('ui.users.create.title')}
      subtitle={t('ui.users.create.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <FormLayout
        sections={buildCreateFormSections(formState, t)}
        onSubmit={handleSubmit}
        submitLabel={t('ui.users.actions.submit')}
        cancelLabel={t('ui.users.actions.cancel')}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
      {createdUserId !== null && (
        <UsersCreateFingerprintSection
          userId={createdUserId}
          onSuccess={handleFingerprintSuccess}
          onSkip={handleSkipFingerprint}
          t={t}
        />
      )}
    </PageLayout>
  )
}
