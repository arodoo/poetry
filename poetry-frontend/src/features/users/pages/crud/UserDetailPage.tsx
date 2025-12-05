/*
 * File: UserDetailPage.tsx
 * Purpose: Admin user detail page with modern DetailView layout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Inline } from '../../../ui/Inline/Inline'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DetailView } from '../../../ui/DetailView/DetailView'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useUserDetailQuery } from '../hooks/useUsersQueries'
import type { UserResponse } from '../../../api/generated'
import { buildUserDetailSections } from '../model/userDetailHelpers'
import { buildUserDetailBreadcrumbs } from '../model/userBreadcrumbHelpers'

export default function UserDetailPage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: { locale: string } = useLocale()
  const detailQuery: ReturnType<typeof useUserDetailQuery> =
    useUserDetailQuery(userId)
  const { data, isLoading, isError } = detailQuery
  const user: UserResponse | undefined = data
  const sections: readonly DetailViewSection[] = user
    ? buildUserDetailSections(user, t)
    : []
  const breadcrumbItems: readonly BreadcrumbItem[] = buildUserDetailBreadcrumbs(
    locale,
    t
  )
  const actions: ReactElement = (
    <Inline gap="sm">
      <Button
        to={`/${locale}/users/${userId}/edit`}
        size="sm"
        width="fixed-small"
        data-testid="edit-user-button"
      >
        {t('ui.users.actions.edit')}
      </Button>
      <Button
        to={`/${locale}/users/${userId}/delete`}
        size="sm"
        width="fixed-small"
        variant="danger"
        data-testid="delete-user-button"
      >
        {t('ui.users.actions.delete')}
      </Button>
    </Inline>
  )
  return (
    <PageLayout
      title={t('ui.users.detail.title')}
      subtitle={t('ui.users.detail.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div data-testid="user-detail-content">
        {isLoading ? (
          <Text size="sm">{t('ui.users.status.loading')}</Text>
        ) : isError || !user ? (
          <Text size="sm">{t('ui.users.status.error')}</Text>
        ) : (
          <DetailView sections={sections} actions={actions} />
        )}
      </div>
    </PageLayout>
  )
}
