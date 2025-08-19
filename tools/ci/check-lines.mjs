#!/usr/bin/env node
/*
 File: tools/ci/check-lines.mjs
 Purpose: Orchestrates line/char limit enforcement. It validates config,
 discovers candidate files, and delegates validation. Ensures repo code
 adheres to central standards. All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'
import { execSync } from 'node:child_process'
import { getChangedFiles, shouldUseFallback } from './git-utils.mjs'
import {
  ROOTS,
  EXTENSIONS,
  walkDirectory,
  isInAllowedRoots,
} from './file-utils.mjs'
import { validateFiles } from './validator.mjs'

// Validate configuration files are synchronized
console.log('🔍 Validating configuration synchronization...')
try {
  execSync('node tools/ci/validate-config-sync.mjs', {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
} catch (error) {
  console.error('❌ Configuration files are not synchronized!')
  console.error('💡 Run "node tools/ci/config-sync.mjs" to fix.')
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
  result.errors.forEach((e) => console.error(e))
  process.exit(1)
}
