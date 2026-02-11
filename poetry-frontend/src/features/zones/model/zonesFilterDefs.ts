/*
 * File: zonesFilterDefs.ts
 * Purpose: Filter definitions for the zones DataTable.
 * Provides auto-detected status filter for the filter
 * bar dropdown, matching active/inactive zone states.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FilterDef } from '../../../ui/DataTable/FilterTypes'

export function buildZoneFilters(
    t: (key: string) => string
): readonly FilterDef[] {
    return [
        {
            key: 'status',
            label: t('ui.table.filter.status'),
            options: [
                {
                    value: 'active',
                    label: t('ui.zones.status.active'),
                },
                {
                    value: 'inactive',
                    label: t('ui.zones.status.inactive'),
                },
            ],
        },
    ]
}
