/*
 File: TokensSelectionForm.tsx
 Purpose: Form component with dropdowns for each token category.
 Uses Select components following UI patterns. Handles controlled
 inputs with validation. All Rights Reserved. Arodi Emmanuel
*/
import type { ReactElement, FormEvent } from 'react'
import { TokensFormFooter } from './TokensFormFooter'
import { TokensFieldSelect } from './TokensFieldSelect'
import type { TokenBundle } from '../model/TokensSchemas'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import type { TokensFormState } from '../pages/useTokensFormState'
import { buildTokenFields } from './tokensSelectionFields'

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
  const fields = buildTokenFields(props.bundle)

  return (
    <form onSubmit={props.onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map(({ key, labelKey, options }): ReactElement => {
          return (
            <TokensFieldSelect
              key={key}
              id={key}
              labelKey={labelKey}
              value={props.formState[key as keyof TokensFormState]}
              options={options}
              disabled={props.isSubmitting}
              onChange={(v): void => {
                props.onFieldChange(key as keyof TokensFormState, v)
              }}
              t={props.t}
            />
          )
        })}
      </div>
      <TokensFormFooter
        isSubmitting={props.isSubmitting}
        onCancel={props.onCancel}
        t={props.t}
      />
    </form>
  )
}
