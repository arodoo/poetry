/*
 * File: noHardcodedLocalhost.test.ts
 * Purpose: Static guard ensuring no source file under src/ hardcodes
 * http://localhost:... URLs or reads the non-schema env var
 * VITE_API_URL. Runtime HTTP must be same-origin relative paths so
 * the app works on boops.mx LAN. Test files are excluded.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const SRC: string = resolve(__dirname, '../../..')
const SKIP: RegExp =
  /\.(test|spec)\.(ts|tsx)$|[\\/]tests[\\/]|[\\/]generated[\\/]/

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full: string = join(dir, name)
    const s = statSync(full)
    if (s.isDirectory()) walk(full, acc)
    else if (/\.(ts|tsx)$/.test(full) && !SKIP.test(full)) acc.push(full)
  }
  return acc
}

describe('same-origin guard', (): void => {
  it('no hardcoded http://localhost or VITE_API_URL', (): void => {
    const offenders: string[] = []
    for (const f of walk(SRC)) {
      const body: string = readFileSync(f, 'utf8')
      if (/http:\/\/localhost/i.test(body)) offenders.push(`${f} (localhost)`)
      if (/\bVITE_API_URL\b/.test(body)) offenders.push(`${f} (VITE_API_URL)`)
    }
    expect(offenders, offenders.join('\n')).toEqual([])
  })
})
