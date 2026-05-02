/*
 * File: adminInsightTypes.ts
 * Purpose: Shared types for admin insight cards.
 * They keep data builders and renderers aligned.
 * All Rights Reserved. Arodi Emmanuel
 */

export type Translate = (
  key: string,
  vars?: Record<string, unknown>
) => string

export interface AdminInsight {
  readonly key: string
  readonly label: string
  readonly value: string
  readonly hint: string
}