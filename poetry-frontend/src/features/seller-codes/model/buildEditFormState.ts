/*
 * File: buildEditFormState.ts
 * Purpose: Helper to build form state for seller code edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'

export function buildEditFormState(sellerCode: SellerCodeDetail | undefined):
  | {
      code: string
      status: 'active' | 'inactive' | 'expired'
    }
  | undefined {
  return sellerCode
    ? {
        code: sellerCode.code ?? '',
        status: (sellerCode.status ?? 'inactive') as
          | 'active'
          | 'inactive'
          | 'expired',
      }
    : undefined
}
