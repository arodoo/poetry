/*
 * File: SellerCodeInput.tsx
 * Purpose: Extracted seller code input field from MembershipFormFields.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Input } from '../../../ui/Input/Input'

interface Props {
  value: string
  onChange: (v: string) => void
  placeholder: string
}

export default function SellerCodeInput({
  value,
  onChange,
  placeholder,
}: Props): ReactElement {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Seller Code</label>
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder={placeholder}
        data-testid="membership-seller-code-input"
      />
    </div>
  )
}
