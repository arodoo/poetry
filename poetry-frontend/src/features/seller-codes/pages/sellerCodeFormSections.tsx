/*
 * File: sellerCodeFormSections.tsx
 * Purpose: Form section builders for seller code create/edit pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormLayoutSection } from '../../../ui/FormLayout/FormLayout'
import { SellerCodesFormFields } from '../components/SellerCodesFormFields'
import type * as SC from '../components/useSellerCodesFormState'

export function buildCreateFormSections(
  formState: SC.SellerCodesFormState,
  t: (key: string) => string
): readonly FormLayoutSection[] {
  return [
    {
      title: t('ui.sellerCodes.create.section.basic'),
      description: t('ui.sellerCodes.create.section.basic_desc'),
      fields: (
        <SellerCodesFormFields
          code={formState.code}
          orgId={formState.orgId}
          userId={formState.userId}
          status={formState.status}
          onCodeChange={formState.setCode}
          onOrgIdChange={formState.setOrgId}
          onUserIdChange={formState.setUserId}
          onStatusChange={formState.setStatus}
          t={t}
        />
      ),
    },
  ]
}

export function buildEditFormSections(
  formState: SC.SellerCodesFormState,
  t: (key: string) => string
): readonly FormLayoutSection[] {
  return [
    {
      title: t('ui.sellerCodes.edit.section.basic'),
      description: t('ui.sellerCodes.edit.section.basic_desc'),
      fields: (
        <SellerCodesFormFields
          code={formState.code}
          orgId={formState.orgId}
          userId={formState.userId}
          status={formState.status}
          onCodeChange={formState.setCode}
          onOrgIdChange={formState.setOrgId}
          onUserIdChange={formState.setUserId}
          onStatusChange={formState.setStatus}
          t={t}
        />
      ),
    },
  ]
}
