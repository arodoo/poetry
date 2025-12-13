// File: fingerprint-service.js
// Purpose: Application service for fingerprint operations
// Orchestrates DLL calls for device and capture management
// All Rights Reserved. Arodi Emmanuel

import { loadLibrary, initBindings, getBindings, koffi } from
  '../infrastructure/ffi/index.js';
import * as log from '../infrastructure/logging/index.js';

let deviceHandle = null;
let deviceAddr = 0xFFFFFFFF; // Will be read from device
const DEVICE_USB = 0;
const DEVICE_COM = 1;
const DEVICE_UDISK = 2;

export function initialize(dllPath) {
  log.info('SERVICE', `Initializing with DLL: ${dllPath}`);
  loadLibrary(dllPath);
  initBindings();
  log.info('SERVICE', 'SDK initialized successfully');
}

export function openDevice() {
  const bindings = getBindings();
  const handlePtr = Buffer.alloc(8);

  // Check USB device count (like Demo.exe does)
  const usbCountPtr = Buffer.alloc(4);
  let usbCount = 0;
  try {
    const countResult = bindings.PSGetUSBDevNum(usbCountPtr);
    usbCount = usbCountPtr.readInt32LE(0);
    log.sdk('PSGetUSBDevNum', {}, { result: countResult, count: usbCount });
  } catch (e) {
    log.error('SERVICE', `PSGetUSBDevNum failed: ${e.message}`);
  }

  // Check UDisk device count (like Demo.exe does)
  const udiskCountPtr = Buffer.alloc(4);
  let udiskCount = 0;
  try {
    const countResult = bindings.PSGetUDiskNum(udiskCountPtr);
    udiskCount = udiskCountPtr.readInt32LE(0);
    log.sdk('PSGetUDiskNum', {}, { result: countResult, count: udiskCount });
  } catch (e) {
    log.error('SERVICE', `PSGetUDiskNum failed: ${e.message}`);
  }

  // Determine device type (same logic as Demo.exe)
  let deviceType = DEVICE_USB;
  if (usbCount <= 0) {
    deviceType = DEVICE_UDISK;
    log.debug('SERVICE', 'No USB devices, trying UDisk');
  }
  if (udiskCount <= 0 && deviceType === DEVICE_UDISK) {
    deviceType = DEVICE_COM;
    log.debug('SERVICE', 'No UDisk devices, trying COM');
  }

  log.debug('SERVICE', `Device type: ${deviceType}`);

  // Try PSOpenDeviceEx
  const params = { type: deviceType, com: 1, baud: 6, packSize: 2, devId: 0 };
  log.debug('SERVICE', `Trying PSOpenDeviceEx with: ${JSON.stringify(params)}`);

  let result = bindings.PSOpenDeviceEx(handlePtr, deviceType, 1, 6, 2, 0);
  log.sdk('PSOpenDeviceEx', params, { code: result, buf: handlePtr.toString('hex') });

  // If PSOpenDeviceEx fails, try PSAutoOpen as fallback
  if (result !== 0) {
    log.debug('SERVICE', 'PSOpenDeviceEx failed, trying PSAutoOpen...');
    const typePtr = [0];
    result = bindings.PSAutoOpen(handlePtr, typePtr, DEVICE_ADDR, 0, 1);
    log.sdk('PSAutoOpen', { addr: DEVICE_ADDR }, { code: result, type: typePtr[0] });
  }

  if (result === 0) {
    deviceHandle = handlePtr.readUInt32LE(0);
    log.info('SERVICE', `Handle obtained: 0x${deviceHandle.toString(16)}`);

    // Use default address like Demo.exe does
    deviceAddr = 0xFFFFFFFF;
    log.info('SERVICE', `Using default address: 0x${deviceAddr.toString(16)}`);
    log.info('SERVICE', 'Device opened successfully');
  } else {
    log.error('SERVICE', `All open methods failed. Final code: ${result}`);
  }

  return { code: result, handle: deviceHandle };
}

