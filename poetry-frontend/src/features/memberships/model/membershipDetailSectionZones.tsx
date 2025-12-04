/*
 * File: membershipDetailSectionZones.tsx
 * Purpose: Zones section builder for membership detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { MembershipResponse } from '../../../api/generated'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { DetailViewItem } from '../../../ui/DetailView/DetailView'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import { toTemplateString } from '../../../shared/utils/templateSafe'

export function buildZonesSection(
  membership: MembershipResponse,
  t: (key: string) => string
): DetailViewSection {
  return {
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
  }
}
