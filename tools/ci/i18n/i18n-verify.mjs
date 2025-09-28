/*
 File: i18n-verify.mjs
 Purpose: Verify locale parity and duplicate keys across all catalogs.
 Exits non-zero on mismatch or duplicates. All Rights Reserved.
 Arodi Emmanuel
*/
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(process.cwd(), 'src', 'shared', 'i18n', 'catalog')

function collect(dir) {
  const entries = readdirSync(dir, { withFileTypes: true })
  let keys = []
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) keys = keys.concat(collect(full))
    else if (e.isFile() && e.name.endsWith('.ts')) {
      const txt = readFileSync(full, 'utf8')
      const matchAll = txt.match(/'ui\.[^']+'/g) || []
      for (const m of matchAll) keys.push(m.slice(1, -1))
    }
  }
  return keys
}

const locales = readdirSync(root).filter((d) => !d.startsWith('.'))
const localeMap = {}
for (const loc of locales) localeMap[loc] = collect(join(root, loc))

let failed = false
// duplicate detection per locale
for (const loc of locales) {
  const list = localeMap[loc]
  const seen = new Set()
  const dups = new Set()
  for (const k of list) seen.has(k) ? dups.add(k) : seen.add(k)
  if (dups.size) {
    console.error(`[i18n-verify] duplicate keys in ${loc}:`, [...dups])
    failed = true
  }
}

// parity detection
const base = locales[0]
for (const loc of locales.slice(1)) {
  const missing = localeMap[base].filter((k) => !localeMap[loc].includes(k))
  const extra = localeMap[loc].filter((k) => !localeMap[base].includes(k))
  if (missing.length) {
    console.error(`[i18n-verify] ${loc} missing keys:`, missing)
    failed = true
  }
  if (extra.length) {
    console.error(`[i18n-verify] ${loc} extra keys:`, extra)
    failed = true
  }
}

if (failed) process.exit(1)
