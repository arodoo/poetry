/*
 File: fsWalk.mjs
 Purpose: File system traversal utilities for the unused files checker.
 Provides recursive directory walking with pattern-based exclusions and safe
 file reading operations with error handling for inaccessible or binary files.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'

export function walk(dir, excludedPatterns = []) {
  const results = []
  if (!fs.existsSync(dir)) return results
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (!excludedPatterns.some((p) => p.test(fullPath))) {
        results.push(...walk(fullPath, excludedPatterns))
      }
    } else if (entry.isFile()) {
      if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        results.push(fullPath)
      }
    }
  }
  return results
}

export function readFileSafe(file) {
  try {
    return fs.readFileSync(file, 'utf8')
  } catch (err) {
    return null
  }
}