export function closeDevice() {
  if (deviceHandle === null) {
    return { code: -1, message: 'Device not open' };
  }
  const bindings = getBindings();
  const result = bindings.PSCloseDeviceEx(deviceHandle);
  deviceHandle = null;
  return { code: result };
}

export function captureImage() {
  if (deviceHandle === null) {
    return { code: -1, message: 'Device not open' };
  }
  const bindings = getBindings();
  log.debug('SERVICE', `Calling PSGetImage with addr=0x${deviceAddr.toString(16)}`);
  const result = bindings.PSGetImage(deviceHandle, deviceAddr);
  log.sdk('PSGetImage', { handle: deviceHandle, addr: deviceAddr }, { code: result });
  return { code: result };
}

export function generateChar(bufferId) {
  if (deviceHandle === null) {
    return { code: -1, message: 'Device not open' };
  }
  const bindings = getBindings();
  return { code: bindings.PSGenChar(deviceHandle, deviceAddr, bufferId) };
}

export function autoIdentify() {
  if (deviceHandle === null) {
    return { code: -1, message: 'Device not open' };
  }
  const bindings = getBindings();
  const idPtr = [0];
  const scorePtr = [0];
  const result = bindings.PS_AutoIdentify(deviceHandle, idPtr, scorePtr);
  return { code: result, id: idPtr[0], score: scorePtr[0] };
}

export function autoEnroll(targetId) {
  if (deviceHandle === null) {
    return { code: -1, message: 'Device not open' };
  }
  const bindings = getBindings();
  const outIdPtr = [0];
  // id=targetId, dup=0 (no duplicates allowed)
  const result = bindings.PS_AutoEnroll(deviceHandle, targetId, 0, outIdPtr);
  return { code: result, id: outIdPtr[0] };
}

export function manualEnroll(targetId) {
  if (deviceHandle === null) {
    return { code: -1, message: 'Device not open' };
  }

  const bindings = getBindings();
  log.info('SERVICE', `Starting manual enrollment for slot ${targetId}`);

  // Try to get image with retries - wait indefinitely until finger detected or user cancels
  let imageCode = -1;
  const maxAttempts = 1000; // 1000 attempts ~= 1.6 minutes (effectively infinite)

  for (let i = 0; i < maxAttempts; i++) {
    imageCode = bindings.PSGetImage(deviceHandle, deviceAddr);
    log.debug('SERVICE', `PSGetImage attempt ${i + 1}: code ${imageCode}`);

    if (imageCode === 0) {
      // Finger detected!
      log.info('SERVICE', 'Finger detected on sensor');
      break;
    }

    // Wait 100ms between attempts
    const start = Date.now();
    while (Date.now() - start < 100) {
      // Busy wait
    }
  }

  if (imageCode !== 0) {
    log.error('SERVICE', `Timeout waiting for finger. Last code: ${imageCode}`);
    return { code: 32, id: 0 }; // Return timeout code
  }

  // Generate character file from image (buffer 1)
  const genCode = bindings.PSGenChar(deviceHandle, deviceAddr, 1);
  log.sdk('PSGenChar', { buffer: 1 }, { code: genCode });

  if (genCode !== 0) {
    return { code: genCode, id: 0 };
  }

  // For now, store the single reading as a template
  // (Real enrollment needs 6 readings, but let's test this first)
  const storeCode = bindings.PSStoreChar(deviceHandle, deviceAddr, 1, targetId);
  log.sdk('PSStoreChar', { buffer: 1, pageId: targetId }, { code: storeCode });

  if (storeCode === 0) {
    log.info('SERVICE', `Successfully enrolled fingerprint to slot ${targetId}`);
    return { code: 0, id: targetId };
  }

  return { code: storeCode, id: 0 };
}

export const getDeviceHandle = () => deviceHandle;
export const getDeviceAddr = () => deviceAddr;
