// File: index.js
// Purpose: Exports application layer services
// Provides fingerprint operations orchestration
// All Rights Reserved. Arodi Emmanuel

export {
  initialize, openDevice, closeDevice, captureImage, generateChar,
  autoIdentify, autoEnroll, getDeviceHandle, getDeviceAddr
} from './fingerprint-service.js';
