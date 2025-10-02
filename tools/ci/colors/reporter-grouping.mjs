/*
 * File: reporter-grouping.mjs
 * Purpose: Functions for grouping and organizing issues for display. Groups
 * detected color violations by type and by file. Provides formatted output
 * functions for console reporting with hierarchical structure.
 * All Rights Reserved. Arodi Emmanuel
 */

export function groupIssuesByType(issues) {
  const byType = {}
  issues.forEach((issue) => {
    if (!byType[issue.type]) byType[issue.type] = []
    byType[issue.type].push(issue)
  })
  return byType
}

export function groupIssuesByFile(issues) {
  const byFile = {}
  issues.forEach((issue) => {
    if (!byFile[issue.file]) byFile[issue.file] = []
    byFile[issue.file].push(issue)
  })
  return byFile
}

export function printIssuesGroupedByFile(issues) {
  const byFile = groupIssuesByFile(issues)

  Object.entries(byFile).forEach(([file, fileIssues]) => {
    console.log(`\n📄 ${file}`)
    fileIssues.forEach((issue) => {
      if (issue.line > 0) {
        console.log(`   Line ${issue.line}: ${issue.value}`)
        console.log(`   ${issue.context}`)
      } else {
        console.log(`   ${issue.value}`)
      }
    })
  })
}
