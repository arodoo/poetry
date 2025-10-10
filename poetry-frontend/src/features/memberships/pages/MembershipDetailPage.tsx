/*
 * File: MembershipDetailPage.tsx
 * Purpose: Admin membership detail page with modern DetailView layout.
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
import { useMembershipDetailQuery } from '../hooks/useMembershipsQueries'
import type { MembershipResponse } from '../../../api/generated'
import { buildMembershipDetailSections } from './membershipDetailHelpers'
import { buildMembershipDetailBreadcrumbs } from './membershipBreadcrumbHelpers'

export default function MembershipDetailPage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const membershipId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: { locale: string } = useLocale()
  const detailQuery: ReturnType<typeof useMembershipDetailQuery> =
    useMembershipDetailQuery(membershipId)
  const { data, isLoading, isError } = detailQuery
  const membership: MembershipResponse | undefined = data
  const sections: readonly DetailViewSection[] = membership
    ? buildMembershipDetailSections(membership, t)
    : []
  const breadcrumbItems: readonly BreadcrumbItem[] =
    buildMembershipDetailBreadcrumbs(locale, t)
  const actions: ReactElement = (
    <Inline gap="sm">
      <Button
        to={`/${locale}/memberships/${membershipId}/edit`}
        size="sm"
        width="fixed-small"
        data-testid="edit-membership-button"
      >
        {t('ui.memberships.actions.edit')}
      </Button>
      <Button
        to={`/${locale}/memberships/${membershipId}/delete`}
        size="sm"
        width="fixed-small"
        variant="danger"
        data-testid="delete-membership-button"
      >
        {t('ui.memberships.actions.delete')}
      </Button>
    </Inline>
  )
  return (
    <PageLayout
      title={t('ui.memberships.detail.title')}
      subtitle={t('ui.memberships.detail.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div data-testid="membership-detail-content">
        {isLoading ? (
          <Text size="sm">{t('ui.memberships.status.loading')}</Text>
        ) : isError || !membership ? (
          <Text size="sm">{t('ui.memberships.status.error')}</Text>
        ) : (
          <DetailView sections={sections} actions={actions} />
        )}
      </div>
    </PageLayout>
  )
}
