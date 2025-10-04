/*
 * File: SellerCodesCommands.ts
 * Purpose: Zod runtime validation for SDK request types.
 * Types are SDK types directly. Schemas add client-side validation only.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import type {
  SellerCodeCreateRequest,
  SellerCodeUpdateRequest,
} from '../../../api/generated'

/**
 * Runtime validation for SellerCodeCreateRequest.
 * TYPE = SellerCodeCreateRequest (SDK). SCHEMA = adds min length validation.
 *
 * @see {SellerCodeCreateRequest} from api/generated - OpenAPI source of truth
 */
export type CreateSellerCodeInput = SellerCodeCreateRequest

export const CreateSellerCodeSchema: z.ZodType<CreateSellerCodeInput> = z.object({
  code: z.string().min(3, 'sellerCodes.validation.code'),
  organizationId: z.string().optional(),
  userId: z.number({ required_error: 'sellerCodes.validation.userId' }),
  status: z.string().optional(),
}) as z.ZodType<CreateSellerCodeInput>

/**
 * Runtime validation for SellerCodeUpdateRequest.
 * TYPE = SellerCodeUpdateRequest (SDK). SCHEMA = adds validation.
 *
 * @see {SellerCodeUpdateRequest} from api/generated - OpenAPI source of truth
 */
export type UpdateSellerCodeInput = SellerCodeUpdateRequest

export const UpdateSellerCodeSchema: z.ZodType<UpdateSellerCodeInput> = z.object({
  code: z.string().min(3, 'sellerCodes.validation.code').optional(),
  organizationId: z.string().optional(),
  userId: z.number().optional(),
  status: z.string().optional(),
}) as z.ZodType<UpdateSellerCodeInput>
