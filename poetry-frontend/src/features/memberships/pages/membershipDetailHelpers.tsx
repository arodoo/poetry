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

export function buildMembershipDetailSections(
  membership: MembershipResponse,
  t: (key: string) => string
): readonly DetailViewSection[] {
  return [
    {
      title: t('ui.memberships.detail.section.basic'),
      items: [
        {
          label: t('ui.memberships.table.id'),
          value: String(membership.id ?? ''),
        },
        {
          label: t('ui.memberships.table.userId'),
          value: String(membership.userId ?? ''),
        },
        {
          label: t('ui.memberships.table.subscriptionId'),
          value: String(membership.subscriptionId ?? ''),
        },
        {
          label: t('ui.memberships.table.sellerCode'),
          value: membership.sellerCode ?? '',
        },
      ] as readonly DetailViewItem[],
    },
    {
      title: t('ui.memberships.detail.section.zones'),
      items: [
        {
          label: t('ui.memberships.form.allZones.label'),
          value: membership.allZones ? 'Yes' : 'No',
        },
        {
          label: t('ui.memberships.table.zones'),
          value:
            membership.zoneIds && membership.zoneIds.length > 0 ? (
              <Inline gap="xs">
                {membership.zoneIds.map(
                  (zoneId: number): ReactElement => (
                    <Badge key={zoneId} tone="neutral" size="sm">
                      Zone {toTemplateString(zoneId)}
                    </Badge>
                  )
                )}
              </Inline>
            ) : (
              'None'
            ),
          fullWidth: true,
        },
      ] as readonly DetailViewItem[],
    },
    {
      title: t('ui.memberships.detail.section.metadata'),
      items: [
        {
          label: t('ui.memberships.table.status'),
          value: (
            <Badge tone={membership.status === 'active' ? 'success' : 'neutral'}>
              {t('ui.memberships.status.' + (membership.status ?? 'inactive'))}
            </Badge>
          ),
        },
      ] as readonly DetailViewItem[],
    },
  ]
}
