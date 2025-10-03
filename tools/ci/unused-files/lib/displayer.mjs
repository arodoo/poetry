/*
 File: displayer.mjs
 Purpose: Display deprecated files grouped by directory.
 All Rights Reserved. Arodi Emmanuel
*/
import path from 'node:path'

export function groupByDir(files, root) {
  const grouped = {}
  for (const file of files) {
    const relDir = path.relative(root, path.dirname(file))
    if (!grouped[relDir]) grouped[relDir] = []
    grouped[relDir].push(path.basename(file))
  }
  return grouped
}

export function displayGrouped(grouped) {
  for (const [dir, fileList] of Object.entries(grouped)) {
    console.log(`\n📁 ${dir}`)
    fileList.forEach((f) => console.log(`   • ${f}`))
  }
}
