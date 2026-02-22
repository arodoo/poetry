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
          label: t('ui.memberships.columns.id'),
          value: String(membership.id ?? ''),
        },
        {
          label: t('ui.memberships.columns.userId'),
          value: String(membership.userId ?? ''),
        },
        {
          label: t('ui.memberships.columns.subscriptionId'),
          value: String(membership.subscriptionId ?? ''),
        },
        {
          label: t('ui.memberships.columns.sellerCode'),
          value: membership.sellerCode ?? '-',
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
      ] as readonly DetailViewItem[],
    },
  ]
}
