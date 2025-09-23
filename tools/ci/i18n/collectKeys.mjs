/*
 File: collectKeys.mjs
 Purpose: Collect i18n keys from catalog files.
 All Rights Reserved. Arodi Emmanuel
*/
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export function collectKeys(rootDir) {
  function collect(dir) {
    const entries = readdirSync(dir, { withFileTypes: true })
    let out = []
    for (const e of entries) {
      const full = join(dir, e.name)
      if (e.isDirectory()) out = out.concat(collect(full))
      else if (e.isFile() && e.name.endsWith('.ts')) {
        const txt = readFileSync(full, 'utf8')
        const m = txt.match(/'ui\.[^']+'/g) || []
        for (const x of m) out.push(x.slice(1, -1))
      }
    }
    return out
  }

  const locales = readdirSync(rootDir).filter((d) => !d.startsWith('.'))
  const all = new Set()
  for (const loc of locales) {
    collect(join(rootDir, loc)).forEach((k) => all.add(k))
  }
  return [...all].sort()
}
