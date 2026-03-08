/*
 File: TokensFieldSelect.tsx
 Purpose: Searchable presentational wrapper for a token select field
 used by TokensSelectionForm. Keeps the parent form file short and
 preserves runtime behavior. All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, useMemo } from 'react'
import { SearchableSelect } from '../../../../ui/SearchableSelect/SearchableSelect'
import type { SelectOption } from '../../../../ui/SearchableSelect/SearchableSelect.types'
import { Label } from '../../../../ui/Label/Label'
import type { I18nKey } from '../../../../shared/i18n/generated/keys'
import { formatTokenLabel } from '../../model/tokensPageHelpers'

export interface TokensFieldSelectProps {
  id: string
  labelKey: I18nKey
  value: string
  options: readonly { key: string }[]
  disabled?: boolean
  onChange: (value: string) => void
  t: (k: I18nKey) => string
}

export function TokensFieldSelect(props: TokensFieldSelectProps): ReactElement {
  const selectOptions: SelectOption[] = useMemo(
    () =>
      props.options.map((opt) => ({
        value: opt.key,
        label: formatTokenLabel(opt.key),
      })),
    [props.options]
  )

  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{props.t(props.labelKey)}</Label>
      <SearchableSelect
        options={selectOptions}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        data-testid={`token-field-${props.id}`}
      />
    </div>
  )
}
