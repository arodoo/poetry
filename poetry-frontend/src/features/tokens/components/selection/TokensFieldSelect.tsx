/*
 File: TokensFieldSelect.tsx
 Purpose: Small presentational wrapper for a token select field used by
 TokensSelectionForm. Keeps the parent form file short and preserves
 runtime behavior. All Rights Reserved. Arodi Emmanuel
*/
import type { ReactElement, ChangeEvent } from 'react'
import { Select } from '../../../../ui/Select/Select'
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
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{props.t(props.labelKey)}</Label>
      <Select
        id={props.id}
        value={props.value}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
          props.onChange(e.currentTarget.value)
        }}
        disabled={props.disabled}
      >
        {props.options.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {formatTokenLabel(opt.key)}
          </option>
        ))}
      </Select>
    </div>
  )
}
