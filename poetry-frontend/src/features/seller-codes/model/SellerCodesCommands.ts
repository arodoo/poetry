/*
 * File: SellerCodesCommands.ts
 * Purpose: Command payload schemas for seller code mutations.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import { SellerCodeStatusSchema } from './SellerCodesBasics'

export const CreateSellerCodeSchema: z.ZodObject<{
  code: z.ZodString
  orgId: z.ZodOptional<z.ZodString>
  userId: z.ZodNumber
  status: z.ZodOptional<typeof SellerCodeStatusSchema>
}> = z.object({
  code: z.string().min(3, 'sellerCodes.validation.code'),
  orgId: z.string().optional(),
  userId: z.number({ required_error: 'sellerCodes.validation.userId' }),
  status: SellerCodeStatusSchema.optional(),
})

export type CreateSellerCodeInput = z.infer<typeof CreateSellerCodeSchema>

export const UpdateSellerCodeSchema: z.ZodObject<{
  code: z.ZodString
  orgId: z.ZodOptional<z.ZodString>
  userId: z.ZodNumber
  status: typeof SellerCodeStatusSchema
  version: z.ZodString
}> = z.object({
  code: z.string().min(3, 'sellerCodes.validation.code'),
  orgId: z.string().optional(),
  userId: z.number({ required_error: 'sellerCodes.validation.userId' }),
  status: SellerCodeStatusSchema,
  version: z.string().min(1, 'sellerCodes.validation.version'),
})

export type UpdateSellerCodeInput = z.infer<typeof UpdateSellerCodeSchema>
