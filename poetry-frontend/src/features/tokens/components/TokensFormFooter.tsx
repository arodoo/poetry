/*
 File: TokensFormFooter.tsx
 Purpose: Footer area for the tokens selection form (save/cancel actions).
 Extracted to reduce parent file length and preserve behavior.
 All Rights Reserved. Arodi Emmanuel
*/
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export interface TokensFormFooterProps {
  isSubmitting: boolean
  onCancel: () => void
  t: (k: I18nKey) => string
}

export function TokensFormFooter(props: TokensFormFooterProps): ReactElement {
  return (
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
  )
}
