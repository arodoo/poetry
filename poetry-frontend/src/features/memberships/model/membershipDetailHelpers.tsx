/*
 * File: membershipDetailHelpers.tsx
 * Purpose: Helper functions for MembershipDetailPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { MembershipResponse } from '../../../api/generated'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { DetailViewItem } from '../../../ui/DetailView/DetailView'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import { toTemplateString } from '../../../shared/utils/templateSafe'
import { formatDate } from '../../../shared/utils/dateUtils'

export function buildMembershipDetailSections(
  membership: MembershipResponse,
  t: (key: string) => string
): readonly DetailViewSection[] {
  return [
    {
      title: t('ui.memberships.detail.section.basic'),
      items: [
        {
          label: t('ui.memberships.columns.user'),
          value: membership.userName ?? '-',
        },
        {
          label: t('ui.memberships.columns.subscription'),
          value: membership.subscriptionName ?? '-',
        },
        {
          label: t('ui.memberships.columns.seller'),
          value: membership.sellerName ?? '-',
        },
      ] as readonly DetailViewItem[],
    },
    {
      title: t('ui.memberships.detail.section.zones'),
      items: [
        {
          label: t('ui.memberships.form.allZones.label'),
          value: membership.allZones ? t('ui.common.yes') : t('ui.common.no'),
        },
        {
          label: t('ui.memberships.columns.zones'),
          value:
            membership.zoneIds && membership.zoneIds.length > 0 ? (
              <Inline gap="xs">
                {membership.zoneIds.map(
                  (zoneId: number): ReactElement => (
                    <Badge key={zoneId} tone="neutral" size="sm">
                      {t('ui.memberships.columns.zone')}{' '}
                      {toTemplateString(zoneId)}
                    </Badge>
                  )
                )}
              </Inline>
            ) : (
              t('ui.common.none')
            ),
          fullWidth: true,
        },
      ] as readonly DetailViewItem[],
    },
    {
      title: t('ui.memberships.detail.section.metadata'),
      items: [
        {
          label: t('ui.memberships.columns.status'),
          value: (
            <Badge
              tone={
                membership.status?.toLowerCase() === 'active'
                  ? 'success'
                  : 'neutral'
              }
            >
              {t(
                'ui.memberships.status.' +
                  (membership.status?.toLowerCase() ?? 'inactive')
              )}
            </Badge>
          ),
        },
        {
          label: t('ui.memberships.columns.createdAt'),
          value: formatDate(membership.createdAt),
        },
        {
          label: t('ui.memberships.columns.nextPaymentDate'),
          value: formatDate(membership.nextPaymentDate),
        },
      ] as readonly DetailViewItem[],
    },
  ]
}
