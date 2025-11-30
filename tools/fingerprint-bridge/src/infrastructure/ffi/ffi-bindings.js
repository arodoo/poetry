// File: ffi-bindings.js
// Purpose: Defines FFI function signatures for SynoAPIEx.dll
// Maps native C functions to JavaScript callable functions
// All Rights Reserved. Arodi Emmanuel

import { getLibrary } from './dll-loader.js';

const funcs = {};

export function initBindings() {
  const lib = getLibrary();
  if (!lib) throw new Error('Library not loaded');

  // Device enumeration
  funcs.PSGetUSBDevNum = lib.func('int __stdcall PSGetUSBDevNum(int* nums)');
  funcs.PSGetUDiskNum = lib.func('int __stdcall PSGetUDiskNum(int* nums)');
  
  // Device info
  funcs.PSReadInfPage = lib.func(
    'int __stdcall PSReadInfPage(int h, int addr, uint8* inf)'
  );
  
  // Use uint8* for handle output (we'll pass Buffer)
  funcs.PSAutoOpen = lib.func(
    'int __stdcall PSAutoOpen(uint8* h, int* type, int addr, int pwd, int vfy)'
  );
  funcs.PSOpenDeviceEx = lib.func(
    'int __stdcall PSOpenDeviceEx(uint8* h, int t, int c, int b, int p, int d)'
  );
  funcs.PSCloseDeviceEx = lib.func('int __stdcall PSCloseDeviceEx(int h)');
  // Password verification (required after open)
  funcs.PSVfyPwd = lib.func('int __stdcall PSVfyPwd(int h, uint32 addr, uint8* pwd)');
  // Image and character operations
  funcs.PSGetImage = lib.func('int __stdcall PSGetImage(int h, uint32 addr)');
  funcs.PSGenChar = lib.func('int __stdcall PSGenChar(int h, uint32 addr, int b)');
  funcs.PSRegModule = lib.func('int __stdcall PSRegModule(int h, uint32 addr)');
  
  // High-level functions (handle everything internally)
  funcs.PSEnroll = lib.func('int __stdcall PSEnroll(void* h, int* id)');
  funcs.PSIdentify = lib.func('int __stdcall PSIdentify(void* h, int* id, int* sc)');
  funcs.PS_AutoEnroll = lib.func(
    'int __stdcall PS_AutoEnroll(void* h, int id, int dup, int* outId)'
  );
  funcs.PS_AutoIdentify = lib.func(
    'int __stdcall PS_AutoIdentify(void* h, int* id, int* score)'
  );

  funcs.PSStoreChar = lib.func(
    'int __stdcall PSStoreChar(int h, uint32 addr, int bufID, int pageID)'
  );
  funcs.PSSearch = lib.func(
    'int __stdcall PSSearch(int h, uint32 a, int b, int s, int c, int* p, int* sc)'
  );
  funcs.PSDelChar = lib.func(
    'int __stdcall PSDelChar(int h, uint32 addr, int startID, int count)'
  );
  funcs.PSEmpty = lib.func('int __stdcall PSEmpty(int h, uint32 addr)');
  funcs.PSTemplateNum = lib.func(
    'int __stdcall PSTemplateNum(int h, uint32 addr, int* cnt)'
  );

  console.log('[FFI] Bindings initialized');
  return funcs;
}

export function getBindings() {
  return funcs;
}
