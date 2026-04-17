/*
 * File: ZoneSelect.tsx
 * Purpose: Zone multi-select for membership forms. Shows an
 * All Zones toggle; when off, renders per-zone checkboxes.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { ZoneResponse } from '../../../api/generated'
import { Switch } from '../../../ui/Switch/Switch'
import { Checkbox } from '../../../ui/Checkbox/Checkbox'

interface Props {
  readonly zones: readonly ZoneResponse[]
  readonly zoneIds: readonly number[]
  readonly allZones: boolean
  readonly onZoneIdsChange: (ids: readonly number[]) => void
  readonly onAllZonesChange: (all: boolean) => void
  readonly t: (key: string) => string
}

export default function ZoneSelect({
  zones,
  zoneIds,
  allZones,
  onZoneIdsChange,
  onAllZonesChange,
  t,
}: Props): ReactElement {
  const toggle = (id: number, checked: boolean): void => {
    if (checked) {
      onZoneIdsChange([...zoneIds, id])
    } else {
      onZoneIdsChange(zoneIds.filter((z) => z !== id))
    }
  }

  return (
    <div>
      <p className="block text-sm font-medium mb-2">
        {t('ui.memberships.form.zones.label')}
      </p>
      <Switch
        checked={allZones}
        onChange={onAllZonesChange}
        label={t('ui.memberships.form.allZones.label')}
      />
      {!allZones && zones.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-2">
          {zones.map(
            (zone: ZoneResponse): ReactElement => (
              <label key={zone.id} className="flex items-center gap-1 text-sm">
                <Checkbox
                  checked={zoneIds.includes(zone.id ?? 0)}
                  onChange={(e): void => {
                    toggle(zone.id ?? 0, e.target.checked)
                  }}
                />
                {zone.name}
              </label>
            )
          )}
        </div>
      )}
    </div>
  )
}
