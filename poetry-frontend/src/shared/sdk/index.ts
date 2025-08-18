/*
 File: index.ts
 Purpose: Temporary SDK baseline. Exposes typed functions that wrap
 the HTTP client. These functions will be replaced by generated code
 in Task 22. Using this module prevents direct fetch usage in app
 code. All Rights Reserved. Arodi Emmanuel
*/
import { fetchJson } from '../http/fetchClient'

export type HealthDto = Readonly<{ status: string }>

export async function getHealth(): Promise<HealthDto> {
  return fetchJson<HealthDto>('/api/v1/health')
}
