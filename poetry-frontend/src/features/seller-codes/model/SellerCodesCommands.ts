/*
 * File: SellerCodesCommands.ts
 * Purpose: Command payload schemas for seller code mutations.
 * Field names aligned with SDK SellerCodeCreateRequest and
 * SellerCodeUpdateRequest to maintain SSOT contract.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import { SellerCodeStatusSchema } from './SellerCodesBasics'

export const CreateSellerCodeSchema = z.object({
  code: z.string().min(3, 'sellerCodes.validation.code'),
  organizationId: z.string().optional(),
  userId: z.number({ required_error: 'sellerCodes.validation.userId' }),
  status: SellerCodeStatusSchema.optional(),
}).strict()

export type CreateSellerCodeInput = z.infer<typeof CreateSellerCodeSchema>

export const UpdateSellerCodeSchema = z.object({
  code: z.string().min(3, 'sellerCodes.validation.code'),
  organizationId: z.string().optional(),
  userId: z.number({ required_error: 'sellerCodes.validation.userId' }),
  status: SellerCodeStatusSchema,
}).strict()

export type UpdateSellerCodeInput = z.infer<typeof UpdateSellerCodeSchema>
