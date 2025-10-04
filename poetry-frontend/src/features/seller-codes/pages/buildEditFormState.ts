/*
 * File: buildEditFormState.ts
 * Purpose: Helper to build form state for seller code edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'

export function buildEditFormState(sellerCode: SellerCodeDetail | undefined):
  | {
      code: string
      organizationId: string
      status: 'active' | 'inactive' | 'expired'
    }
  | undefined {
  return sellerCode
    ? {
        code: sellerCode.code,
        organizationId: sellerCode.organizationId ?? '',
        status: sellerCode.status,
      }
    : undefined
}
