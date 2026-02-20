/*
 * File: UsersAddressFields.tsx
 * Purpose: Multi-line address section for the user form.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../../ui/Stack/Stack'
import { Input } from '../../../../../ui/Input/Input'
import { Text } from '../../../../../ui/Text/Text'
import type { useT } from '../../../../../shared/i18n/useT'
import type { UsersAddressState } from '../useUsersAddressState'

type AddressFieldsProps = Omit<
  UsersAddressState,
  | 'setAddressLine1'
  | 'setAddressLine2'
  | 'setAddressCity'
  | 'setAddressState'
  | 'setAddressZip'
  | 'setAddressCountry'
> & {
  onLine1Change: (v: string) => void
  onLine2Change: (v: string) => void
  onCityChange: (v: string) => void
  onStateChange: (v: string) => void
  onZipChange: (v: string) => void
  onCountryChange: (v: string) => void
  t: ReturnType<typeof useT>
}

export function UsersAddressFields(
  props: AddressFieldsProps
): ReactElement {
  function mkHandler(
    setter: (v: string) => void
  ): (e: ChangeEvent<HTMLInputElement>) => void {
    return (e): void => setter(e.target.value)
  }
  return (
    <Stack gap="sm">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.address.label')}
      </Text>
      <Input type="text" value={props.addressLine1}
        onChange={mkHandler(props.onLine1Change)}
        placeholder={props.t('ui.users.form.address.line1')}
        data-testid="user-address-line1-input" />
      <Input type="text" value={props.addressLine2}
        onChange={mkHandler(props.onLine2Change)}
        placeholder={props.t('ui.users.form.address.line2')}
        data-testid="user-address-line2-input" />
      <div className="flex gap-2">
        <Input type="text" value={props.addressCity}
          onChange={mkHandler(props.onCityChange)}
          placeholder={props.t('ui.users.form.address.city')}
          data-testid="user-address-city-input" />
        <Input type="text" value={props.addressState}
          onChange={mkHandler(props.onStateChange)}
          placeholder={props.t('ui.users.form.address.state')}
          data-testid="user-address-state-input" />
      </div>
      <div className="flex gap-2">
        <Input type="text" value={props.addressZip}
          onChange={mkHandler(props.onZipChange)}
          placeholder={props.t('ui.users.form.address.zip')}
          data-testid="user-address-zip-input" />
        <Input type="text" value={props.addressCountry}
          onChange={mkHandler(props.onCountryChange)}
          placeholder={props.t('ui.users.form.address.country')}
          data-testid="user-address-country-input" />
      </div>
    </Stack>
  )
}
