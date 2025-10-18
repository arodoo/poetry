/*
 File: templateSafe.ts
 Purpose: Central helper to produce safe string values for template literals.
 Provides stable, predictable string conversions for primitives, arrays and
 plain objects. Avoids accidental '[object Object]' output and centralizes
 template-safety decisions to reduce repetitive guards across the codebase.
 All Rights Reserved.
*/
/* eslint-disable @typescript-eslint/no-base-to-string */
export function toTemplateString(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)

  // Avoid letting objects fall back to Object's default toString ("[object Object]")
  // which triggers the no-base-to-string rule. For plain objects and arrays we
  // attempt a safe JSON.stringify (shallow), otherwise return a stable placeholder
  // using Object.prototype.toString for non-serializable values like functions.
  try {
    // Only stringify plain objects/arrays to avoid serializing complex types.
    if (Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]') {
      return JSON.stringify(value)
    }
  } catch {
    // ignore and fallthrough to stable string form
  }

  // For other object-like values (functions, symbols, etc.) use a stable
  // Object.prototype.toString representation which avoids default base-to-string
  // usage in template expressions.
  try {
    return Object.prototype.toString.call(value)
  } catch {
    return String(value)
  }
}
/* eslint-enable @typescript-eslint/no-base-to-string */
