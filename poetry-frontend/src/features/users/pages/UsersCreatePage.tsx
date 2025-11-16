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
import { Button } from '../../../ui/Button/Button'
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

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <div>
              <h3 className="text-lg font-medium">{section.title}</h3>
              {section.description && (
                <p className="text-sm text-gray-600">{section.description}</p>
              )}
            </div>
            <div>{section.fields}</div>
          </div>
        ))}
      </div>

      <UsersCreateFingerprintSection
        onSuccess={handleFingerprintComplete}
        onSkip={handleSkipFingerprint}
        t={t}
      />

      <div className="mt-6 flex gap-4">
        <Button
          onClick={(e) => {
            e.preventDefault()
            const fakeEvent = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>
            handleCreateUser(fakeEvent)
          }}
          variant="primary"
          disabled={isSubmitting}
        >
          {t('ui.users.actions.create')}
        </Button>
        <Button onClick={handleCancel} variant="secondary">
          {t('ui.users.actions.cancel')}
        </Button>
      </div>
    </PageLayout>
  )
}
