#!/usr/bin/env node
/*
 * File: i18n-scan.mjs
 * Purpose: Scans repository source files for hardcoded user-facing
 * English messages requiring i18n externalization. Implements heuristic
 * detection (multi-word literals) and fails CI when violations are
 * present. Supports inline suppression via // i18n-ignore.
 *
 * All Rights Reserved. Arodi Emmanuel
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { isExcluded, walk } from './i18n-scanner-utils.mjs'
import { shouldFlag, isSuppress } from './i18n-filters.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '../../..')

const INCLUDED_DIRS = ['poetry-backend/src/main/java', 'poetry-frontend/src']

const STRING_REGEX = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g
const JSX_TEXT_REGEX = />([^<]+)</g

function scanFile(file) {
  const content = fs.readFileSync(file, 'utf8')
  const lines = content.split(/\r?\n/)
  const violations = []
  lines.forEach((line, idx) => {
    const prevLine = idx > 0 ? lines[idx - 1] : ''
    if (isSuppress(line) || isSuppress(prevLine)) return

    // Scan for quoted strings
    let m
    while ((m = STRING_REGEX.exec(line)) !== null) {
      const text = m[1] ?? m[2] ?? ''
      if (shouldFlag(text, line, 'QUOTE')) {
        violations.push({ file, line: idx + 1, text })
      }
    }

    // Scan for JSX text content (only for JS/JSX/TSX files - TS usually has no JSX)
    if (/\.(tsx|jsx|js)$/.test(file)) {
      while ((m = JSX_TEXT_REGEX.exec(line)) !== null) {
        const text = m[1]
        if (shouldFlag(text, line, 'JSX')) {
          violations.push({ file, line: idx + 1, text })
        }
      }
    }
  })
  return violations
}

function main() {
  const allFiles = INCLUDED_DIRS.flatMap((d) => walk(path.join(ROOT, d)))
  const target = allFiles.filter((f) => !isExcluded(f))
  const violations = target.flatMap(scanFile)
  if (violations.length) {
    console.error('❌ i18n scan found hardcoded messages:')
    for (const v of violations) {
      const truncated = v.text.slice(0, 60)
      console.error(` - ${v.file}:${v.line} -> ${truncated}`)
    }
    console.error(
      '\nAdd to bundles and replace, or suppress with // i18n-ignore'
    )
    process.exit(1)
  }
  console.log('✅ No hardcoded user-facing messages detected.')
}

main()
