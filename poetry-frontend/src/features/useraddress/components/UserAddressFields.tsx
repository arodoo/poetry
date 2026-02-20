/*
 * File: UserAddressFields.tsx
 * Purpose: Form fields for postal address (line1, line2, city, state, zip, country).
 * Relies on i18n keys in the users locale namespace.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'
import type { UserAddressFormState } from '../hooks/useUserAddressForm'

type Props = Omit<UserAddressFormState, 'saveForUser'> & {
  t: ReturnType<typeof useT>
}

export function UserAddressFields(props: Props): ReactElement {
  function mkHandler(
    setter: (v: string) => void
  ): (e: ChangeEvent<HTMLInputElement>) => void {
    return (e): void => setter(e.target.value)
  }
  return (
    <Stack gap="md">
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.address.label')}
        </Text>
        <Input type="text" value={props.line1}
          onChange={mkHandler(props.setLine1)}
          placeholder={props.t('ui.users.form.address.line1')}
          data-testid="user-address-line1-input" />
        <Input type="text" value={props.line2}
          onChange={mkHandler(props.setLine2)}
          placeholder={props.t('ui.users.form.address.line2')}
          data-testid="user-address-line2-input" />
      </Stack>
      <div className="flex gap-2">
        <Input type="text" value={props.city}
          onChange={mkHandler(props.setCity)}
          placeholder={props.t('ui.users.form.address.city')}
          data-testid="user-address-city-input" />
        <Input type="text" value={props.state}
          onChange={mkHandler(props.setState)}
          placeholder={props.t('ui.users.form.address.state')}
          data-testid="user-address-state-input" />
      </div>
      <div className="flex gap-2">
        <Input type="text" value={props.zip}
          onChange={mkHandler(props.setZip)}
          placeholder={props.t('ui.users.form.address.zip')}
          data-testid="user-address-zip-input" />
        <Input type="text" value={props.country}
          onChange={mkHandler(props.setCountry)}
          placeholder={props.t('ui.users.form.address.country')}
          data-testid="user-address-country-input" />
      </div>
    </Stack>
  )
}
