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
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { buildCreateFormSections } from './userFormSections'
import { buildUserCreateBreadcrumbs } from './userBreadcrumbHelpers'
import { UsersCreateFingerprintSection } from './UsersCreateFingerprintSection'
import { useUsersCreatePage } from './useUsersCreatePage'
import { UserFormSectionsRenderer } from '../components/form/FormSectionsRenderer'
import { UserCreateFormActions } from '../components/form/UserCreateFormActions'

export default function UsersCreatePage(): ReactElement {
  const t = useT()
  const { locale } = useLocale()
  const navigate = useNavigate()
  const toast = useToast()
  const breadcrumbs = buildUserCreateBreadcrumbs(locale, t)

  const {
    formState,
    isSubmitting,
    handleCreateUser,
    handleFingerprintComplete,
    handleSkipFingerprint,
    handleCancel,
  } = useUsersCreatePage(locale, navigate, toast, t)

  const sections = buildCreateFormSections(formState, t)

  return (
    <PageLayout
      title={t('ui.users.create.title')}
      subtitle={t('ui.users.create.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <UserFormSectionsRenderer sections={sections} />
      <UsersCreateFingerprintSection
        onSuccess={handleFingerprintComplete}
        onSkip={handleSkipFingerprint}
        t={t}
      />
      <UserCreateFormActions
        onSubmit={handleCreateUser}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        t={t}
      />
    </PageLayout>
  )
}
