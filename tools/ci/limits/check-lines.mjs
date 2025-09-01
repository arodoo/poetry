#!/usr/bin/env node
/*
 * File: check-lines.mjs
 * Purpose: Checks files for maximum line length violations and reports
 * offending lines to guide developers in splitting or refactoring long
 * lines to follow project formatting rules.
 * All Rights Reserved. Arodi Emmanuel
 */

import path from 'node:path'
import { execSync } from 'node:child_process'
import { getChangedFiles, shouldUseFallback } from '../utils/git-utils.mjs'
import {
  ROOTS,
  EXTENSIONS,
  walkDirectory,
  isInAllowedRoots,
} from '../utils/file-utils.mjs'
import { validateFiles } from '../utils/validator.mjs'

// Validate configuration files are synchronized
console.log('🔍 Validating configuration synchronization...')
try {
  execSync('node tools/ci/config/validate-config-sync.mjs', {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
} catch (error) {
  console.error('❌ Configuration files are not synchronized!')
  console.error('💡 Run "node tools/ci/config/config-sync.mjs" to fix.')
  process.exit(1)
}
console.log('')

// Get changed files from git, filter by extension and roots
let filesToCheck = getChangedFiles()
  .filter((f) => EXTENSIONS.has(path.extname(f)))
  .filter(isInAllowedRoots)

// If no files found and fallback enabled, scan all roots
if (!filesToCheck.length && shouldUseFallback()) {
  const allFiles = []
  for (const root of ROOTS) {
    for (const file of walkDirectory(root)) {
      if (EXTENSIONS.has(path.extname(file))) allFiles.push(file)
    }
  }
  filesToCheck = allFiles
}

// Exit early if no files to check
if (!filesToCheck.length) process.exit(0)

// Validate files and report
const result = validateFiles(filesToCheck)
if (!result.valid) {
  console.error('❌ Line limit violations found:')
  result.errors.forEach((e) => console.error(`  ${e}`))
  console.error('\n💡 Fix these violations by splitting long lines or files.')
  process.exit(1)
}

console.log('✅ All files pass line limit checks')
