/*
 File: TokensSelectionForm.tsx
 Purpose: Form component with dropdowns for each token category.
 Uses Select components following UI patterns. Handles controlled
 inputs with validation. All Rights Reserved. Arodi Emmanuel
*/
import type { ReactElement, FormEvent } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Select } from '../../../ui/Select/Select'
import { Label } from '../../../ui/Label/Label'
import type { TokenBundle } from '../model/TokensSchemas'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import type { TokensFormState } from '../pages/useTokensFormState'
import { formatTokenLabel } from '../pages/tokensPageHelpers'

export interface TokensSelectionFormProps {
  bundle: TokenBundle
  formState: TokensFormState
  onFieldChange: (field: keyof TokensFormState, value: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  isSubmitting: boolean
  t: (k: I18nKey) => string
}

export function TokensSelectionForm(
  props: TokensSelectionFormProps
): ReactElement {
  const fields: readonly {
    key: keyof TokensFormState
    labelKey: I18nKey
    options: readonly { key: string }[]
  }[] = [
    { key: 'theme', labelKey: 'ui.tokens.fields.theme', options: props.bundle.themes },
    { key: 'font', labelKey: 'ui.tokens.fields.font', options: props.bundle.fonts },
    { key: 'fontSize', labelKey: 'ui.tokens.fields.fontSize', options: props.bundle.fontSizes },
    { key: 'spacing', labelKey: 'ui.tokens.fields.spacing', options: props.bundle.spacings },
    { key: 'radius', labelKey: 'ui.tokens.fields.radius', options: props.bundle.radius },
    { key: 'shadow', labelKey: 'ui.tokens.fields.shadow', options: props.bundle.shadows },
  ]

  return (
    <form onSubmit={props.onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(({ key, labelKey, options }): ReactElement => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{props.t(labelKey)}</Label>
            <Select
              id={key}
              value={props.formState[key]}
              onChange={(e): void =>
                { props.onFieldChange(key, e.currentTarget.value); }
              }
              disabled={props.isSubmitting}
            >
              {options.map((opt): ReactElement => (
                <option key={opt.key} value={opt.key}>
                  {formatTokenLabel(opt.key)}
                </option>
              ))}
            </Select>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={props.isSubmitting}>
          {props.t('ui.tokens.actions.save')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={props.onCancel}
          disabled={props.isSubmitting}
        >
          {props.t('ui.tokens.actions.cancel')}
        </Button>
      </div>
    </form>
  )
}
