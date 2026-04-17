/*
 * File: membershipDetailHelpers.tsx
 * Purpose: Helper functions for MembershipDetailPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { MembershipResponse, ZoneResponse } from '../../../api/generated'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { DetailViewItem } from '../../../ui/DetailView/DetailView'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import { toTemplateString } from '../../../shared/utils/templateSafe'
import { formatDate } from '../../../shared/utils/dateUtils'

function buildZoneBadges(zones: readonly ZoneResponse[]): ReactElement {
  return (
    <Inline gap="xs">
      {zones.map(
        (zone: ZoneResponse): ReactElement => (
          <Badge key={zone.id} tone="neutral" size="sm">
            {zone.name ?? toTemplateString(zone.id ?? 0)}
          </Badge>
        )
      )}
    </Inline>
  )
}

export function buildMembershipDetailSections(
  membership: MembershipResponse,
  allZones: readonly ZoneResponse[],
  t: (key: string) => string
): readonly DetailViewSection[] {
  const displayZones: readonly ZoneResponse[] = membership.allZones
    ? allZones
    : allZones.filter(
        (z: ZoneResponse) => membership.zoneIds?.includes(z.id ?? -1) ?? false
      )

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
            displayZones.length > 0
              ? buildZoneBadges(displayZones)
              : t('ui.common.none'),
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
