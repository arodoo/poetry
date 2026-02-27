/*
 * File: birthdayCheckApi.ts
 * Purpose: HTTP wrapper for the GET /api/v1/birthdays/today endpoint.
 * Returns users celebrating a birthday on the current UTC date. Types
 * will be replaced by generated SDK types after running sdk:generate.
 * All Rights Reserved. Arodi Emmanuel
 */
import { fetchJson } from '../../../shared/http/fetchClient'

export interface BirthdayUserDto {
  readonly fullName: string
  readonly username: string
}

export async function fetchTodaysBirthdays(): Promise<BirthdayUserDto[]> {
  return fetchJson<BirthdayUserDto[]>('/api/v1/birthdays/today')
}
