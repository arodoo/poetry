/*
 * File: ZonesCommands.ts
 * Purpose: Zod runtime validation for SDK request types.
 * Types are SDK types directly. Schemas add client-side validation only.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import type {
  ZoneCreateRequest,
  ZoneUpdateRequest,
} from '../../../api/generated'

/**
 * Runtime validation for ZoneCreateRequest.
 * TYPE = ZoneCreateRequest (SDK). SCHEMA = adds min length validation.
 *
 * @see {ZoneCreateRequest} from api/generated - OpenAPI source of truth
 */
export type CreateZoneInput = ZoneCreateRequest

export const CreateZoneSchema: z.ZodType<CreateZoneInput> = z.object({
  name: z.string().min(3, 'zones.validation.name'),
  description: z.string().optional(),
  managerId: z.number({ required_error: 'zones.validation.managerId' }),
}) as z.ZodType<CreateZoneInput>

/**
 * Runtime validation for ZoneUpdateRequest.
 * TYPE = ZoneUpdateRequest (SDK). SCHEMA = adds validation.
 *
 * @see {ZoneUpdateRequest} from api/generated - OpenAPI source of truth
 */
export type UpdateZoneInput = ZoneUpdateRequest

export const UpdateZoneSchema: z.ZodType<UpdateZoneInput> = z.object({
  name: z.string().min(3, 'zones.validation.name').optional(),
  description: z.string().optional(),
  managerId: z.number().optional(),
  status: z.enum(['active', 'inactive']).optional(),
  version: z.number({ required_error: 'zones.validation.version' }),
}) as z.ZodType<UpdateZoneInput>
