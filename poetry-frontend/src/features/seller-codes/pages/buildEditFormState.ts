/*
 * File: buildEditFormState.ts
 * Purpose: Helper to build form state for seller code edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'

export function buildEditFormState(sellerCode: SellerCodeDetail | undefined):
  | {
      code: string
      orgId: string
      status: 'active' | 'inactive' | 'expired'
    }
  | undefined {
  return sellerCode
    ? {
        code: sellerCode.code,
        orgId: sellerCode.orgId ?? '',
        status: sellerCode.status,
      }
    : undefined
}
