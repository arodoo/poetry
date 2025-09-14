/*
 File: idempotency.ts
 Purpose: Helper to generate Idempotency-Key header values for POST/PUT.
 All Rights Reserved. Arodi Emmanuel
*/
export function createIdempotencyKey(): string {
  // RFC4122 v4-esque simple key for client-side idempotency
  return 'idem-' + crypto.randomUUID()
}
