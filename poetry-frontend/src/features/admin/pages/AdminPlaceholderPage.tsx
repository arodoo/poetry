/*
 * File: AdminPlaceholderPage.tsx
 * Purpose: Placeholder page for the admin feature module to satisfy structure.
 * Future admin-specific pages will replace this placeholder component.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'

export function AdminPlaceholderPage(): ReactElement {
  const t = useT()
  return <div>{t('ui.admin.placeholder')}</div>
}

export default AdminPlaceholderPage
