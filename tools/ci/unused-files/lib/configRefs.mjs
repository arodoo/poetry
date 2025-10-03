/*
 File: configRefs.mjs
 Purpose: Configuration file reference scanner that detects files used in
 build tool configurations (vitest, vite, playwright, eslint, tailwind).
 Parses config files for setupFiles, imports, and requires to prevent
 flagging infrastructure files as unused during static analysis.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'

const CONFIG_FILES = [
  'vitest.config.ts',
  'vite.config.ts',
  'playwright.config.ts',
  'tailwind.config.js',
  'postcss.config.cjs',
  'eslint.config.js',
]

export function findConfigReferences(rootDir) {
  const refs = new Set()
  for (const cfg of CONFIG_FILES) {
    const cfgPath = path.join(rootDir, 'poetry-frontend', cfg)
    if (!fs.existsSync(cfgPath)) continue
    try {
      const content = fs.readFileSync(cfgPath, 'utf8')
      // Match file paths in config: setupFiles, import(), require()
      const pathRegex = new RegExp(
        "['\"]([^'\"\\n]+\\.(ts|tsx|js|jsx|mjs|cjs))['\"]",
        'g'
      )
      let m
      while ((m = pathRegex.exec(content)) !== null) {
        refs.add(m[1])
      }
    } catch (err) {
      // ignore
    }
  }
  return refs
}

export function isConfigReferenced(filePath, rootDir, configRefs) {
  const rel = path.relative(path.join(rootDir, 'poetry-frontend'), filePath)
  const normalized = rel.replace(/\\/g, '/')
  // Check if any config reference matches this file
  for (const ref of configRefs) {
    const refNormalized = ref.replace(/^\.\//, '').replace(/\\/g, '/')
    if (normalized.endsWith(refNormalized)) return true
    if (refNormalized.endsWith(normalized)) return true
    // Also check basename match for setupTests.ts, etc.
    if (path.basename(filePath) === path.basename(ref)) {
      return true
    }
  }
  return false
}
