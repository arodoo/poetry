/*
 * File: sellerCodesClientTypes.ts
 * Purpose: Type definitions for seller codes SDK client.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface SellerCodeDto {
  readonly id: string
  readonly code: string
  readonly status?: 'active' | 'inactive' | 'expired'
  readonly orgId?: string
  readonly orgName?: string
  readonly createdAt?: string
  readonly updatedAt?: string
  readonly version?: string | number
}

export type SellerCodeCollectionDto = readonly SellerCodeDto[]

export interface SellerCodesSdk {
  list(): Promise<SellerCodeCollectionDto>
  retrieve(id: string): Promise<SellerCodeDto>
  create(body: unknown): Promise<SellerCodeDto>
  update(id: string, body: unknown, etag?: string): Promise<SellerCodeDto>
}
