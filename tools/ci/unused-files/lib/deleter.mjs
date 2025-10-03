/*
 File: deleter.mjs
 Purpose: Core deletion logic for deprecated files. Finds files with
 DEPRECATED header and removes them with confirmation.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

/**
 * Walk directory tree and collect all files
 */
export function* walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') {
        continue
      }
      yield* walk(fullPath)
    } else if (entry.isFile()) {
      yield fullPath
    }
  }
}

/**
 * Check if file is marked as deprecated
 */
export function isDeprecated(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    return content.startsWith('/*\n * DEPRECATED:')
  } catch {
    return false
  }
}

/**
 * Prompt user for confirmation
 */
export function promptConfirmation(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close()
      const confirmed = answer.toLowerCase() === 'y'
      const confirmedYes = answer.toLowerCase() === 'yes'
      resolve(confirmed || confirmedYes)
    })
  })
}

/**
 * Delete a single file
 */
export function deleteFile(filePath) {
  try {
    fs.unlinkSync(filePath)
    return true
  } catch {
    return false
  }
}
