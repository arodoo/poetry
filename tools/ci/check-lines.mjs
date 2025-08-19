#!/usr/bin/env node
/*
 File: tools/ci/check-lines.mjs
 Purpose: Main orchestrator for line and character limit enforcement.
 Coordinates git operations, file discovery, and validation to ensure
 repository code complies with quality standards. All Rights Reserved.
 Arodi Emmanuel
*/
import path from 'node:path'
import { getChangedFiles, shouldUseFallback } from './git-utils.mjs'
import {
  ROOTS, EXTENSIONS, walkDirectory, isInAllowedRoots
} from './file-utils.mjs'
import { validateFiles } from './validator.mjs'

// Get changed files from git, filtered by extension and roots
let filesToCheck = getChangedFiles()
  .filter((file) => EXTENSIONS.has(path.extname(file)))
  .filter(isInAllowedRoots)

// If no files found and fallback enabled, scan all roots
if (!filesToCheck.length && shouldUseFallback()) {
  const allFiles = []
  for (const root of ROOTS) {
    for (const file of walkDirectory(root)) {
      if (EXTENSIONS.has(path.extname(file))) {
        allFiles.push(file)
      }
    }
  }
  filesToCheck = allFiles
}

// Exit early if no files to check
if (!filesToCheck.length) {
  process.exit(0)
}

// Validate all files and report results
const result = validateFiles(filesToCheck)
if (!result.valid) {
  result.errors.forEach((error) => console.error(error))
  process.exit(1)
}
