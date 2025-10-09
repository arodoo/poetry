/*
 * zoneDetailHelpers.tsx
 * Helper functions to build detail view sections for zone detail page.
 * Formats zone properties into DetailView section structure.
 * © 2025 Poetry Platform. All rights reserved.
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
