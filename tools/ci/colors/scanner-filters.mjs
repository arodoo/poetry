/*
 * File: scanner-filters.mjs
 * Purpose: File filtering logic for color scanner. Determines which files and
 * directories to exclude from scanning based on pattern matching. Checks file
 * extensions to include only relevant source files for analysis.
 * All Rights Reserved. Arodi Emmanuel
 */

import { EXCLUDE_PATTERNS, INCLUDE_EXTENSIONS } from './patterns.mjs'

export function shouldExclude(fullPath, relativePath) {
  return EXCLUDE_PATTERNS.some((pattern) => {
    if (typeof pattern === 'string') {
      return relativePath.includes(pattern)
    }
    return pattern.test(relativePath)
  })
}

export function shouldInclude(filename) {
  const ext = filename.substring(filename.lastIndexOf('.'))
  return INCLUDE_EXTENSIONS.includes(ext)
}
