// File: index.js
// Purpose: Exports FFI infrastructure components
// Provides unified access to DLL loader and FFI bindings
// All Rights Reserved. Arodi Emmanuel

export { loadLibrary, getLibrary, isLoaded, koffi } from './dll-loader.js';
export { initBindings, getBindings } from './ffi-bindings.js';
