
/*
 * File: zoneDetailHelpers.tsx
 * Purpose: Helper functions to build detail view sections for the zone detail page. Formats zone properties into DetailView section structures for display. Supports modular UI and improves maintainability of detail views.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { ZoneDetail } from '../model/ZonesSchemas'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export function buildZoneDetailSections(
  zone: ZoneDetail,
  t: (key: I18nKey) => string
): readonly DetailViewSection[] {
  return [
    {
      title: t('ui.zones.detail.section.basic'),
      items: [
        {
          label: t('ui.zones.form.name.label'),
          value: zone.name ?? '-',
        },
        {
          label: t('ui.zones.form.description.label'),
          value: zone.description ?? '-',
        },
        {
          label: t('ui.zones.form.manager.label'),
          value: zone.managerId ? String(zone.managerId) : '-',
        },
      ],
    },
  ]
}
