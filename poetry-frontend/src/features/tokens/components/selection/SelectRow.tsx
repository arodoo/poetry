/*
 File: SelectRow.tsx
 Purpose: Searchable select-row helper used by TokenSwitcherPanel.
 Renders a label and a SearchableSelect bound to token fields so
 callers can reuse a consistent control. Gracefully falls back to
 the current value when no options are provided.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, memo, useMemo } from 'react'
import { SearchableSelect } from '../../../../ui/SearchableSelect/SearchableSelect'
import type { SelectOption } from '../../../../ui/SearchableSelect/SearchableSelect.types'

interface SelectRowOption {
  key: string
  label: string
}

interface SelectRowProps {
  label: string
  value: string
  options: readonly SelectRowOption[] | undefined
  field: string
  onChange: (field: string, value: string) => void
}

export const SelectRow: React.MemoExoticComponent<
  (p: SelectRowProps) => ReactElement
> = memo(function SelectRow({
  label,
  value,
  options,
  field,
  onChange,
}: SelectRowProps): ReactElement {
  const safe: readonly SelectRowOption[] =
    options && options.length > 0 ? options : [{ key: value, label: value }]

  const selectOptions: SelectOption[] = useMemo(
    () =>
      safe.map(
        (o: SelectRowOption): SelectOption => ({
          value: o.key,
          label: o.label,
        })
      ),
    [safe]
  )

  return (
    <label className="flex flex-col gap-1 text-xs" key={field}>
      <span>{label}</span>
      <SearchableSelect
        options={selectOptions}
        value={value}
        onChange={(v: string): void => {
          onChange(field, v)
        }}
        data-testid={`token-row-${field}`}
      />
    </label>
  )
})
