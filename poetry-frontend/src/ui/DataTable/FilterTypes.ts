/*
 * File: FilterTypes.ts
 * Purpose: Type definitions and client-side filter
 * logic for DataTable filter dropdowns. Defines
 * filter options, defs, active state, and apply.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface FilterOption {
  readonly value: string
  readonly label: string
}

export interface FilterDef {
  readonly key: string
  readonly label: string
  readonly options: readonly FilterOption[]
}

export type ActiveFilters = Readonly<Record<string, string>>

type Filterable = Record<string, unknown>

export function applyFilters<T extends Filterable>(
  data: readonly T[],
  filters: ActiveFilters
): readonly T[] {
  const active = Object.entries(filters).filter(([, v]): boolean => v !== '')
  if (active.length === 0) return data
  return data.filter((row: T): boolean =>
    active.every(([key, val]): boolean => {
      const f: unknown = row[key]
      if (Array.isArray(f)) {
        return f.some((i: unknown) => String(i) === val)
      }
      if (typeof f === 'string') {
        return f.toLowerCase() === val.toLowerCase()
      }
      return String(f ?? '') === val
    })
  )
}
