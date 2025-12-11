/*
 * File: PublicRegisterForm.tsx
 * Purpose: Minimal public register form used by module checker.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { useT } from '../../../shared/i18n/useT'

export function PublicRegisterForm(): React.ReactElement {
  const t = useT()
  return <div>{t('ui.public.register.placeholder')}</div>
}
