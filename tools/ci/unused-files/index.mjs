#!/usr/bin/env node
/*
 File: index.mjs
 Purpose: Main entry point for the unused files checker. Scans the codebase
 for unreferenced TypeScript and JavaScript files using modular analyzers.
 It combines config-file reference detection and import analysis to reduce
 false positives while highlighting deprecated sources for removal.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'
import { walk, readFileSafe } from './lib/fsWalk.mjs'
import { isReferenced } from './lib/referenced.mjs'
import {
  findConfigReferences,
  isConfigReferenced,
} from './lib/configRefs.mjs'
import {
  SCAN_DIRS,
  EXCLUDED_PATTERNS,
  ALWAYS_USED,
  rel,
} from './lib/patterns.mjs'

import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../..')

async function main() {
  console.log('🔍 Scanning for unused files (modular runner)...\n')
  
  // Find config-referenced files
  const configRefs = findConfigReferences(ROOT)
  
  const allFiles = []
  for (const dir of SCAN_DIRS) {
    const fullDir = path.join(ROOT, dir)
    allFiles.push(...walk(fullDir, EXCLUDED_PATTERNS))
  }

  const fileContents = new Map()
  for (const f of allFiles) fileContents.set(f, readFileSafe(f))

  const unused = []
  for (const f of allFiles) {
    if (EXCLUDED_PATTERNS.some((p) => p.test(f))) continue
    if (ALWAYS_USED.some((p) => p.test(f))) continue
    if (isConfigReferenced(f, ROOT, configRefs)) continue
    const r = isReferenced(f, allFiles, fileContents)
    if (!r.used) unused.push(f)
  }

  if (unused.length === 0) {
    console.log('✅ No unused files found!')
    process.exit(0)
  }

  console.log(
    '📊 Found ' + String(unused.length) + ' potentially unused file(s):'
  )
  console.log('\n')
  const byDir = {}
  for (const u of unused) {
    const d = path.dirname(rel(u))
    byDir[d] = byDir[d] || []
    byDir[d].push(rel(u))
  }
  for (const d of Object.keys(byDir).sort()) {
    console.log('📁 ' + String(d) + '/')
    for (const f of byDir[d]) {
      console.log('   ❌ ' + String(path.basename(f)))
    }
    console.log('')
  }
  console.log('\n⚠️  Review before deletion.')
  console.log('Static analysis may produce false positives.')
  process.exit(1)
}

main()
