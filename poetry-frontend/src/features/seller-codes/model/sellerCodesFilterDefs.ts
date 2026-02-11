/*
 * File: sellerCodesFilterDefs.ts
 * Purpose: Filter definitions for seller codes DataTable.
 * Provides status filter for the filter bar dropdown,
 * matching active/inactive seller code states.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FilterDef } from '../../../ui/DataTable/FilterTypes'

export function buildSellerCodeFilters(
    t: (key: string) => string
): readonly FilterDef[] {
    return [
        {
            key: 'status',
            label: t('ui.table.filter.status'),
            options: [
                {
                    value: 'active',
                    label: t('ui.sellerCodes.status.active'),
                },
                {
                    value: 'inactive',
                    label: t('ui.sellerCodes.status.inactive'),
                },
            ],
        },
    ]
}
