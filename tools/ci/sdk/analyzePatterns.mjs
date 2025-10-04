/*
 * File: analyzePatterns.mjs
 * Purpose: Analyzes code patterns in manual SDK files to
 * detect common structures and usage statistics.
 * All Rights Reserved. Arodi Emmanuel
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export function analyzePatterns(features) {
  const patterns = {
    clientFiles: 0,
    typeFiles: 0,
    indexFiles: 0,
    createFnPattern: 0,
    fetchUsage: 0,
  }

  features.forEach((feature) => {
    feature.files.forEach((file) => {
      const content = readContent(join(feature.path, file))
      if (/Client\.ts$/.test(file)) patterns.clientFiles++
      if (/Types\.ts$/.test(file)) patterns.typeFiles++
      if (/index\.ts$/.test(file)) patterns.indexFiles++
      if (/createFetchClient/.test(content)) {
        patterns.createFnPattern++
      }
      if (/fetch\(/.test(content)) patterns.fetchUsage++
    })
  })

  return patterns
}

function readContent(filePath) {
  try {
    return readFileSync(filePath, 'utf-8')
  } catch {
    return ''
  }
}
