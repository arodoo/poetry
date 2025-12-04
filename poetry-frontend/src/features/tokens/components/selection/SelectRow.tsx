/*
 File: SelectRow.tsx
 Purpose: Small select-row helper used by TokenSwitcherPanel. It renders a
 label and a select bound to token fields so callers can reuse a consistent
 control. The component prefers provided options but gracefully falls back to
 the current value.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, memo } from 'react'

interface SelectOption {
  key: string
  label: string
}

interface SelectRowProps {
  label: string
  value: string
  options: readonly SelectOption[] | undefined
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
  const handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    onChange(field, e.target.value)
  }
  const safe: readonly SelectOption[] =
    options && options.length > 0 ? options : [{ key: value, label: value }]
  return (
    <label className="flex flex-col gap-1 text-xs" key={field}>
      <span>{label}</span>
      <select
        className="border rounded p-1 bg-[var(--color-background,#fff)]"
        value={value}
        onChange={handleChange}
      >
        {safe.map(
          (o: SelectOption): ReactElement => (
            <option key={o.key} value={o.key}>
              {o.label}
            </option>
          )
        )}
      </select>
    </label>
  )
})
