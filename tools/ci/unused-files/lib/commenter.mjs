/*
 File: commenter.mjs
 Purpose: Provides helper to comment out a file's contents with a standard
 deprecation header so files remain in the repo but are inert. Returns
 boolean indicating whether a file was modified.
 All Rights Reserved. Arodi Emmanuel
*/
import fs from 'node:fs'
import path from 'node:path'

export function commentOutFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

  if (content.startsWith('/*\n * DEPRECATED:')) {
    console.log('   ⏭️  Already commented: ' + String(path.basename(filePath)))
    return false
  }

  const today = new Date().toISOString().split('T')[0]
  const lines = content.split('\n')
  const commentedLines = lines.map((line) => '// ' + String(line))

  const deprecationNotice = [
    '/*',
    ' * DEPRECATED: This file was marked as unused on ' + String(today),
    ' * All code has been commented out to preserve git history.',
    ' * If this file is needed, uncomment the code below and update.',
    ' * To permanently remove, delete this file in a future cleanup.',
    ' */',
    '',
    ...commentedLines,
    '',
  ].join('\n')

  fs.writeFileSync(filePath, deprecationNotice, 'utf8')
  console.log('   ✅ Commented out: ' + String(path.basename(filePath)))
  return true
}
