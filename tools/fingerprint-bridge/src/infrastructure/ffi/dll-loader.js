// File: dll-loader.js
// Purpose: Loads SynoAPIEx.dll using koffi FFI library
// Handles DLL path resolution and loading state management
// All Rights Reserved. Arodi Emmanuel

import koffi from 'koffi';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DLL_PATH = path.resolve(__dirname, '../../../dll/SynoAPIEx.dll');

let lib = null;

export { koffi };

export function loadLibrary() {
  if (lib) return lib;
  try {
    lib = koffi.load(DLL_PATH);
    console.log('[DLL] SynoAPIEx.dll loaded successfully');
    return lib;
  } catch (err) {
    console.error('[DLL] Failed to load:', err.message);
    throw err;
  }
}

export function getLibrary() {
  return lib;
}

export function isLoaded() {
  return lib !== null;
}
