/*
 File: referenced.mjs
 Purpose: Core reference checking logic that determines if a target file is
 imported or used anywhere in the codebase. Analyzes import statements, export
 identifiers, and file path matching to build accurate usage reports with
 detailed reasoning for each determination.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'
import { findImports, extractIdentifiers } from './imports.mjs'

export function isReferenced(targetFile, allFiles, fileContents) {
  const targetName = path.basename(targetFile).replace(/\.(ts|tsx|js|jsx)$/, '')
  for (const file of allFiles) {
    if (file === targetFile) continue
    const content = fileContents.get(file)
    if (!content) continue
    const imports = findImports(content)
    const fileDir = path.dirname(file)
    for (const imp of imports) {
      if (imp.startsWith('.') || imp.startsWith('/')) {
        const resolved = path.resolve(fileDir, imp)
        const candidates = [
          resolved,
          resolved + '.ts',
          resolved + '.tsx',
          resolved + '.js',
          resolved + '.jsx',
          path.join(resolved, 'index.ts'),
          path.join(resolved, 'index.tsx'),
          path.join(resolved, 'index.js'),
          path.join(resolved, 'index.jsx'),
        ].map((p) => p.replace(/\\/g, '/'))
        const tNormalized = targetFile.replace(/\\/g, '/')
        if (candidates.includes(tNormalized)) return { used: true, by: file }
      }
    }
    // Check identifiers
    const ids = extractIdentifiers(content)
    if (ids.includes(targetName)) return { used: true, by: file }
    if (content.includes(targetName)) return { used: true, by: file }
  }
  return { used: false, by: null }
}
