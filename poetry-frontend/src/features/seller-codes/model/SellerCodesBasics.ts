/*
 * File: SellerCodesBasics.ts
 * Purpose: Foundational schemas and types shared across seller codes feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const SellerCodeIdentifierSchema: z.ZodEffects<
  z.ZodUnion<[z.ZodString, z.ZodNumber]>,
  string,
  string | number
> = z
  .union([z.string(), z.number()])
  .transform((value: string | number): string => {
    const asString: string = String(value).trim()
    if (asString.length === 0) {
      throw new Error('sellerCodes.validation.identifier')
    }
    return asString
  })

export type SellerCodeIdentifier = z.infer<typeof SellerCodeIdentifierSchema>

export const SellerCodeStatusSchema: z.ZodEnum<
  ['active', 'inactive', 'expired']
> = z.enum(['active', 'inactive', 'expired'])

export type SellerCodeStatus = z.infer<typeof SellerCodeStatusSchema>
