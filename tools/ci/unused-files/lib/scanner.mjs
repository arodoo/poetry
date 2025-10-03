/*
 File: scanner.mjs
 Purpose: Encapsulates logic to find unused files in the frontend source
 by combining file-walking, config-references, and import/reference
 analysis. Returns an array of file paths considered unused by the
 static heuristic.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'
import { walk } from './fsWalk.mjs'
import { isReferenced } from './referenced.mjs'
import { findConfigReferences, isConfigReferenced } from './configRefs.mjs'
import { SCAN_DIRS, EXCLUDED_PATTERNS, ALWAYS_USED } from './patterns.mjs'

export function findUnusedFiles(ROOT) {
  const configRefs = findConfigReferences(ROOT)

  const allFiles = []
  for (const dir of SCAN_DIRS) {
    const fullDir = path.join(ROOT, dir)
    allFiles.push(...walk(fullDir, EXCLUDED_PATTERNS))
  }

  const fileContents = new Map()
  for (const f of allFiles) {
    try {
      fileContents.set(f, fs.readFileSync(f, 'utf8'))
    } catch (err) {
      fileContents.set(f, '')
    }
  }

  const unused = []
  for (const f of allFiles) {
    if (EXCLUDED_PATTERNS.some((p) => p.test(f))) continue
    if (ALWAYS_USED.some((p) => p.test(f))) continue
    if (isConfigReferenced(f, ROOT, configRefs)) continue
    const r = isReferenced(f, allFiles, fileContents)
    if (!r.used) unused.push(f)
  }

  return unused
}
