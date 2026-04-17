/*
 * File: downloadBlob.ts
 * Purpose: Triggers a browser file download from a Blob object.
 * Creates a temporary anchor element with an object URL to
 * initiate the download, then cleans up the URL.
 * All Rights Reserved. Arodi Emmanuel
 */

export function downloadBlob(blob: Blob, filename: string): void {
  const url: string = URL.createObjectURL(blob)
  const a: HTMLAnchorElement = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
