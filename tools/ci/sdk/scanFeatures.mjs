/*
 * File: scanFeatures.mjs
 * Purpose: Scans SDK directory and returns list of features
 * with their files. Reusable scanner module.
 * All Rights Reserved. Arodi Emmanuel
 */
import { readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

export function scanFeatures(sdkPath) {
  try {
    const entries = readdirSync(sdkPath)
    return entries
      .filter((e) => statSync(join(sdkPath, e)).isDirectory())
      .map((name) => ({
        name,
        path: join(sdkPath, name),
        files: getFiles(join(sdkPath, name)),
      }))
  } catch {
    return []
  }
}

function getFiles(path) {
  try {
    return readdirSync(path).filter((f) => /\.(ts|js)$/.test(f))
  } catch {
    return []
  }
}
